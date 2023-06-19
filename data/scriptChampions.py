import pandas as pd
import json 
from openpyxl import load_workbook
import requests
from sympy import symbols, evalf

PATCH = "13.12" # PAS D'IMPORTANCE

# Ouvrir le fichier xlsx
wb = load_workbook('champions_data.xlsx', data_only=False)
ws = wb['Champs']

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
    if (isinstance(data_brut, (int,float))):
        return data_brut
    testData = data_brut.split('=')[1]
    try :
        return int(testData)
    except ValueError :
        try :
            return float(testData)
        except ValueError :
            return testData

def getImgLink(linkName):
    if linkName == 'Wukong' :
        linkName = 'monkeyking'
    if "mundo" in linkName.lower():
        linkName = "DrMundo"
    linkName = linkName.replace("'", "")
    linkName = linkName.replace(" ","")
    linkName = linkName.replace(" ","")
    linkName = linkName.replace(".","")
    linkName = linkName.replace("é","e")
    linkName = linkName.replace("î","i")
    linkName = linkName[0].upper() + linkName[1:].lower()
    res = requests.get(f"https://raw.communitydragon.org/{PATCH}/game/data/characters/{linkName.lower()}/{linkName.lower()}.bin.json")
    
    if res.status_code == 200:
        try:
            championDetails = res.json()
        except json.JSONDecodeError:
            print(f"Response from {linkName} was not JSON. Content was:\n{res.content}")
    else:
        print(f"Request for {linkName} failed with status code {res.status_code}")

    # Cas exceptionnel de noms de champions qui ne sont pas pris en compte DANS LE JSON DE RAW .
    if linkName.lower() == 'aurelionsol' :
        linkName = 'AurelionSol'
    if linkName.lower() == 'fiddlesticks' :
        linkName = 'FiddleSticks'
    if linkName.lower() == 'jarvaniv' :
        linkName = 'JarvanIV'
    if linkName.lower() == 'kogmaw' :
        linkName = 'KogMaw'
    if linkName.lower() == 'ksante' :
        linkName = 'KSante'
    if linkName.lower() == 'leesin' :
        linkName = 'LeeSin'
    if linkName.lower() == 'masteryi' :
        linkName = 'MasterYi'
    if linkName.lower() == 'missfortune' :
        linkName = 'MissFortune'
    if linkName.lower() == 'reksai' :
        linkName = 'RekSai'
    if linkName.lower() == 'tahmkench' :
        linkName = 'TahmKench'
    if linkName.lower() == 'twistedfate' :
        linkName = 'TwistedFate'
    if linkName.lower() == 'xinzhao' :
        linkName = 'XinZhao'
    if linkName.lower() == 'drmundo' :
        linkName = 'DrMundo'
    if linkName.lower() == 'monkeyking' :
        linkName = 'MonkeyKing'

    root = f"Characters/{linkName}/CharacterRecords/Root"

    if linkName.lower() == 'milio':
        root = '{7706d3a1}'
    data = championDetails.get(root)

    img = {
        'centered' : f"{linkName}_0",
        'passive' : data.get('passive1IconName').split('/')[-1].split('.')[0],
        'QSpell' : data.get('spellNames')[0].split('/')[-1],
        'WSpell' : data.get('spellNames')[1].split('/')[-1],
        'ESpell' : data.get('spellNames')[2].split('/')[-1],
        'RSpell' : data.get('spellNames')[3].split('/')[-1],
    }

    return img
    

# Parcourir chaque ligne
for index, row in df.iterrows():
    # Parcourir chaque colonne
    try :
        if not '-' in row["Champions"] :
            dict = {}
            for col_name in df.columns:
                if col_name == "Icon" :
                    dict["img"] = getImgLink(row['Champions'])
                if col_name != "Champions" and col_name != "Icon": 
                    dict[col_name] = transformData(row[col_name])
                name_champ = row['Champions']
            if "Mundo" in name_champ :
                name_champ = "DrMundo"
            name_champ = name_champ.replace("'", "")
            name_champ = name_champ.replace(" ","")
            name_champ = name_champ.replace(" ","")
            name_champ = name_champ.replace(".","")
            name_champ = name_champ.replace("é","e")
            name_champ = name_champ.replace("î","i")
            jsp = json.dumps(dict, indent=2)
            with open(f"../public/data/champions/{name_champ}.json", 'w') as f:
                f.write(jsp)    
    except TypeError:
        if row["Champions"] is not None :
            print(row["Champions"])

    





