import React, { useEffect, useState } from 'react'
import StatsTable from './statsTable'
import SkillsTable from './skillsTable'
import Link from 'next/link'

export default function CharacterDetails({data, nameChamp}){

    let options = [];
    for (let i = 1; i <= 18; i++) {
        options.push(<option value={i} key={i}>{i}</option>);
    }

    const handleChange = (event) => {
        setLevel(parseInt(event.target.value));
    };

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
    })

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

        [textMana] : 0,
        "Ability Power": 0,
        "Range": 0,
        "Armor Penetration": 0,
        "Resist Penetration": 0,
        "Ability Haste": 0,
        "Spellvamp %": 0,
        "Tenacity %": 0,
        [textMana + " / Regen"]: 0,
    })

    function getNumericFromString(stringDamage, passiveDmg){

        // VOIR LES PLAGES NOMMEES
        let B_Ardent = bonusStats["Ardent"]
        let B_Chem = bonusStats["Chem"]
        let B_Cloud = bonusStats["Cloud"]
        let B_Elder = bonusStats["Elder"]
        let B_Hex = bonusStats["Hextech"]
        let B_Infernal = bonusStats["Infernal"]
        let B_Mountain = bonusStats["Mountain"]
        let B_Ocean = bonusStats["Ocean"]
        let B_RecentHit = bonusStats["Recently Hit"]

        let C_Aphelios_Stacks = apheliosStats["Crescend Stacks"]
        let C_Aphelios_W1 = apheliosStats["Main Weapon"]
        let C_Aphelios_W2 = apheliosStats["Sub Weapon"]
        let C_SylasUltimate = sylasUltimate

        let E_AR = enemyStats["Armor"]
        let E_BoAR = enemyStats["Armor Bonus"]
        let E_BoHp = enemyStats["Hp Bonus"]
        let E_CHP = enemyStats["Current Hp %"]
        let E_CHPV = enemyStats["Current Hp"]
        let E_IT_AR = enemyItemStats["AR"]
        let E_IT_HP = enemyItemStats["HP"]
        let E_IT_MR = enemyItemStats["MR"]
        let E_Level = enemyStats["Level"]
        let E_MHP = enemyStats["Hp"]
        let E_MisHPV = enemyStats["Missing HP"]
        let E_MR = enemyStats["Magic Resist"]
        let E_Name = enemyStats["Name"]
  
        let Gametime = gameStats["Gametime"]

        let IT_AD = itemStats["AD"]
        let IT_AH = itemStats["AH"]
        let IT_AP = itemStats["AP"]
        let IT_APEN = itemStats["APE%"]
        let IT_AR = itemStats["AR"]
        let IT_AS = itemStats["AS"]
        let IT_CDMG = itemStats["CDMG"]
        let IT_Cost = itemStats["Gold"]
        let IT_Cost2 = enemyItemStats["Gold"]
        let IT_Crit = itemStats["CC"]
        let IT_FlatMS = itemStats["MS"]
        let IT_HP = itemStats["HP"]
        let IT_HPR = itemStats["HP5"]
        let IT_Leth = itemStats["LE"]
        let IT_LS = itemStats["LS"]
        let IT_MOD_Heal = itemStats["HEAL"]
        let IT_MOD_Magic = itemStats["APM"]
        let IT_MOD_Phys = itemStats["ADM"]
        let IT_MP = itemStats["MP"]
        let IT_Mpen = itemStats["MPE"]
        let IT_MPenP = itemStats["MPE%"]
        let IT_MPR = itemStats["MP5"]
        let IT_MR = itemStats["MR"]
        let IT_MS = itemStats["MS%"]
        let IT_OH_Magic = itemStats["MOH"]
        let IT_OH_Phys = itemStats["POH"]
        let IT_Proc_Energy = itemStats["EPD"]
        let IT_Proc_Magic = itemStats["MPD"]
        let IT_Proc_Phys = itemStats["PPD"]
        let IT_Shield = itemStats["SHI"]
        let IT_Shoe = itemStats["SHOE"]
        let IT_SV = itemStats["SV"]
        let IT_TC = itemStats["TC"]
        let ItemSet = 1

        let N_Chem = gameStats["Chemtech"]
        let Kills = gameStats["Kills"]
        let Language = 0
        let Legendary = 1
        let Minion = gameStats["Minion"]
        let MOD_Heal = 1 + IT_MOD_Heal + runeStats["Heal"] + N_Chem * 0.06 // Revitalize
        let MOD_Hit = 1
        let MOD_Magic = 1
        let MOD_OH = 1
        let MOD_Phys = 1
        let MOD_SelfHeal = 1
        let MOD_True = 1
        let N_Cloud = gameStats["Cloud"]
        let N_Hex = gameStats["Hextech"]
        let N_Infernal = gameStats["Infernal"]
        let N_Mountain = gameStats["Mountain"]
        let N_Ocean = gameStats["Ocean"]
        let Name = nameChamp
        let OH_Phys = 0 // A DEFINIR
        let OH_Magic = 0 // A DEFINIR
        let OH_True = 0 // A DEFINIR

        let P_E = 0
        let P_Q = 0
        let P_R = 0
        let P_W = 0
        
        let ForceBit = runeStats["ForceBit"]
        let R_Adap = runeStats["Adaptative"]
        let R_AH = runeStats["AH"]
        let R_AR = runeStats["AR"]
        let R_AS = runeStats["AS"]
        let R_HP = runeStats["HP"]
        let R_MOD = 1
        let R_MP = runeStats["MP"]
        let R_MR = runeStats["MR"]
        let R_MS = runeStats["MS"]
        let R_PTAMOD = 1
        let R_Ultimate = runeStats["Ultimate"]
        
        let S_BC = stacksStats["Black Cleaver"]
        let S_Bounty = stacksStats["Bounty"]
        let S_Conq = stacksStats["Conqueror"]
        let S_Harvest = stacksStats["Dark Harvest"]
        let S_Legend = stacksStats["Legend/Collector"]
        let S_Mejai = stacksStats["Mejai"]

        let Sc_Lin = (level - 1)/17

        let Self_AD = totalStats["AD"]
        let Self_AH = totalStats["AH"]
        let Self_AP = totalStats["AP"]
        let Self_APenF = totalStats["APenF"]
        let Self_AR = totalStats["AR"]
        let Self_AS = totalStats["AS"]
        let Self_AvgAA = totalStats["AvgAA"]
        let Self_BaAD = basicStatsChampion["Attack Damage"]
        let Self_BaMS = basicStatsChampion["Move Speed"]
        let Self_BoAD = additionnalStats["Attack Damage"]
        let Self_BoAR = additionnalStats["Armor"]
        let Self_BoAS = additionnalStats["Attack Speed %"]
        let Self_BoHP = additionnalStats["Hp"]
        let Self_BoMP = additionnalStats["Mana"]
        let Self_BoMR = additionnalStats["Magic Resist"]
        let Self_BoMS = additionnalStats["Move Speed"] - basicStatsChampion["Move Speed"]
        let Self_BoMSP = additionnalStats["Move Speed"]
        let Self_CHPP = 1
        let Self_Crit = totalStats["Crit"]
        let Self_CritDMG = totalStats["CritDMG"]
        let Self_CritHit = totalStats["CritHit"]
        let Self_DPS = totalStats["DPS"]
        let Self_Gold = totalStats["Gold"]
        let Self_HitDmg = totalStats["HitDmg"]
        let Self_HPR = totalStats["HPR"]
        let Self_Leth = totalStats["Leth"]
        let Self_Level = level
        let Self_LS = totalStats["LS"]
        let Self_MaxCS = 0
        let Self_MaxGold = 500
        let Self_MHP = totalStats["HP"]
        let Self_MisHPV = totalStats["MisHPV"]
        let Self_MP = totalStats["MP"]
        let Self_MpenF = totalStats["MpenF"]
        let Self_MPR = totalStats["MPR"]
        let Self_MR = totalStats["MR"]
        let Self_MS = totalStats["MS"]
        let Self_Proc_Item = totalStats["Proc Item"]
        let Self_Proc_Rune = totalStats["Proc Rune"]
        let Self_Proc_Summ = totalStats["Proc Summ"]
        let Self_Shield = totalStats["Shield"]
        let Self_TC = totalStats["TC"]

        let Steroid_E = steroidStats["E"]
        let Steroid_Form = steroidStats["Form"]
        let Steroid_Items = steroidStats["Items"]
        let Steroid_P = steroidStats["P"]
        let Steroid_Q = steroidStats["Q"]
        let Steroid_R = steroidStats["R"]
        let Steroid_Runes = steroidStats["Runes"]
        let Steroid_W = steroidStats["W"]
    }
    useEffect(()=> {
        if (data != undefined) {
            if (data["Energy"] === "TRUE"){
                setTextMana('Energy')
            }
            else {
                setTextMana('Mana') 
            }
            setImgSplash(`../../images/centered/${nameChamp}_0.jpg`)

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
            console.log("CharacterDetails")
            console.log(champ_obj)
            setDataChamp(champ_obj)
        }
    },[data, level])
    
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
                            additionnalStats = {{
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
                        />
                       <SkillsTable 
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
                        />  
                    </>
                )}
            </div>
        </div>
    );
}
