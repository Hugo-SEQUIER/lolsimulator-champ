import React, { useEffect, useState } from "react";

function SkillsTable({ mainData, spellName, spellData, passiveName, passiveData, baseNameData, actualData}) {
    
    const [listSkillsPoint, setListSkillsPoint] = useState([1,1,1,1,1])
    console.log("Main Data")
    console.log(mainData)
    console.log("Nom des spells")
    console.log(spellName)
    console.log("Nom des data spells")
    console.log(spellData)
    const [listSpells, setListSpells] = useState(undefined)


    useEffect(() => {
        if (mainData != undefined && spellData != undefined){
            for (let i = 0; i < spellData.length; i++){
                if (!spellData[i].includes('/') && !spellData[i].includes('{')){
                    spellData[i] = baseNameData + 'Spells/' + spellData[i] 
                }
            }
            let dataArray = [
                {
                    name : 'Passive',
                    data : mainData[passiveData].mSpell,
                    img : '../../images/passive/' + passiveName + '.png' ,
                    index : 0
                },
                {
                    name : 'Q',
                    data : mainData[spellData[1]].mChildSpells !== undefined ?  mainData[mainData[spellData[1]].mChildSpells[0]].mSpell : mainData[spellData[1]].mSpell,
                    img : '../../images/spell/' + spellName[0].split('/')[spellName[0].split('/').length - 1].split('Ability')[0] + '.png' ,
                    index : 1
                },
                {
                    name : 'W',
                    data : mainData[spellData[2]].mChildSpells !== undefined ?  mainData[mainData[spellData[2]].mChildSpells[0]].mSpell : mainData[spellData[2]].mSpell,
                    img : '../../images/spell/' + spellName[1].split('/')[spellName[1].split('/').length - 1].split('Ability')[0] + '.png' ,
                    index : 2
                },
                {
                    name : 'E',
                    data : mainData[spellData[3]].mChildSpells !== undefined ?  mainData[mainData[spellData[3]].mChildSpells[0]].mSpell : mainData[spellData[3]].mSpell,
                    img : '../../images/spell/' + spellName[2].split('/')[spellName[2].split('/').length - 1].split('Ability')[0] + '.png' ,
                    index : 3
                },
                {
                    name : 'R',
                    data : mainData[spellData[0]].mChildSpells !== undefined ?  mainData[mainData[spellData[0]].mChildSpells[0]].mSpell : mainData[spellData[0]].mSpell, 
                    img : '../../images/spell/' + spellName[3].split('/')[spellName[3].split('/').length - 1].split('Ability')[0] + '.png' ,
                    index : 4
                },        
            ]
            for (let spell of dataArray){
                console.log(spell.data)
            }
            setListSpells(dataArray)
        }
    }, [mainData, spellData])
   
    function findBaseDamageData(data){
        if (data != undefined){
            for (let i = 0; i < data.length; i++){
                if (data[i].mName === 'BaseDamage' || data[i].mName === 'RBaseDamage' || data[i].mName === 'QBaseDamage'  || data[i].mName === 'WBaseDamage' || data[i].mName === 'EBaseDamage'){
                    console.log("LAAAAAAAAAAAAAAAA")
                    console.log(data[i])
                    return data[i]
                }
            }
        }
        return {
            mValues : [0,0,0,0,0,0,0]
        }
    }


    function selectItem(index){
        let options = [];

        if (index == 0) {
            return 1
        } 
        else if (index == 4) {
            for (let i = 1; i <= 3; i++) {
                options.push(<option value={i} key={i}>{i}</option>);
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                options.push(<option value={i} key={i}>{i}</option>);
            }
        }

        return (
             <select value={listSkillsPoint[index]} 
                onChange={(e) => {
                    let array = []
                    for (let point of listSkillsPoint){
                        array.push(point)
                    }
                    array[index] = parseInt(e.target.value)
                    setListSkillsPoint(array)
                }}>
                {options}
            </select>
        )
    }

    function findCoeffMagicDamageCalculator(data){
        const attributeNames = Object.keys(data);
        for (let i = 0; i < attributeNames.length; i++) {
            const attributeName = attributeNames[i];
            if (data[attributeName].hasOwnProperty('mFormulaParts')) {
                let arrayFormule = data[attributeName].mFormulaParts
                for (let idxFormuleTab = 0 ; idxFormuleTab < arrayFormule.length; idxFormuleTab++){
                    if (arrayFormule[idxFormuleTab].mCoefficient != undefined) return arrayFormule[idxFormuleTab].mCoefficient
                }
            }
        }
        return 0
    }

    function findCoeffAttackDamageCalculator(data){
        for (let i = 0; i < data.length; i++){
            if (data[i].mName.toLowerCase().includes("adratio")){
                return data[i].mValues
            }
        }
        return {
            mValues : [0,0,0,0,0,0,0]
        }
        // for (let i = 0; i < attributeNames.length; i++) {
        //     const attributeName = attributeNames[i];
        //     if (data[attributeName].hasOwnProperty('mFormulaParts')) {
        //         let arrayFormule = data[attributeName].mFormulaParts
        //         for (let idxFormuleTab = 0 ; idxFormuleTab < arrayFormule.length; idxFormuleTab++){
        //             if (arrayFormule[idxFormuleTab].mDataValue.toLowerCase().includes('adratio')){
        //                 let nameOfAdRatio = arrayFormule[idxFormuleTab].mDataValue
        //             }
        //         }
        //     }
        // }
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
                  {/**       <td>Damage / CD</td>*/}
                    </tr>                   
                    {listSpells != undefined && (listSpells.map((skill, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    alt={skill.name}
                                    key={index}
                                    src={skill.img} 
                                />
                            </td>
                            <td>{skill.name}</td>
                            <td>
                                {selectItem(skill.index)}
                            </td>
                            <td>{findBaseDamageData(skill.data.mDataValues).mValues[listSkillsPoint[skill.index]] + findCoeffMagicDamageCalculator(skill.data) * actualData["Ability Power"] + findCoeffAttackDamageCalculator(skill.data.mDataValues)[listSkillsPoint[skill.index]] * actualData["Attack Damage"]}</td>
                            <td>{Array.isArray(skill.data.cooldownTime) ? skill.data.cooldownTime[listSkillsPoint[skill.index]] : 0}</td>
                            {/**       <td>{0}</td>*/}
                        </tr>
                    )))}
                </table>
            </div>
        </div>
    );
}

export default SkillsTable;
