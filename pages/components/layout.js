import { useState } from "react";
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
    const [sharedState, setSharedState] = useState("initial value");
    const router = useRouter()

    // LISTE DES STATES
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

    const [enemyItemSlot1, setEnemyItemSlot1] = useState('-')
    const [enemyItemSlot2, setEnemyItemSlot2] = useState('-')
    const [enemyItemSlot3, setEnemyItemSlot3] = useState('-')
    const [enemyItemSlot4, setEnemyItemSlot4] = useState('-')
    const [enemyItemSlot5, setEnemyItemSlot5] = useState('-')
    const [enemyItemSlot6, setEnemyItemSlot6] = useState('-')
    const [enemyElixirSlot, setEnemyElixirSlot] = useState('-')

    const [itemEnemyImg1, setItemEnemyImg1] = useState('')
    const [itemEnemyImg2, setItemEnemyImg2] = useState('')
    const [itemEnemyImg3, setItemEnemyImg3] = useState('')
    const [itemEnemyImg4, setItemEnemyImg4] = useState('')
    const [itemEnemyImg5, setItemEnemyImg5] = useState('')
    const [itemEnemyImg6, setItemEnemyImg6] = useState('')
    const [itemEnemyImg7, setItemEnemyImg7] = useState('')

    const [enemyItemStats, setEnemyItemStats] = useState({
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

    const [qSkillPoint, setQSkillPoint] = useState(0)
    const [wSkillPoint, setWSkillPoint] = useState(0)
    const [eSkillPoint, setESkillPoint] = useState(0)
    const [rSkillPoint, setRSkillPoint] = useState(0)

    const [pDMG, setPDMG] = useState(0)
    const [qDMG, setQDMG] = useState(0)
    const [wDMG, setWDMG] = useState(0)
    const [eDMG, setEDMG] = useState(0)
    const [rDMG, setRDMG] = useState(0)

    const [pCD, setPCD] = useState(0)
    const [qCD, setQCD] = useState(0)
    const [wCD, setWCD] = useState(0)
    const [eCD, setECD] = useState(0)
    const [rCD, setRCD] = useState(0)

    const [pImg, setPImg] = useState(0)
    const [qImg, setQImg] = useState(0)
    const [wImg, setWImg] = useState(0)
    const [eImg, setEImg] = useState(0)
    const [rImg, setRImg] = useState(0)

    const [nameMainRune, setNameMainRune] = useState('')
    const [mainRune, setMainRune] = useState('')
    const [mainFirstRune, setMainFirstRune] = useState('')
    const [mainSecondRune, setMainSecondRune] = useState('')
    const [mainThirdRune, setMainThirdRune] = useState('')
    const [secondRune, setSecondRune] = useState('')
    const [secondFirstRune, setSecondFirstRune] = useState('')
    const [secondSecondRune, setSecondSecondRune] = useState('')

    const [offensiveShard, setOffensiveShard] = useState('')
    const [mixedShard, setMixedShard] = useState('')
    const [defensiveShard, setDefensiveShard] = useState('')

    const [stackConqueror, setStackConqueror] = useState(0)
    const [stackLegendExceptBloodline, setStackLegendExceptBloodline] = useState(0)
    const [stackLegendBloodline, setStackLegendBloodline] = useState(0)
    const [stackBounty, setStackBounty] = useState(0)
    const [stackDarkHarvest, setStackDarkHarvest] = useState(0)

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
    const [hasHeartsteel, setHasHeartsteel] = useState(false)
    const [hasRadiant, setHasRadiant] = useState(false)
    const [hasFimbulwinter, setHasFimbulwinter] = useState(false)
    const [hasGoredrinker, setHasGoredrinker] = useState(false)
    const [hasIceborn, setHasIceborn] = useState(false)
    const [hasWinterApproach, setHasWinterApproach] = useState(false)
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
    const [hasMalmortius, setHasMalmortius] = useState(false)
    const [hasSpiritVisage, setHasSpiritVisage] = useState(false)
    const [hasChalice, setHasChalice] = useState(false)
    const [hasEchoes, setHasEchoes] = useState(false)
    const [hasMikael, setHasMikael] = useState(false)
    const [hasRedemption, setHasRedemption] = useState(false)
    const [hasSpectre, setHasSpectre] = useState(false)
    const [hasWarmog, setHasWarmog] = useState(false)
    const [hasArchangel, setHasArchangel] = useState(false)
    const [hasDemonic, setHasDemonic] = useState(false)
    const [hasEverfrost, setHasEverfrost] = useState(false)
    const [hasRabadon, setHasRabadon] = useState(false)
    const [hasRiftmaker, setHasRiftmaker] = useState(false)
    const [hasSeraph, setHasSeraph] = useState(false)
    const [hasFlowing, setHasFlowing] = useState(false)
    const [hasRapidFireCanon, setHasRapidFireCanon] = useState(false)
    const [hasDivine, setHasDivine] = useState(false)
    const [hasShadowflame, setHasShadowflame] = useState(false)
    const [hasLiandry, setHasLiandry] = useState(false)
    const [hasSilvermere, setHasSilvermere] = useState(false)
    // Passer `setSharedState` à vos pages via un contexte ou directement via des props pour le modifier
    const valueToPass = { sharedState, setSharedState };

    // Passer l'état partagé à vos pages
    const childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, { valueToPass });
    });

    return <>{childrenWithProps}</>;
};

export default Layout;
