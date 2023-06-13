import requests
import json
import os
import re

from bs4 import BeautifulSoup

def getCd_Value(section):
    new_sec = section.find('div', attrs={'data-source' : "cooldown"})
    
    if new_sec is None :
        new_sec = section.find('div', attrs={'data-source' : "static"})
        if new_sec is None :
            return "A DEFINIR"
    cd = new_sec.div.get_text().split('/')
    cd = convertArrayStringToNumeric(cd)
    return cd


def convertArrayStringToNumeric(array_string):
    if (isinstance(array_string, list)):
        for i in range(0,len(array_string)):
            array_string[i] = array_string[i].split('%')[0]
            array_string[i] = array_string[i][1:]
            try :
                array_string[i] = int(array_string[i])
            except ValueError :
                try :
                    array_string[i] = float(array_string[i])
                except ValueError:
                    continue
    return array_string

def getDamageValue(section):
    list_dd = section.find_all('dd')
    list_dt = section.find_all('dt')
    if list_dd is None :
        return "A DEFINIR"
    if list_dt is None :
        return "A DEFINIR"
    dict = {}
    dictRatioAD = {}
    dictRatioAP = {}
    for i in range(0,len(list_dd)):
        string_damage = list_dd[i].get_text()
        string_name = list_dt[i].get_text()
        value_AP = 0
        value_AD = 0
        if 'AP' in string_damage :
            match = re.search(r'\((.+)\)', string_damage)
            if match:
                value_AP = match.group(1).split('/')
        if 'AD' in string_damage :
            match = re.search(r'\((.+)\)', string_damage)
            if match:
                value_AD = match.group(1).split('/')
        string_damage = string_damage.split('(')[0].split('/')
        string_damage = convertArrayStringToNumeric(string_damage)
       
        dict[string_name] = string_damage
        
        value_AD = convertArrayStringToNumeric(value_AD)
        value_AP = convertArrayStringToNumeric(value_AP)

        dictRatioAP[string_name] = value_AP
        dictRatioAD[string_name] = value_AD
    if not dict :
        dict = 0
    if not dictRatioAD :
        dictRatioAD = 0
    if not dictRatioAP :
        dictRatioAP = 0
    return dict, dictRatioAD, dictRatioAP

# Le principe est d'obtenir à la fin qu'un tableau
def summurizeValue(damage_obj):
    x= 5


def findSpellData(linkName):
    url = "https://leagueoflegends.fandom.com/wiki/" + linkName + "/LoL"

    page = requests.get(url)
    
    passive_cd = "A DEFINIR"
    q_cd = "A DEFINIR"
    w_cd = "A DEFINIR"
    e_cd = "A DEFINIR"
    r_cd = "A DEFINIR"

    if page.status_code == 200 :

        parsedPage = BeautifulSoup(page.content, 'lxml')

        passivesection = parsedPage.find('div', {'class' : 'skill skill_innate'})
        qSection = parsedPage.find('div', {'class' : 'skill skill_q'})
        wSection = parsedPage.find('div', {'class' : 'skill skill_w'})
        eSection = parsedPage.find('div', {'class' : 'skill skill_e'})
        rSection = parsedPage.find('div', {'class' : 'skill skill_r'})

        # COOLDOWN 
        passive_cd = getCd_Value(passivesection)
        q_cd = getCd_Value(qSection)
        w_cd = getCd_Value(wSection)
        e_cd = getCd_Value(eSection)
        r_cd = getCd_Value(rSection)

        # Damage
        passive_damage, passive_ratio_AD, passive_ratio_AP = getDamageValue(passivesection)
        q_damage, q_ratio_AD, q_ratio_AP = getDamageValue(qSection)
        w_damage, w_ratio_AD, w_ratio_AP = getDamageValue(wSection)
        e_damage, e_ratio_AD, e_ratio_AP = getDamageValue(eSection)
        r_damage, r_ratio_AD, r_ratio_AP = getDamageValue(rSection)


        spell = {
            'Passive' : {
                'cd' : passive_cd,
                'damage' : passive_damage,
                'ratioAd' : passive_ratio_AD,
                'ratioAp' : passive_ratio_AP,
            },
            'Q' : {
                'cd' : q_cd,
                'basicStats' : [
                    {
                        'damage' : q_damage,
                        'ratioAd' : q_ratio_AD,
                        'ratioAp' : q_ratio_AP, 
                    },
                ],
                'bonus' : {
      
                }
            },
            'W' : {
                'cd' : w_cd,
                'basicStats' : [
                    {
                        'damage' : w_damage,
                        'ratioAd' : w_ratio_AD,
                        'ratioAp' : w_ratio_AP, 
                    },
                ],
                'bonus' : {
            
                }
            },
            'E' : {
                'cd' : e_cd,
                'basicStats' : [
                    {
                        'damage' : e_damage,
                        'ratioAd' : e_ratio_AD,
                        'ratioAp' : e_ratio_AP, 
                    },
                ],
                'bonus' : {
                    
                }
            },
            'R' : {
                'cd' : r_cd,
                'basicStats' : [
                    {
                        'damage' : r_damage,
                        'ratioAd' : r_ratio_AD,
                        'ratioAp' : r_ratio_AP, 
                    },
                ],
                'bonus' : {
                        
                }
            }
        }
        return spell
    
def get_champion_data(linkName):
    if linkName == 'Wukong' :
        linkName = 'monkeyking'
    linkName = linkName.replace("'", "")
    linkName = linkName.replace(" ","")
    linkName = linkName.replace(" ","")
    linkName = linkName.replace(".","")
    linkName = linkName.replace("é","e")
    linkName = linkName.replace("î","i")
    linkName = linkName[0].upper() + linkName[1:].lower()

    res = requests.get(f"https://raw.communitydragon.org/13.11/game/data/characters/{linkName.lower()}/{linkName.lower()}.bin.json")
    if res.status_code == 200:
        try:
            championDetails = res.json()
        except json.JSONDecodeError:
            print(f"Response from {linkName} was not JSON. Content was:\n{res.content}")
    else:
        print(f"Request for {linkName} failed with status code {res.status_code}")
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
    if linkName.lower() == 'aurelionsol' :
        linkName = 'Aurelion_Sol'
    if linkName.lower() == 'fiddlesticks' :
        linkName = 'Fiddlesticks'
    if linkName.lower() == 'jarvaniv' :
        linkName = 'Jarvan_IV'
    if linkName.lower() == 'kogmaw' :
        linkName = 'Kog%27Maw'
    if linkName.lower() == 'ksante' :
        linkName = 'K%27Sante'
    if linkName.lower() == 'masteryi' :
        linkName = 'Master_Yi'
    if linkName.lower() == 'leesin' :
        linkName = 'Lee_Sin'
    if linkName.lower() == 'missfortune' :
        linkName = 'Miss_Fortune'
    if linkName.lower() == 'reksai' :
        linkName = 'Rek%27Sai'
    if linkName.lower() == 'tahmkench' :
        linkName = 'Tahm_Kench'
    if linkName.lower() == 'twistedfate' :
        linkName = 'Twisted_Fate'
    if linkName.lower() == 'xinzhao' :
        linkName = 'Xin_Zhao'
    if linkName.lower() == 'drmundo' :
        linkName = 'Dr._Mundo'
    if linkName.lower() == 'monkeyking' :
        linkName = 'Wukong'

    spell = findSpellData(linkName)
    if spell is None :
        print(linkName)
        print('COTE SCRAPPING')

    if linkName.lower() == 'milio':
        root = '{7706d3a1}'
    data = championDetails.get(root)
    if data is not None:
        basicStats = {
                'Hp' : data.get('baseHP'),
                'hpLvl' : data.get('hpPerLevel'),
                'AD' : data.get('baseDamage'),
                'ADLvl' : data.get('damagePerLevel'),
                'AS' : data.get('attackSpeed'),
                'ASRatio' : data.get('attackSpeedRatio'), 
                'Armor' : data.get('baseArmor'),
                'ArmorLvl' : data.get('armorPerLevel'),
                'MR' : data.get('baseSpellBlock'),
                'MRLvl' : data.get('spellBlockPerLevel'),
                'MS' : data.get('baseMoveSpeed'),
                'Lifesteal' : 0,
                'Crit' : 0,
                'CritDmg' : 175,
                'HpRegen' : data.get('baseStaticHPRegen'),
                'HpRegenLvl' : data.get('hpRegenPerLevel'),
                'Mana' : data.get('primaryAbilityResource').get('arBase'),
                'ManaLvl' : data.get('primaryAbilityResource').get('arPerLevel', 0),
                'AP' : 0,
                'Range' : data.get('attackRange'),
                'ArmorPen' : 0,
                'ResistPen' : 0,
                'Haste' : 0,
                'SpellVamp' : 0,
                'ManaRegen' : data.get('primaryAbilityResource').get('arBaseStaticRegen', 0),
                'ManaRegenLvl' : data.get('primaryAbilityResource').get('arRegenPerLevel', 0),
            }

        img = {
                'centered' : f"{linkName}_0",
                'passive' : data.get('passive1IconName').split('/')[-1].split('.')[0],
                'QSpell' : data.get('spellNames')[0].split('/')[-1],
                'WSpell' : data.get('spellNames')[1].split('/')[-1],
                'ESpell' : data.get('spellNames')[2].split('/')[-1],
                'RSpell' : data.get('spellNames')[3].split('/')[-1],
            }

        champion = {
            'basicStats': basicStats,
            'img': img,
            'spell': spell
        }
        jsp = json.dumps(champion, indent=2)
        with open(f"{linkName}.json", 'w') as f:
            f.write(jsp)
    else :
        print(linkName)
        print(root)
        print(data)
        print(res)
    

character_name = [
    "Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe","Aurelion Sol","Azir","Bard","Bel'Veth","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia","Cho'Gath","Corki","Darius","Diana","Dr. Mundo","Draven","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna","Jarvan IV","Jax","Jayce","Jhin","Jinx","K'Santé","Kai'Sa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","Kha'Zix","Kindred","Kled","Kog'Maw","Leblanc","Lee Sin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Master Yi","Malphite","Malzahar","Maokai","Milio","Miss Fortune","Mordekaiser","Morgana","Nami","Nasus","Nautilus","Neeko","Nidalee","Nilah","Nocturne","Nunu","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","Rek'Sai","Rell","Renata","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Séraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Sylas","Syndra","Tahm Kench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","Twisted Fate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Vel'Koz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","Wukong","Xayah","Xerath","Xin Zhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Zeri","Ziggs","Zilean","Zoé","Zyra"
]

for name in character_name :
    get_champion_data(name)
