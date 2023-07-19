import React, { useReducer, useContext, useEffect } from "react";

import { 
    SET_ENEMY_LEVEL,
    SET_ENEMY_NAME,
    SET_TEXTMANA,
    SET_LEVEL,
    SET_IMGSPLASH,
    SET_DATACHAMP,
    SET_ADDITIONNALSTATS,
    SET_BONUSSTATS,
    SET_APHELIOSSTATS,
    SET_SYLASULTIMATE,
    SET_SENNASTACKS,
    SET_STACKMEJAI,
    SET_ENEMY_STATS,
    SET_ENEMY_ITEM_SLOT1,
    SET_ENEMY_ITEM_SLOT2,
    SET_ENEMY_ITEM_SLOT3,
    SET_ENEMY_ITEM_SLOT4,
    SET_ENEMY_ITEM_SLOT5,
    SET_ENEMY_ITEM_SLOT6,
    SET_ENEMY_ELIXIRSLOT,
    SET_ITEM_ENEMY_IMG1,
    SET_ITEM_ENEMY_IMG2,
    SET_ITEM_ENEMY_IMG3,
    SET_ITEM_ENEMY_IMG4,
    SET_ITEM_ENEMY_IMG5,
    SET_ITEM_ENEMY_IMG6,
    SET_ITEM_ENEMY_IMG7,
    SET_ENEMY_ITEM_STATS,
    SET_GAMESTATS,
    SET_ITEM_SLOT1,
    SET_ITEM_SLOT2,
    SET_ITEM_SLOT3,
    SET_ITEM_SLOT4,
    SET_ITEM_SLOT5,
    SET_ITEM_SLOT6,
    SET_ELIXIRSLOT,
    SET_ITEM_IMG1,
    SET_ITEM_IMG2,
    SET_ITEM_IMG3,
    SET_ITEM_IMG4,
    SET_ITEM_IMG5,
    SET_ITEM_IMG6,
    SET_ITEM_IMG7,
    SET_ITEM_STATS,
    SET_RUNESTATS,
    SET_TOTALSTATS,
    SET_NBLEGENDARY,
    SET_STEROIDSTATS,
    SET_QSKILLPOINT,
    SET_WSKILLPOINT,
    SET_ESKILLPOINT,
    SET_RSKILLPOINT,
    SET_PDMG,
    SET_QDMG,
    SET_WDMG,
    SET_EDMG,
    SET_RDMG,
    SET_PCD,
    SET_QCD,
    SET_WCD,
    SET_ECD,
    SET_RCD,
    SET_PIMG,
    SET_QIMG,
    SET_WIMG,
    SET_EIMG,
    SET_RIMG,
    SET_NAMEMAINRUNE,
    SET_MAINRUNE,
    SET_MAINFIRSTRUNE,
    SET_MAINSECONDRUNE,
    SET_MAINTHIRDRUNE,
    SET_SECONDRUNE,
    SET_SECONDFIRSTRUNE,
    SET_SECONDSECONDRUNE,
    SET_OFFENSIVESHARD,
    SET_MIXEDSHARD,
    SET_DEFENSIVESHARD,
    SET_STACKCONQUEROR,
    SET_STACKLEGENDEXCEPTBLOODLINE,
    SET_STACKLEGENDBLOODLINE,
    SET_STACKBOUNTY,
    SET_STACKDARKHARVEST,
    SET_HAS_TRINITY,
    SET_HAS_WARDSTONE,
    SET_HAS_STERAK,
    SET_HAS_GALEFORCE,
    SET_HAS_SHOJIN,
    SET_HAS_MURAMANA,
    SET_HAS_MANAMUNE,
    SET_HAS_RAVENOUSHYDRA,
    SET_HAS_IE,
    SET_HAS_NAVORI,
    SET_HAS_YOUMUU,
    SET_HAS_TITANICHYDRA,
    SET_HAS_BLOODTHIRSTER,
    SET_HAS_HEARTSTEEL,
    SET_HAS_RADIANT,
    SET_HAS_FIMBULWINTER,
    SET_HAS_GOREDRINKER,
    SET_HAS_ICEBORN,
    SET_HAS_WINTERAPPROACH,
    SET_HAS_RAGEBLADE,
    SET_HAS_SHIELDBOW,
    SET_HAS_PHANTOM,
    SET_HAS_RAGEKNIFE,
    SET_HAS_GARGOYLE,
    SET_HAS_HULLBREAKER,
    SET_HAS_JAKSHO,
    SET_HAS_LOCKET,
    SET_HAS_ARMGUARD,
    SET_HAS_ABYSSAL,
    SET_HAS_FORCENATURE,
    SET_HAS_VERDANT,
    SET_HAS_BLACKCLEAVER,
    SET_HAS_DEADMAN,
    SET_HAS_DRAKTHARR,
    SET_HAS_ECLIPSE,
    SET_HAS_HEARTHBOUND,
    SET_HAS_MOBILITY,
    SET_HAS_STRIDEBREAKER,
    SET_HAS_WITSEND,
    SET_HAS_BOTRK,
    SET_HAS_CROWN,
    SET_HAS_ROCKETBELT,
    SET_HAS_LUDEN,
    SET_HAS_MEJAI,
    SET_HAS_HARVESTER,
    SET_HAS_COSMICDRIVE,
    SET_HAS_ROA,
    SET_HAS_SHURELYA,
    SET_HAS_STORMRAZOR,
    SET_HAS_CHEMTANK,
    SET_HAS_MALMORTIUS,
    SET_HAS_SPIRITVISAGE,
    SET_HAS_CHALICE,
    SET_HAS_ECHOES,
    SET_HAS_MIKAEL,
    SET_HAS_REDEMPTION,
    SET_HAS_SPECTRE,
    SET_HAS_WARMOG,
    SET_HAS_ARCHANGEL,
    SET_HAS_DEMONIC,
    SET_HAS_EVERFROST,
    SET_HAS_RABADON,
    SET_HAS_RIFTMAKER,
    SET_HAS_SERAPH,
    SET_HAS_FLOWING,
    SET_HAS_RAPIDFIRECANON,
    SET_HAS_DIVINE,
    SET_HAS_SHADOWFLAME,
    SET_HAS_LIANDRY,
    SET_HAS_SILVERMERE 
} from "../action/action";
// Initial state
const initialState = {
    enemyLevel : 1,
    enemyName : '-',
    textMana : 'Mana',
    level : 1,
    imgSplash : '../../images/centered/GENERIC.png',
    basicStatsChampion : {
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
    },
    additionnalStats : {
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
    },
    bonusStats : {
        "Ardent" : false,
        "Chem" : false,
        "Cloud" : false,
        "Elder" : false,
        "Hextech" : false,
        "Infernal" : false,
        "Mountain" : false,
        "Ocean" : false,
        "Recently Hit" : false,
    },
    apheliosStats : {
        "Crescend Stacks" : 0,
        "Main Weapon" : "-",
        "Sub Weapon" : "-",
    },
    sylasUltimate : "-",
    sennaStacks : 0,
    stackMejai : 0,
    enemyStats : {
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
        "Name" : "-",
    },
    enemyItemSlot1 : '-',
    enemyItemSlot2 : '-',
    enemyItemSlot3 : '-',
    enemyItemSlot4 : '-',
    enemyItemSlot5 : '-',
    enemyItemSlot6 : '-',
    enemyElixirSlot : '-',
    itemEnemyImg1 : '',
    itemEnemyImg2 : '',
    itemEnemyImg3 : '',
    itemEnemyImg4 : '',
    itemEnemyImg5 : '',
    itemEnemyImg6 : '',
    itemEnemyImg7 : '',
    enemyItemStats : {
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
        "TC" : 0,
    },
    gameStats : {
        "Gametime" : 0,
        "Chemtech" : 0,
        "Kills" : 0,
        "Minion" : 0,
        "Cloud" : 0,
        "Hextech" : 0,
        "Infernal" : 0,
        "Mountain" : 0,
        "Ocean" : 0,
    },
    itemSlot1 : '-',
    itemSlot2 : '-',
    itemSlot3 : '-',
    itemSlot4 : '-',
    itemSlot5 : '-',
    itemSlot6 : '-',
    elixirSlot : '-',
    itemImg1 : '',
    itemImg2 : '',
    itemImg3 : '',
    itemImg4 : '',
    itemImg5 : '',
    itemImg6 : '',
    itemImg7 : '',
    itemStats : {
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
        "TC" : 0,
    },
    runeStats : {
        "ForceBit" : 1,
        "Adaptive" : 0,
        "AH" : 0,
        "AS" : 0,
        "AR" : 0,
        "HP" : 0,
        "MP" : 0,
        "MR" : 0,
        "MS" : 0,
        "Ultimate" : 0,
    },
    totalStats : {
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
        "TC" : 0,
    },
    nbLegendary : 0,
    steroidStats : {
        "E" : false,
        "Form" : false,
        "Items" : false,
        "P" : false,
        "Q" : false,
        "R" : false,
        "Runes" : false,
        "W" : false,
    },
    qSkillPoint : 0,
    wSkillPoint : 0,
    eSkillPoint : 0,
    rSkillPoint : 0,
    pDMG : 0,
    qDMG : 0,
    wDMG : 0,
    eDMG : 0,
    rDMG : 0,
    pCD : 0,
    qCD : 0,
    wCD : 0,
    eCD : 0,
    rCD : 0,
    pImg : 0,
    qImg : 0,
    wImg : 0,
    eImg : 0,
    rImg : 0,
    nameMainRune : '',
    mainRune : '',
    mainFirstRune : '',
    mainSecondRune : '',
    mainThirdRune : '',
    secondRune : '',
    secondFirstRune : '',
    secondSecondRune : '',
    offensiveShard : '',
    mixedShard : '',
    defensiveShard : '',
    stackConqueror : 0,
    stackLegendExceptBloodline : 0,
    stackLegendBloodline : 0,
    stackBounty : 0,
    stackDarkHarvest : 0,
    hasTrinity : false,
    hasWardStone : false,
    hasSterak : false,
    hasGaleforce : false,
    hasShojin : false,
    hasMuramana : false,
    hasManamune : false,
    hasRavenousHydra : false,
    hasIE : false,
    hasNavori : false,
    hasYoumuu : false,
    hasTitanicHydra : false,
    hasBloodthirster : false,
    hasHeartsteel : false,
    hasRadiant : false,
    hasFimbulwinter : false,
    hasGoredrinker : false,
    hasIceborn : false,
    hasWinterApproach : false,
    hasRageblade : false,
    hasShieldbow : false,
    hasPhantom : false,
    hasRageknife : false,
    hasGargoyle : false,
    hasHullbreaker : false,
    hasJakSho : false,
    hasLocket : false,
    hasArmguard : false,
    hasAbyssal : false,
    hasForceNature : false,
    hasVerdant : false,
    hasBlackCleaver : false,
    hasDeadMan : false,
    hasDraktharr : false,
    hasEclipse : false,
    hasHearthbound : false,
    hasMobility : false,
    hasStridebreaker : false,
    hasWitsEnd : false,
    hasBOTRK : false,
    hasCrown : false,
    hasRocketbelt : false,
    hasLuden : false,
    hasMejai : false,
    hasHarvester : false,
    hasCosmicDrive : false,
    hasROA : false,
    hasShurelya : false,
    hasStormrazor : false,
    hasChemtank : false,
    hasMalmortius : false,
    hasSpiritVisage : false,
    hasChalice : false,
    hasEchoes : false,
    hasMikael : false,
    hasRedemption : false,
    hasSpectre : false,
    hasWarmog : false,
    hasArchangel : false,
    hasDemonic : false,
    hasEverfrost : false,
    hasRabadon : false,
    hasRiftmaker : false,
    hasSeraph : false,
    hasFlowing : false,
    hasRapidFireCanon : false,
    hasDivine : false,
    hasShadowflame : false,
    hasLiandry : false,
    hasSilvermere : false,
};

export function reducer(state, action) {
    switch (action.type) {
        case SET_ENEMY_LEVEL:
            return {...state, enemyLevel: action.payload}
        case SET_ENEMY_NAME:
            return {...state, enemyName: action.payload}
        case SET_TEXTMANA:
            return {...state, textMana: action.payload}
        case SET_LEVEL:
            return {...state, level: action.payload}
        case SET_IMGSPLASH:
            return {...state, imgSplash: action.payload}
        case SET_DATACHAMP:
            return {...state, basicStatsChampion: action.payload}
        case SET_ADDITIONNALSTATS:
            return {...state, additionnalStats: action.payload}
        case SET_BONUSSTATS:
            return {...state, bonusStats: action.payload}
        case SET_APHELIOSSTATS:
            return {...state, apheliosStats: action.payload}
        case SET_SYLASULTIMATE:
            return {...state, sylasUltimate: action.payload}
        case SET_SENNASTACKS:
            return {...state, sennaStacks: action.payload}
        case SET_STACKMEJAI:
            return {...state, stackMejai: action.payload}
        case SET_ENEMY_STATS:
            return {...state, enemyStats: action.payload}
        case SET_ENEMY_ITEM_SLOT1:
            return {...state, enemyItemSlot1: action.payload}
        case SET_ENEMY_ITEM_SLOT2:
            return {...state, enemyItemSlot2: action.payload}
        case SET_ENEMY_ITEM_SLOT3:
            return {...state, enemyItemSlot3: action.payload}
        case SET_ENEMY_ITEM_SLOT4:
            return {...state, enemyItemSlot4: action.payload}
        case SET_ENEMY_ITEM_SLOT5:
            return {...state, enemyItemSlot5: action.payload}
        case SET_ENEMY_ITEM_SLOT6:
            return {...state, enemyItemSlot6: action.payload}
        case SET_ENEMY_ELIXIRSLOT:
            return {...state, enemyElixirSlot: action.payload}
        case SET_ITEM_ENEMY_IMG1:
            return {...state, itemEnemyImg1: action.payload}
        case SET_ITEM_ENEMY_IMG2:
            return {...state, itemEnemyImg2: action.payload}
        case SET_ITEM_ENEMY_IMG3:
            return {...state, itemEnemyImg3: action.payload}
        case SET_ITEM_ENEMY_IMG4:
            return {...state, itemEnemyImg4: action.payload}
        case SET_ITEM_ENEMY_IMG5:
            return {...state, itemEnemyImg5: action.payload}
        case SET_ITEM_ENEMY_IMG6:
            return {...state, itemEnemyImg6: action.payload}
        case SET_ITEM_ENEMY_IMG7:
            return {...state, itemEnemyImg7: action.payload}
        case SET_ENEMY_ITEM_STATS:
            return {...state, enemyItemStats: action.payload}
        case SET_GAMESTATS:
            return {...state, gameStats: action.payload}
        case SET_ITEM_SLOT1:
            return {...state, itemSlot1: action.payload}
        case SET_ITEM_SLOT2:
            return {...state, itemSlot2: action.payload}
        case SET_ITEM_SLOT3:
            return {...state, itemSlot3: action.payload}
        case SET_ITEM_SLOT4:
            return {...state, itemSlot4: action.payload}
        case SET_ITEM_SLOT5:
            return {...state, itemSlot5: action.payload}
        case SET_ITEM_SLOT6:
            return {...state, itemSlot6: action.payload}
        case SET_ELIXIRSLOT:
            return {...state, elixirSlot: action.payload}
        case SET_ITEM_IMG1:
            return {...state, itemImg1: action.payload}
        case SET_ITEM_IMG2:
            return {...state, itemImg2: action.payload}
        case SET_ITEM_IMG3:
            return {...state, itemImg3: action.payload}
        case SET_ITEM_IMG4:
            return {...state, itemImg4: action.payload}
        case SET_ITEM_IMG5:
            return {...state, itemImg5: action.payload}
        case SET_ITEM_IMG6:
            return {...state, itemImg6: action.payload}
        case SET_ITEM_IMG7:
            return {...state, itemImg7: action.payload}
        case SET_ITEM_STATS:
            return {...state, itemStats: action.payload}
        case SET_RUNESTATS:
            return {...state, runeStats: action.payload}
        case SET_TOTALSTATS:
            return {...state, totalStats: action.payload}
        case SET_NBLEGENDARY:
            return {...state, nbLegendary: action.payload}
        case SET_STEROIDSTATS:
            return {...state, steroidStats: action.payload}
        case SET_QSKILLPOINT:
            return {...state, qSkillPoint: action.payload}
        case SET_WSKILLPOINT:
            return {...state, wSkillPoint: action.payload}
        case SET_ESKILLPOINT:
            return {...state, eSkillPoint: action.payload}
        case SET_RSKILLPOINT:
            return {...state, rSkillPoint: action.payload}
        case SET_PDMG:
            return {...state, pDMG: action.payload}
        case SET_QDMG:
            return {...state, qDMG: action.payload}
        case SET_WDMG:
            return {...state, wDMG: action.payload}
        case SET_EDMG:
            return {...state, eDMG: action.payload}
        case SET_RDMG:
            return {...state, rDMG: action.payload}
        case SET_PCD:
            return {...state, pCD: action.payload}
        case SET_QCD:
            return {...state, qCD: action.payload}
        case SET_WCD:
            return {...state, wCD: action.payload}
        case SET_ECD:
            return {...state, eCD: action.payload}
        case SET_RCD:
            return {...state, rCD: action.payload}
        case SET_PIMG:
            return {...state, pImg: action.payload}
        case SET_QIMG:
            return {...state, qImg: action.payload}
        case SET_WIMG:
            return {...state, wImg: action.payload}
        case SET_EIMG:
            return {...state, eImg: action.payload}
        case SET_RIMG:
            return {...state, rImg: action.payload}
        case SET_NAMEMAINRUNE:
            return {...state, nameMainRune: action.payload}
        case SET_MAINRUNE:
            return {...state, mainRune: action.payload}
        case SET_MAINFIRSTRUNE:
            return {...state, mainFirstRune: action.payload}
        case SET_MAINSECONDRUNE:
            return {...state, mainSecondRune: action.payload}
        case SET_MAINTHIRDRUNE:
            return {...state, mainThirdRune: action.payload}
        case SET_SECONDRUNE:
            return {...state, secondRune: action.payload}
        case SET_SECONDFIRSTRUNE:
            return {...state, secondFirstRune: action.payload}
        case SET_SECONDSECONDRUNE:
            return {...state, secondSecondRune: action.payload}
        case SET_OFFENSIVESHARD:
            return {...state, offensiveShard: action.payload}
        case SET_MIXEDSHARD:
            return {...state, mixedShard: action.payload}
        case SET_DEFENSIVESHARD:
            return {...state, defensiveShard: action.payload}
        case SET_STACKCONQUEROR:
            return {...state, stackConqueror: action.payload}
        case SET_STACKLEGENDEXCEPTBLOODLINE:
            return {...state, stackLegendExceptBloodline: action.payload}
        case SET_STACKLEGENDBLOODLINE:
            return {...state, stackLegendBloodline: action.payload}
        case SET_STACKBOUNTY:
            return {...state, stackBounty: action.payload}
        case SET_STACKDARKHARVEST:
            return {...state, stackDarkHarvest: action.payload}
        case SET_HAS_TRINITY:
            return {...state, hasTrinity: action.payload}
        case SET_HAS_WARDSTONE:
            return {...state, hasWardStone: action.payload}
        case SET_HAS_STERAK:
            return {...state, hasSterak: action.payload}
        case SET_HAS_GALEFORCE:
            return {...state, hasGaleforce: action.payload}
        case SET_HAS_SHOJIN:
            return {...state, hasShojin: action.payload}
        case SET_HAS_MURAMANA:
            return {...state, hasMuramana: action.payload}
        case SET_HAS_MANAMUNE:
            return {...state, hasManamune: action.payload}
        case SET_HAS_RAVENOUSHYDRA:
            return {...state, hasRavenousHydra: action.payload}
        case SET_HAS_IE:
            return {...state, hasIE: action.payload}
        case SET_HAS_NAVORI:
            return {...state, hasNavori: action.payload}
        case SET_HAS_YOUMUU:
            return {...state, hasYoumuu: action.payload}
        case SET_HAS_TITANICHYDRA:
            return {...state, hasTitanicHydra: action.payload}
        case SET_HAS_BLOODTHIRSTER:
            return {...state, hasBloodthirster: action.payload}
        case SET_HAS_HEARTSTEEL:
            return {...state, hasHeartsteel: action.payload}
        case SET_HAS_RADIANT:
            return {...state, hasRadiant: action.payload}
        case SET_HAS_FIMBULWINTER:
            return {...state, hasFimbulwinter: action.payload}
        case SET_HAS_GOREDRINKER:
            return {...state, hasGoredrinker: action.payload}
        case SET_HAS_ICEBORN:
            return {...state, hasIceborn: action.payload}
        case SET_HAS_WINTERAPPROACH:
            return {...state, hasWinterApproach: action.payload}
        case SET_HAS_RAGEBLADE:
            return {...state, hasRageblade: action.payload}
        case SET_HAS_SHIELDBOW:
            return {...state, hasShieldbow: action.payload}
        case SET_HAS_PHANTOM:
            return {...state, hasPhantom: action.payload}
        case SET_HAS_RAGEKNIFE:
            return {...state, hasRageknife: action.payload}
        case SET_HAS_GARGOYLE:
            return {...state, hasGargoyle: action.payload}
        case SET_HAS_HULLBREAKER:
            return {...state, hasHullbreaker: action.payload}
        case SET_HAS_JAKSHO:
            return {...state, hasJakSho: action.payload}
        case SET_HAS_LOCKET:
            return {...state, hasLocket: action.payload}
        case SET_HAS_ARMGUARD:
            return {...state, hasArmguard: action.payload}
        case SET_HAS_ABYSSAL:
            return {...state, hasAbyssal: action.payload}
        case SET_HAS_FORCENATURE:
            return {...state, hasForceNature: action.payload}
        case SET_HAS_VERDANT:
            return {...state, hasVerdant: action.payload}
        case SET_HAS_BLACKCLEAVER:
            return {...state, hasBlackCleaver: action.payload}
        case SET_HAS_DEADMAN:
            return {...state, hasDeadMan: action.payload}
        case SET_HAS_DRAKTHARR:
            return {...state, hasDraktharr: action.payload}
        case SET_HAS_ECLIPSE:
            return {...state, hasEclipse: action.payload}
        case SET_HAS_HEARTHBOUND:
            return {...state, hasHearthbound: action.payload}
        case SET_HAS_MOBILITY:
            return {...state, hasMobility: action.payload}
        case SET_HAS_STRIDEBREAKER:
            return {...state, hasStridebreaker: action.payload}
        case SET_HAS_WITSEND:
            return {...state, hasWitsEnd: action.payload}
        case SET_HAS_BOTRK:
            return {...state, hasBOTRK: action.payload}
        case SET_HAS_CROWN:
            return {...state, hasCrown: action.payload}
        case SET_HAS_ROCKETBELT:
            return {...state, hasRocketbelt: action.payload}
        case SET_HAS_LUDEN:
            return {...state, hasLuden: action.payload}
        case SET_HAS_MEJAI:
            return {...state, hasMejai: action.payload}
        case SET_HAS_HARVESTER:
            return {...state, hasHarvester: action.payload}
        case SET_HAS_COSMICDRIVE:
            return {...state, hasCosmicDrive: action.payload}
        case SET_HAS_ROA:
            return {...state, hasROA: action.payload}
        case SET_HAS_SHURELYA:
            return {...state, hasShurelya: action.payload}
        case SET_HAS_STORMRAZOR:
            return {...state, hasStormrazor: action.payload}
        case SET_HAS_CHEMTANK:
            return {...state, hasChemtank: action.payload}
        case SET_HAS_MALMORTIUS:
            return {...state, hasMalmortius: action.payload}
        case SET_HAS_SPIRITVISAGE:
            return {...state, hasSpiritVisage: action.payload}
        case SET_HAS_CHALICE:
            return {...state, hasChalice: action.payload}
        case SET_HAS_ECHOES:
            return {...state, hasEchoes: action.payload}
        case SET_HAS_MIKAEL:
            return {...state, hasMikael: action.payload}
        case SET_HAS_REDEMPTION:
            return {...state, hasRedemption: action.payload}
        case SET_HAS_SPECTRE:
            return {...state, hasSpectre: action.payload}
        case SET_HAS_WARMOG:
            return {...state, hasWarmog: action.payload}
        case SET_HAS_ARCHANGEL:
            return {...state, hasArchangel: action.payload}
        case SET_HAS_DEMONIC:
            return {...state, hasDemonic: action.payload}
        case SET_HAS_EVERFROST:
            return {...state, hasEverfrost: action.payload}
        case SET_HAS_RABADON:
            return {...state, hasRabadon: action.payload}
        case SET_HAS_RIFTMAKER:
            return {...state, hasRiftmaker: action.payload}
        case SET_HAS_SERAPH:
            return {...state, hasSeraph: action.payload}
        case SET_HAS_FLOWING:
            return {...state, hasFlowing: action.payload}
        case SET_HAS_RAPIDFIRECANON:
            return {...state, hasRapidFireCanon: action.payload}
        case SET_HAS_DIVINE:
            return {...state, hasDivine: action.payload}
        case SET_HAS_SHADOWFLAME:
            return {...state, hasShadowflame: action.payload}
        case SET_HAS_LIANDRY:
            return {...state, hasLiandry: action.payload}
        case SET_HAS_SILVERMERE:
            return {...state, hasSilvermere: action.payload}
        default:
            return state;
    }
  }