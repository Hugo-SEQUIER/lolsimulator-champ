import React, { useReducer, useContext, useEffect } from "react";

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
            return {...state, enemyLevel}
        case SET_ENEMY_NAME:
            return {...state, enemyName}
        case SET_TEXTMANA:
            return {...state, textMana}
        case SET_LEVEL:
            return {...state, level}
        case SET_IMGSPLASH:
            return {...state, imgSplash}
        case SET_DATACHAMP:
            return {...state, basicStatsChampion}
        case SET_ADDITIONNALSTATS:
            return {...state, additionnalStats}
        case SET_BONUSSTATS:
            return {...state, bonusStats}
        case SET_APHELIOSSTATS:
            return {...state, apheliosStats}
        case SET_SYLASULTIMATE:
            return {...state, sylasUltimate}
        case SET_SENNASTACKS:
            return {...state, sennaStacks}
        case SET_STACKMEJAI:
            return {...state, stackMejai}
        case SET_ENEMY_STATS:
            return {...state, enemyStats}
        case SET_ENEMY_ITEM_SLOT1:
            return {...state, enemyItemSlot1}
        case SET_ENEMY_ITEM_SLOT2:
            return {...state, enemyItemSlot2}
        case SET_ENEMY_ITEM_SLOT3:
            return {...state, enemyItemSlot3}
        case SET_ENEMY_ITEM_SLOT4:
            return {...state, enemyItemSlot4}
        case SET_ENEMY_ITEM_SLOT5:
            return {...state, enemyItemSlot5}
        case SET_ENEMY_ITEM_SLOT6:
            return {...state, enemyItemSlot6}
        case SET_ENEMY_ELIXIRSLOT:
            return {...state, enemyElixirSlot}
        case SET_ITEM_ENEMY_IMG1:
            return {...state, itemEnemyImg1}
        case SET_ITEM_ENEMY_IMG2:
            return {...state, itemEnemyImg2}
        case SET_ITEM_ENEMY_IMG3:
            return {...state, itemEnemyImg3}
        case SET_ITEM_ENEMY_IMG4:
            return {...state, itemEnemyImg4}
        case SET_ITEM_ENEMY_IMG5:
            return {...state, itemEnemyImg5}
        case SET_ITEM_ENEMY_IMG6:
            return {...state, itemEnemyImg6}
        case SET_ITEM_ENEMY_IMG7:
            return {...state, itemEnemyImg7}
        case SET_ENEMY_ITEM_STATS:
            return {...state, enemyItemStats}
        case SET_GAMESTATS:
            return {...state, gameStats}
        case SET_ITEM_SLOT1:
            return {...state, itemSlot1}
        case SET_ITEM_SLOT2:
            return {...state, itemSlot2}
        case SET_ITEM_SLOT3:
            return {...state, itemSlot3}
        case SET_ITEM_SLOT4:
            return {...state, itemSlot4}
        case SET_ITEM_SLOT5:
            return {...state, itemSlot5}
        case SET_ITEM_SLOT6:
            return {...state, itemSlot6}
        case SET_ELIXIRSLOT:
            return {...state, elixirSlot}
        case SET_ITEM_IMG1:
            return {...state, itemImg1}
        case SET_ITEM_IMG2:
            return {...state, itemImg2}
        case SET_ITEM_IMG3:
            return {...state, itemImg3}
        case SET_ITEM_IMG4:
            return {...state, itemImg4}
        case SET_ITEM_IMG5:
            return {...state, itemImg5}
        case SET_ITEM_IMG6:
            return {...state, itemImg6}
        case SET_ITEM_IMG7:
            return {...state, itemImg7}
        case SET_ITEM_STATS:
            return {...state, itemStats}
        case SET_RUNESTATS:
            return {...state, runeStats}
        case SET_TOTALSTATS:
            return {...state, totalStats}
        case SET_NBLEGENDARY:
            return {...state, nbLegendary}
        case SET_STEROIDSTATS:
            return {...state, steroidStats}
        case SET_QSKILLPOINT:
            return {...state, qSkillPoint}
        case SET_WSKILLPOINT:
            return {...state, wSkillPoint}
        case SET_ESKILLPOINT:
            return {...state, eSkillPoint}
        case SET_RSKILLPOINT:
            return {...state, rSkillPoint}
        case SET_PDMG:
            return {...state, pDMG}
        case SET_QDMG:
            return {...state, qDMG}
        case SET_WDMG:
            return {...state, wDMG}
        case SET_EDMG:
            return {...state, eDMG}
        case SET_RDMG:
            return {...state, rDMG}
        case SET_PCD:
            return {...state, pCD}
        case SET_QCD:
            return {...state, qCD}
        case SET_WCD:
            return {...state, wCD}
        case SET_ECD:
            return {...state, eCD}
        case SET_RCD:
            return {...state, rCD}
        case SET_PIMG:
            return {...state, pImg}
        case SET_QIMG:
            return {...state, qImg}
        case SET_WIMG:
            return {...state, wImg}
        case SET_EIMG:
            return {...state, eImg}
        case SET_RIMG:
            return {...state, rImg}
        case SET_NAMEMAINRUNE:
            return {...state, nameMainRune}
        case SET_MAINRUNE:
            return {...state, mainRune}
        case SET_MAINFIRSTRUNE:
            return {...state, mainFirstRune}
        case SET_MAINSECONDRUNE:
            return {...state, mainSecondRune}
        case SET_MAINTHIRDRUNE:
            return {...state, mainThirdRune}
        case SET_SECONDRUNE:
            return {...state, secondRune}
        case SET_SECONDFIRSTRUNE:
            return {...state, secondFirstRune}
        case SET_SECONDSECONDRUNE:
            return {...state, secondSecondRune}
        case SET_OFFENSIVESHARD:
            return {...state, offensiveShard}
        case SET_MIXEDSHARD:
            return {...state, mixedShard}
        case SET_DEFENSIVESHARD:
            return {...state, defensiveShard}
        case SET_STACKCONQUEROR:
            return {...state, stackConqueror}
        case SET_STACKLEGENDEXCEPTBLOODLINE:
            return {...state, stackLegendExceptBloodline}
        case SET_STACKLEGENDBLOODLINE:
            return {...state, stackLegendBloodline}
        case SET_STACKBOUNTY:
            return {...state, stackBounty}
        case SET_STACKDARKHARVEST:
            return {...state, stackDarkHarvest}
        case SET_HAS_TRINITY:
            return {...state, hasTrinity}
        case SET_HAS_WARDSTONE:
            return {...state, hasWardStone}
        case SET_HAS_STERAK:
            return {...state, hasSterak}
        case SET_HAS_GALEFORCE:
            return {...state, hasGaleforce}
        case SET_HAS_SHOJIN:
            return {...state, hasShojin}
        case SET_HAS_MURAMANA:
            return {...state, hasMuramana}
        case SET_HAS_MANAMUNE:
            return {...state, hasManamune}
        case SET_HAS_RAVENOUSHYDRA:
            return {...state, hasRavenousHydra}
        case SET_HAS_IE:
            return {...state, hasIE}
        case SET_HAS_NAVORI:
            return {...state, hasNavori}
        case SET_HAS_YOUMUU:
            return {...state, hasYoumuu}
        case SET_HAS_TITANICHYDRA:
            return {...state, hasTitanicHydra}
        case SET_HAS_BLOODTHIRSTER:
            return {...state, hasBloodthirster}
        case SET_HAS_HEARTSTEEL:
            return {...state, hasHeartsteel}
        case SET_HAS_RADIANT:
            return {...state, hasRadiant}
        case SET_HAS_FIMBULWINTER:
            return {...state, hasFimbulwinter}
        case SET_HAS_GOREDRINKER:
            return {...state, hasGoredrinker}
        case SET_HAS_ICEBORN:
            return {...state, hasIceborn}
        case SET_HAS_WINTERAPPROACH:
            return {...state, hasWinterApproach}
        case SET_HAS_RAGEBLADE:
            return {...state, hasRageblade}
        case SET_HAS_SHIELDBOW:
            return {...state, hasShieldbow}
        case SET_HAS_PHANTOM:
            return {...state, hasPhantom}
        case SET_HAS_RAGEKNIFE:
            return {...state, hasRageknife}
        case SET_HAS_GARGOYLE:
            return {...state, hasGargoyle}
        case SET_HAS_HULLBREAKER:
            return {...state, hasHullbreaker}
        case SET_HAS_JAKSHO:
            return {...state, hasJakSho}
        case SET_HAS_LOCKET:
            return {...state, hasLocket}
        case SET_HAS_ARMGUARD:
            return {...state, hasArmguard}
        case SET_HAS_ABYSSAL:
            return {...state, hasAbyssal}
        case SET_HAS_FORCENATURE:
            return {...state, hasForceNature}
        case SET_HAS_VERDANT:
            return {...state, hasVerdant}
        case SET_HAS_BLACKCLEAVER:
            return {...state, hasBlackCleaver}
        case SET_HAS_DEADMAN:
            return {...state, hasDeadMan}
        case SET_HAS_DRAKTHARR:
            return {...state, hasDraktharr}
        case SET_HAS_ECLIPSE:
            return {...state, hasEclipse}
        case SET_HAS_HEARTHBOUND:
            return {...state, hasHearthbound}
        case SET_HAS_MOBILITY:
            return {...state, hasMobility}
        case SET_HAS_STRIDEBREAKER:
            return {...state, hasStridebreaker}
        case SET_HAS_WITSEND:
            return {...state, hasWitsEnd}
        case SET_HAS_BOTRK:
            return {...state, hasBOTRK}
        case SET_HAS_CROWN:
            return {...state, hasCrown}
        case SET_HAS_ROCKETBELT:
            return {...state, hasRocketbelt}
        case SET_HAS_LUDEN:
            return {...state, hasLuden}
        case SET_HAS_MEJAI:
            return {...state, hasMejai}
        case SET_HAS_HARVESTER:
            return {...state, hasHarvester}
        case SET_HAS_COSMICDRIVE:
            return {...state, hasCosmicDrive}
        case SET_HAS_ROA:
            return {...state, hasROA}
        case SET_HAS_SHURELYA:
            return {...state, hasShurelya}
        case SET_HAS_STORMRAZOR:
            return {...state, hasStormrazor}
        case SET_HAS_CHEMTANK:
            return {...state, hasChemtank}
        case SET_HAS_MALMORTIUS:
            return {...state, hasMalmortius}
        case SET_HAS_SPIRITVISAGE:
            return {...state, hasSpiritVisage}
        case SET_HAS_CHALICE:
            return {...state, hasChalice}
        case SET_HAS_ECHOES:
            return {...state, hasEchoes}
        case SET_HAS_MIKAEL:
            return {...state, hasMikael}
        case SET_HAS_REDEMPTION:
            return {...state, hasRedemption}
        case SET_HAS_SPECTRE:
            return {...state, hasSpectre}
        case SET_HAS_WARMOG:
            return {...state, hasWarmog}
        case SET_HAS_ARCHANGEL:
            return {...state, hasArchangel}
        case SET_HAS_DEMONIC:
            return {...state, hasDemonic}
        case SET_HAS_EVERFROST:
            return {...state, hasEverfrost}
        case SET_HAS_RABADON:
            return {...state, hasRabadon}
        case SET_HAS_RIFTMAKER:
            return {...state, hasRiftmaker}
        case SET_HAS_SERAPH:
            return {...state, hasSeraph}
        case SET_HAS_FLOWING:
            return {...state, hasFlowing}
        case SET_HAS_RAPIDFIRECANON:
            return {...state, hasRapidFireCanon}
        case SET_HAS_DIVINE:
            return {...state, hasDivine}
        case SET_HAS_SHADOWFLAME:
            return {...state, hasShadowflame}
        case SET_HAS_LIANDRY:
            return {...state, hasLiandry}
        case SET_HAS_SILVERMERE:
            return {...state, hasSilvermere}
        default:
            return state;
    }
  }