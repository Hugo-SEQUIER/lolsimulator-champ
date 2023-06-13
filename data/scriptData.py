import requests
import json
import os
from bs4 import BeautifulSoup

async def getCd_Value(section):
    new_sec = section.find('div', {'data-source' : "cooldown"})
    if new_sec is None :
        new_sec = section.find('div', {'data-source' : "static"})
        if new_sec is None :
            return "A DEFINIR"
    cd = new_sec.div.span.get_text().split('/')
    return cd


async def getDamageValue(section):
    new_sec = section.find_all('dd')
    if new_sec is None :
        return "A DEFINIR"
    
async def get_champion_data(linkName):
    if linkName == 'Wukong' :
        linkName = 'monkeyking'

    res = requests.get(f"https://raw.communitydragon.org/13.11/game/data/characters/{linkName.lower()}/{linkName.lower()}.bin.json")
    championDetails = res.json()
    
    root = f"Characters/{linkName[0].upper() + linkName[1:].lower()}/CharacterRecords/Root"
    
    data = championDetails.get(root)
    if data is not None:
        url = "https://leagueoflegends.fandom.com/wiki/" + linkName + "/LoL"

        page = requests.get(url)
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

            spell = {
                'Passive' : {
                    'img' : img.get('passive'),
                    'cd' : [],
                    'damage' : 0,
                    'ratioAd' : 0,
                    'ratioAp' : 0,
                },
                'Q' : {
                    'img' : img.get('QSpell'),
                    'cd' : [],
                    'basicStats' : [
                        {
                            'damage' : [],
                            'ratioAd' : [],
                            'ratioAp' : [], 
                        },
                    ],
                    'bonus' : {
                        
                    }
                },
                'W' : {
                    'img' : img.get('WSpell'),
                    'cd' : [],
                    'basicStats' : [
                        {
                            'damage' : [],
                            'ratioAd' : [],
                            'ratioAp' : [], 
                        },
                    ],
                    'bonus' : {
                        
                    }
                },
                'E' : {
                    'img' : img.get('ESpell'),
                    'cd' : [],
                    'basicStats' : [
                        {
                            'damage' : [],
                            'ratioAd' : [],
                            'ratioAp' : [], 
                        },
                    ],
                    'bonus' : {
                        
                    }
                },
                'R' : {
                    'img' : img.get('RSpell'),
                    'cd' : [],
                    'basicStats' : [
                        {
                            'damage' : [],
                            'ratioAd' : [],
                            'ratioAp' : [], 
                        },
                    ],
                    'bonus' : {
                        
                    }
                }
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
            print('wiki')
            print(linkName)
    else :
        print('raw')
        print(linkName)
