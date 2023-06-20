import React, { useEffect, useState } from "react";
import math, { add, max } from "mathjs";

function SkillsTable({ itemStats, statsChamp, statsSpell, passiveSkillPoint, additionnalStats }) {

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