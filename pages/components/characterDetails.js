import React, { useEffect, useState } from 'react'
import StatsTable from './statsTable'
import SkillsTable from './skillsTable'
import Link from 'next/link'
import { evaluate } from 'mathjs'
import { removeExcelFunctions } from './excelTraitement'
export default function CharacterDetails({data, nameChamp}){

    const character_name = [
        "-","Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe","AurelionSol","Azir","Bard","BelVeth","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia","ChoGath","Corki","Darius","Diana","DrMundo","Draven","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna","JarvanIV","Jax","Jayce","Jhin","Jinx","KSante","KaiSa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","KhaZix","Kindred","Kled","KogMaw","LeBlanc","LeeSin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","MasterYi","Malphite","Malzahar","Maokai","Milio","MissFortune","Mordekaiser","Morgana","Nami","Nasus","Nautilus","Neeko","Nidalee","Nilah","Nocturne","Nunu & Willump","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","RekSai","Rell","Renata","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Seraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Sylas","Syndra","TahmKench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","TwistedFate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","VelKoz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","Wukong","Xayah","Xerath","XinZhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Zeri","Ziggs","Zilean","Zoe","Zyra"
    ]

    const listItemsMythics = [
        "-","Crown of the Shattered Queen","Divine Sunderer","Duskblade of Draktharr", "Echoes of Helia", "Eclipse", "Evenshroud","Everfrost","Galeforce","Goredrinker","Guinsoo's Rageblade","Heartsteel","Hextech Rocketbelt","Iceborn Gauntlet", "Infinity Edge","Jak'Sho The Protean","Liandry's Anguish","Locket of the Iron Solari", "Luden's Tempest","Moonstone Renewer","Navori Quickblade","Night Harvester","Radiant Virtue","Riftmaker","Rod Of Ages","Shurelya's Battlesong","Stridebreaker","Trinity Force","Youmuu's Ghostblade",
    ]

    const listItemsLegendary = [
        "-","Abyssal Mask","Anathema's Chains","Archangel's Staff","Ardent Censer","Axiom Arc","Banshee's Veil","Black Cleaver","Black Mist Scythe","Blade of the Ruined King","Bloodthirster","Bulwark of the Mountain","Chempunk Chainsword","Chemtech Putrifier","Cosmic Drive","Dead Man's Plate","Death's Dance","Demonic Embrace","Edge of Night","Essence Reaver","Fimbulwinter","Force of Nature","Frozen Heart","Gargoyle Stoneplate","Guardian Angel","Horizon Focus","Hullbreaker","Immortal Shieldbow","Imperial Mandate","Knight's Vow","Kraken Slayer","Lich Bane","Lord Dominik's Regards","Manamune","Maw of Malmortius","Mejai's Soulstealer","Mercurial Scimitar","Mikael's Blessing","Morellonomicon","Mortal Reminder","Muramana","Nashor's Tooth","Pauldrons of Whiterock","Phantom Dancer","Prowler's Claw","Rabadon's Deathcap","Randuin's Omen","Rapid Firecannon","Ravenous Hydra","Redemption","Runaan's Hurricane","Rylai's Crystal Scepter","Seraph's Embrace","Serpent's Fang","Serylda's Grudge","Shadowflame","Shard of True Ice","Silvermere Dawn","Spear of Shojin","Spirit Visage","Staff of Flowing Water","Statikk Shiv","Sterak's Gage","Stormrazor","Sunfire Aegis","The Collector","Thornmail","Titanic Hydra","Turbo Chemtank","Umbral Glaive","Vigilant Wardstone","Void Staff","Warmog's Armor","Winter's Approach","Wit's End","Zeke's Convergence","Zhonya's Hourglass"
    ]

    const listBoots = [
        "-", "Berserker's Greaves","Boots","Boots of Swiftness","Ionian Boots of Lucidity","Mercury's Treads","Mobility Boots","Plated Steelcaps","Sorcerer's Shoes",
    ]

    const listElixir = [
        "-", "Elixir of Iron","Elixir of Sorcery","Elixir of Wrath",
    ]

    const listEpicItem = [
        "-", "Aegis of the Legion","Aether Wisp","Bami's Cinder","Bandleglass Mirror","Blighting Jewel","Bramble Vest","Catalyst of Aeons","Caulfield's Warhammer","Chain Vest","Chalice of Blessing","Crystalline Bracer","Executioner's Calling","Fiendish Codex","Forbidden Idol","Frostfang","Giant's Belt","Glacial Buckler","Harrowing Crescent","Hearthbound Axe","Hexdrinker","Hextech Alternator","Ironspike Whip","Kindlegem","Kircheis Shard","Last Whisper","Leeching Leer","Lifewell Pendant","Lost Chapter","Negatron Cloak","Noonquiver","Oblivion Orb","Phage","Quicksilver Sash","Rageknife","Recurve Bow","Runesteel Spaulders","Seeker's Armguard","Serrated Dirk","Spectre's Cowl","Targon's Buckler","Tiamat","Vampiric Scepter","Verdant Barrier","Warden's Mail","Watchful Wardstone","Winged Moonplate","Zeal",
    ]
     
    const listBasicItem = [
        "-","Amplifying Tome","B. F. Sword","Blasting Wand","Cloak of Agility","Cloth Armor","Dagger","Faerie Charm","Long Sword","Needlessly Large Rod","Null-Magic Mantle","Pickaxe","Rejuvenation Bead","Ruby Crystal","Sapphire Crystal","Sheen"
    ]

    const listStarterItem = [
        "-","Cull","Dark Seal","Doran's Blade","Doran's Ring","Doran's Shield","Relic Shield","Spectral Sickle","Spellthief's Edge","Steel Shoulderguards","Tear of the Goddess",
    ]

    let options = [];
    for (let i = 1; i <= 18; i++) {
        options.push(<option value={i} key={i}>{i}</option>);
    }

    const handleChange = (event) => {
        setLevel(parseInt(event.target.value));
    };

    const handleChangeEnemyLevel = (event) => {
        setEnemyLevel(parseInt(event.target.value));
    };

    let enemyNameOptions = []
    for (let i = 0; i < character_name.length; i++){
        let name = character_name[i]
        enemyNameOptions.push(<option value={name} key={i}>{name}</option>)
    }

    const handleEnemyChange = (event) => {
        setEnemyName(event.target.value)
    }

    const [enemyLevel, setEnemyLevel] = useState(1)
    const [enemyName, setEnemyName] = useState('-')
    const [textMana, setTextMana] = useState('Mana')
    const [level, setLevel] = useState(1)
    const [imgSplash, setImgSplash] = useState('../../images/centered/GENERIC.png')
    const [basicStatsChampion, setDataChamp] = useState({
        "Hp": 0,
        "Attack Damage": 0,
        "Attack Speed %": 0,
        "Armor": 0,
        "Magic Resist": 0,
        "Move Speed": 0,
        "Lifesteal": 0,
        "Critical %":  0, 
        "Hp Regen": 0,

        [textMana] : 0,
        "Ability Power": 0,
        "Range": 0,
        "Armor Penetration": 0,
        "Resist Penetration": 0,
        "Ability Haste": 0,
        "Spellvamp %": 0,
        "Tenacity %": 0,
        [textMana + " / Regen"]: 0,
    }) // OK

    const [additionnalStats, setAdditionnalStats] = useState({
        "Hp": 0,
        "Attack Damage": 0,
        "Attack Speed %": 0,
        "Armor": 0,
        "Magic Resist": 0,
        "Move Speed": 0,
        "Lifesteal": 0,
        "Critical %":  0, 
        "Hp Regen": 0,

        "Mana" : 0,
        "Ability Power": 0,
        "Range": 0,
        "Armor Penetration": 0,
        "Resist Penetration": 0,
        "Ability Haste": 0,
        "Spellvamp %": 0,
        "Tenacity %": 0,
        "Mana / Regen": 0,
    })

    const [bonusStats, setBonusStats] = useState({
        "Ardent" : false,
        "Chem" : false,
        "Cloud" : false,
        "Elder" : false,
        "Hextech" : false,
        "Infernal" : false,
        "Mountain" : false,
        "Ocean" : false,
        "Recently Hit" : false
    }) // OK

    const [apheliosStats, setApheliosStats] = useState({
        "Crescend Stacks" : 0,
        "Main Weapon" : "-",
        "Sub Weapon" : "-",
    })

    const [sylasUltimate, setSylasUltimate] = useState("-")

    const [sennaStacks, setSennaStacks] = useState(0)
    const [stackMejai, setStackMejai] = useState(0)
    const [enemyStats, setEnemyStats] = useState({
        "Armor" : 0,
        "Armor Bonus" : 0,
        "Hp Bonus" : 0,
        "Current Hp %" : 100,
        "Current Hp" : 0,
        "Level" : 1,
        "Hp" : 0,
        "Missing HP" : 0,
        "Magic Resist" : 0,
        "Magic Resist Bonus" : 0,
        "Name" : "-"
    }) // OK

    const [enemyItemSlot1, setEnemyItemSlot1] = useState('')
    const [enemyItemSlot2, setEnemyItemSlot2] = useState('')
    const [enemyItemSlot3, setEnemyItemSlot3] = useState('')
    const [enemyItemSlot4, setEnemyItemSlot4] = useState('')
    const [enemyItemSlot5, setEnemyItemSlot5] = useState('')
    const [enemyItemSlot6, setEnemyItemSlot6] = useState('')
    const [enemyItemStats, setEnemyItemStats] = useState({
        "AR" : 0,
        "HP" : 0,
        "MR" : 0,
        "Gold" : 0
    })

    const [gameStats, setGameStats] = useState({
        "Gametime" : 0,
        "Chemtech" : 0,
        "Kills" : 0,
        "Minion" : 0,
        "Cloud" : 0,
        "Hextech" : 0,
        "Infernal" : 0,
        "Mountain" : 0,
        "Ocean" : 0
    }) // OK

    const [itemSlot1, setItemSlot1] = useState('-')
    const [itemSlot2, setItemSlot2] = useState('-')
    const [itemSlot3, setItemSlot3] = useState('-')
    const [itemSlot4, setItemSlot4] = useState('-')
    const [itemSlot5, setItemSlot5] = useState('-')
    const [itemSlot6, setItemSlot6] = useState('-')
    const [elixirSlot, setElixirSlot] = useState('-')

    const [itemImg1, setItemImg1] = useState('')
    const [itemImg2, setItemImg2] = useState('')
    const [itemImg3, setItemImg3] = useState('')
    const [itemImg4, setItemImg4] = useState('')
    const [itemImg5, setItemImg5] = useState('')
    const [itemImg6, setItemImg6] = useState('')
    const [itemImg7, setItemImg7] = useState('')

    const [itemStats, setItemStats] = useState({
        "AD" : 0,
        "AH" : 0,
        "AP" : 0,
        "APE%": 0,
        "AR" : 0,
        "AS" : 0,
        "CDMG" : 0,
        "Gold" : 0,
        "CC" : 0,
        "MS" : 0,
        "HP" : 0,
        "HP5" : 0,
        "LE" : 0,
        "LS" : 0,
        "HEAL" : 0,
        "APM" : 0,
        "ADM" : 0,
        "MP" : 0,
        "MPE" : 0,
        "MPE%" : 0,
        "MP5" : 0,
        "MR" : 0,
        "MS%" : 0,
        "MOH" : 0,
        "POH" : 0,
        "EPD" : 0,
        "MPD" : 0,
        "PPD" : 0,
        "SHI" : 0,
        "SHOE" : 0,
        "SV" : 0,
        "TC" : 0
    })

    const [runeStats, setRuneStats] = useState({
        "ForceBit" : 1,
        "Adaptive" : 0,
        "AH" : 0,
        "AS" : 0,
        "AR" : 0,
        "HP" : 0,
        "MP" : 0,
        "MR" : 0,
        "MS" : 0,
        "Ultimate" : 0
    }) // ok

    const [totalStats, setTotalStats] = useState({
        "AD" : 0,
        "AH" : 0,
        "AP" : 0,
        "APenF" : 0,
        "AR" : 0,
        "AS" : 0,
        "AvgAA" : 0,
        "Crit" : 0,
        "CritDMG" : 0,
        "CritHit" : 0,
        "DPS" : 0,
        "Gold" : 0,
        "HitDmg" : 0,
        "HPR" : 0,
        "Leth" : 0,
        "LS" : 0,
        "HP" : 0,
        "MisHPV" : 0,
        "MP" : 0,
        "MpenF" : 0,
        "MPR" : 0,
        "MR" : 0,
        "MS" : 0,
        "Proc Item" : 0,
        "Proc Rune" : 0,
        "Proc Summ" : 0,
        "Shield" : 0,
        "TC" : 0
    })

    const [nbLegendary, setNbLegendary] = useState(0)
    const [steroidStats, setSteroidStats] = useState({
        "E" : false,
        "Form" : false,
        "Items" : false,
        "P" : false,
        "Q" : false,
        "R" : false,
        "Runes" : false,
        "W" : false
    }) // OK

    const [qSkillPoint, setQSkillPoint] = useState(1)
    const [wSkillPoint, setWSkillPoint] = useState(1)
    const [eSkillPoint, setESkillPoint] = useState(1)
    const [rSkillPoint, setRSkillPoint] = useState(1)

    function getNumericFromString(stringDamage){
        let str = removeExcelFunctions(stringDamage)
        let scope = {
            // VOIR LES PLAGES NOMMEES

            Sc_Lin : (level - 1)/17,
            data : data,
            runeStats : runeStats,
            basicStatsChampion : basicStatsChampion,
            additionnalStats : additionnalStats,
            B_Ardent : bonusStats["Ardent"],
            B_Chem : bonusStats["Chem"],
            B_Cloud : bonusStats["Cloud"],
            B_Elder : bonusStats["Elder"],
            B_Hex : bonusStats["Hextech"],
            B_Infernal : bonusStats["Infernal"],
            B_Mountain : bonusStats["Mountain"],
            B_Ocean : bonusStats["Ocean"],
            B_RecentHit : bonusStats["Recently Hit"],

            C_Aphelios_Stacks : apheliosStats["Crescend Stacks"],
            C_Aphelios_W1 : apheliosStats["Main Weapon"],
            C_Aphelios_W2 : apheliosStats["Sub Weapon"],
            C_SylasUltimate : sylasUltimate,

            E_AR : enemyStats["Armor"],
            E_BoAR : enemyStats["Armor Bonus"],
            E_BoHp : enemyStats["Hp Bonus"],
            E_CHP : enemyStats["Current Hp %"],
            E_CHPV : enemyStats["Current Hp"],
            E_IT_AR : enemyItemStats["AR"],
            E_IT_HP : enemyItemStats["HP"],
            E_IT_MR : enemyItemStats["MR"],
            E_Level : enemyStats["Level"],
            E_MHP : enemyStats["Hp"],
            E_MisHPV : enemyStats["Missing HP"],
            E_MR : enemyStats["Magic Resist"],
            E_Name : enemyStats["Name"],
    
            Gametime : gameStats["Gametime"],

            IT_AD : itemStats["AD"],
            IT_AH : itemStats["AH"],
            IT_AP : itemStats["AP"],
            IT_APEN : itemStats["APE%"],
            IT_AR : itemStats["AR"],
            IT_AS : itemStats["AS"],
            IT_CDMG : itemStats["CDMG"],
            IT_Cost : itemStats["Gold"],
            IT_Cost2 : enemyItemStats["Gold"],
            IT_Crit : itemStats["CC"],
            IT_FlatMS : itemStats["MS"],
            IT_HP : itemStats["HP"],
            IT_HPR : itemStats["HP5"],
            IT_Leth : itemStats["LE"],
            IT_LS : itemStats["LS"],
            IT_MOD_Heal : itemStats["HEAL"],
            IT_MOD_Magic : itemStats["APM"],
            IT_MOD_Phys : itemStats["ADM"],
            IT_MP : itemStats["MP"],
            IT_Mpen : itemStats["MPE"],
            IT_MPenP : itemStats["MPE%"],
            IT_MPR : itemStats["MP5"] || 0,
            IT_MR : itemStats["MR"],
            IT_MS : itemStats["MS%"],
            IT_OH_Magic : itemStats["MOH"],
            IT_OH_Phys : itemStats["POH"],
            IT_Proc_Energy : itemStats["EPD"],
            IT_Proc_Magic : itemStats["MPD"],
            IT_Proc_Phys : itemStats["PPD"],
            IT_Shield : itemStats["SHI"],
            IT_Shoe : itemStats["SHOE"],
            IT_SV : itemStats["SV"],
            IT_TC : itemStats["TC"],
            ItemSet : 1,

            N_Chem : gameStats["Chemtech"],
            Kills : gameStats["Kills"],
            Language : 0,
            Legendary : nbLegendary,
            Minion : gameStats["Minion"],
            MOD_Heal : 1 + itemStats["HEAL"] + runeStats["Heal"] + gameStats["Chemtech"] * 0.06, // Revitalize
            MOD_Hit : 1,
            MOD_Magic : 1,
            MOD_OH : 1,
            MOD_Phys : 1,
            MOD_SelfHeal : 1,
            MOD_True : 1,
            N_Cloud : gameStats["Cloud"],
            N_Hex : gameStats["Hextech"],
            N_Infernal : gameStats["Infernal"],
            N_Mountain : gameStats["Mountain"],
            N_Ocean : gameStats["Ocean"],
            Name : nameChamp,

            Self_BoAD : additionnalStats["Attack Damage"],

            OH_Phys : itemStats["POH"] * 1,  
            OH_Magic : (itemStats["MOH"] + (bonusStats["Ardent"] ? 15 + 15 * (level - 1)/17 : 0))* 1, 
            OH_True : (nameChamp.toLowerCase().includes("master") && eSkillPoint > 0 && steroidStats["E"] ? 25 + 5 * eSkillPoint + 0.3 * additionnalStats["Attack Damage"] : 0) + (nameChamp.toLowerCase().includes("belveth") && rSkillPoint > 0 ? (3+1.5+rSkillPoint +0.09*additionnalStats["Attack Damage"])*stackDarkHarvest / 2 : 0),

            P_E : eSkillPoint,
            P_Q : qSkillPoint,
            P_R : rSkillPoint,
            P_W : wSkillPoint,
            
            ForceBit : runeStats["ForceBit"],
            R_Adap : runeStats["Adaptive"],
            R_AH : runeStats["AH"],
            R_AR : runeStats["AR"],
            R_AS : runeStats["AS"],
            R_HP : runeStats["HP"],
            R_MOD : 1,
            R_MP : runeStats["MP"],
            R_MR : runeStats["MR"],
            R_MS : runeStats["MS"],
            R_PTAMOD : 1,
            R_Ultimate : runeStats["Ultimate"],
        

            Self_AD : totalStats["AD"],
            Self_AH : totalStats["AH"],
            Self_AP : totalStats["AP"],
            Self_APenF : totalStats["APenF"],
            Self_AR : totalStats["AR"],
            Self_AS : totalStats["AS"],
            Self_AvgAA : totalStats["AvgAA"],
            Self_BaAD : basicStatsChampion["Attack Damage"],
            Self_BaMS : basicStatsChampion["Move Speed"],
           
            Self_BoAR : additionnalStats["Armor"],
            Self_BoAS : additionnalStats["Attack Speed %"],
            Self_BoHP : additionnalStats["Hp"],
            Self_BoMP : additionnalStats["Mana"],
            Self_BoMR : additionnalStats["Magic Resist"],
            Self_BoMS : additionnalStats["Move Speed"] - basicStatsChampion["Move Speed"],
            Self_BoMSP : additionnalStats["Move Speed"],
            Self_CHPP : 1,
            Self_Crit : totalStats["Crit"],
            Self_CritDMG : totalStats["CritDMG"],
            Self_CritHit : totalStats["CritHit"],
            Self_DPS : totalStats["DPS"],
            Self_Gold : totalStats["Gold"],
            Self_HitDmg : totalStats["HitDmg"],
            Self_HPR : totalStats["HPR"],
            Self_Leth : totalStats["Leth"],
            Self_Level : level,
            Self_LS : totalStats["LS"],
            Self_MaxCS : 0,
            Self_MaxGold : 500,
            Self_MHP : totalStats["HP"],
            Self_MisHPV : totalStats["MisHPV"],
            Self_MP : totalStats["MP"],
            Self_MpenF : totalStats["MpenF"],
            Self_MPR : totalStats["MPR"],
            Self_MR : totalStats["MR"],
            Self_MS : totalStats["MS"],
            Self_Proc_Item : totalStats["Proc Item"],
            Self_Proc_Rune : totalStats["Proc Rune"],
            Self_Proc_Summ : totalStats["Proc Summ"],
            Self_Shield : totalStats["Shield"],
            Self_TC : totalStats["TC"],

            Steroid_E : steroidStats["E"],
            Steroid_Form : steroidStats["Form"],
            Steroid_Items : steroidStats["Items"],
            Steroid_P : steroidStats["P"],
            Steroid_Q : steroidStats["Q"],
            Steroid_R : steroidStats["R"],
            Steroid_Runes : steroidStats["Runes"],
            Steroid_W : steroidStats["W"],
        }

        if (typeof str === "string"){
            return evaluate(str, scope);
        }
            
        return str
    }
    
    const enemyDataPrep = async () => {
        /** ENEMY STATS */
        let enemy_obj = {
            "Level" : enemyLevel,
            "Name" : enemyName,
            "Armor" : 0,
            "Armor Bonus" : 0,
            "Hp Bonus" : 0,
            "Current Hp %" : 100,
            "Current Hp" : 0,
            "Hp" : 0,
            "Missing HP" : 0,
            "Magic Resist" : 0,
            "Magic Resist Bonus" : 0,
        }

        if (enemy_obj["Name"] != '-'){
            const res = await fetch(`http://localhost:3000/data/champions/${enemy_obj["Name"]}.json`);
            const championDetails = await res.json();

            enemy_obj["Armor"] = championDetails["AR"] + championDetails["AR+"] * (enemyLevel -1)
            enemy_obj["Hp"] = championDetails["HP"] + championDetails["HP+"] * (enemyLevel - 1)
            enemy_obj["Magic Resist"] = championDetails["MR"] + championDetails["MR+"] * (enemyLevel - 1)   
        }
        setEnemyStats(enemy_obj)
    }

    const listMainRune = ["-", "Precision", "Domination","Sorcery","Resolve","Inspiration"]

    const precisionMainRunes = ["-","Press The Attack", "Lethal Tempo", "Fleet Foot", "Conqueror"]
    const precisionFirstRune = ["-","Overheal", "Triumph", "Presence of Mind"]
    const precisionSecondRune = ["-","Alacrity", "Tenacity", "Bloodline"]
    const precisionThirdRune = ["-","Coup de Grace", "Cut Down", "Last Stand"]

    const dominationMainRunes = ["-","Electrocute", "Predator", "Dark Harvest", "Hail of Blades"]
    const dominationFirstRune = ["-","Cheap Shot", "Taste of Blood", "Sudden Impact"]
    const dominationSecondRune = ["-","Zombie Ward", "Ghost Poro", "Eyeball Collection"]
    const dominationThirdRune = ["-","Treasure Hunter", "Ingenious Hunter", "Relentless Hunter", "Ultimate Hunter"]

    const sorceryMainRunes = ["-","Summon Aery", "Arcane Comet", "Phase Rush"]
    const sorceryFirstRune = ["-","Nullifying Orb", "Manaflow Band", "Nimbus Cloak"]
    const sorcerySecondRune = ["-","Transcendence", "Celerity", "Absolute Focus"]
    const sorceryThirdRune = ["-","Scorch", "Waterwalking", "Gathering Storm"]

    const resolveMainRune = ["-","Grasp of the Undying", "Aftershock", "Guardian"]
    const resolveFirstRune = ["-","Demolish", "Font of Life", "Shield Bash"]
    const resolveSecondRune = ["-","Conditioning", "Second Wind", "Bone Plating"]
    const resolveThirdRune = ["-","Overgrowth", "Revitalize", "Unflinching"]

    const inspirationMainRunes = ["-","Unsealed Spellbook", "Glacial Augment", "First Strike"]
    const inspirationFirstRune = ["-","Hextech Flashtrap", "Magical Footwear", "Perfect Timing"]
    const inspirationSecondRune = ["-","Futures Market", "Minion Dematerializer", "Biscuit Delivery"]
    const inspirationThirdRune = ["-","Cosmic Insight", "Approach Velocity", "Time Warp Tonic"]
    
    const [nameMainRune, setNameMainRune] = useState('')
    const [mainRune, setMainRune] = useState('')
    const [mainFirstRune, setMainFirstRune] = useState('')
    const [mainSecondRune, setMainSecondRune] = useState('')
    const [mainThirdRune, setMainThirdRune] = useState('')
    const [secondRune, setSecondRune] = useState('')
    const [secondFirstRune, setSecondFirstRune] = useState('')
    const [secondSecondRune, setSecondSecondRune] = useState('')

    const setUpMainRunes = (nameRune) => {
        let optionRune = []
        if (nameRune == 'Precision'){ 
            for (let i = 0; i < precisionMainRunes.length; i++) {
                optionRune.push(<option value={precisionMainRunes[i]} key={i*65}>{precisionMainRunes[i]}</option>);
            }
        }
        if (nameRune == 'Domination'){ 
            for (let i = 0; i < dominationMainRunes.length; i++) {
                optionRune.push(<option value={dominationMainRunes[i]} key={i*77}>{dominationMainRunes[i]}</option>);
            }
        }
        if (nameRune == 'Sorcery'){ 
            for (let i = 0; i < sorceryMainRunes.length; i++) {
                optionRune.push(<option value={sorceryMainRunes[i]} key={i*88}>{sorceryMainRunes[i]}</option>);
            }
        }
        if (nameRune == 'Resolve'){ 
            for (let i = 0; i < resolveMainRune.length; i++) {
                optionRune.push(<option value={resolveMainRune[i]} key={i*99}>{resolveMainRune[i]}</option>);
            }
        }
        if (nameRune == 'Inspiration'){ 
            for (let i = 0; i < inspirationMainRunes.length; i++) {
                optionRune.push(<option value={inspirationMainRunes[i]} key={i*80}>{inspirationMainRunes[i]}</option>);
            }
        }
        return optionRune
    }

    const setUpFirstRunes = (nameRune) => {
        let optionRune = []
        if (nameRune == 'Precision'){ 
            for (let i = 0; i < precisionFirstRune.length; i++) {
                optionRune.push(<option value={precisionFirstRune[i]} key={i}>{precisionFirstRune[i]}</option>);
            }
        }
        if (nameRune == 'Domination'){ 
            for (let i = 0; i < dominationFirstRune.length; i++) {
                optionRune.push(<option value={dominationFirstRune[i]} key={i}>{dominationFirstRune[i]}</option>);
            }
        }
        if (nameRune == 'Sorcery'){ 
            for (let i = 0; i < sorceryFirstRune.length; i++) {
                optionRune.push(<option value={sorceryFirstRune[i]} key={i}>{sorceryFirstRune[i]}</option>);
            }
        }
        if (nameRune == 'Resolve'){ 
            for (let i = 0; i < resolveFirstRune.length; i++) {
                optionRune.push(<option value={resolveFirstRune[i]} key={i}>{resolveFirstRune[i]}</option>);
            }
        }
        if (nameRune == 'Inspiration'){ 
            for (let i = 0; i < inspirationFirstRune.length; i++) {
                optionRune.push(<option value={inspirationFirstRune[i]} key={i}>{inspirationFirstRune[i]}</option>);
            }
        }
        return optionRune
    }

    const setUpSecondRunes = (nameRune) => {
        let optionRune = []
        if (nameRune == 'Precision'){ 
            for (let i = 0; i < precisionSecondRune.length; i++) {
                optionRune.push(<option value={precisionSecondRune[i]} key={i}>{precisionSecondRune[i]}</option>);
            }
        }
        if (nameRune == 'Domination'){ 
            for (let i = 0; i < dominationSecondRune.length; i++) {
                optionRune.push(<option value={dominationSecondRune[i]} key={i}>{dominationSecondRune[i]}</option>);
            }
        }
        if (nameRune == 'Sorcery'){ 
            for (let i = 0; i < sorcerySecondRune.length; i++) {
                optionRune.push(<option value={sorcerySecondRune[i]} key={i}>{sorcerySecondRune[i]}</option>);
            }
        }
        if (nameRune == 'Resolve'){ 
            for (let i = 0; i < resolveSecondRune.length; i++) {
                optionRune.push(<option value={resolveSecondRune[i]} key={i}>{resolveSecondRune[i]}</option>);
            }
        }
        if (nameRune == 'Inspiration'){ 
            for (let i = 0; i < inspirationSecondRune.length; i++) {
                optionRune.push(<option value={inspirationSecondRune[i]} key={i}>{inspirationSecondRune[i]}</option>);
            }
        }
        return optionRune
    }

    const setUpThirdRunes = (nameRune) => {
        let optionRune = []
        if (nameRune == 'Precision'){ 
            for (let i = 0; i < precisionThirdRune.length; i++) {
                optionRune.push(<option value={precisionThirdRune[i]} key={i}>{precisionThirdRune[i]}</option>);
            }
        }
        if (nameRune == 'Domination'){ 
            for (let i = 0; i < dominationThirdRune.length; i++) {
                optionRune.push(<option value={dominationThirdRune[i]} key={i}>{dominationThirdRune[i]}</option>);
            }
        }
        if (nameRune == 'Sorcery'){ 
            for (let i = 0; i < sorceryThirdRune.length; i++) {
                optionRune.push(<option value={sorceryThirdRune[i]} key={i}>{sorceryThirdRune[i]}</option>);
            }
        }
        if (nameRune == 'Resolve'){ 
            for (let i = 0; i < resolveThirdRune.length; i++) {
                optionRune.push(<option value={resolveThirdRune[i]} key={i}>{resolveThirdRune[i]}</option>);
            }
        }
        if (nameRune == 'Inspiration'){ 
            for (let i = 0; i < inspirationThirdRune.length; i++) {
                optionRune.push(<option value={inspirationThirdRune[i]} key={i}>{inspirationThirdRune[i]}</option>);
            }
        }
        return optionRune
    }
 
    const listOffensiveShard = ['-', "Adaptive Force", "Attack Speed", "Ability Haste"]
    const listMixedShard = ['-', "Adaptive Force", "Armor", "MagicResist"]
    const listDefensiveShard = ['-', "Health", "Armor", "MagicResist"]

    const [offensiveShard, setOffensiveShard] = useState('')
    const [mixedShard, setMixedShard] = useState('')
    const [defensiveShard, setDefensiveShard] = useState('')

    const [stackConqueror, setStackConqueror] = useState(0)
    const [stackLegendExceptBloodline, setStackLegendExceptBloodline] = useState(0)
    const [stackLegendBloodline, setStackLegendBloodline] = useState(0)
    const [stackBounty, setStackBounty] = useState(0)
    const [stackDarkHarvest, setStackDarkHarvest] = useState(0)

    const listLegend = ["Alacrity", "Tenacity", "Zombie Ward", "Ghost Poro", "Eyeball Collection"]
    const listBounty = ["Treasure Hunter", "Ingenious Hunter", "Relentless Hunter", "Ultimate Hunter"]

    const majStatsRune = () => {
        let obj = {
            "ForceBit" : 1,
            "Adaptive" : 0,
            "AH" : 0,
            "AS" : 0,
            "AR" : 0,
            "HP" : 0,
            "MP" : 0,
            "MR" : 0,
            "MS" : 0,
            "Ultimate" : 0
        }
        if (itemStats["AD"] >= itemStats["AP"]){
            obj["ForceBit"] = 1
        }
        else {
            obj["ForceBit"] = 0
        }
        if (offensiveShard == 'Adaptive'){
            obj["Adaptive"] += 9
        }
        if (mixedShard == 'Adaptive'){
            obj["Adaptive"] += 9
        }
        if (mainSecondRune == 'Absolute Focus' || secondFirstRune == 'Absolute Focus' || secondSecondRune == 'Absolute Focus'){
            obj["Adaptive"] += 3+27*((level - 1)/17)
        }
        if (mainSecondRune == 'Zombie Ward' || mainSecondRune == 'Ghost Poro' || mainSecondRune == 'Eyeball Collection' || secondFirstRune == 'Zombie Ward' || secondFirstRune == 'Ghost Poro' || secondFirstRune == 'Eyeball Collection' || secondSecondRune == 'Zombie Ward' || secondSecondRune == 'Ghost Poro' || secondSecondRune == 'Eyeball Collection' ){
            obj["Adaptive"] += stackLegendExceptBloodline*2
        }
        if (mainThirdRune == 'Gathering Storm' || secondSecondRune == 'Gathering Storm'){
            obj["Adaptive"] += ((Math.floor(gameStats["Gametime"]/10))*(Math.floor(gameStats["Gametime"]/10)*8)+8*(Math.floor(gameStats["Gametime"]/10)))/2
        }
        if (mainThirdRune == 'Waterwalking' || secondSecondRune == 'Waterwalking'){
            obj["Adaptive"] += (5+25*((level - 1)/17)).toFixed(0)
        }
        if (mainRune == 'Conqueror'){
            obj['Adaptive'] +=(2+2.5*((level - 1)/17)).toFixed(0) * stackConqueror
        }
        if (offensiveShard == 'Attack Speed'){
            obj['AS'] += 0.08
        }
        if (mainSecondRune == 'Alacrity' || secondFirstRune == 'Alacrity' || secondSecondRune == 'Alacrity'){
            obj['AS'] += 0.03+0.015*stackLegendExceptBloodline
        }
        if (mainRune == 'Lethal Tempo' && steroidStats["Runes"]){
            if (data["Melee?"] == 1)
                obj['AS'] += 0.6 + 0.3 * Math.min(1, (level -1) / 15)
            else 
                obj['AS'] += 0.24 + 0.3 * ((level - 1)/17)
        }
        if (mainRune == 'Hail of Blades' && steroidStats["Runes"]){
            obj['AS'] += 1.1
        }
        if (mainRune == 'Grasp of the Undying'){
            if (data["Melee?"] == 1)
                obj["HP"] += 1 * 7 * stackDarkHarvest
            else 
                obj["HP"] += 0.6 * 7 * stackDarkHarvest
        }
        if (mainThirdRune == "Overgrowth" || secondSecondRune == "Overgrowth"){
            obj["HP"] += 3 * Math.floor(gameStats["Minion"]/8)
        }
        if (defensiveShard == 'Health'){
            obj["HP"] += 15 + 125 * ((level - 1)/17)
        }
        if (mainSecondRune == 'Bloodline' || secondFirstRune == 'Bloodline' || secondSecondRune == 'Bloodline'){
            if (0.0035 * stackLegendBloodline == 0.0525){
                obj["HP"] += 85
            }
        }
        if (mainSecondRune == 'Biscuit Delivery' || secondFirstRune == 'Biscuit Delivery' || secondSecondRune == 'Biscuit Delivery'){
            if (Math.floor(gameStats["Gametime"]/2)*40 >= 120)
                obj["MP"] += 120
            else 
                obj["MP"] += Math.floor(gameStats["Gametime"]/2)*40
        }
        if (mainFirstRune == 'Manaflow Band' || secondFirstRune == 'Manaflow Band'){
            obj["MP"] += 250
        }
        if (mixedShard == "Armor"){
            obj["AR"] += 6
        }
        if (defensiveShard == "Armor"){
            obj["AR"] += 6
        }
        if (mainSecondRune == 'Conditioning' || secondFirstRune == 'Conditioning' || secondSecondRune == 'Conditioning'){
            if (gameStats["Gametime"] >= 12){
                obj["AR"] += 8
                obj["MR"] += 8
            }
        }
        if (mainFirstRune == 'Shield Bash'){
            if (totalStats["Shield"] > 0) {
                obj["AR"] += 19*((level -1)/17)
                obj["MR"] += 19*((level -1)/17)
            }
        }
        if (mixedShard == "Magic Resist"){
            obj["MR"] += 8
        }
        if (defensiveShard == "Magic Resist"){
            obj["MR"] += 8
        }
        if (offensiveShard == 'Ability Haste'){
            obj["AH"] += 0.08
        }
        if (mainSecondRune == 'Transcendence' || secondFirstRune == 'Transcendence' || secondSecondRune == 'Transcendence'){
            if (level > 7){
                obj["AH"] += 0.1
            }
            else if (level > 4){
                obj["AH"] += 0.05
            }
        }
        if (mainRune == 'Phase Rush' && steroidStats["Runes"]){
            if (data["Melee?"] == 1)
                obj["MS"] += 0.3 + 0.3 * ((level -1)/17)
            else 
                obj["MS"] += 0.15 + 0.25 * ((level -1)/17)
        }
        if (mainSecondRune == 'Celerity' || secondFirstRune == 'Celerity' || secondSecondRune == 'Celerity'){
            obj["MS"] += 0.01
        }
        if ((mainFirstRune == 'Nimbus Cloak' || secondFirstRune == 'Nimbus Cloak') && steroidStats['Runes']){
            obj["MS"] += 0.2
        }
        if (mainThirdRune == 'Ultimate Hunter' || secondSecondRune == 'Ultimate Hunter'){
            obj["Ultimate"] = 0.06 + 0.05 * stackBounty
        }
        setRuneStats(obj)
    }

    const addItemsStats = async (obj, itemName, set) => {
        const res = await fetch(`http://localhost:3000/data/items/${itemName}.json`);
        const itemDetails = await res.json()
        for (let key in itemDetails){
            if (key != "img" && key != "Icon"){
                let newValue = itemDetails[key]
                if (typeof newValue === "string"){
                    newValue = getNumericFromString(newValue)
                }
                obj[key] += newValue
            }
            if (key == 'img'){
                set(itemDetails['img'])
            }
        }
        
        return obj
    }

    const majItemStats = async () => {
        let nb = 0
        let obj = {
            "AD" : 0,
            "AH" : 0,
            "AP" : 0,
            "APE%": 0,
            "AR" : 0,
            "AS" : 0,
            "CDMG" : 0,
            "Gold" : 0,
            "CC" : 0,
            "MS" :0,
            "HP" : 0,
            "HP5" : 0,
            "LE" : 0,
            "LS" : 0,
            "HEAL" : 0,
            "APM" : 0,
            "ADM" : 0,
            "MP" : 0,
            "MPE" : 0,
            "MPE%" : 0,
            "MP5" : 0,
            "MR" : 0,
            "MS%" : 0,
            "MOH" : 0,
            "POH" : 0,
            "EPD" : 0,
            "MPD" : 0,
            "PPD" : 0,
            "SHI" : 0,
            "SHOE" : 0,
            "SV" : 0,
            "TC" : 0
        }
        if (itemSlot1 != '-'){
            obj = await addItemsStats(obj, itemSlot1, setItemImg1)
            if (itemSlot1 in listItemsLegendary){
                nb += 1
            }
        }
        if (itemSlot2 != '-'){
            obj = await addItemsStats(obj, itemSlot2, setItemImg2)
            if (itemSlot2 in listItemsLegendary){
                nb += 1
            }
        }
            
        if (itemSlot3 != '-'){
            obj = await addItemsStats(obj, itemSlot3, setItemImg3)
            if (itemSlot3 in listItemsLegendary){
                nb += 1
            }
        }
            
        if (itemSlot4 != '-'){
            obj = await addItemsStats(obj, itemSlot4, setItemImg4)
            if (itemSlot4 in listItemsLegendary){
                nb += 1
            }
        }
            
        if (itemSlot5 != '-'){
            obj = await addItemsStats(obj, itemSlot5, setItemImg5)
            if (itemSlot5 in listItemsLegendary){
                nb += 1
            }
        }
            
        if (itemSlot6 != '-'){
            obj = await addItemsStats(obj, itemSlot6, setItemImg6)
            if (itemSlot6 in listItemsLegendary){
                nb += 1
            }
        }

        if (elixirSlot != '-'){
            obj = await addItemsStats(obj, elixirSlot, setItemImg7)
        }
        console.log(obj)
        setItemStats(obj)
        setNbLegendary(nb)

        setHasWardStone(returnBoolIfHasItem("Vigilant WardStone"))
        setHasTrinity(returnBoolIfHasItem("Trinity"))
        setHasSterak(returnBoolIfHasItem("Sterak's"))
        setHasGaleforce(returnBoolIfHasItem("Galeforce"))
        setHasShojin(returnBoolIfHasItem("Shojin"))
        setHasMuramana(returnBoolIfHasItem("Muramana"))
        setHasRavenousHydra(returnBoolIfHasItem("Ravenous Hydra"))
        setHasIE(returnBoolIfHasItem("Infinity Edge"))
        setHasNavori(returnBoolIfHasItem("Navori"))
        setHasYoumuu(returnBoolIfHasItem("Youmuu"))
        setHasTitanicHydra(returnBoolIfHasItem("Titanic"))
        setHasBloodthirster(returnBoolIfHasItem("Bloodthirster"))
        setHasManamune(returnBoolIfHasItem("Manamune"))
        setHasElixirWrath(returnBoolIfHasItem("Elixir of Wrath"))
        setHasElixirIron(returnBoolIfHasItem("Elixir of Iron"))
        setHasHeartsteel(returnBoolIfHasItem("Heartsteel"))
        setHasRadiant(returnBoolIfHasItem("Radiant Virtue"))
        setHasFimbulwinter(returnBoolIfHasItem("Fimbul"))
        setHasGoredrinker(returnBoolIfHasItem("Goredrinker"))
        setHasIceborn(returnBoolIfHasItem("Iceborn Gau"))
        setHasWinterApproach(returnBoolIfHasItem("Winter's Approach"))
        setHasRageblade(returnBoolIfHasItem("Guinsoo"))
        setHasShieldbow(returnBoolIfHasItem("Shieldbow"))
        setHasPhantom(returnBoolIfHasItem("Phantom"))
        setHasRageknife(returnBoolIfHasItem("Rageknife"))
        setHasGargoyle(returnBoolIfHasItem("Gargoyle"))
        setHullbreaker(returnBoolIfHasItem("Hullbreaker"))
        setHasJakSho(returnBoolIfHasItem("Jak'Sho"))
        setHasLocket(returnBoolIfHasItem("Locket of"))
        setHasArmguard(returnBoolIfHasItem("Seeker's Armguard"))
        setHasAbyssal(returnBoolIfHasItem("Abyssal Mask"))
        setHasForceNature(returnBoolIfHasItem("Force of Nature"))
        setHasVerdant(returnBoolIfHasItem("Verdant"))
        setHasBlackCleaver(returnBoolIfHasItem("Black Cleaver"))
        setHasDeadMan(returnBoolIfHasItem("Dead Man's Plate"))
        setHasDraktharr(returnBoolIfHasItem("Draktharr"))
        setHasEclipse(returnBoolIfHasItem("Eclipse"))
        setHasHearthbound(returnBoolIfHasItem("Hearthbound"))
        setHasMobility(returnBoolIfHasItem("Mobility Boots"))
        setHasStridebreaker(returnBoolIfHasItem("Stridebreaker"))
        setHasWitsEnd(returnBoolIfHasItem("Wit's End"))
        setHasBOTRK(returnBoolIfHasItem("Blade of the Ruined King"))
        setHasCrown(returnBoolIfHasItem("Crown of the Shattered Queen"))
        setHasRocketbelt(returnBoolIfHasItem("Rocketbelt"))
        setHasLuden(returnBoolIfHasItem("Luden"))
        setHasMejai(returnBoolIfHasItem("Mejai"))
        setHasHarvester(returnBoolIfHasItem("Night Harvester"))
        setHasCosmicDrive(returnBoolIfHasItem("Cosmic Drive"))
        setHasROA(returnBoolIfHasItem("Rod of Ages"))
        setHasShurelya(returnBoolIfHasItem("Shurelya"))
        setHasStormrazor(returnBoolIfHasItem("Stormrazor"))
        setHasChemtank(returnBoolIfHasItem("Chemtank"))
    }

    function returnBoolIfHasItem(chaine){
        let bool = false
        if (itemSlot1.includes(chaine)) bool = true
        if (itemSlot2.includes(chaine) || itemSlot3.includes(chaine) || itemSlot4.includes(chaine) || itemSlot5.includes(chaine) || itemSlot6.includes(chaine))
            bool = true
        if (elixirSlot.includes(chaine))
            bool = true
        return bool
    }

    const [hasTrinity, setHasTrinity] = useState(false)
    const [hasWardStone, setHasWardStone] = useState(false)
    const [hasSterak, setHasSterak] = useState(false)
    const [hasGaleforce, setHasGaleforce] = useState(false)
    const [hasShojin, setHasShojin] = useState(false)
    const [hasMuramana, setHasMuramana] = useState(false)
    const [hasManamune, setHasManamune] = useState(false)
    const [hasRavenousHydra, setHasRavenousHydra] = useState(false)
    const [hasIE, setHasIE] = useState(false)
    const [hasNavori, setHasNavori] = useState(false)
    const [hasYoumuu, setHasYoumuu] = useState(false)
    const [hasTitanicHydra, setHasTitanicHydra] = useState(false)
    const [hasBloodthirster, setHasBloodthirster] = useState(false)
    const [hasElixirWrath, setHasElixirWrath] = useState(false)
    const [hasHeartsteel, setHasHeartsteel] = useState(false)
    const [hasRadiant, setHasRadiant] = useState(false)
    const [hasFimbulwinter, setHasFimbulwinter] = useState(false)
    const [hasGoredrinker, setHasGoredrinker] = useState(false)
    const [hasIceborn, setHasIceborn] = useState(false)
    const [hasWinterApproach, setHasWinterApproach] = useState(false)
    const [hasElixirIron, setHasElixirIron] = useState(false)
    const [hasRageblade, setHasRageblade] = useState(false)
    const [hasShieldbow, setHasShieldbow] = useState(false)
    const [hasPhantom, setHasPhantom] = useState(false)
    const [hasRageknife, setHasRageknife] = useState(false)
    const [hasGargoyle, setHasGargoyle] = useState(false)
    const [hasHullbreaker, setHullbreaker] = useState(false)
    const [hasJakSho, setHasJakSho] = useState(false)
    const [hasLocket, setHasLocket] = useState(false)
    const [hasArmguard, setHasArmguard] = useState(false)
    const [hasAbyssal, setHasAbyssal] = useState(false)
    const [hasForceNature, setHasForceNature] = useState(false)
    const [hasVerdant, setHasVerdant] = useState(false)
    const [hasBlackCleaver, setHasBlackCleaver] = useState(false)
    const [hasDeadMan, setHasDeadMan] = useState(false)
    const [hasDraktharr, setHasDraktharr] = useState(false)
    const [hasEclipse, setHasEclipse] = useState(false)
    const [hasHearthbound, setHasHearthbound] = useState(false)
    const [hasMobility, setHasMobility] = useState(false)
    const [hasStridebreaker, setHasStridebreaker] = useState(false)
    const [hasWitsEnd, setHasWitsEnd] = useState(false)
    const [hasBOTRK, setHasBOTRK] = useState(false)
    const [hasCrown, setHasCrown] = useState(false)
    const [hasRocketbelt, setHasRocketbelt] = useState(false)
    const [hasLuden, setHasLuden] = useState(false)
    const [hasMejai, setHasMejai] = useState(false)
    const [hasHarvester, setHasHarvester] = useState(false)
    const [hasCosmicDrive, setHasCosmicDrive] = useState(false)
    const [hasROA, setHasROA] = useState(false)
    const [hasShurelya, setHasShurelya] = useState(false)
    const [hasStormrazor, setHasStormrazor] = useState(false)
    const [hasChemtank, setHasChemtank] = useState(false)

    useEffect(() => {
        majItemStats()
        
    }, [itemSlot1, itemSlot2, itemSlot3, itemSlot3, itemSlot4, itemSlot5, itemSlot6, elixirSlot, hasTrinity])

    useEffect(() => {
        if (data != undefined) {
            if (data["Energy"] === 1){
                setTextMana('Energy')
            }
            else {
                setTextMana('Mana') 
            }
            setImgSplash(`../../images/centered/${nameChamp}_0.jpg`)
            /** BASICS STATS */
            for (let key in data){
                if (key == 'img') break
                if (typeof data[key] === 'string'){
                    data[key] = getNumericFromString(data[key])
                }
            }
            let champ_obj = {
                "Hp": data["HP"] + data["HP+"] * (level - 1) + (steroidStats["Form"] && nameChamp=='Gnar' ? 100 + 43 * (level - 1) : 0) + (steroidStats["Form"] && nameChamp == "Kled" ? 810 + 144 * (level -1) * (0.007025 + 0.000175 * (level - 1)) : 0),
                "Attack Damage": (data["AD"] + data["AD+"] * (level - 1)) * (1 + (steroidStats["Items"] && hasTrinity ? 0.2 : 0) + (steroidStats["Form"] && nameChamp=='Gnar' ? 8 +2.5 *(level - 1) : 0)),
                "Attack Speed %": Number(data["AS"] * (1 + (data["Ratio"]* (level - 1))/100)),
                "Armor": data["AR"] + data["AR+"] * (level - 1) + (steroidStats["Form"] && nameChamp=='Gnar' ? 3.5 + 3 * (level - 1) : 0),
                "Magic Resist": data["MR"] + data["MR+"] * (level - 1) + (steroidStats["Form"] && nameChamp=='Gnar' ? 3.5 + 3.5 * (level - 1) : 0),
                "Move Speed": data["MS"],
                "Lifesteal": 0,
                "Critical %":  0, 
                "Hp Regen": data["HP5"] + data["HP5+"] * (level - 1),

                "Mana": data["MP"] + data["MP+"] * (level - 1),
                "Ability Power": 0,
                "Range": data["Range"],
                "Armor Penetration": 0,
                "Resist Penetration": 0,
                "Ability Haste": 0,
                "Spellvamp %": 0,
                "Tenacity %": 0,
                "Mana / Regen": data["MP5"] + data["MP5+"] * (level - 1),
            }
            setDataChamp(champ_obj)

            enemyDataPrep()

        }
    },[data, level, enemyName, enemyLevel, steroidStats])

    useEffect(() => {
        if (data != undefined){
            majStatsRune()
        }
    }, [nameMainRune, mainRune, mainFirstRune, mainSecondRune, mainThirdRune, secondRune, secondFirstRune, secondSecondRune, offensiveShard, mixedShard, defensiveShard, stackBounty, stackConqueror, stackDarkHarvest, stackLegendBloodline, stackLegendExceptBloodline])

    useEffect(() => {
        let obj = {
            "Hp": 0,
            "Attack Damage": 0,
            "Attack Speed %": 0,
            "Armor": 0,
            "Magic Resist": 0,
            "Move Speed": 0,
            "Lifesteal": 0,
            "Critical %":  0, 
            "Hp Regen": 0,
    
            "Mana" : 0,
            "Ability Power": 0,
            "Range": 0,
            "Armor Penetration": 0,
            "Resist Penetration": 0,
            "Ability Haste": 0,
            "Spellvamp %": 0,
            "Tenacity %": 0,
            "Mana / Regen": 0,
        }
        // AttackDamage
        // SE referer au WIKI
        let bonusAD = (hasElixirWrath ? 30 : 0) + (hasBloodthirster && steroidStats["Items"] ? (level < 13 ? 10 : level < 14 ? 15 : level < 15 ? 20 : level < 16 ? 25 : level < 17 ? 30 : level < 18 ? 35 : 40) : 0)+(hasSterak ? basicStatsChampion["Attack Damage"] / 2 : 0) + (hasGaleforce || hasIE || hasNavori ? 5 * nbLegendary : 0) + (hasMuramana || hasManamune ? totalStats["MP"] * 0.025 : 0) + (hasRavenousHydra && steroidStats["Items"] ? 20 : 0) + (hasTrinity ? 3 * nbLegendary : 0) + (hasYoumuu ? 7 * nbLegendary : 0) + (hasTitanicHydra ? 0.02 * additionnalStats["Hp"] : 0)
        bonusAD += (steroidStats["R"] && nameChamp == 'Aatrox' ? (rSkillPoint == 1 ? totalStats["AD"] * 0.2 : rSkillPoint == 2 ? totalStats["AD"] * 0.325 : totalStats["AD"] * 0.45) : 0)
        bonusAD += (nameChamp == 'Aphelios' ? (qSkillPoint == 0 ? 4.5 : qSkillPoint == 1 ? 9 : qSkillPoint == 2 ? 13.5 : qSkillPoint == 3 ? 18 : qSkillPoint == 4 ? 22.5 : 27) : 0)
        bonusAD += (nameChamp == 'Darius' && steroidStats["P"] ? (level <= 10 ? 30 + 5 * (level - 1) : (level <= 13 ? 30 + 10 * (level - 1) : 30 + 25 * (level - 1))) : 0)
        bonusAD += (nameChamp.includes("Mundo") && eSkillPoint > 0 ? 2 + 0.5 * eSkillPoint : 0)
        bonusAD += nameChamp == 'Hecarim' ? additionnalStats["Move Speed"] * (0.12 + (level >= 3 ? 0.02 * Math.floor((level-3) / 3) : 0)) : 0 
        bonusAD += nameChamp == 'Jhin' ? 0.03 + (level <= 9 ? 0.01 * level : level <= 11 ? 0.02 * level : 0.04 * level) + 0.003 * totalStats["Crit"] + 0.025 * additionnalStats["Attack Speed %"] : 0
        bonusAD += nameChamp.includes("Sante") && steroidStats["R"] ? 5 + additionnalStats["Armor"] * 0.325 + additionnalStats["Magic Resist"] * 0.325 : 0
        bonusAD += nameChamp == "Naafiri"  && steroidStats["R"] ? 10 + 10 * (rSkillPoint - 1) + (0.1 + 0.05 * rSkillPoint) * totalStats["AD"] : 0
        bonusAD += nameChamp == 'Nocturne' && steroidStats["Q"] ? 10 + 10 * (qSkillPoint) : 0
        bonusAD += nameChamp == "Olaf" && steroidStats["R"] ? 0 + 10 * rSkillPoint + 0.25 * totalStats["AD"] : 0
        bonusAD += nameChamp == "Senna" ? 0.75 * sennaStacks : 0
        bonusAD += nameChamp == "Trundle" && steroidStats["Q"] ? 0 + 20 * qSkillPoint + (0.5 + 0.1 * qSkillPoint) * totalStats["AD"] : 0 
        bonusAD += nameChamp == "Tryndamere" && qSkillPoint > 0 ? 10 + 5 * (qSkillPoint - 1) : 0
        bonusAD += nameChamp == "Twitch" && steroidStats["R"] ? 40 + 15 * (rSkillPoint - 1) : 0
        bonusAD += nameChamp == "Vayne" && steroidStats["R"] ? 25 + 15 * (rSkillPoint - 1) : 0
        bonusAD += nameChamp == "Pyke" ? 0.07143 * additionnalStats["Hp"] : 0
        bonusAD += mainRune == "Conqueror" && runeStats["ForceBit"] == 1 ? 1.2 * stackConqueror + 1.5 / (17 * (level - 1)) : 0 
        bonusAD += (secondFirstRune.includes("EyeBall") || secondSecondRune.includes("EyeBall") || mainSecondRune.includes("Eyeball")) && runeStats["ForceBit"] == 1 ? 1.2 * stackBounty  + (stackBounty == 10 ? 6 : 0): 0
        bonusAD += (secondFirstRune.includes("Poro") || secondSecondRune.includes("Poro") || mainSecondRune.includes("Poro")) && runeStats["ForceBit"] == 1 ? 1.2 * stackBounty  + (stackBounty == 10 ? 6 : 0): 0
        bonusAD += (secondFirstRune.includes("Zombie") || secondSecondRune.includes("Zombie") || mainSecondRune.includes("Zombie")) && runeStats["ForceBit"] == 1 ? 1.2 * stackBounty  + (stackBounty == 10 ? 6 : 0): 0
        bonusAD += (secondFirstRune.includes("Absolute Focus") || secondSecondRune.includes("Absolute Focus") || mainSecondRune.includes("EyeAbsolute Focusball")) && runeStats["ForceBit"] == 1 ? 1.8 + 16.2 / (17 * (level -1)) : 0
        bonusAD += (secondFirstRune.includes("Gathering Storm") || secondSecondRune.includes("Gathering Storm") || mainSecondRune.includes("Gathering Storm")) && runeStats["ForceBit"] == 1 ? (gameStats["Gametime"] < 10 ? 0 : gameStats["Gametime"] < 20 ? 4.8 : gameStats["Gametime"] < 30 ? 14.4 : gameStats["Gametime"] < 40 ? 28.8 : 48): 0
        
        obj["Attack Damage"] = (itemStats["AD"] + (runeStats["ForceBit"] == 1 ? runeStats["Adaptive"] : 0) + bonusAD) * ((1 + (0.05 * gameStats["Infernal"])) + (hasWardStone ? 0.2 : 0) + (nameChamp == "Riven" && steroidStats["R"] ? 0.20 : 0) + (nameChamp == "Rengar" && steroidStats["P"] ? 0.25 : 0))

        // HP
        let bonusHP = (hasFimbulwinter || hasWinterApproach ? 0.08 * totalStats["MP"] : 0)
        bonusHP += (hasGoredrinker || hasRadiant ? 75 * nbLegendary : 0)
        bonusHP += (hasHeartsteel ? 0.01 * nbLegendary * totalStats["HP"] : 0)
        bonusHP += (hasIceborn ? 50 * nbLegendary : 0)
        bonusHP += (hasRadiant && steroidStats["R"] ? 0.125 * totalStats["HP"] : 0)
        bonusHP += (hasElixirIron ? 300 : 0)
        bonusHP += (nameChamp.includes("Veth") && nameChamp.includes("Bel") && steroidStats["Form"] ? 50 + 50 * rSkillPoint + (1.2 * obj["Attack Damage"]) + 0.9 * totalStats["AP"] : 0)
        bonusHP += (nameChamp.includes("Gath") ? 40 + 40 *rSkillPoint * gameStats["Kills"] : 0)
        bonusHP += (nameChamp == 'Nasus' && steroidStats["R"] ? 150 + 150 * rSkillPoint : 0)
        bonusHP += (nameChamp == 'Renekton' && steroidStats["R"] ? 100 + 150 * rSkillPoint : 0)
        bonusHP += (nameChamp == 'Shyvana' && steroidStats["R"] ? 50 + 100 * rSkillPoint : 0)
        bonusHP += (nameChamp == "Sion" && wSkillPoint > 0 ? 4 * gameStats["Minion"] + 15 * gameStats["Kills"] : 0) 
        bonusHP += (nameChamp == "Swain" ? 12 * gameStats["Minion"] : 0)
        bonusHP += (nameChamp == "Vladimir" ? 1.6 * totalStats["AP"] : 0)
        bonusHP += (nameChamp == 'Volibear' && steroidStats["R"] ? 0 + 175 * rSkillPoint : 0)
        bonusHP += (stackLegendBloodline == 15 ? 85 : 0)
        bonusHP += (mainThirdRune == 'Overgrowth' || secondSecondRune == 'Overgrowth' ? (3* Math.floor(gameStats["Minion"] / 8)) >= 45 ? 0.035 * basicStatsChampion["Hp"] : 0 : 0) 
        bonusHP += (mainThirdRune == 'Overgrowth' || secondSecondRune == 'Overgrowth' ? (3* Math.floor(gameStats["Minion"] / 8)) : 0)
        let multiBonusHp = (mainThirdRune == 'Overgrowth' || secondSecondRune == 'Overgrowth' ? (3* Math.floor(gameStats["Minion"] / 8)) >= 45 ? 1.035 : 1 : 1) 
        multiBonusHp *= (hasWardStone ? 1.2 : 1)
        multiBonusHp *= (nameChamp == 'Ornn' ? Math.min(1.3, 1.1 + (level > 12 ? (level - 12) *0.04 : 0)) : 1)

        obj["Hp"] = (itemStats["HP"] + runeStats["HP"] + bonusHP) * multiBonusHp

        // Attack Speed https://leagueoflegends.fandom.com/wiki/Attack_speed
        let bonusAS = (bonusStats["Ardent"] ? 0.2 : 0) + (hasRageblade && steroidStats["Items"] ? 0.32 : 0) + (hasShieldbow && steroidStats["Items"] ? 0.3 : 0) + (hasPhantom && steroidStats["Items"] ? 0.3 : 0) + (hasRageknife && steroidStats["Items"] ? 0.15 : 0)
        bonusAS += (nameChamp.includes("Jarvan") && steroidStats["Q"] && qSkillPoint > 0 ? 0.175 + 0.025 * qSkillPoint : 0)
        bonusAS += (nameChamp == "Lulu" && steroidStats["W"] && wSkillPoint > 0 ? 0.225 + 0.025 * wSkillPoint : 0)
        bonusAS += (nameChamp == "Nidalee" && steroidStats["E"] && eSkillPoint > 0 ? 0.1 + 0.1 * eSkillPoint : 0)
        bonusAS += (nameChamp.includes("Nunu") && steroidStats["P"] ? 0.2 : 0)
        bonusAS += (nameChamp.includes("Renata") && steroidStats["W"] && wSkillPoint ? (0.1 + 0.1 * wSkillPoint) + 0.02 * (Math.floor(totalStats["AP"]/100)) : 0)
        bonusAS += (nameChamp.includes("Yuumi") && steroidStats["E"] && eSkillPoint ? (0.225 + 0.025 * eSkillPoint) + 0.08 * (Math.floor(totalStats["AP"]/100)) : 0)
        bonusAS += (nameChamp == 'Aphelios' ? (wSkillPoint == 0 ? 9 : wSkillPoint == 1 ? 18 : wSkillPoint == 2 ? 27 : wSkillPoint == 3 ? 36 : wSkillPoint == 4 ? 45 : 54) : 0)
        bonusAS += (nameChamp == "Ashe" && steroidStats["Q"] && qSkillPoint > 0 ? 0.175 + 0.075 * qSkillPoint : 0)
        bonusAS += (nameChamp.includes("Veth") ? gameStats["Minion"] + 2 * gameStats["Kills"] * 0.0022 + 0.0006 * (level) + (steroidStats["P"] ? 0.25 + 0.25 / (17 * level - 1) : 0) : 0)
        bonusAS += (nameChamp.includes("Blitz") && steroidStats["W"] && wSkillPoint > 0 ? 0.17 + 0.13 * wSkillPoint : 0) 
        bonusAS += (nameChamp == "Camille" && steroidStats["E"] && eSkillPoint > 0 ? 0.35 + 0.05 * eSkillPoint : 0)
        bonusAS += (nameChamp == "Diana" && steroidStats["P"] ? level < 3 ? 0.15 : level < 6 ? 0.1917 : level < 9 ? 0.2333 : level < 12 ? 0.275 : level < 15 ? 0.3167 : 0.4 : 0)
        bonusAS += (nameChamp == "Draven" && steroidStats["W"] && wSkillPoint > 0 ? 0.15 + 0.05 * wSkillPoint : 0)
        bonusAS += (nameChamp == "Elise" && steroidStats["W"] && steroidStats["Form"] && wSkillPoint > 0 ? 0.5 + 0.1 * wSkillPoint : 0)
        bonusAS += (nameChamp == "Ezreal" && steroidStats["P"] ? 0.5 : 0)
        bonusAS += (nameChamp == "Fiora" && steroidStats["E"] && eSkillPoint > 0 ? 0.4 + 0.1 * eSkillPoint : 0)
        bonusAS += (nameChamp == "Gnar" && !steroidStats["Form"] ? 0.055 + eSkillPoint > 0 ? 0.35 + 0.05 * eSkillPoint : 0 : 0)
        bonusAS += (nameChamp == "Gwen" && steroidStats["E"] && eSkillPoint > 0 ? 0.05 + 0.15 * eSkillPoint : 0)
        bonusAS += (nameChamp == 'Irelia' && steroidStats["P"] ? level < 7 ? 0.3 : level < 14 ? 0.55 : 0.8 : 0)
        bonusAS += (nameChamp == "Jax" && steroidStats["P"] ? 0.28 + 0.12 * Math.floor(level / 3) : 0)
        bonusAS += (nameChamp == 'Jinx' && !steroidStats["Q"] && qSkillPoint > 0 ? 0.05 + 0.25 * qSkillPoint : 0)
        bonusAS += (nameChamp.includes("Kai") && nameChamp.includes("Sa") && steroidStats["E"] && eSkillPoint > 0 ? 0.3 + 0.1 * eSkillPoint : 0)
        bonusAS += (nameChamp == "Kayle" && (steroidStats["P"] || level >= 16) ? 0.3 + 0.05 * Math.floor(totalStats["AP"]/100) : 0)
        bonusAS += (nameChamp == "Kennen" && steroidStats["E"] && eSkillPoint > 0 ? 0.3 + 0.1 * eSkillPoint : 0)
        bonusAS += (nameChamp == "Kindred" && steroidStats["Q"] ? 0.35 + 0.05 * gameStats["Kills"] : 0)
        bonusAS += (nameChamp == "Kled" && steroidStats["W"] ? 1.5 : 0)
        bonusAS += (nameChamp.includes("Kog") && nameChamp.includes("Maw") && qSkillPoint > 0 ? 0.05 + 0.05 * qSkillPoint : 0)
        bonusAS += (nameChamp.includes("Lee") && nameChamp.includes("Sin") && steroidStats["P"] ? 0.4 : 0)
        bonusAS += (nameChamp.includes("Master") && steroidStats["R"] && rSkillPoint > 0 ? 0.15 + 0.1 * rSkillPoint : 0) 
        bonusAS += (nameChamp.includes("Fortune") && steroidStats["W"] && wSkillPoint > 0 ? 0.25 + 0.15 * wSkillPoint : 0)
        bonusAS += (nameChamp == "Nilah" && steroidStats["Q"] && qSkillPoint > 0 ? 0.1 + 0.5 / (17 * (level -1)) : 0)
        bonusAS += (nameChamp == "Nocturne" && steroidStats["W"] && wSkillPoint > 0 ? 0.25 + 0.05 * wSkillPoint : 0)
        bonusAS += (nameChamp == "Olaf" && steroidStats["P"] ? 0.5 + (50 / 17* (level - 1)) * (0.007025 + 0.000175 * (level - 1)) : 0)
        bonusAS += (nameChamp == "Olaf" && steroidStats["W"] && wSkillPoint > 0 ? 0.3 + 0.1 * wSkillPoint : 0)
        bonusAS += (nameChamp == "Qiyana" && steroidStats["W"] ? 0.05 * wSkillPoint : 0)
        bonusAS += (nameChamp == "Quinn" && steroidStats["W"] && wSkillPoint > 0 ? 0.2 + 0.08 * wSkillPoint : 0)
        bonusAS += (nameChamp == "Rammus" && steroidStats["E"] && eSkillPoint > 0 ? 0.15 + 0.05 * eSkillPoint : 0)
        bonusAS += (nameChamp == "Rell" && steroidStats["W"] ? 0.3 : 0)
        bonusAS += (nameChamp == "Rengar" && steroidStats["Q"] ? 0.4 : 0)
        bonusAS += (nameChamp == "Rumble" && steroidStats["P"] ? (50 + ((130 - 50)/17) * (level - 1) * (0.7025 + 0.0175 * (level - 1)))/100 : 0)
        bonusAS += (nameChamp == "Samira" && steroidStats["E"] && eSkillPoint > 0 ? 0.15 + 0.05 * eSkillPoint : 0)
        bonusAS += (nameChamp == "Shen" && steroidStats["Q"] ? 0.5 : 0)
        bonusAS += (nameChamp == "Sivir" && steroidStats["W"] && wSkillPoint > 0 ? 0.15 + 0.05 * wSkillPoint : 0)
        bonusAS += (nameChamp == "Skarner" && steroidStats["P"] ? (38 + (level <= 7 ? 5 : level <= 13 ? 7 : 9))/100 : 0)
        bonusAS += (nameChamp == "Sylas" && steroidStats["P"] ? 1.25 : 0)
        bonusAS += (nameChamp == "Taric" && steroidStats["P"] ? 1 : 0)
        bonusAS += (nameChamp == "Teemo" && steroidStats["P"] ? level < 5 ? 0.2 : level < 10 ? 0.4 : level < 15 ? 0.6 : 0.8 : 0)
        bonusAS += (nameChamp == "Tristana" && steroidStats["Q"] && qSkillPoint > 0 ? 0.5 + 0.15 * qSkillPoint : 0)
        bonusAS += (nameChamp == "Trundle" && steroidStats["W"] && wSkillPoint > 0 ? 0.1 + 0.2 * wSkillPoint : 0)
        bonusAS += (nameChamp.includes("Twisted") && steroidStats["E"] && eSkillPoint > 0 ? (3.5 + 7.5 * eSkillPoint)/100 : 0)
        bonusAS += (nameChamp == "Twitch" && steroidStats["Q"] && qSkillPoint > 0 ? 0.35 + 0.5 * qSkillPoint : 0)
        bonusAS += (nameChamp == "Udyr" && steroidStats["P"] ? 0.3 : 0)
        bonusAS += (nameChamp == "Udyr" && steroidStats["Q"] && qSkillPoint > 0 ? 0.08 + 0.12 * qSkillPoint : 0)
        bonusAS += (nameChamp == "Varus" && steroidStats["P"] ? 0.1 + (level <= 7 ? 0.5 : 0.1) + 0.2 : 0)
        bonusAS += (nameChamp == "Vi" && steroidStats["W"] && wSkillPoint > 0 ? 0.225 + 0.075 * wSkillPoint : 0)
        bonusAS += (nameChamp == "Viego" && steroidStats["E"] && eSkillPoint > 0 ? 0.25 + 0.05 * eSkillPoint : 0)
        bonusAS += (nameChamp == "Volibear" && steroidStats["P"] ? 0.25 + 0.2 * (Math.floor(totalStats["AP"]/100)) : 0)
        bonusAS += (nameChamp == "Warwick" && steroidStats["W"] && wSkillPoint > 0 ? 0.6 + 0.1 * wSkillPoint : 0)
        bonusAS += (nameChamp == "Wukong" && steroidStats["E"] && eSkillPoint > 0 ? 0.3 + 0.05 * eSkillPoint : 0)
        bonusAS += (nameChamp == "Xayah" && steroidStats["W"] && wSkillPoint > 0 ? 0.3 + 0.05 * wSkillPoint : 0)
        bonusAS += (nameChamp.includes("Zhao") && steroidStats["E"] && eSkillPoint > 0 ? 0.35 + 0.05 * eSkillPoint : 0)
        bonusAS += (nameChamp == "Zeri" && steroidStats["R"] ? 0.3 : 0)
        bonusAS += (mainRune == "Hail of Blades" && steroidStats["Runes"] ? 1.1 : 0)
        bonusAS += (mainRune == "Lethal Tempo" && steroidStats["Runes"] ? data["Melee?"] == 1 ? level >= 15 ? 0.9 : 0.57 + 0.03 * level : 0.222 + 0.018 * level : 0)
        bonusAS += (mainSecondRune == "Alacrity" || secondFirstRune == "Alacrity" || secondSecondRune == "Alacrity" ? 0.03 + 0.15 * stackLegendExceptBloodline : 0)
        bonusAS += 0.075 * gameStats["Hextech"]
        let multiBonusAS = (nameChamp == 'Jinx' && steroidStats["Q"] && qSkillPoint > 0 ? 0.9 : 1) * (nameChamp.includes("Veth") && steroidStats["Form"] && rSkillPoint > 0 ? 1.05 + 0.05 * rSkillPoint : 1)
        obj["Attack Speed %"] = (itemStats["AS"]/100 + runeStats["AS"] + bonusAS + (nameChamp == 'Jhin' ? 0 : data["AS+"] * (level-1)*(0.685+0.0175*level))) * multiBonusAS + (nameChamp == 'Varus' && steroidStats["P"] ? 0.4 + 0.4 * (runeStats["AS"] + itemStats["AS"] + bonusAS + data["AS+"] * (level-1)*(0.685+0.0175*level)):0)
        obj["Attack Speed %"] *= (nameChamp == "Jayce" && steroidStats["Form"] && steroidStats["W"] ? 3 : 1)
        
        // ARMOR
        let bonusArmor = (itemSlot1 == "Evenshroud" ? 5 * nbLegendary : 0)
        bonusArmor += (hasHullbreaker ? (data["Melee?"] == 1 ? (level < 12 ? 30 : level < 13 ? 60 : level < 14 ? 105 : level < 15 ? 129 : level < 16 ? 153 : level < 17 ? 201 : 225) : (level < 12 ? 15 : level < 13 ? 30 : level < 14 ? 52.5 : level < 15 ? 64.5 : level < 16 ? 88.5 : level < 17 ? 100.5 : 112.5)) : 0)
        bonusArmor += (hasJakSho && steroidStats["Items"] ? 16 : 0)
        bonusArmor += (hasJakSho ? 5 * nbLegendary : 0)
        bonusArmor += (hasArmguard && steroidStats["Items"] ? 15 : 0)
        bonusArmor += (nameChamp == "Anivia" && steroidStats["P"] ? level < 5 ? -40 : level < 8 ? -25 : level < 12 ? -10 : level < 15 ? 5 : 20 : 0)
        bonusArmor += (nameChamp == "Graves" && steroidStats["E"] && eSkillPoint > 0 ? (1 + 3 * eSkillPoint) * gameStats["Minion"] : 0)
        bonusArmor += (nameChamp == "Gwen" && steroidStats["W"] && eSkillPoint > 0 ? (15 + 2 * eSkillPoint) + 0.07 * totalStats["AP"] : 0)
        bonusArmor += (nameChamp == "Hecarim" && steroidStats["W"] && wSkillPoint > 0 ? 10 + 5 * wSkillPoint : 0)
        bonusArmor += (nameChamp == "Jax" && steroidStats["R"] && rSkillPoint > 0 ? (-10 + 25 * rSkillPoint)+ 0.4 * obj["Attack Damage"] : 0)
        bonusArmor += (nameChamp == "Jayce" && steroidStats["Form"] && steroidStats["R"] ? (level < 6 ? 5 : level < 11 ? 15 : level < 15 ? 25 : 35) + 0.075 * obj["Attack Damage"]: 0) 
        bonusArmor += (nameChamp == "Kennen" && steroidStats["R"] ? 20 * rSkillPoint : 0)
        bonusArmor += (nameChamp == "Nasus" && steroidStats["R"] && rSkillPoint > 0 ? 25 + 15 * rSkillPoint : 0)
        bonusArmor += (nameChamp == "Olaf" && steroidStats["R"] ? rSkillPoint * 10 : 0)
        bonusArmor += (nameChamp == "Oriana" && eSkillPoint > 0 ? 6 * eSkillPoint : 0)
        bonusArmor += (nameChamp == "Rammus" && wSkillPoint > 0 ? 35 + ((30 + 10 * wSkillPoint)/100) * totalStats["AR"] : 0)
        bonusArmor += (nameChamp == "Shyvana" ? 5 * (gameStats["Chemtech"] + gameStats["Cloud"] + gameStats["Hextech"] + gameStats["Infernal"] + gameStats["Ocean"] + gameStats["Mountain"]) : 0)
        bonusArmor += (nameChamp == "Singed" && steroidStats["R"] && rSkillPoint > 0 ? -5 + 35 * rSkillPoint : 0)
        bonusArmor += (nameChamp == "Taric" && wSkillPoint > 0 ? ((9*wSkillPoint)/100) * totalStats["AR"] : 0)
        bonusArmor += (nameChamp == "Thresh" ? 1 * gameStats["Minion"] : 0)
        bonusArmor += (nameChamp == "Trundle" && steroidStats["R"] ? 0.4 * enemyStats["Armor"] : 0)
        bonusArmor += (nameChamp == "Wukong" && steroidStats["P"] ? 30 + 24 / 17 * (level - 1) : 0)
        bonusArmor += ((mainSecondRune == "Conditioning" || secondFirstRune == "Conditioning" || secondSecondRune == "Conditioning") && gameStats["Gametime"] > 12 ? 8 : 0)
        bonusArmor += ((mainFirstRune == "Shield Bash" || secondFirstRune == "Shield Bash") && steroidStats["Runes"] ? 1 + 9 / 17 * (level - 1) : 0)
        
        let multiBonusArmor = (nameChamp == 'Ornn' ? Math.min(1.3, 1.1 + (level > 12 ? (level - 12) *0.04 : 0)) : 1)

        obj["Armor"] = ((itemStats["AR"] + runeStats["AR"] + bonusArmor) * multiBonusArmor)
        obj["Armor"] += (nameChamp == "Braum" && steroidStats["W"] && wSkillPoint > 0 ? 15 + 5 * wSkillPoint + 0.36 * obj["Armor"] : 0)
        obj["Armor"] += (nameChamp == "Garen" && steroidStats["W"] ? 30 + 0.1 * obj["Armor"] : 0)
        obj["Armor"] += (nameChamp == "Leona" && steroidStats["W"] && wSkillPoint > 0 ? 15 + 5 * wSkillPoint + 0.2 * obj["Armor"] : 0)
        obj["Armor"] += (nameChamp == "Malphite" && steroidStats["W"] && wSkillPoint > 0 ? ((5 + 5 * eSkillPoint)/100) * totalStats["Armor"] : 0)
        obj["Armor"] += (nameChamp == "Poppy" && wSkillPoint > 0 ? 0.12 * obj["Armor"] : 0)
        obj["Armor"] += (nameChamp == "Rell" && wSkillPoint > 0 ? 0.12 * obj["Armor"] : 0)
        obj["Armor"] += (nameChamp == "Sejuani" && steroidStats["P"] ? 10 + obj["Armor"]/2 : 0)
        obj["Armor"] += (hasGargoyle ? 0.05 * obj["Armor"] : 0)
        obj["Armor"] += (mainRune == "Aftershock" && steroidStats["Runes"] ? 35 + 0.8 * obj["Armor"] : 0) 
        obj["Armor"] *= ((mainSecondRune == "Conditioning" || secondFirstRune == "Conditioning" || secondSecondRune == "Conditioning") && gameStats["Gametime"] >= 12 ? 1.03 : 1)
    
        // Magic Resist
        let bonusMR = (hasAbyssal && steroidStats["Items"] ? 9 : 0)
        bonusMR += (itemSlot1 == "Evenshroud" ? 5 * nbLegendary : 0)
        bonusMR += (hasForceNature && steroidStats["Items"] ? 30 : 0)
        bonusMR += (hasHullbreaker ? (data["Melee?"] == 1 ? (level < 12 ? 30 : level < 13 ? 60 : level < 14 ? 105 : level < 15 ? 129 : level < 16 ? 153 : level < 17 ? 201 : 225) : (level < 12 ? 15 : level < 13 ? 30 : level < 14 ? 52.5 : level < 15 ? 64.5 : level < 16 ? 88.5 : level < 17 ? 100.5 : 112.5)) : 0)
        bonusMR += (hasJakSho && steroidStats["Items"] ? 16 : 0)
        bonusMR += (hasJakSho ? 5 * nbLegendary : 0)
        bonusMR += (hasVerdant && steroidStats["Items"] ? 9 : 0)
        bonusMR += (nameChamp == "Anivia" && steroidStats["P"] ? level < 5 ? -40 : level < 8 ? -25 : level < 12 ? -10 : level < 15 ? 5 : 20 : 0)
        bonusMR += (nameChamp == "Gwen" && steroidStats["W"] && eSkillPoint > 0 ? (15 + 2 * eSkillPoint) + 0.07 * totalStats["AP"] : 0)
        bonusMR += (nameChamp == "Hecarim" && steroidStats["W"] && wSkillPoint > 0 ? 10 + 5 * wSkillPoint : 0)
        bonusMR += (nameChamp == "Jax" && steroidStats["R"] && rSkillPoint > 0 ? (-6 + 25 * rSkillPoint)+ 0.24 * obj["Attack Damage"] : 0)
        bonusMR += (nameChamp == "Jayce" && steroidStats["Form"] && steroidStats["R"] ? (level < 6 ? 5 : level < 11 ? 15 : level < 15 ? 25 : 35) + 0.075 * obj["Attack Damage"]: 0) 
        bonusMR += (nameChamp == "Kennen" && steroidStats["R"] ? 20 * rSkillPoint : 0)
        bonusMR += (nameChamp == "Nasus" && steroidStats["R"] && rSkillPoint > 0 ? 25 + 15 * rSkillPoint : 0)
        bonusMR += (nameChamp == "Olaf" && steroidStats["R"] ? rSkillPoint * 10 : 0)
        bonusMR += (nameChamp == "Oriana" && eSkillPoint > 0 ? 6 * eSkillPoint : 0)
        bonusMR += (nameChamp == "Rammus" && wSkillPoint > 0 ? 10 + ((25 + 5 * wSkillPoint)/100) * totalStats["MR"] : 0)
        bonusMR += (nameChamp == "Shyvana" ? 5 * (gameStats["Chemtech"] + gameStats["Cloud"] + gameStats["Hextech"] + gameStats["Infernal"] + gameStats["Ocean"] + gameStats["Mountain"]) : 0)
        bonusMR += (nameChamp == "Singed" && steroidStats["R"] && rSkillPoint > 0 ? -5 + 35 * rSkillPoint : 0)
        bonusMR += (nameChamp == "Trundle" && steroidStats["R"] ? 0.4 * enemyStats["Magic Resist"] : 0)
        
        let multiBonusMR = (nameChamp == 'Ornn' ? Math.min(1.3, 1.1 + (level > 12 ? (level - 12) *0.04 : 0)) : 1)
        obj["Magic Resist"] = ((itemStats["MR"] + runeStats["MR"] + bonusMR) * multiBonusMR)
        obj["Magic Resist"] += (hasGargoyle ? 0.05 * obj["Magic Resist"] : 0)
        obj["Magic Resist"] += (nameChamp == "Braum" && steroidStats["W"] && wSkillPoint > 0 ? 15 + 5 * wSkillPoint + 0.36 * obj["Magic Resist"] : 0)
        obj["Magic Resist"] += (nameChamp == "Garen" && steroidStats["W"] ? 30 + 0.1 * obj["Magic Resist"] : 0)
        obj["Magic Resist"] += (nameChamp == "Leona" && steroidStats["W"] && wSkillPoint > 0 ? 15 + 5 * wSkillPoint + 0.2 * obj["Magic Resist"] : 0)
        obj["Magic Resist"] += (nameChamp == "Poppy" && wSkillPoint > 0 ? 0.12 * obj["Magic Resist"] : 0)
        obj["Magic Resist"] += (nameChamp == "Rell" && wSkillPoint > 0 ? 0.12 * obj["Magic Resist"] : 0)
        obj["Magic Resist"] += (nameChamp == "Sejuani" && steroidStats["P"] ? 10 + obj["Magic Resist"]/2 : 0)
        obj["Magic Resist"] += (mainRune == "Aftershock" && steroidStats["Runes"] ? 35 + 0.8 * obj["Magic Resist"] : 0) 
        obj["Magic Resist"] *= ((mainSecondRune == "Conditioning" || secondFirstRune == "Conditioning" || secondSecondRune == "Conditioning") && gameStats["Gametime"] >= 12 ? 1.03 : 1)
    
        // Move Speed
        let bonusMS = (hasBlackCleaver && steroidStats["Items"] ? 18 : 0)
        bonusMS += (hasDeadMan ? 40 : 0)
        bonusMS += (hasDraktharr ? 5 * nbLegendary : 0)
        bonusMS += (hasEclipse ? 5 * nbLegendary : 0)
        bonusMS += (hasHearthbound && steroidStats["Items"] ? (data["Melee?"] == 1 ? 20 : 10) : 0)
        bonusMS += (hasMobility && steroidStats["Items"] ? -90 : 0)
        bonusMS += (hasStridebreaker && steroidStats["Items"] ? 20 : 0)
        bonusMS += (hasTrinity && steroidStats["Items"] ? 20 : 0)
        bonusMS += (hasWitsEnd && steroidStats["Items"] ? 20 : 0)
        bonusMS += (hasTrinity ? 3 * nbLegendary : 0)
        bonusMS += (hasYoumuu ? 40 : 0)
        bonusMS += (nameChamp == "Akshan" && steroidStats["W"] && wSkillPoint > 0 ? 70 + 10 * wSkillPoint : 0)
        bonusMS += (nameChamp.includes("Veth") && steroidStats["R"] ? 25 * rSkillPoint : 0)
        bonusMS += (nameChamp == "Cassiopeia" ? 4 * level : 0)
        bonusMS += (nameChamp == "Cassiopeia" && steroidStats["Q"] && qSkillPoint > 0 ? 25 + 5 * qSkillPoint : 0)
        bonusMS += (nameChamp == "Elise" && steroidStats["Form"] ? 25 : 0)
        bonusMS += (nameChamp == "Jayce" && steroidStats["Form"] ? 40 : 0)
        bonusMS += (nameChamp == "Lucian" && steroidStats["W"] && wSkillPoint > 0 ? 50 + 5 * wSkillPoint : 0)
        bonusMS += (nameChamp == "Akshan" && steroidStats["P"] ? (20 + 55 / 17 * (level - 1)) * (1 + obj["Attack Speed %"]) : 0)
        bonusMS += (nameChamp.includes("Fortune") && steroidStats["W"] && wSkillPoint > 0 ? 45 + 10 * wSkillPoint : 0)
        bonusMS += (nameChamp.includes("Rek") && nameChamp.includes("Sai") && steroidStats["Form"] ? 15 + (level < 6 ? 0 : level < 11 ? 5 : level < 16 ? 10 : 15) : 0)
        bonusMS += (nameChamp == "Singed" && steroidStats["R"] && rSkillPoint > 0 ? -5 + 35 * rSkillPoint : 0)
        bonusMS += (nameChamp == "Sion" && steroidStats["R"] ? 950 - totalStats["MS"] : 0)
        bonusMS += (nameChamp == "Sivir" && steroidStats["P"] ? 55 + (level < 6 ? 0 : level < 11 ? 5 : level < 16 ? 10 : level < 18 ? 15 : 20) : 0)
        bonusMS += (nameChamp == "Skarner" && steroidStats["P"] ?  68 + (level <= 7 ? 2 * level : level <= 13 ? 2 * 7 + 3 * (level - 7) : 2 * 7 + 3 * 6 + 4 * (level - 13)) : 0)
        bonusMS += (nameChamp == "Vayne" && steroidStats["P"] ? 45 * (steroidStats["R"] ? 2 : 1) : 0)
        bonusMS += (nameChamp == "Kled" &&  steroidStats["R"] ? 650 : 0)
        bonusMS += (nameChamp == "Rell" && eSkillPoint > 0 ? (level <= 6 ? 5 + 3 * (level - 1) : level <= 11 ? 20 + 4 * (level - 6) : level == 12 ? 45 : 50) : 1)
        bonusMS += ((mainThirdRune == "Relentless Hunter" || secondSecondRune == "Relentless Hunter") ? 5 + 8 * stackBounty: 0)
        bonusMS += ((mainFirstRune == "Magical Footwear" || secondFirstRune == "Magical Footwear") ? 10 : 0)
        bonusMS += ((mainThirdRune == "Waterwalking" || secondSecondRune == "Waterwalking") && steroidStats["Runes"] ? 25 : 0)
        // https://leagueoflegends.fandom.com/wiki/Movement_speed
        obj["Move Speed"] = 
        obj["Move Speed"] *= (hasStridebreaker ? (1 + 0.02 * nbLegendary): 1)
        obj["Move Speed"] *= (nameChamp == "Aatrox" && steroidStats["R"] && rSkillPoint > 0 ? (1.4 + 0.2 * rSkillPoint): 1)
        obj["Move Speed"] *= (nameChamp == "Ahri" && steroidStats["W"] && wSkillPoint > 0 ? 1.4: 1)
        obj["Move Speed"] *= (nameChamp == "Akali" && steroidStats["P"] ? 1.3 + (level < 6 ? 0 : level < 11 ? 0.1 : level < 16 ? 0.2 : 0.3): 1)
        obj["Move Speed"] *= (nameChamp == "Akali" && steroidStats["W"] && wSkillPoint > 0 ? 1.25 + 0.05 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Akshan" && steroidStats["Q"] ? 1.4 + 0.05 * Math.floor(totalStats["AP"]/100) : 1)
        obj["Move Speed"] *= (nameChamp == "Aphelios" && apheliosStats["Main Weapon"] == "Severum, the Scythe Pistol" && steroidStats["Q"] ? 1.2 + 0.1 * Math.floor(totalStats["AP"]/100) : 1)
        obj["Move Speed"] *= (nameChamp == "Bard" && steroidStats["P"] ? 1.24 : 1)
        obj["Move Speed"] *= (nameChamp == "Bard" && steroidStats["W"] ? 1.3 : 1)
        obj["Move Speed"] *= (nameChamp == "Annie" && steroidStats["E"] ? 1.2 + 0.3 / 17 * (level - 1) : 1)
        obj["Move Speed"] *= (nameChamp == "Janna" && steroidStats["P"] ? 1.06 : 1)
        obj["Move Speed"] *= (nameChamp == "Jayce" && steroidStats["Form"] && steroidStats["E"] ? 1.25 + 0.05 * eSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Karma" && steroidStats["E"] ? 1.4 : 1)
        obj["Move Speed"] *= (nameChamp == "Lulu" && steroidStats["W"] ? 1.25 + 0.05 * Math.floor(totalStats["AP"]/100) : 1)
        obj["Move Speed"] *= (nameChamp == "Kayle" && steroidStats["W"] && wSkillPoint > 0 ? 1.20 + 0.04 * wSkillPoint + 0.08 * Math.floor(totalStats["AP"]/ 100) : 1)
        obj["Move Speed"] *= (nameChamp == "Milio" && steroidStats["E"] && eSkillPoint > 0 ? 1.125 + 0.025 * eSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Naafiri" && steroidStats["R"] && rSkillPoint > 0 ? 1.275 + 0.075 * rSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Nilah" && steroidStats["W"] && wSkillPoint > 0 ? 1.125 + 0.025 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Oriana" && steroidStats["W"] && wSkillPoint > 0 ? 1.25 + 0.05 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp.includes("Renata") && steroidStats["W"] && wSkillPoint > 0 ? 1.075 + 0.025 * wSkillPoint + 0.01 * Math.floor(totalStats["AP"]/100) : 1)
        obj["Move Speed"] *= (nameChamp.includes("Nunu") && steroidStats["P"] ? 1.1 : 1)
        obj["Move Speed"] *= (nameChamp == "Senna" && steroidStats["W"] ? 1.2 + 0.05 * Math.floor(totalStats["AP"]/100) : 1)
        obj["Move Speed"] *= (nameChamp == "Seraphine" && steroidStats["W"] ? 1.2 + 0.04 * Math.floor(totalStats["AP"]/100) : 1)
        obj["Move Speed"] *= (nameChamp == "Sivir" && steroidStats["R"] && rSkillPoint ? 1.15 + 0.05 * rSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Soraka" && steroidStats["Q"] && qSkillPoint ? 1.175 + 0.025 * qSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Sona" && steroidStats["E"] && eSkillPoint ? 1.1 + 0.01 * eSkillPoint + 0.02 * Math.floor(totalStats["AP"]/100) : 1)
        obj["Move Speed"] *= (nameChamp == "Yuumi" && steroidStats["E"] ? 1.2 : 1)
        obj["Move Speed"] *= (nameChamp == "Zilean" && steroidStats["E"] && eSkillPoint > 0 ? 1.25 + 0.15 * eSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Blitzcrank" && steroidStats["W"] && wSkillPoint > 0 ? 1.65 + 0.05 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Braum" && steroidStats["E"] ? 1.1 : 1)
        obj["Move Speed"] *= (nameChamp == "Camille" && steroidStats["Q"] && qSkillPoint > 0 ? 1.15 + 0.05 * qSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Corki" && steroidStats["P"] ? 1.4 : 1)
        obj["Move Speed"] *= (nameChamp.includes("Mundo") && steroidStats["R"] && rSkillPoint > 0 ? 1.05 + 0.1 * rSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Draven" && steroidStats["W"] && wSkillPoint > 0 ? 1.45 + 0.05 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Ekko" && steroidStats["P"] ? 1.5 + 0.1 * (level < 6 ? 0 : level < 11 ? 1 : level < 16 ? 2 : 3 ) : 1)
        obj["Move Speed"] *= (nameChamp == "Evelynn" && steroidStats["E"] ? 1.3 : 1)
        obj["Move Speed"] *= (nameChamp == "Fiora" && steroidStats["P"] ? 1.2 + 0.1 * rSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Fiora" && steroidStats["R"] ? 1 + 0.1 * rSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Gankplank" && steroidStats["P"] ? 1.15 + 0.15 / 17 * (level - 1) : 1)
        obj["Move Speed"] *= (nameChamp == "Garen" && steroidStats["Q"] ? 1.35 : 1)
        obj["Move Speed"] *= (nameChamp == "Gnar" && steroidStats["P"] && !steroidStats["Form"] ? 1.2 + 0.2 * rSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Heimerdinger" && steroidStats["P"] ? 1.2 : 1)
        obj["Move Speed"] *= (nameChamp == "Janna" && wSkillPoint > 0 ? 1.05 + 0.01 * wSkillPoint + 0.02 * Math.floor(totalStats["AP"]/100) : 1)
        obj["Move Speed"] *= (nameChamp == "Jhin" ? 1.1 + 0.004 * Math.floor(obj["Attack Speed %"]/100) : 1)
        obj["Move Speed"] *= (nameChamp == "Jinx" && steroidStats["P"] ? 2.75 : 1)
        obj["Move Speed"] *= (nameChamp.includes("Kai") && nameChamp.includes("Sa") && steroidStats["E"] && eSkillPoint > 0 ? (1.5 + 0.05 * eSkillPoint) * (1 + 0.01 * Math.floor(obj["Attack Speed %"]/100)) : 1)
        obj["Move Speed"] *= (nameChamp == "Katarina" && wSkillPoint > 0 ? 1.4 + 0.1 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Kayle" && steroidStats["P"] ? 1.1 : 1)
        obj["Move Speed"] *= (nameChamp == "Kennen" && steroidStats["E"] ? 2 : 1)
        obj["Move Speed"] *= (nameChamp.includes("Kha") && nameChamp.includes("Zix") && steroidStats["R"] ? 1.4 : 1)
        obj["Move Speed"] *= (nameChamp == "Kled" && steroidStats["E"] ? 1.5 : 1)
        obj["Move Speed"] *= (nameChamp.includes("Kog") && nameChamp.includes("Maw") && steroidStats["P"] ? 1.4 : 1)
        obj["Move Speed"] *= (nameChamp == "Lillia" && steroidStats["Q"] && qSkillPoint > 0 ? 1.08 + 0.04 * qSkillPoint + 0.12 * Math.floor(totalStats["AP"]/100) : 1)
        obj["Move Speed"] *= (nameChamp == "Malphite" && steroidStats["Q"] && qSkillPoint > 0 ? 1.15 + 0.05 * qSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Maokai" && steroidStats["R"] && rSkillPoint > 0 ? 1.3 + 0.1 * rSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp.includes("Master") && steroidStats["R"] && rSkillPoint > 0 ? 1.25 + 0.1 * rSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Mordekaiser" && steroidStats["P"] ? (level < 6 ? 1.03 : level < 11 ? 1.06 : 1.09) : 1)
        obj["Move Speed"] *= (nameChamp == "Morgana" && steroidStats["R"] && rSkillPoint > 0 ? 0.80 + 0.25 * rSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Neeko" && steroidStats["W"] && wSkillPoint > 0 ? 1.15 + 0.05 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Nidalee" && steroidStats["P"] ? 1.3 : 1)
        obj["Move Speed"] *= (nameChamp == "Nocturne" && steroidStats["E"] ? 1.9 : 1)
        obj["Move Speed"] *= (nameChamp == "Nocturne" && steroidStats["Q"] && qSkillPoint > 0 ? 1.1 + 0.05 * qSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Olaf" && steroidStats["R"] && rSkillPoint > 0 ? 0.95 + 0.25 * rSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Pantheon" && steroidStats["P"] && steroidStats["E"] ? 1.6 : 1)
        obj["Move Speed"] *= (nameChamp == "Poppy" && steroidStats["W"] ? 1.4 : 1)
        obj["Move Speed"] *= (nameChamp == "Pyke" && steroidStats["W"] ? 1.4 + 0.015 * totalStats["Leth"] : 1)
        obj["Move Speed"] *= (nameChamp == "Quinn" && wSkillPoint > 0 ? 1.15 + 0.05 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Rakan" && steroidStats["R"] ? 1.75 : 1)
        obj["Move Speed"] *= (nameChamp == "Rell" && steroidStats["Form"] && steroidStats["W"] ? 1.3 : 1)
        obj["Move Speed"] *= (nameChamp == "Rell" && steroidStats["E"] && eSkillPoint > 0 ? 1.25 + 0.05 * eSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Rengar" && steroidStats["P"] ? level < 7 ? 1.3 : level < 13 ? 1.4 : 1.5 : 1)
        obj["Move Speed"] *= (nameChamp == "Rengar" && steroidStats["R"] && rSkillPoint > 0 ? 1.3 + 0.1 * rSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Rumble" && steroidStats["W"] && wSkillPoint > 0 ? 1.05 + 0.05 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Ryze" && steroidStats["Q"] && qSkillPoint > 0 ? 1.24 + 0.04 * qSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Samira" && steroidStats["P"] ? 1.12 + 0.03 * (level < 6 ? 0 : level < 11 ? 1 : level < 16 ? 2 : 3) : 1)
        obj["Move Speed"] *= (nameChamp == "Senna" && steroidStats["P"] ? 1.1 + (level < 6 ? 0 : level < 9 ? 0.05 : 0.1) : 1)
        obj["Move Speed"] *= (nameChamp == "Sett" && steroidStats["Q"] ? 1.3 : 1)
        obj["Move Speed"] *= (nameChamp == "Shyvana" && steroidStats["W"] && wSkillPoint > 0 ? 1.25 + 0.05 * wSkillPoint + 0.08 * Math.floor(totalStats["AP"]/100) : 1)
        obj["Move Speed"] *= (nameChamp == "Singed" && steroidStats["P"] ? 1.25 : 1)
        obj["Move Speed"] *= (nameChamp == "Sion" && steroidStats["P"] ? 1.67 : 1)
        obj["Move Speed"] *= (nameChamp == "Skarner" && steroidStats["W"] ? 1.16 + 0.04 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Soraka" && steroidStats["P"] ? 1.7 : 1)
        obj["Move Speed"] *= (nameChamp.includes("Tahm") && nameChamp.includes("Kench") && steroidStats["R"] ? 1.4 : 1)
        obj["Move Speed"] *= (nameChamp == "Talon" && steroidStats["R"] && rSkillPoint > 0 ? 1.25 + 0.15 * rSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Taliyah" && steroidStats["P"] ? 1.1 + 0.05 * (level < 9 ? 0 : level < 12 ? 1 : level < 15 ? 3 : 6) : 1)
        obj["Move Speed"] *= (nameChamp == "Teemo" && steroidStats["W"] && wSkillPoint > 0 ? 1.12 + 0.08 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Trundle" && steroidStats["W"] && wSkillPoint > 0 ? 1.12 + 0.08 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Twitch" && steroidStats["Q"] ? 1.1 : 1)
        obj["Move Speed"] *= (nameChamp == "Udyr" && steroidStats["E"] && eSkillPoint > 0 ? 1.23 + 0.07 * eSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Viego" && steroidStats["P"] ? 1.1 : 1)
        obj["Move Speed"] *= (nameChamp == "Viego" && steroidStats["E"] && eSkillPoint > 0 ? 1.225 + 0.025 * eSkillPoint + 0.04 * Math.floor(totalStats["AP"]/100) : 1)
        obj["Move Speed"] *= (nameChamp == "Viktor" && steroidStats["Q"] && steroidStats["P"] ? 1.3 : 1)
        obj["Move Speed"] *= (nameChamp == "Vladimir" && steroidStats["Q"] ? 1.1 + (level < 6 ? 0 : level < 11 ? 0.1 : level < 16 ? 0.2 : 0.3) : 1)
        obj["Move Speed"] *= (nameChamp == "Vladimir" && steroidStats["W"] ? 1.375: 1)
        obj["Move Speed"] *= (nameChamp == "Volibear" && steroidStats["Q"] && qSkillPoint > 0 ? 1.08 + 0.08 * qSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Warwick" && steroidStats["W"] && wSkillPoint > 0 ? 1.75 + 0.125 * wSkillPoint : 1)
        obj["Move Speed"] *= (nameChamp == "Wukong" && steroidStats["R"] ? 1.2 : 1)
        obj["Move Speed"] *= (nameChamp == "Xayah" && steroidStats["W"] ? 1.3 : 1)
        obj["Move Speed"] *= (nameChamp == "Yone" && steroidStats["E"] ? 1.15 : 1)
        obj["Move Speed"] *= (nameChamp == "Zac" && steroidStats["R"] ? 1.5 : 1)
        obj["Move Speed"] *= (nameChamp == "Zeri" && steroidStats["R"] ? 1.4 : 1)
        obj["Move Speed"] *= (nameChamp == "Zoe" && steroidStats["W"] && wSkillPoint > 0 ? 1.2 + 0.1 * wSkillPoint : 1)
        obj["Move Speed"] *= (hasCrown ? (1 + 0.01 * nbLegendary): 1)
        obj["Move Speed"] *= (hasBOTRK && steroidStats["Items"] ? 1.25 : 1)
        obj["Move Speed"] *= (hasYoumuu && steroidStats["Items"] ? 1.25 : 1)
        obj["Move Speed"] *= (hasHarvester && steroidStats["Items"] ? 1.25 : 1)
        obj["Move Speed"] *= (hasPhantom && steroidStats["Items"] ? 1.07 : 1)
        obj["Move Speed"] *= (hasRocketbelt && steroidStats["Items"] ? 1.3 : 1)
        obj["Move Speed"] *= (hasShurelya && steroidStats["Items"] ? 1.3 : 1)
        obj["Move Speed"] *= (hasLuden && steroidStats["Items"] ? 1.15 : 1)
        obj["Move Speed"] *= (hasCosmicDrive  && steroidStats["Items"] ? 1.2 : 1 )
        obj["Move Speed"] *= (hasROA  && steroidStats["Items"] ? 1.35 : 1)
        obj["Move Speed"] *= (hasForceNature  && steroidStats["Items"] ? 1.10 : 1)
        obj["Move Speed"] *= (hasStormrazor  && steroidStats["Items"] ? 1.45 : 1)
        obj["Move Speed"] *= (hasChemtank  && steroidStats["Items"] ? 1.4 : 1)
        obj["Move Speed"] *= (hasShojin  && steroidStats["Items"] ? (data["Melee?"] == 1 ? 1.15 : 1.1) : 1)
        obj["Move Speed"] *= (hasMejai ? stackMejai >= 10 ? 1.1 : 1 : 1)
        obj["Move Speed"] *= (nameChamp == "Cassiopeia" && steroidStats["Q"] && qSkillPoint > 0 ? 1 + 0.25 + 0.05 * qSkillPoint : 1)
        obj["Move Speed"] *= (mainRune == "Fleet Footwork" && steroidStats["Runes"] ? 1.2 : 1)
        obj["Move Speed"] *= (mainRune == "Predator" && steroidStats["Runes"] ? (level < 8 ? 1.25 : 1.25 + 0.023 * (level - 7)) : 1)
        obj["Move Speed"] *= (mainRune == "Phase Rush" && steroidStats["Runes"] ? (data["Melee?"] == 1 ? level == 1 ? 1.3 : level == 2 ? 1.3176 : level == 3 ? 1.3353 : level == 4 ? 1.3529 : level == 5 ? 1.3706 : level == 6 ? 1.3882 : level == 7 ? 1.4059 : level == 8 ? 1.4235 : level == 9 ? 1.4412 : level == 10 ? 1.4588 : level == 11 ? 1.4765 : level == 12 ? 1.4941 : level == 13 ? 1.5118 : level == 14 ? 1.5294 : level == 15 ? 1.5471 : level == 16 ? 1.5647 : level == 17 ? 1.5824 : 1.6 : level == 1 ? 1.15 : level == 2 ? 1.1647 : level == 3 ? 1.1794 : level == 4 ? 1.1941 : level == 5 ? 1.2088 : level == 6 ? 1.2235 : level == 7 ? 1.2382 : level == 8 ? 1.2529 : level == 9 ? 1.2676 : level == 10 ? 1.2824 : level == 11 ? 1.2971 : level == 12 ? 1.3118 : level == 13 ? 1.3265 : level == 14 ? 1.3412 : level == 15 ? 1.3559 : level == 16 ? 1.3706 : level == 17 ? 1.3853 : 1.4) : 1)
        obj["Move Speed"] *= ((mainFirstRune == "Nimbus Cloak" || secondFirstRune == "Nimbus Cloak") && steroidStats["Runes"] ? 1.25 : 1)
        obj["Move Speed"] *= ((mainThirdRune == "Celerity" || secondSecondRune == "Celerity") ? 1.1 : 1)
        obj["Move Speed"] *= (1 + 0.07 * gameStats["Cloud"])
        obj["Move Speed"] *= (bonusStats["Cloud"] && steroidStats["R"] ? 1.6 : 1)

    },[gameStats,itemStats, runeStats, enemyItemStats, enemyStats, bonusStats, steroidStats, apheliosStats])

    return (
        <div className="character-details" style={{backgroundImage: `url(${imgSplash})`}}>
            <div className='character-banniere'>
                <Link href={'/'}>
                    <img
                        src="../../images/logo.PNG"
                        alt="logo S.GG" 
                    />
                </Link>
                <p style={{width : '1px', height : '100px', backgroundColor : '#f9f8f8', borderRadius : '20px'}}></p>
                {data != undefined && (
                    <h1>{nameChamp.toUpperCase()}</h1>
                )}
                <p style={{width : '1px', height : '100px', backgroundColor : '#f9f8f8', borderRadius : '20px'}}></p>
                <div>
                    <p>Level</p>
                    <select value={level} onChange={handleChange}>
                        {options}
                    </select>
                </div>
            </div>
            <div className='character-statistiques'>
                {data != undefined && (
                    <>
                        <StatsTable 
                            stats={{
                                "Hp": basicStatsChampion["Hp"],
                                "Attack Damage": basicStatsChampion["Attack Damage"],
                                "Attack Speed %": basicStatsChampion["Attack Speed %"],
                                "Armor": basicStatsChampion["Armor"],
                                "Magic Resist": basicStatsChampion["Magic Resist"],
                                "Move Speed": basicStatsChampion["Move Speed"],
                                "Lifesteal": basicStatsChampion["Lifesteal"],
                                "Critical %":  basicStatsChampion["Critical %"], 
                                "Hp Regen": basicStatsChampion["Hp Regen"],

                                [textMana] : basicStatsChampion["Mana"],
                                "Ability Power": basicStatsChampion["Ability Power"],
                                "Range": basicStatsChampion["Range"],
                                "Armor Penetration": basicStatsChampion["Armor Penetration"],
                                "Resist Penetration": basicStatsChampion["Resist Penetration"],
                                "Ability Haste": basicStatsChampion["Ability Haste"],
                                "Spellvamp %": basicStatsChampion["Spellvamp %"],
                                "Tenacity %": basicStatsChampion["Tenacity %"],
                                [textMana + " / Regen"]: basicStatsChampion["Mana / Regen"],
                            }} 
                       
                        />
                { /**       <SkillsTable 
                            statsChamp={{
                                "Hp": basicStatsChampion["Hp"],
                                "Attack Damage": basicStatsChampion["Attack Damage"],
                                "Attack Speed %": basicStatsChampion["Attack Speed %"],
                                "Armor": basicStatsChampion["Armor"],
                                "Magic Resist": basicStatsChampion["Magic Resist"],
                                "Move Speed": basicStatsChampion["Move Speed"],
                                "Lifesteal": basicStatsChampion["Lifesteal"],
                                "Critical %":  basicStatsChampion["Critical %"], 
                                "Hp Regen": basicStatsChampion["Hp Regen"],

                                [textMana] : basicStatsChampion["Mana"],
                                "Ability Power": basicStatsChampion["Ability Power"],
                                "Range": basicStatsChampion["Range"],
                                "Armor Penetration": basicStatsChampion["Armor Penetration"],
                                "Resist Penetration": basicStatsChampion["Resist Penetration"],
                                "Ability Haste": basicStatsChampion["Ability Haste"],
                                "Spellvamp %": basicStatsChampion["Spellvamp %"],
                                "Tenacity %": basicStatsChampion["Tenacity %"],
                                [textMana + " / Regen"]: basicStatsChampion["Mana / Regen"],
                            }}
                            statsSpell={data}
                            additionnalStats={{
                                "Hp": additionnalStats["Hp"],
                                "Attack Damage": additionnalStats["Attack Damage"],
                                "Attack Speed %": additionnalStats["Attack Speed %"],
                                "Armor": additionnalStats["Armor"],
                                "Magic Resist": additionnalStats["Magic Resist"],
                                "Move Speed": additionnalStats["Move Speed"],
                                "Lifesteal": additionnalStats["Lifesteal"],
                                "Critical %":  additionnalStats["Critical %"], 
                                "Hp Regen": basicStatsChampion["Hp Regen"],

                                [textMana] : additionnalStats["Mana"],
                                "Ability Power": additionnalStats["Ability Power"],
                                "Range": additionnalStats["Range"],
                                "Armor Penetration": additionnalStats["Armor Penetration"],
                                "Resist Penetration": additionnalStats["Resist Penetration"],
                                "Ability Haste": additionnalStats["Ability Haste"],
                                "Spellvamp %": additionnalStats["Spellvamp %"],
                                "Tenacity %": additionnalStats["Tenacity %"],
                                [textMana + " / Regen"]: additionnalStats["Mana / Regen"],
                            }}
                            passiveSkillPoint={level}
                        />  */}
                        {/** RUNES STATS */}
                        <div className="stats-table">
                            <div>
                                <h1>Runes</h1>
                            </div>
                            <div className='stats-table-row'>
                                <table>
                                    <thead>
                                        <tr>
                                            <td colspan="2">
                                                Main Tree
                                            </td>
                                        </tr>          
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Main Rune
                                            </td>
                                            <td>
                                                <select value={nameMainRune} onChange={(e) => {
                                                    setNameMainRune(e.target.value)
                                                }}>
                                                    {listMainRune.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        {nameMainRune != '' &&  nameMainRune != "-" && (
                                            <>
                                                <tr>
                                                    <td>Keystone</td>
                                                    <td>
                                                        <select value={mainRune} onChange={(e) => {
                                                            setMainRune(e.target.value)
                                                        }}>
                                                            {setUpMainRunes(nameMainRune).map((value) => {
                                                                return value
                                                            })}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>First Rune</td>
                                                    <td>
                                                        <select value={mainFirstRune} onChange={(e) => {
                                                            setMainFirstRune(e.target.value)
                                                        }}>
                                                            {setUpFirstRunes(nameMainRune).map((value) => {
                                                                return value
                                                            })}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Second Rune</td>
                                                    <td>
                                                        <select value={mainSecondRune} onChange={(e) => {
                                                            setMainSecondRune(e.target.value)
                                                        }}>
                                                            {setUpSecondRunes(nameMainRune).map((value) => {
                                                                return value
                                                            })}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Third Rune</td>
                                                    <td>
                                                        <select value={mainThirdRune} onChange={(e) => {
                                                            setMainThirdRune(e.target.value)
                                                        }}>
                                                            {setUpThirdRunes(nameMainRune).map((value) => {
                                                                return value
                                                            })}
                                                        </select>
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                    <thead>                                   
                                        <tr>
                                            <td colspan="2">
                                                Secondary Tree
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Second Rune
                                            </td>
                                            <td>
                                                <select value={secondRune} onChange={(e) => {
                                                    setSecondRune(e.target.value)
                                                }}>
                                                    {listMainRune.map((value, index) => {
                                                        if (value == '-')
                                                            return(
                                                                    <option value={value} key={index}>{value}</option>
                                                                )
                                                        if (value != nameMainRune)
                                                            return(
                                                                <option value={value} key={index}>{value}</option>
                                                            )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        {secondRune != '' && secondRune != "-" && (
                                            <>
                                                <tr>
                                                    <td>
                                                        First Rune
                                                    </td>
                                                    <td>
                                                        <select value={secondFirstRune} onChange={(e) => {
                                                            setSecondFirstRune(e.target.value)
                                                        }}>
                                                            {setUpFirstRunes(secondRune).map((value) => {
                                                                return value
                                                            })}
                                                            {setUpSecondRunes(secondRune).map((value) => {
                                                               return value
                                                            })}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Second Rune
                                                    </td>
                                                    <td>
                                                        <select value={secondSecondRune} onChange={(e) => {
                                                            setSecondSecondRune(e.target.value)
                                                        }}>
                                                            {setUpSecondRunes(secondRune).map((value) => {
                                                                return value
                                                            })}
                                                            {setUpThirdRunes(secondRune).map((value) => {
                                                                return value
                                                            })}
                                                        </select>
                                                    </td>
                                                </tr>
                                            </>
                                        )} 
                                    </tbody>
                                    <thead>                                   
                                        <tr>
                                            <td colspan="2">
                                                Shards
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Offensive Shard
                                            </td>
                                            <td>
                                                <select value={offensiveShard} onChange={(e) => {
                                                    setOffensiveShard(e.target.value)
                                                }}>
                                                    {listOffensiveShard.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Mixed Shard
                                            </td>
                                            <td>
                                                <select value={mixedShard} onChange={(e) => {
                                                    setMixedShard(e.target.value)
                                                }}>
                                                    {listMixedShard.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Defensive Shard
                                            </td>
                                            <td>
                                                <select value={defensiveShard} onChange={(e) => {
                                                    setDefensiveShard(e.target.value)
                                                }}>
                                                    {listDefensiveShard.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                    {(nameMainRune == 'Precision' || nameMainRune == 'Domination' || secondRune == 'Precision' || secondRune == 'Domination') && (
                                        <>
                                            <thead>
                                                <tr>
                                                    <td colspan="2">
                                                        Stacks
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {mainRune == 'Conqueror' && (
                                                <tr>
                                                    <td>
                                                        Conqueror
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number" 
                                                            value={stackConqueror}
                                                            max={12}
                                                            min={0}
                                                            onChange={(e) => {
                                                                let value = e.target.value
                                                                value = value != "" ? parseInt(value) : 0
                                                                setStackConqueror(value)
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            )}
                                           {mainRune == 'Dark Harvest' && (
                                                <tr>
                                                    <td>
                                                        Dark Harvest
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number" 
                                                            value={stackDarkHarvest}
                                                            min={0}
                                                            onChange={(e) => {
                                                                let value = e.target.value
                                                                value = value != "" ? parseInt(value) : 0
                                                                setStackDarkHarvest(value)
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            )}
                                            {(listLegend.includes(mainSecondRune) || listLegend.includes(secondFirstRune) || listLegend.includes(secondSecondRune)) && (
                                                <tr>
                                                    <td>
                                                        Legend 
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number" 
                                                            value={stackLegendExceptBloodline}
                                                            max={10}
                                                            min={0}
                                                            onChange={(e) => {
                                                                let value = e.target.value
                                                                value = value != "" ? parseInt(value) : 0
                                                                setStackLegendExceptBloodline(value)
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            )}
                                            {(mainSecondRune == 'Bloodline'|| secondFirstRune == 'Bloodline' || secondSecondRune == 'Bloodline' ) && (
                                                <tr>
                                                    <td>
                                                        Legend : Bloodline
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number" 
                                                            value={stackLegendBloodline}
                                                            max={15}
                                                            min={0}
                                                            onChange={(e) => {
                                                                let value = e.target.value
                                                                value = value != "" ? parseInt(value) : 0
                                                                setStackLegendBloodline(value)
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            )}
                                            {(listBounty.includes(mainThirdRune)  || listBounty.includes(secondSecondRune)) && (
                                                <tr>
                                                    <td>
                                                        Bounty
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number" 
                                                            value={stackBounty}
                                                            max={5}
                                                            min={0}
                                                            onChange={(e) => {
                                                                let value = e.target.value
                                                                value = value != "" ? parseInt(value) : 0
                                                                setStackBounty(value)
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </>
                                    )}
                                </table>
                            </div>
                        </div>
                        {/** Items Stats */}
                        <div className="stats-table">
                            <div>
                                <h1>Items</h1>
                            </div>             
                            <div className='stats-table-row'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {itemSlot1 != '-' && (
                                                    <img
                                                        src={`../../images/item/${itemImg1}`}
                                                        alt="Item Mythic" 
                                                    />
                                                )}
                                                {itemSlot1 == '-' && "Mythic"}
                                            </td>
                                            <td>
                                                <select value={itemSlot1} onChange={(e) => {
                                                    setItemSlot1(e.target.value)
                                                }}>
                                                    {listItemsMythics.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {itemSlot2 != '-' && (
                                                    <img
                                                        src={`../../images/item/${itemImg2}`}
                                                        alt="Item 2" 
                                                    />
                                                )}
                                                {itemSlot2 == '-' && "Item 2"}
                                            </td>
                                            <td>
                                                <select value={itemSlot2} onChange={(e) => {
                                                    setItemSlot2(e.target.value)
                                                }}>
                                                    {listStarterItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listBoots.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    
                                                    {listBasicItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listEpicItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listItemsLegendary.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {itemSlot3 != '-' && (
                                                    <img
                                                        src={`../../images/item/${itemImg3}`}
                                                        alt="Item 3" 
                                                    />
                                                )}
                                                {itemSlot3 == '-' && "Item 3"}
                                            </td>
                                            <td>
                                                <select value={itemSlot3} onChange={(e) => {
                                                    setItemSlot3(e.target.value)
                                                }}>
                                                    {listStarterItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listBoots.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listBasicItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listEpicItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listItemsLegendary.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {itemSlot4 != '-' && (
                                                    <img
                                                        src={`../../images/item/${itemImg4}`}
                                                        alt="Item 4" 
                                                    />
                                                )}
                                                {itemSlot4 == '-' && "Item 4"}
                                            </td>
                                            <td>
                                                <select value={itemSlot4} onChange={(e) => {
                                                    setItemSlot4(e.target.value)
                                                }}>
                                                    {listStarterItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listBoots.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listBasicItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listEpicItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listItemsLegendary.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            {itemSlot5 != '-' && (
                                                    <img
                                                        src={`../../images/item/${itemImg5}`}
                                                        alt="Item 5" 
                                                    />
                                                )}
                                                {itemSlot5 == '-' && "Item 5"}
                                            </td>
                                            <td>
                                                <select value={itemSlot5} onChange={(e) => {
                                                    setItemSlot5(e.target.value)
                                                }}>
                                                    {listStarterItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listBoots.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listBasicItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listEpicItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listItemsLegendary.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {itemSlot6 != '-' && (
                                                    <img
                                                        src={`../../images/item/${itemImg6}`}
                                                        alt="Item 6" 
                                                    />
                                                )}
                                                {itemSlot6 == '-' && "Item 6"}
                                            </td>
                                            <td>
                                                <select value={itemSlot6} onChange={(e) => {
                                                    setItemSlot6(e.target.value)
                                                }}>
                                                    {listStarterItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listBoots.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listBasicItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listEpicItem.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {listItemsLegendary.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {elixirSlot != '-' && (
                                                    <img
                                                        src={`../../images/item/${itemImg7}`}
                                                        alt="Elixir" 
                                                    />
                                                )}
                                                {elixirSlot == '-' && "Elixir"}
                                            </td>
                                            <td>
                                                <select value={elixirSlot} onChange={(e) => {
                                                    setElixirSlot(e.target.value)
                                                }}>
                                                    {listElixir.map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>                  
                        </div>
                        {/** Bonus / Steroid Stats */}
                        <div className="stats-table">
                            <div>
                                <h1>Bonus Stats</h1>
                            </div>
                            <div className='stats-table-row'>
                                <table>
                                    <thead>
                                        <tr>
                                            <td colspan="2">
                                                Soul
                                            </td>
                                        </tr>          
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Chemtech
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    id="chemSoul"
                                                    name="chemSoul"
                                                    checked={bonusStats["Chem"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "Ardent" : bonusStats["Ardent"],
                                                            "Chem" : value,
                                                            "Cloud" : false,
                                                            "Elder" : bonusStats["Elder"],
                                                            "Hextech" : false,
                                                            "Infernal" : false,
                                                            "Mountain" : false,
                                                            "Ocean" : false,
                                                            "Recently Hit" : bonusStats["Recently Hit"]
                                                        }
                                                        setBonusStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Cloud
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    id="cloudSoul"
                                                    name="cloudSoul"
                                                    checked={bonusStats["Cloud"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "Ardent" : bonusStats["Ardent"],
                                                            "Chem" :false,
                                                            "Cloud" : value,
                                                            "Elder" : bonusStats["Elder"],
                                                            "Hextech" :false,
                                                            "Infernal" : false,
                                                            "Mountain" : false,
                                                            "Ocean" : false,
                                                            "Recently Hit" : bonusStats["Recently Hit"]
                                                        }
                                                        setBonusStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Hextech
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    id="hexSoul"
                                                    name="hexSoul"
                                                    checked={bonusStats["Hextech"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "Ardent" : bonusStats["Ardent"],
                                                            "Chem" :false,
                                                            "Cloud" : false,
                                                            "Elder" : bonusStats["Elder"],
                                                            "Hextech" :value,
                                                            "Infernal" : false,
                                                            "Mountain" : false,
                                                            "Ocean" : false,
                                                            "Recently Hit" : bonusStats["Recently Hit"]
                                                        }
                                                        setBonusStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Infernal
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    id="infernalSoul"
                                                    name="infernalSoul"
                                                    checked={bonusStats["Infernal"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "Ardent" : bonusStats["Ardent"],
                                                            "Chem" :false,
                                                            "Cloud" : false,
                                                            "Elder" : bonusStats["Elder"],
                                                            "Hextech" :false,
                                                            "Infernal" : value,
                                                            "Mountain" : false,
                                                            "Ocean" : false,
                                                            "Recently Hit" : bonusStats["Recently Hit"]
                                                        }
                                                        setBonusStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Mountain
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    id="mountainSoul"
                                                    name="mountainSoul"
                                                    checked={bonusStats["Mountain"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "Ardent" : bonusStats["Ardent"],
                                                            "Chem" :false,
                                                            "Cloud" : false,
                                                            "Elder" : bonusStats["Elder"],
                                                            "Hextech" :false,
                                                            "Infernal" : false,
                                                            "Mountain" : value,
                                                            "Ocean" : false,
                                                            "Recently Hit" : bonusStats["Recently Hit"]
                                                        }
                                                        setBonusStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Ocean
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    id="oceanSoul"
                                                    name="oceanSoul"
                                                    checked={bonusStats["Ocean"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "Ardent" : bonusStats["Ardent"],
                                                            "Chem" :false,
                                                            "Cloud" : false,
                                                            "Elder" : bonusStats["Elder"],
                                                            "Hextech" :false,
                                                            "Infernal" : false,
                                                            "Mountain" : false,
                                                            "Ocean" : value,
                                                            "Recently Hit" : bonusStats["Recently Hit"]
                                                        }
                                                        setBonusStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <td colspan="2">
                                                Other
                                            </td>
                                        </tr>  
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Ardent
                                            </td>
                                            <td>
                                                <input
                                                        type="checkbox"
                                                        id="ardent"
                                                        name="ardent"
                                                        checked={bonusStats["Ardent"]}
                                                        onChange={(e) => {
                                                            let value = e.target.checked
                                                            let obj = {
                                                                "Ardent" : value,
                                                                "Chem" : bonusStats["Chem"],
                                                                "Cloud" : bonusStats["Cloud"],
                                                                "Elder" : bonusStats["Elder"],
                                                                "Hextech" : bonusStats["Hextech"],
                                                                "Infernal" : bonusStats["Infernal"],
                                                                "Mountain" : bonusStats["Mountain"],
                                                                "Ocean" : bonusStats["Ocean"],
                                                                "Recently Hit" : bonusStats["Recently Hit"]
                                                            }
                                                            setBonusStats(obj)
                                                        }}
                                                    />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Elder
                                            </td>
                                            <td>
                                                <input
                                                        type="checkbox"
                                                        id="elder"
                                                        name="elder"
                                                        checked={bonusStats["Elder"]}
                                                        onChange={(e) => {
                                                            let value = e.target.checked
                                                            let obj = {
                                                                "Ardent" : bonusStats["Ardent"],
                                                                "Chem" : bonusStats["Chem"],
                                                                "Cloud" : bonusStats["Cloud"],
                                                                "Elder" : value,
                                                                "Hextech" : bonusStats["Hextech"],
                                                                "Infernal" : bonusStats["Infernal"],
                                                                "Mountain" : bonusStats["Mountain"],
                                                                "Ocean" : bonusStats["Ocean"],
                                                                "Recently Hit" : bonusStats["Recently Hit"]
                                                            }
                                                            setBonusStats(obj)
                                                        }}
                                                    />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Recently Hit
                                            </td>
                                            <td>
                                                <input
                                                        type="checkbox"
                                                        id="recent"
                                                        name="recent"
                                                        checked={bonusStats["Recently Hit"]}
                                                        onChange={(e) => {
                                                            let value = e.target.checked
                                                            let obj = {
                                                                "Ardent" : bonusStats["Ardent"],
                                                                "Chem" : bonusStats["Chem"],
                                                                "Cloud" : bonusStats["Cloud"],
                                                                "Elder" : bonusStats["Elder"],
                                                                "Hextech" : bonusStats["Hextech"],
                                                                "Infernal" : bonusStats["Infernal"],
                                                                "Mountain" : bonusStats["Mountain"],
                                                                "Ocean" : bonusStats["Ocean"],
                                                                "Recently Hit" : value
                                                            }
                                                            setBonusStats(obj)
                                                        }}
                                                    />
                                            </td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <td colspan="2">
                                                Active / Passive Bonus
                                            </td>
                                        </tr>          
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Passive
                                            </td>
                                            <td>
                                            <input
                                                    type="checkbox"
                                                    id="steroidPassive"
                                                    name="steroidPassive"
                                                    checked={steroidStats["P"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "E" : steroidStats["E"],
                                                            "Form" : steroidStats["Form"],
                                                            "Items" : steroidStats["Items"],
                                                            "P" : value,
                                                            "Q" : steroidStats["Q"],
                                                            "R" : steroidStats["R"],
                                                            "Runes" : steroidStats["Runes"],
                                                            "W" : steroidStats["W"]
                                                        }
                                                        setSteroidStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Q
                                            </td>
                                            <td>
                                            <input
                                                    type="checkbox"
                                                    id="steroidQ"
                                                    name="steroidQ"
                                                    checked={steroidStats["Q"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "E" : steroidStats["E"],
                                                            "Form" : steroidStats["Form"],
                                                            "Items" : steroidStats["Items"],
                                                            "P" : steroidStats["P"],
                                                            "Q" : value,
                                                            "R" : steroidStats["R"],
                                                            "Runes" : steroidStats["Runes"],
                                                            "W" : steroidStats["W"]
                                                        }
                                                        setSteroidStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                W
                                            </td>
                                            <td>
                                            <input
                                                    type="checkbox"
                                                    id="steroidW"
                                                    name="steroidW"
                                                    checked={steroidStats["W"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "E" : steroidStats["E"],
                                                            "Form" : steroidStats["Form"],
                                                            "Items" : steroidStats["Items"],
                                                            "P" : steroidStats["P"],
                                                            "Q" : steroidStats["Q"],
                                                            "R" : steroidStats["R"],
                                                            "Runes" : steroidStats["Runes"],
                                                            "W" : value
                                                        }
                                                        setSteroidStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                E
                                            </td>
                                            <td>
                                            <input
                                                    type="checkbox"
                                                    id="steroidE"
                                                    name="steroidE"
                                                    checked={steroidStats["E"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "E" : value,
                                                            "Form" : steroidStats["Form"],
                                                            "Items" : steroidStats["Items"],
                                                            "P" : steroidStats["P"],
                                                            "Q" : steroidStats["Q"],
                                                            "R" : steroidStats["R"],
                                                            "Runes" : steroidStats["Runes"],
                                                            "W" : steroidStats["W"]
                                                        }
                                                        setSteroidStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                R
                                            </td>
                                            <td>
                                            <input
                                                    type="checkbox"
                                                    id="steroidR"
                                                    name="steroidR"
                                                    checked={steroidStats["R"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "E" : steroidStats["E"],
                                                            "Form" : steroidStats["Form"],
                                                            "Items" : steroidStats["Items"],
                                                            "P" : steroidStats["P"],
                                                            "Q" : steroidStats["Q"],
                                                            "R" : value,
                                                            "Runes" : steroidStats["Runes"],
                                                            "W" : steroidStats["W"]
                                                        }
                                                        setSteroidStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Form
                                            </td>
                                            <td>
                                            <input
                                                    type="checkbox"
                                                    id="steroidForm"
                                                    name="steroidForm"
                                                    checked={steroidStats["Form"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "E" : steroidStats["E"],
                                                            "Form" : value,
                                                            "Items" : steroidStats["Items"],
                                                            "P" : steroidStats["P"],
                                                            "Q" : steroidStats["Q"],
                                                            "R" : steroidStats["R"],
                                                            "Runes" : steroidStats["Runes"],
                                                            "W" : steroidStats["W"]
                                                        }
                                                        setSteroidStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Items
                                            </td>
                                            <td>
                                            <input
                                                    type="checkbox"
                                                    id="steroidItems"
                                                    name="steroidItems"
                                                    checked={steroidStats["Items"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "E" : steroidStats["E"],
                                                            "Form" : steroidStats["Form"],
                                                            "Items" : value,
                                                            "P" : steroidStats["P"],
                                                            "Q" : steroidStats["Q"],
                                                            "R" : steroidStats["R"],
                                                            "Runes" : steroidStats["Runes"],
                                                            "W" : steroidStats["W"]
                                                        }
                                                        setSteroidStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Runes
                                            </td>
                                            <td>
                                            <input
                                                    type="checkbox"
                                                    id="steroidRunes"
                                                    name="steroidRunes"
                                                    checked={steroidStats["Runes"]}
                                                    onChange={(e) => {
                                                        let value = e.target.checked
                                                        let obj = {
                                                            "E" : steroidStats["E"],
                                                            "Form" : steroidStats["Form"],
                                                            "Items" : steroidStats["Items"],
                                                            "P" : steroidStats["P"],
                                                            "Q" : steroidStats["Q"],
                                                            "R" : steroidStats["R"],
                                                            "Runes" : value,
                                                            "W" : steroidStats["W"]
                                                        }
                                                        setSteroidStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/** ENEMY STATS */}
                        <div className="stats-table">
                            <div>
                                <h1>Enemy Statistics</h1>
                            </div>
                            <div className="stats-table-row">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Champion
                                            </td>
                                            <td>
                                        
                                                <select value={enemyName} onChange={handleEnemyChange}>
                                                    {enemyNameOptions}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Level
                                            </td>
                                            <td>
                                                <select value={enemyLevel} onChange={handleChangeEnemyLevel}>
                                                    {options}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Hp
                                            </td>
                                            <td>
                                                {enemyStats["Hp"] + enemyStats["Hp Bonus"]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Armor
                                            </td>
                                            <td>
                                                {enemyStats["Armor"] + enemyStats["Armor Bonus"]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Magic Resist
                                            </td>
                                            <td>
                                                {enemyStats["Magic Resist"] + enemyStats["Magic Resist Bonus"]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Current Hp
                                            </td>
                                            <td>
                                                {enemyStats["Current Hp"]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Current Hp %
                                            </td>
                                            <td>
                                                {enemyStats["Current Hp %"].toFixed(3)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Hp Bonus
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={enemyStats["Hp Bonus"]}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Armor" : enemyStats["Armor"],
                                                            "Armor Bonus" : enemyStats["Armor Bonus"],
                                                            "Hp Bonus" : value,
                                                            "Current Hp %" : (enemyStats["Hp"] + value - enemyStats["Missing HP"]) / (enemyStats["Hp"] + value) * 100,
                                                            "Current Hp" : enemyStats["Current Hp"],
                                                            "Level" : enemyStats["Level"],
                                                            "Hp" : enemyStats["Hp"],
                                                            "Missing HP" : enemyStats["Missing HP"],
                                                            "Magic Resist" : enemyStats["Magic Resist"],
                                                            "Magic Resist Bonus" : enemyStats["Magic Resist Bonus"],
                                                            "Name" : enemyStats["Name"] 
                                                        }
                                                        setEnemyStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>                                      
                                        <tr>
                                            <td>
                                                Armor Bonus
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={enemyStats["Armor Bonus"]}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Armor" : enemyStats["Armor"],
                                                            "Armor Bonus" : value,
                                                            "Hp Bonus" : enemyStats["Hp Bonus"],
                                                            "Current Hp %" : enemyStats["Current Hp %"],
                                                            "Current Hp" : enemyStats["Current Hp"],
                                                            "Level" : enemyStats["Level"],
                                                            "Hp" : enemyStats["Hp"],
                                                            "Missing HP" : enemyStats["Missing HP"],
                                                            "Magic Resist" : enemyStats["Magic Resist"],
                                                            "Magic Resist Bonus" : enemyStats["Magic Resist Bonus"],
                                                            "Name" : enemyStats["Name"] 
                                                        }
                                                        setEnemyStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Magic Resist Bonus
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={enemyStats["Magic Resist Bonus"]}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Armor" : enemyStats["Armor"],
                                                            "Armor Bonus" : enemyStats["Armor Bonus"],
                                                            "Hp Bonus" : enemyStats["Hp Bonus"],
                                                            "Current Hp %" : enemyStats["Current Hp %"],
                                                            "Current Hp" : enemyStats["Current Hp"],
                                                            "Level" : enemyStats["Level"],
                                                            "Hp" : enemyStats["Hp"],
                                                            "Missing HP" : enemyStats["Missing HP"],
                                                            "Magic Resist" : enemyStats["Magic Resist"],
                                                            "Magic Resist Bonus" : value,
                                                            "Name" : enemyStats["Name"] 
                                                        }
                                                        setEnemyStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Missing Hp
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={enemyStats["Missing HP"]}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Armor" : enemyStats["Armor"],
                                                            "Armor Bonus" : enemyStats["Armor Bonus"],
                                                            "Hp Bonus" : enemyStats["Hp Bonus"],
                                                            "Current Hp %" : (enemyStats["Hp"] + enemyStats["Hp Bonus"] - value) / (enemyStats["Hp"] + enemyStats["Hp Bonus"]) * 100 ,
                                                            "Current Hp" : enemyStats["Hp"] + enemyStats["Hp Bonus"] - value,
                                                            "Level" : enemyStats["Level"],
                                                            "Hp" : enemyStats["Hp"],
                                                            "Missing HP" : value,
                                                            "Magic Resist" : enemyStats["Magic Resist"],
                                                            "Magic Resist Bonus" : enemyStats["Magic Resist Bonus"],
                                                            "Name" : enemyStats["Name"] 
                                                        }
                                                        setEnemyStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/** Game Stats */}
                        <div className="stats-table">
                            <div>
                                <h1>Game Stats</h1>
                            </div>
                            <div className='stats-table-row'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Gametime
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={gameStats["Gametime"]}
                                                    min={0}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Gametime" : value,
                                                            "Chemtech" : gameStats["Chemtech"],
                                                            "Kills" : gameStats["Kills"],
                                                            "Minion" : gameStats["Minion"],
                                                            "Cloud" : gameStats["Cloud"],
                                                            "Hextech" : gameStats["Hextech"],
                                                            "Infernal" : gameStats["Infernal"],
                                                            "Mountain" : gameStats["Mountain"],
                                                            "Ocean" : gameStats["Ocean"]
                                                        }
                                                        setGameStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Kills
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={gameStats["Kills"]}
                                                    min={0}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Gametime" : gameStats["Gametime"],
                                                            "Chemtech" : gameStats["Chemtech"],
                                                            "Kills" : value,
                                                            "Minion" : gameStats["Minion"],
                                                            "Cloud" : gameStats["Cloud"],
                                                            "Hextech" : gameStats["Hextech"],
                                                            "Infernal" : gameStats["Infernal"],
                                                            "Mountain" : gameStats["Mountain"],
                                                            "Ocean" : gameStats["Ocean"]
                                                        }
                                                        setGameStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Minion
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={gameStats["Minion"]}
                                                    min={0}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Gametime" : gameStats["Gametime"],
                                                            "Chemtech" : gameStats["Chemtech"],
                                                            "Kills" : gameStats["Kills"],
                                                            "Minion" : value,
                                                            "Cloud" : gameStats["Cloud"],
                                                            "Hextech" : gameStats["Hextech"],
                                                            "Infernal" : gameStats["Infernal"],
                                                            "Mountain" : gameStats["Mountain"],
                                                            "Ocean" : gameStats["Ocean"]
                                                        }
                                                        setGameStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Chemtech
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={gameStats["Chemtech"]}
                                                    min={0}
                                                    max={4}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Gametime" : gameStats["Gametime"],
                                                            "Chemtech" : value,
                                                            "Kills" : gameStats["Kills"],
                                                            "Minion" : gameStats["Minion"],
                                                            "Cloud" : gameStats["Cloud"],
                                                            "Hextech" : gameStats["Hextech"],
                                                            "Infernal" : gameStats["Infernal"],
                                                            "Mountain" : gameStats["Mountain"],
                                                            "Ocean" : gameStats["Ocean"]
                                                        }
                                                        setGameStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Cloud
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={gameStats["Cloud"]}
                                                    min={0}
                                                    max={4}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Gametime" : gameStats["Gametime"],
                                                            "Chemtech" : gameStats["Chemtech"],
                                                            "Kills" : gameStats["Kills"],
                                                            "Minion" : gameStats["Minion"],
                                                            "Cloud" : value,
                                                            "Hextech" : gameStats["Hextech"],
                                                            "Infernal" : gameStats["Infernal"],
                                                            "Mountain" : gameStats["Mountain"],
                                                            "Ocean" : gameStats["Ocean"]
                                                        }
                                                        setGameStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Hextech
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={gameStats["Hextech"]}
                                                    min={0}
                                                    max={4}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Gametime" : gameStats["Gametime"],
                                                            "Chemtech" : gameStats["Chemtech"],
                                                            "Kills" : gameStats["Kills"],
                                                            "Minion" : gameStats["Minion"],
                                                            "Cloud" : gameStats["Cloud"],
                                                            "Hextech" : value,
                                                            "Infernal" : gameStats["Infernal"],
                                                            "Mountain" : gameStats["Mountain"],
                                                            "Ocean" : gameStats["Ocean"]
                                                        }
                                                        setGameStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Infernal
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={gameStats["Infernal"]}
                                                    min={0}
                                                    max={4}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Gametime" : gameStats["Gametime"],
                                                            "Chemtech" : gameStats["Chemtech"],
                                                            "Kills" : gameStats["Kills"],
                                                            "Minion" : gameStats["Minion"],
                                                            "Cloud" : gameStats["Cloud"],
                                                            "Hextech" : gameStats["Hextech"],
                                                            "Infernal" : value,
                                                            "Mountain" : gameStats["Mountain"],
                                                            "Ocean" : gameStats["Ocean"]
                                                        }
                                                        setGameStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Mountain
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={gameStats["Mountain"]}
                                                    min={0}
                                                    max={4}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Gametime" : gameStats["Gametime"],
                                                            "Chemtech" : gameStats["Chemtech"],
                                                            "Kills" : gameStats["Kills"],
                                                            "Minion" : gameStats["Minion"],
                                                            "Cloud" : gameStats["Cloud"],
                                                            "Hextech" : gameStats["Hextech"],
                                                            "Infernal" : gameStats["Infernal"],
                                                            "Mountain" : value,
                                                            "Ocean" : gameStats["Ocean"]
                                                        }
                                                        setGameStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Ocean
                                            </td>
                                            <td>
                                                <input
                                                    type="number" 
                                                    value={gameStats["Ocean"]}
                                                    min={0}
                                                    max={4}
                                                    onChange={(e) => {
                                                        let value = e.target.value
                                                        value = value != "" ? parseInt(value) : 0
                                                        let obj = {
                                                            "Gametime" : gameStats["Gametime"],
                                                            "Chemtech" : gameStats["Chemtech"],
                                                            "Kills" : gameStats["Kills"],
                                                            "Minion" : gameStats["Minion"],
                                                            "Cloud" : gameStats["Cloud"],
                                                            "Hextech" : gameStats["Hextech"],
                                                            "Infernal" : gameStats["Infernal"],
                                                            "Mountain" : gameStats["Mountain"],
                                                            "Ocean" : value
                                                        }
                                                        setGameStats(obj)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>                                  
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
