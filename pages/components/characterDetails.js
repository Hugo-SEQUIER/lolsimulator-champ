import React, { useEffect, useState } from 'react'
import StatsTable from './statsTable'
import SkillsTable from './skillsTable'
import Link from 'next/link'

export default function CharacterDetails({mainData, data}){

    let options = [];
    for (let i = 1; i <= 18; i++) {
        options.push(<option value={i} key={i}>{i}</option>);
    }

    const handleChange = (event) => {
        setLevel(parseInt(event.target.value));
    };

    const [mana, setMana]= useState(0)
    const [manaRegen, setManaRegen]= useState(0)
    const [textMana, setTextMana] = useState('Mana')
    const [level, setLevel] = useState(1)
    const [imgSplash, setImgSplash] = useState('../../images/centered/GENERIC.png')

    useEffect(()=> {
        if (data != undefined)
            if (data.primaryAbilityResource.arType === 0){
                setMana(data.primaryAbilityResource.arBase + data.primaryAbilityResource.arPerLevel * (level - 1))
                setManaRegen((data.primaryAbilityResource.arBaseStaticRegen + data.primaryAbilityResource.arRegenPerLevel * (level - 1))*5)
                setTextMana('Mana')
            }
            else if (data.primaryAbilityResource.arType === 1) {
                setMana(data.primaryAbilityResource.arBase) 
                setManaRegen((data.primaryAbilityResource.arBaseStaticRegen)*5)
                setTextMana('Energy') 
            }
            else {
                setMana(0)
                setManaRegen(0)
                setTextMana('Mana') 
            }
            if (data != undefined)
                setImgSplash(`../../images/centered/${data.mCharacterName}_0.jpg`)
    },[data])
    
    if (data != undefined)
        if (data.spellNames.length !== 5){
            let array = []
            array.push(data.spellNames[data.spellNames.length - 1])
            array.push(data.spellNames[0])
            array.push(data.spellNames[1])
            array.push(data.spellNames[2])
            data.spellNames = array
            for (let i = 0; i < data.spellNames.length; i++){
                console.log(i)
                data.spellNames[i] = `Characters/${data.mCharacterName}/Spells/` + data.spellNames[i]
            }
            data.spellNames.push(data.mCharacterPassiveSpell)
    }
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
                    <h1>{data.mCharacterName.toUpperCase()}</h1>
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
                        <StatsTable stats={{
                                "Hp": data.baseHP + data.hpPerLevel * (level - 1),
                                "Attack Damage": data.baseDamage + data.damagePerLevel * (level - 1),
                                "Attack Speed %": Number(data.attackSpeed * (1 + (data.attackSpeedRatio* (level - 1))/100)),
                                "Armor": data.baseArmor + data.armorPerLevel * (level - 1),
                                "Magic Resist": data.baseSpellBlock + data.spellBlockPerLevel * (level - 1),
                                "Move Speed": data.baseMoveSpeed,
                                "Lifesteal / sec": 0,
                                "Critical %":  0, //data.stats.crit + data.stats.critperlevel * (level - 1),
                                "Hp Regen": (Number(data.baseStaticHPRegen + data.hpRegenPerLevel * (level - 1))*5).toFixed(3),

                                [textMana] : mana,
                                "Ability Power": 0,
                                "Range": data.attackRange,
                                "Armor Penetration": 0,
                                "Resist Penetration": 0,
                                "Ability Haste": 0,
                                "Spellvamp %": 0,
                                "Tenacity %": 0,
                                [textMana + " / Regen"]: manaRegen,
                            }} 
                        />
                        <SkillsTable mainData={mainData} statsName={data.mAbilities !== undefined ? data.mAbilities : data.spellNames} champName={data.passive1IconName}/>
                    </>
                )}
            </div>
        </div>
    );
}
