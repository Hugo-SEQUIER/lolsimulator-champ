import React, { useState } from "react";

function SkillsTable({ mainData, statsName, champName, passiveName }) {
    
    const [listSkillsPoint, setListSkillsPoint] = useState([1,1,1,1,1])
    console.log("AHHHHHHHHHHH")
    console.log(mainData)
    console.log(statsName)
    console.log(passiveName)
    const listSpells = [
        {
            name : 'Passive',
            data : mainData[statsName[4]].mSpell,
            img : '../../images/passive/' + passiveName + '.png' 
        },
        {
            name : 'Q',
            data : mainData[statsName[1]].mChildSpells !== undefined ?  mainData[mainData[statsName[1]].mChildSpells[0]].mSpell : mainData[statsName[1]].mSpell,
            img : '../../images/passive/' + champName.split('/')[-1] + '.png' 
        },
        {
            name : 'W',
            data : mainData[statsName[2]].mChildSpells !== undefined ?  mainData[mainData[statsName[2]].mChildSpells[0]].mSpell : mainData[statsName[2]].mSpell,
            img : '../../images/passive/' + champName.split('/')[-1] + '.png' 
        },
        {
            name : 'E',
            data : mainData[statsName[3]].mChildSpells !== undefined ?  mainData[mainData[statsName[3]].mChildSpells[0]].mSpell : mainData[statsName[3]].mSpell,
            img : '../../images/passive/' + champName.split('/')[-1] + '.png' 
        },
        {
            name : 'R',
            data : mainData[statsName[0]].mChildSpells !== undefined ?  mainData[mainData[statsName[0]].mChildSpells[0]].mSpell : mainData[statsName[0]].mSpell, 
            img : '../../images/passive/' + champName.split('/')[-1] + '.png' 
        },        
    ]
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
                            <td>{listSkillsPoint[index]}</td>
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
