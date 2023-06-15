import requests
import json
import os
import re
import numpy as np
from bs4 import BeautifulSoup

""" 
Retourne un tableau de valeurs numériques correspondant au Cooldown d'un sort
Il est possible que le tableau retourne un string A DEFINIR si la valeur n'a pas été comprise par l'algorithme
S'il s'agit d'un autre string cela signifie que le CD diminue en fonction du niveau du personnage ce qui est un cas particulier.
"""
def getCd_Value(section):
    new_sec = section.find('div', attrs={'data-source' : "cooldown"})
    if new_sec is None :
        new_sec = section.find('div', attrs={'data-source' : "static"})
        if new_sec is None :
            return 0
    cd = new_sec.div.get_text().split('/')
    cd = convertArrayStringToNumeric(cd)
    return cd

""" 
Convertie le tableau de String qui vient d'être scrapper à un tableau de valeur numérique
Il y a plusieurs cas particuliers. 
Les ratios sont représentés comme ceci : (+45% AD)
J'enlève alors le % puis le +. Mais avant j'essaye de convertir en entier ou float.
Car il peut y avoir ceci : (+45 / 60 / 80% AD) et le 60 peut être directement converti.
"""
def convertArrayStringToNumeric(array_string):
    if (isinstance(array_string, list)):
        for i in range(0,len(array_string)):
            array_string[i] = array_string[i].split('%')[0]
            array_string[i] = array_string[i].split('(')[0]
            array_string[i] = array_string[i].split(')')[0]
            try :
                array_string[i] = int(array_string[i])
            except ValueError :
                try :
                    array_string[i] = float(array_string[i])
                except ValueError:
                    try : 
                        array_string[i] = int(array_string[i][1:])
                    except ValueError:
                        try :
                            array_string[i] = float(array_string[i][1:])
                        except ValueError :
                            continue
    return array_string

""" 
Retourne 3 dictionnaires 
dict : Contenant les valeurs numériques liés aux spells
dictRatioAD : Contenant les ratioAD liés aux spells
dictRatioAP : Contenant les ratioAP liés aux spells

Je récupère d'abord les balises DD et DT qui sont les balises htmls qui contiennent ces données. 
Puis je récupère le texte des valeurs.
S'il y en a pas alors j'initialise un tableau de zéro. 
Comme ça, côté front, toutes mes données, qu'il y en ait ou pas seront utilisables de la même manière.
"""
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
    dictRatioHealth = {}
    for i in range(0,len(list_dd)):
        string_damage = list_dd[i].get_text()
        string_name = list_dt[i].get_text()
        value_AP = 0
        value_AD = 0
        value_Health = 0
        if 'AP' in string_damage :
            match = re.search(r'\((.+)\)', string_damage)
            if match:
                value_AP = match.group(1).split('/')
        if 'AD' in string_damage :
            match = re.search(r'\((.+)\)', string_damage)
            if match:
                value_AD = match.group(1).split('/')
        if 'health' in string_damage.lower() :
            match = re.search(r'\((.+)\)', string_damage)
            if match:
                value_Health = match.group(1).split('/')
        string_damage = string_damage.split('(')[0].split('/')
        string_damage = convertArrayStringToNumeric(string_damage)
       
        dict[string_name] = string_damage
        
        value_AD = convertArrayStringToNumeric(value_AD)
        value_AP = convertArrayStringToNumeric(value_AP)
        value_Health = convertArrayStringToNumeric(value_Health)

        if value_AD == 0 :
            value_AD = [0,0,0,0,0]
        if value_AP == 0 :
            value_AP = [0,0,0,0,0]
        if value_Health == 0 :
            value_Health = [0,0,0,0,0]
        dictRatioAP[string_name] = value_AP
        dictRatioAD[string_name] = value_AD
        dictRatioHealth[string_name] = value_Health
    if not dict :
        dict = [0,0,0,0,0]
    if not dictRatioAD :
        dictRatioAD = [0,0,0,0,0]
    if not dictRatioAP :
        dictRatioAP = [0,0,0,0,0]    
    if not dictRatioHealth :
        dictRatioHealth = [0,0,0,0,0]
    
    return dict, dictRatioAD, dictRatioAP, dictRatioHealth

""" 
Retourne un tableau unique avec toutes les données additionnées.
Un spell sur LoL peut être découpé en plusieurs parties (comme le Q d'Aatrox). J'additionne alors ces dégats afin d'obtenir un tableau avec le plus de dégats possibles.
Le but n'est pas de prendre les dégats moyens, mais le plus de dégats possible réalisables (sans les coups critiques).
"""
def summurizeValue(obj):
    if isinstance(obj, dict):
        listKey = obj.keys()
        arrayOfSum = [[0,0,0,0,0]]
        res = []
        for key in listKey :
            if  "monster" not in key.lower() and "bonus" not in key.lower() and "cast" not in key.lower() and ("total" in key.lower() and "damage" in key.lower()) or "maximum physical damage" in key.lower() or "maximum magic damage" in key.lower():
                return obj[key]
            if "first cast damage" in key.lower() or "second cast damage" in key.lower() or "third cast damage" in key.lower():
                arrayOfSum.append(obj[key])
            if "physical damage:" == key.lower():
                arrayOfSum.append(obj[key])
            if "magic damage:" == key.lower():
                arrayOfSum.append(obj[key])
            if "damage per" in key.lower() and ("tick" in key.lower() or "shot" in key.lower() and "empowered" not in key.lower()):
                res =  obj[key]
            if 'true damage' in key.lower() and "non-champion" not in key.lower():
                res = obj[key]
            if 'gigalodon' in key.lower():
                return obj[key]
            if 'maximum damage:' == key.lower() or 'maximum total damage:' == key.lower():
                res = obj[key]  
        try :
            if len(res) != 0 :
                return res 
            tabResult = [sum(values) for values in zip(*arrayOfSum)]
            return tabResult
        except TypeError:
            return arrayOfSum[1]
        
    return obj

""" 
what = 'heal' or 'shield' or 'bonus'
Permet de récupérer les lignes de Heal / Shield mais aussi les bonus. Comme le R d'Aatrox qui ne fait pas de dégat mais en augmente.
J'ai ajouté le bonus sweetspot qui correspond à la zone bonus d'Aatrox si il touche dedans.
"""
def getHealOrShieldOrBonusValue(obj, what):
    arrayOfSum = [[0,0,0,0,0]]
    if isinstance(obj, dict):
        listKey = obj.keys()
        for key in listKey :
            if what in key.lower():
                return obj[key]
            if what == 'bonus' and ('empowered' in key.lower() or "increased damage:" == key.lower()):
                return obj[key]
            if what == 'bonus' and "sweetspot" in key.lower():
                return [60]
    return arrayOfSum
       
    
""" 
Retourne un dictionnaire spell qui contient toutes les données correspondant au sort du personnage.
Scrapping avec BeautifulSoup
"""
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

        # Scrapping des sections où sont les données
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
        passive_damage, passive_ratio_AD, passive_ratio_AP, passive_ratio_health = getDamageValue(passivesection)
        q_damage, q_ratio_AD, q_ratio_AP, q_ratio_health = getDamageValue(qSection)
        w_damage, w_ratio_AD, w_ratio_AP, w_ratio_health = getDamageValue(wSection)
        e_damage, e_ratio_AD, e_ratio_AP, e_ratio_health = getDamageValue(eSection)
        r_damage, r_ratio_AD, r_ratio_AP, r_ratio_health = getDamageValue(rSection)

        # Heal
        passive_heal = getHealOrShieldOrBonusValue(passive_damage, "heal")
        q_heal = getHealOrShieldOrBonusValue(q_damage, "heal")
        w_heal = getHealOrShieldOrBonusValue(w_damage, "heal")
        e_heal = getHealOrShieldOrBonusValue(e_damage, "heal")
        r_heal = getHealOrShieldOrBonusValue(r_damage, "heal")
        
        passive_heal_ratio_AD = getHealOrShieldOrBonusValue(passive_ratio_AD, "heal")
        q_heal_ratio_AD = getHealOrShieldOrBonusValue(q_ratio_AD, "heal")
        w_heal_ratio_AD = getHealOrShieldOrBonusValue(w_ratio_AD, "heal")
        e_heal_ratio_AD = getHealOrShieldOrBonusValue(e_ratio_AD, "heal")
        r_heal_ratio_AD = getHealOrShieldOrBonusValue(r_ratio_AD, "heal")
        
        passive_heal_ratio_AP = getHealOrShieldOrBonusValue(passive_ratio_AP, "heal")
        q_heal_ratio_AP = getHealOrShieldOrBonusValue(q_ratio_AP, "heal")
        w_heal_ratio_AP = getHealOrShieldOrBonusValue(w_ratio_AP, "heal")
        e_heal_ratio_AP = getHealOrShieldOrBonusValue(e_ratio_AP, "heal")
        r_heal_ratio_AP = getHealOrShieldOrBonusValue(r_ratio_AP, "heal")

        passive_heal_ratio_health = getHealOrShieldOrBonusValue(passive_ratio_health, "heal")
        q_heal_ratio_health = getHealOrShieldOrBonusValue(q_ratio_health, "heal")
        w_heal_ratio_health = getHealOrShieldOrBonusValue(w_ratio_health, "heal")
        e_heal_ratio_health = getHealOrShieldOrBonusValue(e_ratio_health, "heal")
        r_heal_ratio_health = getHealOrShieldOrBonusValue(r_ratio_health, "heal")
        
        # Shield
        passive_shield = getHealOrShieldOrBonusValue(passive_damage, "shield")
        q_shield = getHealOrShieldOrBonusValue(q_damage, "shield")
        w_shield = getHealOrShieldOrBonusValue(w_damage, "shield")
        e_shield = getHealOrShieldOrBonusValue(e_damage, "shield")
        r_shield = getHealOrShieldOrBonusValue(r_damage, "shield")
        
        passive_shield_ratio_AD = getHealOrShieldOrBonusValue(passive_ratio_AD, "shield")
        q_shield_ratio_AD = getHealOrShieldOrBonusValue(q_ratio_AD, "shield")
        w_shield_ratio_AD = getHealOrShieldOrBonusValue(w_ratio_AD, "shield")
        e_shield_ratio_AD = getHealOrShieldOrBonusValue(e_ratio_AD, "shield")
        r_shield_ratio_AD = getHealOrShieldOrBonusValue(r_ratio_AD, "shield")
        
        passive_shield_ratio_AP = getHealOrShieldOrBonusValue(passive_ratio_AP, "shield")
        q_shield_ratio_AP = getHealOrShieldOrBonusValue(q_ratio_AP, "shield")
        w_shield_ratio_AP = getHealOrShieldOrBonusValue(w_ratio_AP, "shield")
        e_shield_ratio_AP = getHealOrShieldOrBonusValue(e_ratio_AP, "shield")
        r_shield_ratio_AP = getHealOrShieldOrBonusValue(r_ratio_AP, "shield")

        passive_shield_ratio_health = getHealOrShieldOrBonusValue(passive_ratio_health, "shield")
        q_shield_ratio_health = getHealOrShieldOrBonusValue(q_ratio_health, "shield")
        w_shield_ratio_health = getHealOrShieldOrBonusValue(w_ratio_health, "shield")
        e_shield_ratio_health = getHealOrShieldOrBonusValue(e_ratio_health, "shield")
        r_shield_ratio_health = getHealOrShieldOrBonusValue(r_ratio_health, "shield")
        
        # Bonus
        passive_bonus_value = getHealOrShieldOrBonusValue(passive_damage, "bonus")
        passive_bonus_ratioAD = getHealOrShieldOrBonusValue(passive_ratio_AD, "bonus")
        passive_bonus_ratioAP = getHealOrShieldOrBonusValue(passive_ratio_AP, "bonus")
        passive_bonus_ratio_health = getHealOrShieldOrBonusValue(passive_ratio_health, "bonus")
        
        q_bonus_value = getHealOrShieldOrBonusValue(q_damage, "bonus")
        q_bonus_ratioAD = getHealOrShieldOrBonusValue(q_ratio_AD, "bonus")
        q_bonus_ratioAP = getHealOrShieldOrBonusValue(q_ratio_AP, "bonus")
        q_bonus_ratio_health = getHealOrShieldOrBonusValue(q_ratio_health, "bonus")
        
        w_bonus_value = getHealOrShieldOrBonusValue(w_damage, "bonus")
        w_bonus_ratioAD = getHealOrShieldOrBonusValue(w_ratio_AD, "bonus")
        w_bonus_ratioAP = getHealOrShieldOrBonusValue(w_ratio_AP, "bonus")
        w_bonus_ratio_health = getHealOrShieldOrBonusValue(w_ratio_health, "bonus")
        
        e_bonus_value = getHealOrShieldOrBonusValue(e_damage, "bonus")
        e_bonus_ratioAD = getHealOrShieldOrBonusValue(e_ratio_AD, "bonus")
        e_bonus_ratioAP = getHealOrShieldOrBonusValue(e_ratio_AP, "bonus")
        e_bonus_ratio_health = getHealOrShieldOrBonusValue(e_ratio_health, "bonus")
        
        r_bonus_value = getHealOrShieldOrBonusValue(r_damage, "bonus")
        r_bonus_ratioAD = getHealOrShieldOrBonusValue(r_ratio_AD, "bonus")
        r_bonus_ratioAP = getHealOrShieldOrBonusValue(r_ratio_AP, "bonus")
        r_bonus_ratio_health = getHealOrShieldOrBonusValue(r_ratio_health, "bonus")
        
        # Addition des valeurs
        q_damage = summurizeValue(q_damage)
        w_damage = summurizeValue(w_damage)
        e_damage = summurizeValue(e_damage)
        r_damage = summurizeValue(r_damage)
        
        q_ratio_AD = summurizeValue(q_ratio_AD)
        w_ratio_AD = summurizeValue(w_ratio_AD)
        e_ratio_AD = summurizeValue(e_ratio_AD)
        r_ratio_AD = summurizeValue(r_ratio_AD)
        
        q_ratio_AP = summurizeValue(q_ratio_AP)
        w_ratio_AP = summurizeValue(w_ratio_AP)
        e_ratio_AP = summurizeValue(e_ratio_AP)
        r_ratio_AP = summurizeValue(r_ratio_AP)

        q_ratio_health = summurizeValue(q_ratio_health)
        w_ratio_health = summurizeValue(w_ratio_health)
        e_ratio_health = summurizeValue(e_ratio_health)
        r_ratio_health = summurizeValue(r_ratio_health)

        if linkName.lower() == "aatrox" :
            passive_cd = [24,23.29,22.59,21.88,21.18,20.47,19.76,19.06,18.35,17.65,16.94,16.24,15.53,14.82,14.12,13.41,12.71,12]
        if linkName.lower() == "akali" :
            passive_damage = [35,38,41,44,47,50,53,62,71,80,89,98,107,122,137,152,167,180]
            passive_ratio_AD = [60]
            passive_ratio_AP = [55]
        if linkName.lower() == "aurelion_sol":
            q_damage = [3.75,4.12,4.49,4.85,5.22,5.59,5.96,6.32,6.69,7.06,7.43,7.79,8.16,8.53,8.9,9.26,9.63,10]
            q_ratio_AP = [7.5]
            q_bonus_value = [20,20.59,21.18,21.76,22.35,22.94,23.53,24.12,24.71,25.29,25.88,26.47,27.06,27.65,28.24,28.82,29.41,30]
            q_bonus_ratioAP = [35]
        if linkName.lower() == 'azir':
            w_damage = [0,0,0,0,0,0,0,0,0,2,7,12,17,32,47,62,77,92]
            w_ratio_AP = [60]
        if linkName.lower() == 'dr._mundo':
            passive_cd = [60,60,52.5,52.5,52.5,45,45,37.5,37.5,37.5,30,30,22.5,22.5,22.5,15,15,15]
            q_damage = [80,130,180,230,280]
            e_damage = [8,24,40,56,72]
            e_ratio_health = [11,2]
        if linkName.lower() == 'ezreal':
            q_ratio_AP = [15]
            e_bonus_ratioAD = [60]
            e_ratio_AP = [75]
            r_ratio_AP = [90]
        if linkName.lower() == 'fiddlesticks' :
            q_damage = [40,60,80,100,120]
            w_ratio_AP = [70]
        if linkName.lower() == 'galio':
            q_damage = [70,105,140,175,210]
            q_ratio_AP = [75]
        if linkName.lower() == 'garen':
            e_damage = [4,8,12,16,20]
            e_ratio_AD = [32,34,36,38,40]
        if linkName.lower() == 'illaoi':
            passive_cd = [20,19.25,18.5,17.75,17,16.25,15.5,14.75,14,13.25,12.5,11.75,11,10.25,9.5,8.75,8,7.25]
        if linkName.lower() == 'ivern':
            r_ratio_AP =  [30]
            r_damage =  [70,100,170]
        if linkName.lower() == 'jhin':
            q_ratio_AP = [123]
            r_damage = [470,1175,1880]
            r_ratio_AD = [235]
        if linkName.lower() == 'jinx':
            r_ratio_AD = [150]
        if 'kaisa' in linkName.lower():
            q_damage = [150,206.25,262.5,318.75,365]
            q_ratio_AD = [187.5]
            q_ratio_AP = [112.5]
            w_ratio_AP = [45]
            r_shield_ratio_AP = [120]
        if linkName.lower() == 'katarina':
            r_damage = [375,562.5,750]
            r_ratio_AP = [285]
        if linkName.lower() == 'kayle':
            e_damage = [15,20,25,30,35]
            e_ratio_AD = [10]
            e_ratio_AP = [20]
        if linkName.lower() == 'kindred':
            e_damage = [80,100,120,140,160]
            e_ratio_AD = [80]
        if "kog" in linkName.lower():
            r_ratio_AP = [70]
        if "sante" in linkName.lower():
            q_cd = [3.5,3.33,3.33,3.15,2.98,2.8,2.8,2.63,2.45,2.45,2.28,2.28,2.1,1.93,1.93,1.75,1.75,1.75]
            w_ratio_health[0] = 7
        if "malzahar" in linkName.lower():
            w_damage = [12,14,16,18,20]
            w_ratio_AD = [40]
            w_ratio_AP = [20]
            r_ratio_AP = [80]
            r_damage = [12,200,275]
        if "maokai" in linkName.lower():
            q_ratio_AP = [40]
            e_ratio_AP = [50]
        # Création du dictionnaire
        spell = {
            'Passive' : {
                'cd' : passive_cd,
                'damage' : passive_damage,
                'ratioAd' : passive_ratio_AD,
                'ratioAp' : passive_ratio_AP,
                'ratioHealth' : passive_ratio_health,
                'heal' : passive_heal,
                'ratioHealAd' : passive_heal_ratio_AD,
                'ratioHealAp' : passive_heal_ratio_AP,
                'ratioHealHealth' : passive_heal_ratio_health,
                'shield' : passive_shield,
                'ratioShieldlAd' : passive_shield_ratio_AD,
                'ratioShieldAp' : passive_shield_ratio_AP,
                'ratioShieldHealth' : passive_shield_ratio_health,
                'bonusValue' : passive_bonus_value,
                'bonusRatioAD' : passive_bonus_ratioAD,
                'bonusRatioAP' : passive_bonus_ratioAP,
                'bonusRatioHealth' : passive_bonus_ratio_health
                
            },
            'Q' : {
                'cd' : q_cd,
                'basicStats' : [
                    {
                        'damage' : q_damage,
                        'ratioAd' : q_ratio_AD,
                        'ratioAp' : q_ratio_AP, 
                        'ratioHealth' : q_ratio_health,
                        'heal' : q_heal,
                        'ratioHealAd' : q_heal_ratio_AD,
                        'ratioHealAp' : q_heal_ratio_AP,
                        'ratioHealHealth' : q_heal_ratio_health,
                        'shield' : q_shield,
                        'ratioShieldlAd' : q_shield_ratio_AD,
                        'ratioShieldAp' : q_shield_ratio_AP,
                        'ratioShieldHealth' : q_shield_ratio_health,
                        'bonusValue' : q_bonus_value,
                        'bonusRatioAD' : q_bonus_ratioAD,
                        'bonusRatioAP' : q_bonus_ratioAP,
                        'bonusRatioHealth' : q_bonus_ratio_health
                    },
                ],
            },
            'W' : {
                'cd' : w_cd,
                'basicStats' : [
                    {
                        'damage' : w_damage,
                        'ratioAd' : w_ratio_AD,
                        'ratioAp' : w_ratio_AP,
                        'ratioHealth' : w_ratio_health,
                        'heal' : w_heal,
                        'ratioHealAd' : w_heal_ratio_AD,
                        'ratioHealAp' : w_heal_ratio_AP,
                        'ratioHealHealth' : w_heal_ratio_health,
                        'shield' : w_shield,
                        'ratioShieldlAd' : w_shield_ratio_AD,
                        'ratioShieldAp' : w_shield_ratio_AP,
                        'ratioShieldHealth' : w_shield_ratio_health,
                        'bonusValue' : w_bonus_value,
                        'bonusRatioAD' : w_bonus_ratioAD,
                        'bonusRatioAP' : w_bonus_ratioAP,
                        'bonusRatioHealth' : w_bonus_ratio_health
                    },
                ],
            },
            'E' : {
                'cd' : e_cd,
                'basicStats' : [
                    {
                        'damage' : e_damage,
                        'ratioAd' : e_ratio_AD,
                        'ratioAp' : e_ratio_AP,
                        'ratioHealth' : e_ratio_health,
                        'heal' : e_heal,
                        'ratioHealAd' : e_heal_ratio_AD,
                        'ratioHealAp' : e_heal_ratio_AP, 
                        'ratioHealHealth' : e_heal_ratio_health,
                        'shield' : e_shield,
                        'ratioShieldlAd' : e_shield_ratio_AD,
                        'ratioShieldAp' : e_shield_ratio_AP,
                        'ratioShieldHealth' : e_shield_ratio_health,
                        'bonusValue' : e_bonus_value,
                        'bonusRatioAD' : e_bonus_ratioAD,
                        'bonusRatioAP' : e_bonus_ratioAP,
                        'bonusRatioHealth' : e_bonus_ratio_health
                    },
                ],
            },
            'R' : {
                'cd' : r_cd,
                'basicStats' : [
                    {
                        'damage' : r_damage,
                        'ratioAd' : r_ratio_AD,
                        'ratioAp' : r_ratio_AP, 
                        'ratioHealth' : r_ratio_health,
                        'heal' : r_heal,
                        'ratioHealAd' : r_heal_ratio_AD,
                        'ratioHealAp' : r_heal_ratio_AP,
                        'ratioHealHealth' : r_heal_ratio_health,
                        'shield' : r_shield,
                        'ratioShieldlAd' : r_shield_ratio_AD,
                        'ratioShieldAp' : r_shield_ratio_AP,
                        'ratioShieldHealth' : r_shield_ratio_health,
                        'bonusValue' : r_bonus_value,
                        'bonusRatioAD' : r_bonus_ratioAD,
                        'bonusRatioAP' : r_bonus_ratioAP,
                        'bonusRatioHealth' : r_bonus_ratio_health
                    },
                ],
            }
        }
        return spell

""" 
Ecriture des fichiers JSON.
"""
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

    # Lien de la communauté contenant pleins d'informations concernant les champions. Point Négatif => Trop compliqué à traiter sauf pour les données de base.
    res = requests.get(f"https://raw.communitydragon.org/13.11/game/data/characters/{linkName.lower()}/{linkName.lower()}.bin.json")
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
    
    # Cas exceptionnel de noms de champions qui ne sont pas pris en compte DANS LE WIKI .
    spellName = linkName
    if spellName.lower() == 'aurelionsol' :
        spellName = 'Aurelion_Sol'
    if spellName.lower() == 'fiddlesticks' :
        spellName = 'Fiddlesticks'
    if spellName.lower() == 'jarvaniv' :
        spellName = 'Jarvan_IV'
    if spellName.lower() == 'kogmaw' :
        spellName = 'Kog%27Maw'
    if spellName.lower() == 'ksante' :
        spellName = 'K%27Sante'
    if spellName.lower() == 'masteryi' :
        spellName = 'Master_Yi'
    if spellName.lower() == 'leesin' :
        spellName = 'Lee_Sin'
    if spellName.lower() == 'missfortune' :
        spellName = 'Miss_Fortune'
    if spellName.lower() == 'reksai' :
        spellName = 'Rek%27Sai'
    if spellName.lower() == 'tahmkench' :
        spellName = 'Tahm_Kench'
    if spellName.lower() == 'twistedfate' :
        spellName = 'Twisted_Fate'
    if spellName.lower() == 'xinzhao' :
        spellName = 'Xin_Zhao'
    if spellName.lower() == 'drmundo' :
        spellName = 'Dr._Mundo'
    if spellName.lower() == 'monkeyking' :
        spellName = 'Wukong'

    spell = findSpellData(spellName)
    if spell is None :
        print(spellName)
        print('COTE SCRAPPING')

    if linkName.lower() == 'milio':
        root = '{7706d3a1}'
    data = championDetails.get(root)
    
    # Création des dictionnaires.
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
    # Si une erreur je sais d'où ça vient
    else :
        print(linkName)
        print(root)
        print(data)
        print(res)
    
# Liste de tous les personnages de League Of Legends
character_name = [
    "Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe","Aurelion Sol","Azir","Bard","Bel'Veth","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia","Cho'Gath","Corki","Darius","Diana","Dr. Mundo","Draven","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna","Jarvan IV","Jax","Jayce","Jhin","Jinx","K'Santé","Kai'Sa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","Kha'Zix","Kindred","Kled","Kog'Maw","Leblanc","Lee Sin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Master Yi","Malphite","Malzahar","Maokai","Milio","Miss Fortune","Mordekaiser","Morgana","Nami","Nasus","Nautilus","Neeko","Nidalee","Nilah","Nocturne","Nunu","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","Rek'Sai","Rell","Renata","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Séraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Sylas","Syndra","Tahm Kench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","Twisted Fate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Vel'Koz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","Wukong","Xayah","Xerath","Xin Zhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Zeri","Ziggs","Zilean","Zoé","Zyra"
]

for name in character_name :
    get_champion_data(name)

#get_champion_data("Lulu")
