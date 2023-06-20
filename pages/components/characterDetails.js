import React, { useEffect, useState } from 'react'
import StatsTable from './statsTable'
import SkillsTable from './skillsTable'
import Link from 'next/link'
import math from 'mathjs'
export default function CharacterDetails({data, nameChamp}){

    const character_name = [
        "-","Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe","AurelionSol","Azir","Bard","BelVeth","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia","ChoGath","Corki","Darius","Diana","DrMundo","Draven","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna","JarvanIV","Jax","Jayce","Jhin","Jinx","KSante","KaiSa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","KhaZix","Kindred","Kled","KogMaw","LeBlanc","LeeSin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","MasterYi","Malphite","Malzahar","Maokai","Milio","MissFortune","Mordekaiser","Morgana","Nami","Nasus","Nautilus","Neeko","Nidalee","Nilah","Nocturne","Nunu & Willump","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","RekSai","Rell","Renata","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Seraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Sylas","Syndra","TahmKench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","TwistedFate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","VelKoz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","Wukong","Xayah","Xerath","XinZhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Zeri","Ziggs","Zilean","Zoe","Zyra"
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
    })

    const [apheliosStats, setApheliosStats] = useState({
        "Crescend Stacks" : 0,
        "Main Weapon" : "-",
        "Sub Weapon" : "-",
    })

    const [sylasUltimate, setSylasUltimate] = useState("-")

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
    })

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
        "FoceBit" : 1,
        "Adaptative" : 0,
        "AH" : 0,
        "AS" : 0,
        "AR" : 0,
        "HP" : 0,
        "MP" : 0,
        "MR" : 0,
        "MS" : 0,
        "Ultimate" : 0
    })

    const [stacksStats, setStacksStats] = useState({
        "Black Cleaver" : 0,
        "Bounty" : 0,
        "Conqueror" : 0,
        "Dark Harvest" : 0,
        "Legend/Collector" : 0,
        "Mejai" : 0
    })

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

    const [steroidStats, setSteroidStats] = useState({
        "E" : false,
        "Form" : false,
        "Items" : false,
        "P" : false,
        "Q" : false,
        "R" : false,
        "Runes" : false,
        "W" : false
    })

    function getNumericFromString(stringDamage){

        let scope = {
            // VOIR LES PLAGES NOMMEES
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
            IT_MPR : itemStats["MP5"],
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
            Legendary : 1,
            Minion : gameStats["Minion"],
            MOD_Heal : 1 + IT_MOD_Heal + runeStats["Heal"] + N_Chem * 0.06, // Revitalize
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
            OH_Phys : 0, // A DEFINIR
            OH_Magic : 0, // A DEFINIR
            OH_True : 0, // A DEFINIR

            P_E : 0,
            P_Q : 0,
            P_R : 0,
            P_W : 0,
            
            ForceBit : runeStats["ForceBit"],
            R_Adap : runeStats["Adaptative"],
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
            
            S_BC : stacksStats["Black Cleaver"],
            S_Bounty : stacksStats["Bounty"],
            S_Conq : stacksStats["Conqueror"],
            S_Harvest : stacksStats["Dark Harvest"],
            S_Legend : stacksStats["Legend/Collector"],
            S_Mejai : stacksStats["Mejai"],

            Sc_Lin : (level - 1)/17,

            Self_AD : totalStats["AD"],
            Self_AH : totalStats["AH"],
            Self_AP : totalStats["AP"],
            Self_APenF : totalStats["APenF"],
            Self_AR : totalStats["AR"],
            Self_AS : totalStats["AS"],
            Self_AvgAA : totalStats["AvgAA"],
            Self_BaAD : basicStatsChampion["Attack Damage"],
            Self_BaMS : basicStatsChampion["Move Speed"],
            Self_BoAD : additionnalStats["Attack Damage"],
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


        result = math.evaluate(stringDamage, scope);
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

    const listMainRune = ["Precision", "Domination","Sorcery","Resolve","Inspiration"]

    const precisionMainRunes = ["Press The Attack", "Lethal Tempo", "Fleet Foot", "Conqueror"]
    const precisionFirstRune = ["Overheal", "Triumph", "Presence of Mind"]
    const precisionSecondRune = ["Alacrity", "Tenacity", "Bloodline"]
    const precisionThirdRune = ["Coup de Grace", "Cut Down", "Last Stand"]

    const dominationMainRunes = ["Electrocute", "Predator", "Dark Harvest", "Hail of Blades"]
    const dominationFirstRune = ["Cheap Shot", "Taste of Blood", "Sudden Impact"]
    const dominationSecondRune = ["Zombie Ward", "Ghost Poro", "Eyeball Collection"]
    const dominationThirdRune = ["Treasure Hunter", "Ingenious Hunter", "Relentless Hunter", "Ultimate Hunter"]

    const sorceryMainRunes = ["Summon Aery", "Arcane Comet", "Phase Rush"]
    const sorceryFirstRune = ["Nullifying Orb", "Manaflow Band", "Nimbus Cloak"]
    const sorcerySecondRune = ["Transcendence", "Celerity", "Absolute Focus"]
    const sorceryThirdRune = ["Scorch", "Waterwalking", "Gathering Storm"]

    const resolveMainRune = ["Grasp of the Undying", "Aftershock", "Guardian"]
    const resolveFirstRune = ["Demolish", "Font of Life", "Shield Bash"]
    const resolveSecondRune = ["Conditioning", "Second Wind", "Bone Plating"]
    const resolveThirdRune = ["Overgrowth", "Revitalize", "Unflinching"]

    const inspirationMainRunes = ["Unsealed Spellbook", "Glacial Augment", "First Strike"]
    const inspirationFirstRune = ["Hextech Flashtrap", "Magical Footwear", "Perfect Timing"]
    const inspirationSecondRune = ["Futures Market", "Minion Dematerializer", "Biscuit Delivery"]
    const inspirationThirdRune = ["Cosmic Insight", "Approach Velocity", "Time Warp Tonic"]
    
    const [nameMainRune, setNameMainRune] = useState('')
    const [mainRune, setMainRune] = useState('')
    const [mainFirstRune, setMainFirstRune] = useState('')
    const [mainSecondRune, setMainSecondRune] = useState('')
    const [mainThirdRune, setMainThirdRune] = useState('')
    const [secondRune, setSecondRune] = useState('')
    const [secondFirstRune, setSecondFirstRune] = useState('')
    const [secondSecondRune, setSecondSecondRune] = useState('')

    const [listKeystone, setListKeystoneRune] = useState([])
    const [listFirstRune, setListFirstRune] = useState([])
    const [listSecondRune, setListSecondRune] = useState([])
    const [listThirdRune, setListThirdRune] = useState([])

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
 

    useEffect(() => {
        if (data != undefined) {
            if (data["Energy"] === "TRUE"){
                setTextMana('Energy')
            }
            else {
                setTextMana('Mana') 
            }
            setImgSplash(`../../images/centered/${nameChamp}_0.jpg`)
            /** BASICS STATS */
            let champ_obj = {
                "Hp": data["HP"] + data["HP+"] * (level - 1),
                "Attack Damage": data["AD"] + data["AD+"] * (level - 1),
                "Attack Speed %": Number(data["AS"] * (1 + (data["Ratio"]* (level - 1))/100)),
                "Armor": data["AR"] + data["AR+"] * (level - 1),
                "Magic Resist": data["MR"] + data["MR+"] * (level - 1),
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
    },[data, level, enemyName, enemyLevel])

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
                                        {nameMainRune != '' && (
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
                                                        if (value != nameMainRune)
                                                            return(
                                                                <option value={value} key={index}>{value}</option>
                                                            )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                First Rune
                                            </td>
                                            <td>
                                                <select value={secondFirstRune} onChange={(e) => {
                                                    setSecondFirstRune(e.target.value)
                                                }}>
                                                    {setUpFirstRunes(secondRune).map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {setUpSecondRunes(secondRune).map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
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
                                                    {setUpSecondRunes(secondRune).map((value, index) => {
                                                        return(
                                                            <option value={value} key={index}>{value}</option>
                                                        )
                                                    })}
                                                    {setUpThirdRunes(secondRune).map((value, index) => {
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
                    </>
                )}
            </div>
        </div>
    );
}
