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
        "Lifesteal / sec": 0,
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
        "Lifesteal / sec": 0,
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
        let MOD_Phys = 72 / 100
        let MOD_Hit = 72 / 100
        let MOD_Magic = 76 / 100
        let MOD_Heal = 1
        let MOD_SelfHeal = 1

        let Self_Level = passiveSkillPoint
        let Sc_Lin = ((Self_Level -1) * 6)/100
        let Self_AP = additionnalStats["Ability Power"]
        let Self_AD = statsChamp["Attack Damage"]
        let Self_BoAD = additionnalStats["Attack Damage"]
        let Self_MHP = statsChamp["Hp"] + additionnalStats["Hp"]
        let Self_BoHp = additionnalStats["Hp"]
        let Self_Crit = additionnalStats["Critical %"] /100
        let Self_CritDMG = 175 / 100
        let Self_BoAS = additionnalStats["Attack Speed %"] / 100
        let E_MHP = statsChamp["Hp"]
        let E_CHP = 100
        
        let P_Q = qSkillPoint
        let P_W = wSkillPoint
        let P_E = eSkillPoint
        let P_R = rSkillPoint

        let Y6 = passiveDmg
        let Minion = 0
        let Gametime = 0
        let IT_CDMG = itemStats["CDMG"]
        let IT_Proc_Energy = itemStats["Proc_Energy"]
        let IT_AD = addiitemStatstionnalStats["AD"]
        let IT_AH = itemStats["AH"]
        let IT_AP = itemStats["AP"]
        let IT_APEN = itemStats["APE%"] / 100
        let IT_AR = itemStats["AR"]
        let IT_AS = itemStats["AS"] / 100
        let IT_Crit = itemStats["CC"] / 100
        let IT_FlatMS = itemStats["MS"]
        let IT_HP = itemStats["HP"]
        let IT_HPR = itemStats["HPR"]
        let IT_Leth = itemStats["Leth"]
        let IT_LS = itemStats["LS"]
        let IT_MOD_Heal = itemStats["HEAL"]
        let IT_MOD_Magic = itemStats["APM"]
        let IT_MOD_Phys = itemStats["ADM"]
        let IT_MP = itemStats["MP"]
        let IT_Mpen = itemStats["MPE"]
        let IT_MPenP = itemStats["MPE%"] / 100
        let IT_MPR = itemStats["MPR"] 
        let IT_MR = itemStats["MR"] 
        let IT_MS = itemStats["MS"]
        let IT_OH_Magic = itemStats["OH_Magic"]
        let IT_OH_Phys = itemStats["OH_Phys"]
        let IT_OH_True = itemStats["OH_True"]
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
                "Lifesteal / sec": 0,
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
                                "Lifesteal / sec": basicStatsChampion["Lifesteal / sec"],
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
                                "Lifesteal / sec": additionnalStats["Lifesteal / sec"],
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
                                "Lifesteal / sec": basicStatsChampion["Lifesteal / sec"],
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
                                "Lifesteal / sec": additionnalStats["Lifesteal / sec"],
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
