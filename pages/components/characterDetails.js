import React, { useEffect, useState } from 'react'
import StatsTable from './statsTable'
import SkillsTable from './skillsTable'
import Link from 'next/link'

export default function CharacterDetails({mainData, data, nameChampForLink}){

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
    const [dataChamp, setDataChamp] = useState({
        "Hp": 0,
        "Attack Damage": 0,
        "Attack Speed %": 0,
        "Armor": 0,
        "Magic Resist": 0,
        "Move Speed": 0,
        "Lifesteal / sec": 0,
        "Critical %":  0, //data.stats.crit + data.stats.critperlevel * (level - 1),
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

    useEffect(()=> {
        if (data != undefined) {
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
            setImgSplash(`../../images/centered/${data.mCharacterName}_0.jpg`)

            let champ_obj = {
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
            }
            setDataChamp(champ_obj)
        }
    },[data, mana])
    
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
                        <StatsTable 
                            stats={{
                                "Hp": dataChamp["Hp"],
                                "Attack Damage": dataChamp["Attack Damage"],
                                "Attack Speed %": dataChamp["Attack Speed %"],
                                "Armor": dataChamp["Armor"],
                                "Magic Resist": dataChamp["Magic Resist"],
                                "Move Speed": dataChamp["Move Speed"],
                                "Lifesteal / sec": dataChamp["Lifesteal / sec"],
                                "Critical %":  dataChamp["Critical %"], //data.stats.crit + data.stats.critperlevel * (level - 1),
                                "Hp Regen": dataChamp["Hp Regen"],

                                [textMana] : dataChamp[textMana],
                                "Ability Power": dataChamp["Ability Power"],
                                "Range": dataChamp["Range"],
                                "Armor Penetration": dataChamp["Armor Penetration"],
                                "Resist Penetration": dataChamp["Resist Penetration"],
                                "Ability Haste": dataChamp["Ability Haste"],
                                "Spellvamp %": dataChamp["Spellvamp %"],
                                "Tenacity %": dataChamp["Tenacity %"],
                                [textMana + " / Regen"]: dataChamp[textMana + " / Regen"],
                            }} 
                        />
                        <SkillsTable 
                            mainData={mainData} 
                            spellName={data.spellNames} 
                            spellData={data.mAbilities != undefined ? data.mAbilities : data.spellNames} 
                            passiveName={data.passive1IconName.split('/')[data.passive1IconName.split('/').length - 1].split('.')[0]}
                            passiveData={data.mCharacterPassiveSpell}
                            baseNameData={nameChampForLink.split('/')[0] + '/' + nameChampForLink.split('/')[1]  + '/'}
                            actualData={dataChamp}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
