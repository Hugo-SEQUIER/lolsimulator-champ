import React, { useEffect, useState } from "react";
import math, { add, max } from "mathjs";

function SkillsTable({ statsChamp, statsSpell, passiveSkillPoint, additionnalStats }) {

    const [qSkillPoint, setQSkillPoint] = useState(1)
    const [wSkillPoint, setWSkillPoint] = useState(1)
    const [eSkillPoint, setESkillPoint] = useState(1)
    const [rSkillPoint, setRSkillPoint] = useState(1)

    const [listSpells, setListSpells] = useState([
         {
            name : 'Passive',
            dataSpell : statsSpell,
            img : '../../images/passive/' + statsSpell["img"]["passive"] + '.png' 
        },
        {
            name : 'Q',
            dataSpell : statsSpell,
            img : '../../images/spell/' + statsSpell["img"]["QSpell"]  + '.png' 
        },
        {
            name : 'W',
            dataSpell :statsSpell,
            img : '../../images/spell/' + statsSpell["img"]["WSpell"]  + '.png' 
        },
        {
            name : 'E',
            dataSpell : statsSpell,
            img : '../../images/spell/' + statsSpell["img"]["ESpell"]  + '.png' 
        },
        {
            name : 'R',
            dataSpell : statsSpell, 
            img : '../../images/spell/' + statsSpell["img"]["RSpell"]  + '.png' 
        },        
    ])
    console.log("AHHHHHHHHHHH")
    console.log(statsSpell)
    console.log(statsChamp)

    useEffect(() => {
        if (statsSpell != undefined){
            let arraySpells = []
            // PASSIVE SECTION
            let passive = {
                name : 'Passive',
                img : '../../images/passive/' + statsSpell["img"]["passive"] + '.png',
            }


        }
    },[statsSpell,qSkillPoint,wSkillPoint,eSkillPoint,rSkillPoint])

    function removeExcelFunctions(expression) {
        // Supprimer les expressions de la forme Calc!10
        expression = expression.replace(/Calc!\d+/g, '');
        // Supprimer les expressions de la forme SI(...)
        expression = expression.replace(/SI\([^)]*\)/g, '');
        // Supprimer les expressions de la forme MAX(...)
        expression = expression.replace(/MAX\([^)]*\)/g, '');
        return expression;
    }
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
        let Self_Crit = additionnalStats["Critical %"] / 100
        let Self_CritDMG = 175 / 100
        let Self_BoAS = additionnalStats["Attack Speed %"]
        let E_MHP = statsChamp["Hp"]
        let E_CHP = 100
        
        let P_Q = qSkillPoint
        let P_W = wSkillPoint
        let P_E = eSkillPoint
        let P_R = rSkillPoint

        let Y6 = passiveDmg
        let OH_Magic = 0
        let OH_Phys = 0
        let OH_True = 0
        let Minion = 0
        let Gametime = 0
        let IT_CDMG = 0

    }
    return (
        <div className="stats-table skills-table">
            <div>
                <h1>Skills</h1>
            </div>
            <div className="stats-table-row skills-table-row">  
                <table>
                    <tr>
                        <td>/</td>
                        <td>Spell</td>
                        <td>Points</td>
                        <td>Damage</td>
                        <td>CD</td>
                        <td>Damage / CD</td>
                    </tr>                   
                    {listSpells.map((skill, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    alt={'spell img'}
                                    key={index}
                                    src={skill.img} 
                                />
                            </td>
                            <td>{skill.name}</td>
                            <td>{qSkillPoint}</td>
                            <td>{0}</td>
                            <td>{0}</td>
                            <td>{0}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}

export default SkillsTable;