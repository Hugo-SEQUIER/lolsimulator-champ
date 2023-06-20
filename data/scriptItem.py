import pandas as pd
import json 
from openpyxl import load_workbook
import requests
from sympy import symbols, evalf

# Ouvrir le fichier xlsx
wb = load_workbook('dataLeague.xlsx', data_only=False)
ws = wb['Items']

data = ws.values
cols = next(data)
data_rows = list(data)

df = pd.DataFrame(data_rows, columns=cols)

# Imprimer les noms de colonnes (header)
header = df.columns.tolist()

def transformData(data_brut):   
    data_without_equal = checkIfNumber(data_brut)
    if (isinstance(data_without_equal, (int,float))):
        return data_without_equal
    
    return data_without_equal

def checkIfNumber(data_brut):
    if (data_brut == ""):
        return 0
    if (data_brut is None):
        return 0
    if (isinstance(data_brut, (int,float))):
        return data_brut
    testData = str(data_brut).split('=')[1]
    try :
        return int(testData)
    except ValueError :
        try :
            return float(testData)
        except ValueError :
            return testData

def getImgLink(data):
    name = str(data).split('/')[len(str(data).split('/')) - 1].split('"')[0] 
    return name

for index, row in df.iterrows() :
    try :
        if row["ITEM NAME"] != '-' and row["ITEM NAME"] != "" and row["ITEM NAME"] != "-Mythic-" and row["ITEM NAME"] != "-Elixir-" and "TOTAL" not in row["ITEM NAME"]:
            dict = {} 
            for col_name in df.columns:
                if col_name is not None :
                    if col_name != "" and "Legendary" not in col_name and not (col_name.startswith('I') and len(col_name) == 2)and "Efficien" not in col_name and col_name != "IE" and col_name is not None and col_name != "None":
                        if col_name == "Icon" :
                            dict["img"] = getImgLink(row[col_name])
                        if col_name != "ITEM NAME":
                            dict[col_name] = transformData(row[col_name])
            item_name = row["ITEM NAME"]
            jsp = json.dumps(dict, indent=2)
            with open(f"../public/data/items/{item_name}.json", 'w') as f:
                f.write(jsp)    
    except TypeError:
        if row["ITEM NAME"] is not None :
            print(f'Error {row["ITEM NAME"]}')