const axios = require('axios');
const { link } = require('fs');
const fs = require('fs').promises;

function addChampion(champions, name, basicStats, img, spells) {
    const champion = {
        basicStats: basicStats,
        img: img,
        spell: spells
    };
    champions[name] = champion;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

const character_name = [
    "Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe","Aurelion Sol","Azir","Bard","Bel'Veth","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia","Cho'Gath","Corki","Darius","Diana","Dr. Mundo","Draven","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna","Jarvan IV","Jax","Jayce","Jhin","Jinx","K'Santé","Kai'Sa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","Kha'Zix","Kindred","Kled","Kog'Maw","Leblanc","Lee Sin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Master Yi","Malphite","Malzahar","Maokai","Milio","Miss Fortune","Mordekaiser","Morgana","Nami","Nasus","Nautilus","Neeko","Nidalee","Nilah","Nocturne","Nunu","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","Rek'Sai","Rell","Renata","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Séraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Sylas","Syndra","Tahm Kench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","Twisted Fate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Vel'Koz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","Wukong","Xayah","Xerath","Xin Zhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Zeri","Ziggs","Zilean","Zoé","Zyra"
]


async function fill() {
    let cham = {}
      for (let championName of character_name){
        let linkName = championName.replace("'", "");
        linkName = linkName.replace(" ","")
        linkName = linkName.replace(" ","")
        linkName = linkName.replace(".","")
        linkName = linkName.replace("é","e")
        linkName = linkName.replace("î","i")
        try {
            const res = await axios.get(`https://raw.communitydragon.org/13.11/game/data/characters/${linkName.toLowerCase()}/${linkName.toLowerCase()}.bin.json`);
            const championDetails = res.data;

            let root = `Characters/${capitalizeFirstLetter(linkName)}/CharacterRecords/Root`

            let data = championDetails[root]

            if (data != undefined){
                let basicStats = {
                    Hp : data.baseHP,
                    hpLvl : data.hpPerLevel,
                    AD : data.baseDamage,
                    ADLvl : data.damagePerLevel,
                    AS : data.attackSpeed,
                    ASRatio : data.attackSpeedRatio, 
                    Armor : data.baseArmor,
                    ArmorLvl : data.armorPerLevel,
                    MR : data.baseSpellBlock,
                    MRLvl : data.spellBlockPerLevel,
                    MS : data.baseMoveSpeed,
                    Lifesteal : 0,
                    Crit : 0,
                    CritDmg : 175,
                    HpRegen : data.baseStaticHPRegen,
                    HpRegenLvl : data.hpRegenPerLevel,
                    Mana : data.primaryAbilityResource.arBase,
                    ManaLvl : data.primaryAbilityResource.arPerLevel != undefined ? data.primaryAbilityResource.arPerLevel : 0,
                    AP : 0,
                    Range : data.attackRange,
                    ArmorPen : 0,
                    ResistPen : 0,
                    Haste : 0,
                    SpellVamp : 0,
                    ManaRegen : data.primaryAbilityResource.arBaseStaticRegen != undefined ? data.primaryAbilityResource.arBaseStaticRegen : 0,
                    ManaRegenLvl : data.primaryAbilityResource.arRegenPerLevel != undefined ? data.primaryAbilityResource.arRegenPerLevel : 0,
                }
        
                let img = {
                    centered : `${linkName}_0`,
                    passive : data.passive1IconName.split('/')[data.passive1IconName.split('/').length -1].split('.')[0],
                    QSpell : data.spellNames[0].split('/')[data.spellNames[0].split('/').length -1 ],
                    WSpell : data.spellNames[1].split('/')[data.spellNames[1].split('/').length -1 ],
                    ESpell : data.spellNames[2].split('/')[data.spellNames[2].split('/').length -1 ],
                    RSpell : data.spellNames[3].split('/')[data.spellNames[3].split('/').length -1 ],
                }
        
                let spell = {
                    Passive : {
                        img : img.passive,
                        cd : [],
                        damage : 0,
                        ratioAd : 0,
                        ratioAp : 0,
                    },
                    Q : {
                        img : img.QSpell,
                        cd : [],
                        basicStats : [
                            {
                                damage : [],
                                ratioAd : [],
                                ratioAp : [], 
                            },
                        ],
                        bonus : {
                            
                        }
                    },
                    W : {
                        img : img.WSpell,
                        cd : [],
                        basicStats : [
                            {
                                damage : [],
                                ratioAd : [],
                                ratioAp : [], 
                            },
                        ],
                        bonus : {
                            
                        }
                    },
                    E : {
                        img : img.ESpell,
                        cd : [],
                        basicStats : [
                            {
                                damage : [],
                                ratioAd : [],
                                ratioAp : [], 
                            },
                        ],
                        bonus : {
                            
                        }
                    },
                    R : {
                        img : img.RSpell,
                        cd : [],
                        basicStats : [
                            {
                                damage : [],
                                ratioAd : [],
                                ratioAp : [], 
                            },
                        ],
                        bonus : {
                            
                        }
                    }
                }
                const champion = {
                    basicStats: basicStats,
                    img: img,
                    spell: spell
                };
                let jsp = JSON.stringify(champion, null, 2);
                await fs.writeFile(`${linkName}.json`, jsp);
            }
        } catch (error){
            console.error(linkName)
            continue
        }
        
   }
    return cham
}

fill()