import { useContext } from "react";
import React, { useEffect, useState } from "react";
import { DataContext } from "../../context/context";
import Link from "next/link";
import StatsTable from "./basicChampionStats";
import SkillsTable from "./skillsChampionValue";
import ItemsStats from "./itemsChampionStats";
import BonusStats from "./bonusStats";
import ItemsEnemyStats from "./itemsEnemyStats";
import EnemyStats from "./enemyStats";
import GameStats from "./gameStats";
import RunesTables from "./runesStats";
import { evaluate } from "mathjs";
import { removeExcelFunctions } from "./excelTraitement";
import { useRouter } from 'next/router'
const Layout = ({ data, nameChamp }) => {
  const { state, dispatch } = useContext(DataContext);

  const router = useRouter()
  const { champion } = router.query
  console.log(router)
  let options = [];
  for (let i = 1; i <= 18; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  const listItemsLegendary = [
    "-",
    "Abyssal Mask",
    "Anathema's Chains",
    "Archangel's Staff",
    "Ardent Censer",
    "Axiom Arc",
    "Banshee's Veil",
    "Black Cleaver",
    "Black Mist Scythe",
    "Blade of the Ruined King",
    "Bloodthirster",
    "Bulwark of the Mountain",
    "Chempunk Chainsword",
    "Chemtech Putrifier",
    "Cosmic Drive",
    "Dead Man's Plate",
    "Death's Dance",
    "Demonic Embrace",
    "Edge of Night",
    "Essence Reaver",
    "Fimbulwinter",
    "Force of Nature",
    "Frozen Heart",
    "Gargoyle Stoneplate",
    "Guardian Angel",
    "Horizon Focus",
    "Hullbreaker",
    "Immortal Shieldbow",
    "Imperial Mandate",
    "Knight's Vow",
    "Kraken Slayer",
    "Lich Bane",
    "Lord Dominik's Regards",
    "Manamune",
    "Maw of Malmortius",
    "Mejai's Soulstealer",
    "Mercurial Scimitar",
    "Mikael's Blessing",
    "Morellonomicon",
    "Mortal Reminder",
    "Muramana",
    "Nashor's Tooth",
    "Pauldrons of Whiterock",
    "Phantom Dancer",
    "Prowler's Claw",
    "Rabadon's Deathcap",
    "Randuin's Omen",
    "Rapid Firecannon",
    "Ravenous Hydra",
    "Redemption",
    "Runaan's Hurricane",
    "Rylai's Crystal Scepter",
    "Seraph's Embrace",
    "Serpent's Fang",
    "Serylda's Grudge",
    "Shadowflame",
    "Shard of True Ice",
    "Silvermere Dawn",
    "Spear of Shojin",
    "Spirit Visage",
    "Staff of Flowing Water",
    "Statikk Shiv",
    "Sterak's Gage",
    "Stormrazor",
    "Sunfire Aegis",
    "The Collector",
    "Thornmail",
    "Titanic Hydra",
    "Turbo Chemtank",
    "Umbral Glaive",
    "Vigilant Wardstone",
    "Void Staff",
    "Warmog's Armor",
    "Winter's Approach",
    "Wit's End",
    "Zeke's Convergence",
    "Zhonya's Hourglass",
  ];

  const handleChange = (type, value) => {
    dispatch({ type: type, payload: value });
  };

  useEffect(() => {
    majItemEnemyStats();
  }, [
    state.enemyItemSlot1,
    state.enemyItemSlot2,
    state.enemyItemSlot3,
    state.enemyItemSlot4,
    state.enemyItemSlot5,
    state.enemyItemSlot6,
    state.enemyElixirSlot,
  ]);

  useEffect(() => {
    majItemStats();
  }, [
    state.itemSlot1,
    state.itemSlot2,
    state.itemSlot3,
    state.itemSlot4,
    state.itemSlot5,
    state.itemSlot6,
    state.elixirSlot,
  ]);
  console.log(data)
  useEffect(() => {
    if (data != undefined) {
      if (data["Energy"] === 1) {
        handleChange("SET_TEXTMANA", "Energy");
      } else {
        handleChange("SET_TEXTMANA", "Mana");
      }
      handleChange("SET_IMGSPLASH", `../../images/centered/${nameChamp}_0.jpg`);
      /** BASICS STATS */
      let sampleData = {
          "HP": 0,
          "HP+": 0,
          "HP5": 0,
          "HP5+": 0,
          "MP": 0,
          "MP+": 0,
          "MP5": 0,
          "MP5+": 0,
          "AD": 0,
          "AD+": 0,
          "AS": 0,
          "Ratio": 0,
          "AS+": 0,
          "AR": 0,
          "AR+": 0,
          "MR": 0,
          "MR+": 0,
          "MS": 0,
          "Range": 0,
          "Q-DMG": 0,
          "W-DMG": 0,
          "E-DMG": 0,
          "R-DMG": 0,
          "P-DMG": 0,
          "Q-CD": 0.9,
          "W-CD": 0,
          "E-CD": 0,
          "R-CD": 0,
          "P-CD": 0,
          "Melee?": 0,
          "img": data["img"],
          "Burst Calc": 0,
          "Trade Calc": 0,
          "Energy": 0,
          "No Mana": 0
      }
      for (let key in data) {
        sampleData[key] = data[key]
        if (key == "img" || key.includes("DMG") || key.includes("CD")) break;
        if (typeof data[key] === "string") {
          console.log(key);
          sampleData[key] = getNumericFromString(data[key]);
        }
      }
      let champ_obj = {
        Hp:
        sampleData["HP"] +
        sampleData["HP+"] * (state.level - 1) +
          (state.steroidStats["Form"] && nameChamp == "Gnar"
            ? 100 + 43 * (state.level - 1)
            : 0) +
          (state.steroidStats["Form"] && nameChamp == "Kled"
            ? 810 +
              144 *
                (state.level - 1) *
                (0.007025 + 0.000175 * (state.level - 1))
            : 0),
        "Attack Damage":
          (sampleData["AD"] + sampleData["AD+"] * (state.level - 1)) *
          (1 +
            (state.steroidStats["Items"] && state.hasTrinity ? 0.2 : 0) +
            (state.steroidStats["Form"] && nameChamp == "Gnar"
              ? 8 + 2.5 * (state.level - 1)
              : 0)),
        "Attack Speed %": Number(
          sampleData["AS"] * (1 + (sampleData["Ratio"] * (state.level - 1)) / 100)
        ),
        Armor:
        sampleData["AR"] +
        sampleData["AR+"] * (state.level - 1) +
          (state.steroidStats["Form"] && nameChamp == "Gnar"
            ? 3.5 + 3 * (state.level - 1)
            : 0),
        "Magic Resist":
        sampleData["MR"] +
        sampleData["MR+"] * (state.level - 1) +
          (state.steroidStats["Form"] && nameChamp == "Gnar"
            ? 3.5 + 3.5 * (state.level - 1)
            : 0),
        "Move Speed": sampleData["MS"],
        Lifesteal: 0,
        "Critical %": 0,
        "Hp Regen": sampleData["HP5"] + sampleData["HP5+"] * (state.level - 1),

        Mana: sampleData["MP"] + sampleData["MP+"] * (state.level - 1),
        "Ability Power": 0,
        Range: sampleData["Range"],
        "Armor Penetration": 0,
        "Resist Penetration": 0,
        "Ability Haste": 0,
        "Spellvamp %": 0,
        "Tenacity %": 0,
        "Mana / Regen": sampleData["MP5"] + sampleData["MP5+"] * (state.level - 1),
      };
      console.log(sampleData["AS"])
      console.log(sampleData["Ratio"])
      handleChange("SET_DATACHAMP", champ_obj);
    }
  }, [data, state.level, state.steroidStats, state.qSkillPoint, state.wSkillPoint, state.eSkillPoint, state.rSkillPoint]);

  useEffect(() => {
    enemyDataPrep();
  }, [
    state.enemyName,
    state.enemyLevel,
    state.enemyElixirSlot,
    state.enemyItemSlot1,
    state.enemyItemSlot2,
    state.enemyItemSlot3,
    state.enemyItemSlot4,
    state.enemyItemSlot5,
    state.enemyItemSlot6,
    state.enemyItemStats,
  ]);

  useEffect(() => {
    if (data != undefined) {
      majStatsRune();
    }
  }, [
    state.nameMainRune,
    state.mainRune,
    state.mainFirstRune,
    state.mainSecondRune,
    state.mainThirdRune,
    state.secondRune,
    state.secondFirstRune,
    state.secondSecondRune,
    state.offensiveShard,
    state.mixedShard,
    state.defensiveShard,
    state.stackBounty,
    state.stackConqueror,
    state.stackDarkHarvest,
    state.stackLegendBloodline,
    state.stackLegendExceptBloodline,
  ]);

  useEffect(() => {
    let obj = {
      Hp: 0,
      "Attack Damage": 0,
      "Attack Speed %": 0,
      Armor: 0,
      "Magic Resist": 0,
      "Move Speed": 0,
      Lifesteal: 0,
      "Critical %": 0,
      "Hp Regen": 0,

      Mana: 0,
      "Ability Power": 0,
      Range: 0,
      "Armor Penetration": 0,
      "Resist Penetration": 0,
      "Ability Haste": 0,
      "Spellvamp %": 0,
      "Tenacity %": 0,
      "Mana / Regen": 0,
    };
    // AttackDamage
    // SE referer au WIKI
    let bonusAD =
      (state.hasBloodthirster && state.steroidStats["Items"]
        ? state.level < 13
          ? 10
          : state.level < 14
          ? 15
          : state.level < 15
          ? 20
          : state.level < 16
          ? 25
          : state.level < 17
          ? 30
          : state.level < 18
          ? 35
          : 40
        : 0) +
      (state.hasSterak ? state.basicStatsChampion["Attack Damage"] / 2 : 0) +
      (state.hasGaleforce || state.hasIE || state.hasNavori
        ? 5 * state.nbLegendary
        : 0) +
      (state.hasRavenousHydra && state.steroidStats["Items"] ? 20 : 0) +
      (state.hasTrinity ? 3 * state.nbLegendary : 0) +
      (state.hasYoumuu ? 7 * state.nbLegendary : 0) +
      (state.hasTitanicHydra ? 0.02 * state.additionnalStats["Hp"] : 0);
    bonusAD +=
      nameChamp == "Aphelios"
        ? state.qSkillPoint == 0
          ? 4.5
          : state.qSkillPoint == 1
          ? 9
          : state.qSkillPoint == 2
          ? 13.5
          : state.qSkillPoint == 3
          ? 18
          : state.qSkillPoint == 4
          ? 22.5
          : 27
        : 0;
    bonusAD +=
      nameChamp == "Darius" && state.steroidStats["P"]
        ? state.level <= 10
          ? 30 + 5 * (state.level - 1)
          : state.level <= 13
          ? 30 + 10 * (state.level - 1)
          : 30 + 25 * (state.level - 1)
        : 0;
    bonusAD +=
      nameChamp.includes("Mundo") && state.eSkillPoint > 0
        ? 2 + 0.5 * state.eSkillPoint
        : 0;
    bonusAD +=
      nameChamp == "Hecarim"
        ? state.additionnalStats["Move Speed"] *
          (0.12 +
            (state.level >= 3 ? 0.02 * Math.floor((state.level - 3) / 3) : 0))
        : 0;
    bonusAD +=
      nameChamp.includes("Sante") && state.steroidStats["R"]
        ? 5 +
          state.additionnalStats["Armor"] * 0.325 +
          state.additionnalStats["Magic Resist"] * 0.325
        : 0;
    bonusAD +=
      nameChamp == "Nocturne" && state.steroidStats["Q"]
        ? 10 + 10 * state.qSkillPoint
        : 0;
    bonusAD += nameChamp == "Senna" ? 0.75 * state.sennaStacks : 0;
    bonusAD +=
      nameChamp == "Tryndamere" && state.qSkillPoint > 0
        ? 10 + 5 * (state.qSkillPoint - 1)
        : 0;
    bonusAD +=
      nameChamp == "Twitch" && state.steroidStats["R"]
        ? 40 + 15 * (state.rSkillPoint - 1)
        : 0;
    bonusAD +=
      nameChamp == "Vayne" && state.steroidStats["R"]
        ? 25 + 15 * (state.rSkillPoint - 1)
        : 0;
    bonusAD += nameChamp == "Pyke" ? 0.07143 * state.additionnalStats["Hp"] : 0;
    bonusAD +=
      state.mainRune == "Conqueror" && state.runeStats["ForceBit"] == 1
        ? (1.2 + 1.5 / (17 * (state.level - 1))) * state.stackConqueror
        : 0;
    bonusAD +=
      (state.secondFirstRune.includes("EyeBall") ||
        state.secondSecondRune.includes("EyeBall") ||
        state.mainSecondRune.includes("Eyeball")) &&
      state.runeStats["ForceBit"] == 1
        ? 1.2 * state.stackBounty + (state.stackBounty == 10 ? 6 : 0)
        : 0;
    bonusAD +=
      (state.secondFirstRune.includes("Poro") ||
        state.secondSecondRune.includes("Poro") ||
        state.mainSecondRune.includes("Poro")) &&
      state.runeStats["ForceBit"] == 1
        ? 1.2 * state.stackBounty + (state.stackBounty == 10 ? 6 : 0)
        : 0;
    bonusAD +=
      (state.secondFirstRune.includes("Zombie") ||
        state.secondSecondRune.includes("Zombie") ||
        state.mainSecondRune.includes("Zombie")) &&
      state.runeStats["ForceBit"] == 1
        ? 1.2 * state.stackBounty + (state.stackBounty == 10 ? 6 : 0)
        : 0;
    bonusAD +=
      (state.secondFirstRune.includes("Absolute Focus") ||
        state.secondSecondRune.includes("Absolute Focus") ||
        state.mainSecondRune.includes("EyeAbsolute Focusball")) &&
      state.runeStats["ForceBit"] == 1
        ? 1.8 + 16.2 / (17 * (state.level - 1))
        : 0;
    bonusAD +=
      (state.secondFirstRune.includes("Gathering Storm") ||
        state.secondSecondRune.includes("Gathering Storm") ||
        state.mainSecondRune.includes("Gathering Storm")) &&
      state.runeStats["ForceBit"] == 1
        ? state.gameStats["Gametime"] < 10
          ? 0
          : state.gameStats["Gametime"] < 20
          ? 4.8
          : state.gameStats["Gametime"] < 30
          ? 14.4
          : state.gameStats["Gametime"] < 40
          ? 28.8
          : 48
        : 0;

    obj["Attack Damage"] =
      (state.itemStats["AD"] +
        (state.runeStats["ForceBit"] == 1 ? state.runeStats["Adaptive"] : 0) +
        bonusAD) *
      (1 +
        0.05 * state.gameStats["Infernal"] +
        (state.hasWardStone ? 0.2 : 0) +
        (nameChamp == "Riven" && state.steroidStats["R"] ? 0.2 : 0) +
        (nameChamp == "Rengar" && state.steroidStats["P"] ? 0.25 : 0));

    // HP
    let bonusHP =
      state.hasGoredrinker || state.hasRadiant ? 75 * state.nbLegendary : 0;
    bonusHP += state.hasIceborn ? 50 * state.nbLegendary : 0;
    bonusHP += nameChamp.includes("Gath")
      ? 40 + 40 * state.rSkillPoint * state.gameStats["Kills"]
      : 0;
    bonusHP +=
      nameChamp == "Nasus" && state.steroidStats["R"]
        ? 150 + 150 * state.rSkillPoint
        : 0;
    bonusHP +=
      nameChamp == "Renekton" && state.steroidStats["R"]
        ? 100 + 150 * state.rSkillPoint
        : 0;
    bonusHP +=
      nameChamp == "Shyvana" && state.steroidStats["R"]
        ? 50 + 100 * state.rSkillPoint
        : 0;
    bonusHP +=
      nameChamp == "Sion" && state.wSkillPoint > 0
        ? 4 * state.gameStats["Minion"] + 15 * state.gameStats["Kills"]
        : 0;
    bonusHP += nameChamp == "Swain" ? 12 * state.gameStats["Minion"] : 0;
    bonusHP +=
      nameChamp == "Volibear" && state.steroidStats["R"]
        ? 0 + 175 * state.rSkillPoint
        : 0;
    bonusHP += state.stackLegendBloodline == 15 ? 85 : 0;
    bonusHP +=
      state.mainThirdRune == "Overgrowth" ||
      state.secondSecondRune == "Overgrowth"
        ? 3 * Math.floor(state.gameStats["Minion"] / 8) >= 45
          ? 0.035 * state.basicStatsChampion["Hp"]
          : 0
        : 0;
    bonusHP +=
      state.mainThirdRune == "Overgrowth" ||
      state.secondSecondRune == "Overgrowth"
        ? 3 * Math.floor(state.gameStats["Minion"] / 8)
        : 0;
    let multiBonusHp =
      state.mainThirdRune == "Overgrowth" ||
      state.secondSecondRune == "Overgrowth"
        ? 3 * Math.floor(state.gameStats["Minion"] / 8) >= 45
          ? 1.035
          : 1
        : 1;
    multiBonusHp *= state.hasWardStone ? 1.2 : 1;
    multiBonusHp *=
      nameChamp == "Ornn"
        ? Math.min(
            1.3,
            1.1 + (state.level > 12 ? (state.level - 12) * 0.04 : 0)
          )
        : 1;

    obj["Hp"] =
      (state.itemStats["HP"] + state.runeStats["HP"] + bonusHP) * multiBonusHp;

    // Attack Speed https://leagueoflegends.fandom.com/wiki/Attack_speed
    let bonusAS =
      (state.bonusStats["Ardent"] ? 0.2 : 0) +
      (state.hasRageblade && state.steroidStats["Items"] ? 0.32 : 0) +
      (state.hasShieldbow && state.steroidStats["Items"] ? 0.3 : 0) +
      (state.hasPhantom && state.steroidStats["Items"] ? 0.3 : 0) +
      (state.hasRageknife && state.steroidStats["Items"] ? 0.15 : 0);
    bonusAS +=
      nameChamp.includes("Jarvan") &&
      state.steroidStats["Q"] &&
      state.qSkillPoint > 0
        ? 0.175 + 0.025 * state.qSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Lulu" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 0.225 + 0.025 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Nidalee" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.1 + 0.1 * state.eSkillPoint
        : 0;
    bonusAS += nameChamp.includes("Nunu") && state.steroidStats["P"] ? 0.2 : 0;
    bonusAS +=
      nameChamp == "Aphelios"
        ? state.wSkillPoint == 0
          ? 9
          : state.wSkillPoint == 1
          ? 18
          : state.wSkillPoint == 2
          ? 27
          : state.wSkillPoint == 3
          ? 36
          : state.wSkillPoint == 4
          ? 45
          : 54
        : 0;
    bonusAS +=
      nameChamp == "Ashe" && state.steroidStats["Q"] && state.qSkillPoint > 0
        ? 0.175 + 0.075 * state.qSkillPoint
        : 0;
    bonusAS += nameChamp.includes("Veth")
      ? state.gameStats["Minion"] +
        2 * state.gameStats["Kills"] * 0.0022 +
        0.0006 * state.level +
        (state.steroidStats["P"] ? 0.25 + 0.25 / (17 * state.level - 1) : 0)
      : 0;
    bonusAS +=
      nameChamp.includes("Blitz") &&
      state.steroidStats["W"] &&
      state.wSkillPoint > 0
        ? 0.17 + 0.13 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Camille" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.35 + 0.05 * state.eSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Diana" && state.steroidStats["P"]
        ? state.level < 3
          ? 0.15
          : state.level < 6
          ? 0.1917
          : state.level < 9
          ? 0.2333
          : state.level < 12
          ? 0.275
          : state.level < 15
          ? 0.3167
          : 0.4
        : 0;
    bonusAS +=
      nameChamp == "Draven" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 0.15 + 0.05 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Elise" &&
      state.steroidStats["W"] &&
      state.steroidStats["Form"] &&
      state.wSkillPoint > 0
        ? 0.5 + 0.1 * state.wSkillPoint
        : 0;
    bonusAS += nameChamp == "Ezreal" && state.steroidStats["P"] ? 0.5 : 0;
    bonusAS +=
      nameChamp == "Fiora" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.4 + 0.1 * state.eSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Gnar" && !state.steroidStats["Form"]
        ? 0.055 + state.eSkillPoint > 0
          ? 0.35 + 0.05 * state.eSkillPoint
          : 0
        : 0;
    bonusAS +=
      nameChamp == "Gwen" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.05 + 0.15 * state.eSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Irelia" && state.steroidStats["P"]
        ? state.level < 7
          ? 0.3
          : state.level < 14
          ? 0.55
          : 0.8
        : 0;
    bonusAS +=
      nameChamp == "Jax" && state.steroidStats["P"]
        ? 0.28 + 0.12 * Math.floor(state.level / 3)
        : 0;
    bonusAS +=
      nameChamp == "Jinx" && !state.steroidStats["Q"] && state.qSkillPoint > 0
        ? 0.05 + 0.25 * state.qSkillPoint
        : 0;
    bonusAS +=
      nameChamp.includes("Kai") &&
      nameChamp.includes("Sa") &&
      state.steroidStats["E"] &&
      state.eSkillPoint > 0
        ? 0.3 + 0.1 * state.eSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Kennen" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.3 + 0.1 * state.eSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Kindred" && state.steroidStats["Q"]
        ? 0.35 + 0.05 * state.gameStats["Kills"]
        : 0;
    bonusAS += nameChamp == "Kled" && state.steroidStats["W"] ? 1.5 : 0;
    bonusAS +=
      nameChamp.includes("Kog") &&
      nameChamp.includes("Maw") &&
      state.qSkillPoint > 0
        ? 0.05 + 0.05 * state.qSkillPoint
        : 0;
    bonusAS +=
      nameChamp.includes("Lee") &&
      nameChamp.includes("Sin") &&
      state.steroidStats["P"]
        ? 0.4
        : 0;
    bonusAS +=
      nameChamp.includes("Master") &&
      state.steroidStats["R"] &&
      state.rSkillPoint > 0
        ? 0.15 + 0.1 * state.rSkillPoint
        : 0;
    bonusAS +=
      nameChamp.includes("Fortune") &&
      state.steroidStats["W"] &&
      state.wSkillPoint > 0
        ? 0.25 + 0.15 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Nilah" && state.steroidStats["Q"] && state.qSkillPoint > 0
        ? 0.1 + 0.5 / (17 * (state.level - 1))
        : 0;
    bonusAS +=
      nameChamp == "Nocturne" &&
      state.steroidStats["W"] &&
      state.wSkillPoint > 0
        ? 0.25 + 0.05 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Olaf" && state.steroidStats["P"]
        ? 0.5 +
          (50 / 17) *
            (state.level - 1) *
            (0.007025 + 0.000175 * (state.level - 1))
        : 0;
    bonusAS +=
      nameChamp == "Olaf" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 0.3 + 0.1 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Qiyana" && state.steroidStats["W"]
        ? 0.05 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Quinn" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 0.2 + 0.08 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Rammus" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.15 + 0.05 * state.eSkillPoint
        : 0;
    bonusAS += nameChamp == "Rell" && state.steroidStats["W"] ? 0.3 : 0;
    bonusAS += nameChamp == "Rengar" && state.steroidStats["Q"] ? 0.4 : 0;
    bonusAS +=
      nameChamp == "Rumble" && state.steroidStats["P"]
        ? (50 +
            ((130 - 50) / 17) *
              (state.level - 1) *
              (0.7025 + 0.0175 * (state.level - 1))) /
          100
        : 0;
    bonusAS +=
      nameChamp == "Samira" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.15 + 0.05 * state.eSkillPoint
        : 0;
    bonusAS += nameChamp == "Shen" && state.steroidStats["Q"] ? 0.5 : 0;
    bonusAS +=
      nameChamp == "Sivir" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 0.15 + 0.05 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Skarner" && state.steroidStats["P"]
        ? (38 + (state.level <= 7 ? 5 : state.level <= 13 ? 7 : 9)) / 100
        : 0;
    bonusAS += nameChamp == "Sylas" && state.steroidStats["P"] ? 1.25 : 0;
    bonusAS += nameChamp == "Taric" && state.steroidStats["P"] ? 1 : 0;
    bonusAS +=
      nameChamp == "Teemo" && state.steroidStats["P"]
        ? state.level < 5
          ? 0.2
          : state.level < 10
          ? 0.4
          : state.level < 15
          ? 0.6
          : 0.8
        : 0;
    bonusAS +=
      nameChamp == "Tristana" &&
      state.steroidStats["Q"] &&
      state.qSkillPoint > 0
        ? 0.5 + 0.15 * state.qSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Trundle" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 0.1 + 0.2 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp.includes("Twisted") &&
      state.steroidStats["E"] &&
      state.eSkillPoint > 0
        ? (3.5 + 7.5 * state.eSkillPoint) / 100
        : 0;
    bonusAS +=
      nameChamp == "Twitch" && state.steroidStats["Q"] && state.qSkillPoint > 0
        ? 0.35 + 0.5 * state.qSkillPoint
        : 0;
    bonusAS += nameChamp == "Udyr" && state.steroidStats["P"] ? 0.3 : 0;
    bonusAS +=
      nameChamp == "Udyr" && state.steroidStats["Q"] && state.qSkillPoint > 0
        ? 0.08 + 0.12 * state.qSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Varus" && state.steroidStats["P"]
        ? 0.1 + (state.level <= 7 ? 0.5 : 0.1) + 0.2
        : 0;
    bonusAS +=
      nameChamp == "Vi" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 0.225 + 0.075 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Viego" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.25 + 0.05 * state.eSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Warwick" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 0.6 + 0.1 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Wukong" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.3 + 0.05 * state.eSkillPoint
        : 0;
    bonusAS +=
      nameChamp == "Xayah" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 0.3 + 0.05 * state.wSkillPoint
        : 0;
    bonusAS +=
      nameChamp.includes("Zhao") &&
      state.steroidStats["E"] &&
      state.eSkillPoint > 0
        ? 0.35 + 0.05 * state.eSkillPoint
        : 0;
    bonusAS += nameChamp == "Zeri" && state.steroidStats["R"] ? 0.3 : 0;
    bonusAS +=
      state.mainRune == "Hail of Blades" && state.steroidStats["Runes"]
        ? 1.1
        : 0;
    bonusAS +=
      state.mainRune == "Lethal Tempo" && state.steroidStats["Runes"]
        ? data["Melee?"] == 1
          ? state.level >= 15
            ? 0.9
            : 0.57 + 0.03 * state.level
          : 0.222 + 0.018 * state.level
        : 0;
    bonusAS +=
      state.mainSecondRune == "Alacrity" ||
      state.secondFirstRune == "Alacrity" ||
      state.secondSecondRune == "Alacrity"
        ? 0.03 + 0.15 * state.stackLegendExceptBloodline
        : 0;
    bonusAS += 0.075 * state.gameStats["Hextech"];
    let multiBonusAS =
      (nameChamp == "Jinx" && state.steroidStats["Q"] && state.qSkillPoint > 0
        ? 0.9
        : 1) *
      (nameChamp.includes("Veth") &&
      state.steroidStats["Form"] &&
      state.rSkillPoint > 0
        ? 1.05 + 0.05 * state.rSkillPoint
        : 1);

        console.log("ICI")
        console.log(bonusAS)
        console.log(multiBonusAS)
        console.log(obj["Attack Speed %"])
  
    obj["Attack Speed %"] =
      (state.itemStats["AS"] / 100 +
        state.runeStats["AS"] +
        bonusAS +
        (nameChamp == "Jhin"
          ? 0
          : 0.03 * (state.level - 1) * (0.685 + 0.0175 * state.level))) *
        multiBonusAS +
      (nameChamp == "Varus" && state.steroidStats["P"]
        ? 0.4 +
          0.4 *
            (state.runeStats["AS"] +
              state.itemStats["AS"] +
              bonusAS +
              0.04 * (state.level - 1) * (0.685 + 0.0175 * state.level))
        : 0);

    obj["Attack Speed %"] *=
      nameChamp == "Jayce" &&
      state.steroidStats["Form"] &&
      state.steroidStats["W"]
        ? 3
        : 1;
        console.log("ICI")
        console.log(bonusAS)
        console.log(multiBonusAS)
        console.log(obj["Attack Speed %"])
    // ARMOR
    let bonusArmor =
      state.itemSlot1 == "Evenshroud" ? 5 * state.nbLegendary : 0;
    bonusArmor += state.hasHullbreaker
      ? data["Melee?"] == 1
        ? state.level < 12
          ? 30
          : state.level < 13
          ? 60
          : state.level < 14
          ? 105
          : state.level < 15
          ? 129
          : state.level < 16
          ? 153
          : state.level < 17
          ? 201
          : 225
        : state.level < 12
        ? 15
        : state.level < 13
        ? 30
        : state.level < 14
        ? 52.5
        : state.level < 15
        ? 64.5
        : state.level < 16
        ? 88.5
        : state.level < 17
        ? 100.5
        : 112.5
      : 0;
    bonusArmor += state.hasJakSho && state.steroidStats["Items"] ? 16 : 0;
    bonusArmor += state.hasJakSho ? 5 * state.nbLegendary : 0;
    bonusArmor += state.hasArmguard && state.steroidStats["Items"] ? 15 : 0;
    bonusArmor +=
      nameChamp == "Anivia" && state.steroidStats["P"]
        ? state.level < 5
          ? -40
          : state.level < 8
          ? -25
          : state.level < 12
          ? -10
          : state.level < 15
          ? 5
          : 20
        : 0;
    bonusArmor +=
      nameChamp == "Graves" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? (1 + 3 * state.eSkillPoint) * state.gameStats["Minion"]
        : 0;
    bonusArmor +=
      nameChamp == "Hecarim" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 10 + 5 * state.wSkillPoint
        : 0;
    bonusArmor +=
      nameChamp == "Jax" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? -10 + 25 * state.rSkillPoint + 0.4 * obj["Attack Damage"]
        : 0;
    bonusArmor +=
      nameChamp == "Jayce" &&
      state.steroidStats["Form"] &&
      state.steroidStats["R"]
        ? (state.level < 6
            ? 5
            : state.level < 11
            ? 15
            : state.level < 15
            ? 25
            : 35) +
          0.075 * obj["Attack Damage"]
        : 0;
    bonusArmor +=
      nameChamp == "Kennen" && state.steroidStats["R"]
        ? 20 * state.rSkillPoint
        : 0;
    bonusArmor +=
      nameChamp == "Nasus" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? 25 + 15 * state.rSkillPoint
        : 0;
    bonusArmor +=
      nameChamp == "Olaf" && state.steroidStats["R"]
        ? state.rSkillPoint * 10
        : 0;
    bonusArmor +=
      nameChamp == "Oriana" && state.eSkillPoint > 0
        ? 6 * state.eSkillPoint
        : 0;
    bonusArmor +=
      nameChamp == "Shyvana"
        ? 5 *
          (state.gameStats["Chemtech"] +
            state.gameStats["Cloud"] +
            state.gameStats["Hextech"] +
            state.gameStats["Infernal"] +
            state.gameStats["Ocean"] +
            state.gameStats["Mountain"])
        : 0;
    bonusArmor +=
      nameChamp == "Singed" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? -5 + 35 * state.rSkillPoint
        : 0;
    bonusArmor += nameChamp == "Thresh" ? 1 * state.gameStats["Minion"] : 0;
    bonusArmor +=
      nameChamp == "Trundle" && state.steroidStats["R"]
        ? 0.4 * state.enemyStats["Armor"]
        : 0;
    bonusArmor +=
      nameChamp == "Wukong" && state.steroidStats["P"]
        ? 30 + (24 / 17) * (state.level - 1)
        : 0;
    bonusArmor +=
      (state.mainFirstRune == "Shield Bash" ||
        state.secondFirstRune == "Shield Bash") &&
      state.steroidStats["Runes"]
        ? 1 + (9 / 17) * (state.level - 1)
        : 0;

    let multiBonusArmor =
      nameChamp == "Ornn"
        ? Math.min(
            1.3,
            1.1 + (state.level > 12 ? (state.level - 12) * 0.04 : 0)
          )
        : 1;

    obj["Armor"] =
      (state.itemStats["AR"] + state.runeStats["AR"] + bonusArmor) *
      multiBonusArmor;
    obj["Armor"] +=
      nameChamp == "Braum" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 15 + 5 * state.wSkillPoint + 0.36 * obj["Armor"]
        : 0;
    obj["Armor"] +=
      nameChamp == "Garen" && state.steroidStats["W"]
        ? 30 + 0.1 * obj["Armor"]
        : 0;
    obj["Armor"] +=
      nameChamp == "Leona" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 15 + 5 * state.wSkillPoint + 0.2 * obj["Armor"]
        : 0;
    obj["Armor"] +=
      nameChamp == "Poppy" && state.wSkillPoint > 0 ? 0.12 * obj["Armor"] : 0;
    obj["Armor"] +=
      nameChamp == "Rell" && state.wSkillPoint > 0 ? 0.12 * obj["Armor"] : 0;
    obj["Armor"] +=
      nameChamp == "Sejuani" && state.steroidStats["P"]
        ? 10 + obj["Armor"] / 2
        : 0;
    obj["Armor"] += state.hasGargoyle ? 0.05 * obj["Armor"] : 0;
    obj["Armor"] +=
      state.mainRune == "Aftershock" && state.steroidStats["Runes"]
        ? 35 + 0.8 * obj["Armor"]
        : 0;
    obj["Armor"] *=
      (state.mainSecondRune == "Conditioning" ||
        state.secondFirstRune == "Conditioning" ||
        state.secondSecondRune == "Conditioning") &&
      state.gameStats["Gametime"] >= 12
        ? 1.03
        : 1;

    // Magic Resist
    let bonusMR = state.hasAbyssal && state.steroidStats["Items"] ? 9 : 0;
    bonusMR += state.itemSlot1 == "Evenshroud" ? 5 * state.nbLegendary : 0;
    bonusMR += state.hasForceNature && state.steroidStats["Items"] ? 30 : 0;
    bonusMR += state.hasHullbreaker
      ? data["Melee?"] == 1
        ? state.level < 12
          ? 30
          : state.level < 13
          ? 60
          : state.level < 14
          ? 105
          : state.level < 15
          ? 129
          : state.level < 16
          ? 153
          : state.level < 17
          ? 201
          : 225
        : state.level < 12
        ? 15
        : state.level < 13
        ? 30
        : state.level < 14
        ? 52.5
        : state.level < 15
        ? 64.5
        : state.level < 16
        ? 88.5
        : state.level < 17
        ? 100.5
        : 112.5
      : 0;
    bonusMR += state.hasJakSho && state.steroidStats["Items"] ? 16 : 0;
    bonusMR += state.hasJakSho ? 5 * state.nbLegendary : 0;
    bonusMR += state.hasVerdant && state.steroidStats["Items"] ? 9 : 0;
    bonusMR +=
      nameChamp == "Anivia" && state.steroidStats["P"]
        ? state.level < 5
          ? -40
          : state.level < 8
          ? -25
          : state.level < 12
          ? -10
          : state.level < 15
          ? 5
          : 20
        : 0;
    bonusMR +=
      nameChamp == "Hecarim" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 10 + 5 * state.wSkillPoint
        : 0;
    bonusMR +=
      nameChamp == "Jax" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? -6 + 25 * state.rSkillPoint + 0.24 * obj["Attack Damage"]
        : 0;
    bonusMR +=
      nameChamp == "Jayce" &&
      state.steroidStats["Form"] &&
      state.steroidStats["R"]
        ? (state.level < 6
            ? 5
            : state.level < 11
            ? 15
            : state.level < 15
            ? 25
            : 35) +
          0.075 * obj["Attack Damage"]
        : 0;
    bonusMR +=
      nameChamp == "Kennen" && state.steroidStats["R"]
        ? 20 * state.rSkillPoint
        : 0;
    bonusMR +=
      nameChamp == "Nasus" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? 25 + 15 * state.rSkillPoint
        : 0;
    bonusMR +=
      nameChamp == "Olaf" && state.steroidStats["R"]
        ? state.rSkillPoint * 10
        : 0;
    bonusMR +=
      nameChamp == "Oriana" && state.eSkillPoint > 0
        ? 6 * state.eSkillPoint
        : 0;
    bonusMR +=
      nameChamp == "Shyvana"
        ? 5 *
          (state.gameStats["Chemtech"] +
            state.gameStats["Cloud"] +
            state.gameStats["Hextech"] +
            state.gameStats["Infernal"] +
            state.gameStats["Ocean"] +
            state.gameStats["Mountain"])
        : 0;
    bonusMR +=
      nameChamp == "Singed" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? -5 + 35 * state.rSkillPoint
        : 0;
    bonusMR +=
      nameChamp == "Trundle" && state.steroidStats["R"]
        ? 0.4 * state.enemyStats["Magic Resist"]
        : 0;

    let multiBonusMR =
      nameChamp == "Ornn"
        ? Math.min(
            1.3,
            1.1 + (state.level > 12 ? (state.level - 12) * 0.04 : 0)
          )
        : 1;
    obj["Magic Resist"] =
      (state.itemStats["MR"] + state.runeStats["MR"] + bonusMR) * multiBonusMR;
    obj["Magic Resist"] += state.hasGargoyle ? 0.05 * obj["Magic Resist"] : 0;
    obj["Magic Resist"] +=
      nameChamp == "Braum" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 15 + 5 * state.wSkillPoint + 0.36 * obj["Magic Resist"]
        : 0;
    obj["Magic Resist"] +=
      nameChamp == "Garen" && state.steroidStats["W"]
        ? 30 + 0.1 * obj["Magic Resist"]
        : 0;
    obj["Magic Resist"] +=
      nameChamp == "Leona" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 15 + 5 * state.wSkillPoint + 0.2 * obj["Magic Resist"]
        : 0;
    obj["Magic Resist"] +=
      nameChamp == "Poppy" && state.wSkillPoint > 0
        ? 0.12 * obj["Magic Resist"]
        : 0;
    obj["Magic Resist"] +=
      nameChamp == "Rell" && state.wSkillPoint > 0
        ? 0.12 * obj["Magic Resist"]
        : 0;
    obj["Magic Resist"] +=
      nameChamp == "Sejuani" && state.steroidStats["P"]
        ? 10 + obj["Magic Resist"] / 2
        : 0;
    obj["Magic Resist"] +=
      state.mainRune == "Aftershock" && state.steroidStats["Runes"]
        ? 35 + 0.8 * obj["Magic Resist"]
        : 0;
    // Move Speed
    let bonusMS = state.hasBlackCleaver && state.steroidStats["Items"] ? 18 : 0;
    bonusMS += state.hasDeadMan ? 40 : 0;
    bonusMS += state.hasDraktharr ? 5 * state.nbLegendary : 0;
    bonusMS += state.hasEclipse ? 5 * state.nbLegendary : 0;
    bonusMS +=
      state.hasHearthbound && state.steroidStats["Items"]
        ? data["Melee?"] == 1
          ? 20
          : 10
        : 0;
    bonusMS += state.hasMobility && state.steroidStats["Items"] ? -90 : 0;
    bonusMS += state.hasStridebreaker && state.steroidStats["Items"] ? 20 : 0;
    bonusMS += state.hasTrinity && state.steroidStats["Items"] ? 20 : 0;
    bonusMS += state.hasWitsEnd && state.steroidStats["Items"] ? 20 : 0;
    bonusMS += state.hasTrinity ? 3 * state.nbLegendary : 0;
    bonusMS += state.hasYoumuu ? 40 : 0;
    bonusMS +=
      nameChamp == "Akshan" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 70 + 10 * state.wSkillPoint
        : 0;
    bonusMS +=
      nameChamp.includes("Veth") && state.steroidStats["R"]
        ? 25 * state.rSkillPoint
        : 0;
    bonusMS += nameChamp == "Cassiopeia" ? 4 * state.level : 0;
    bonusMS +=
      nameChamp == "Cassiopeia" &&
      state.steroidStats["Q"] &&
      state.qSkillPoint > 0
        ? 25 + 5 * state.qSkillPoint
        : 0;
    bonusMS += nameChamp == "Elise" && state.steroidStats["Form"] ? 25 : 0;
    bonusMS += nameChamp == "Jayce" && state.steroidStats["Form"] ? 40 : 0;
    bonusMS +=
      nameChamp == "Lucian" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 50 + 5 * state.wSkillPoint
        : 0;
    bonusMS +=
      nameChamp == "Akshan" && state.steroidStats["P"]
        ? (20 + (55 / 17) * (state.level - 1)) * (1 + obj["Attack Speed %"])
        : 0;
    bonusMS +=
      nameChamp.includes("Fortune") &&
      state.steroidStats["W"] &&
      state.wSkillPoint > 0
        ? 45 + 10 * state.wSkillPoint
        : 0;
    bonusMS +=
      nameChamp.includes("Rek") &&
      nameChamp.includes("Sai") &&
      state.steroidStats["Form"]
        ? 15 +
          (state.level < 6
            ? 0
            : state.level < 11
            ? 5
            : state.level < 16
            ? 10
            : 15)
        : 0;
    bonusMS +=
      nameChamp == "Singed" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? -5 + 35 * state.rSkillPoint
        : 0;
    bonusMS +=
      nameChamp == "Sivir" && state.steroidStats["P"]
        ? 55 +
          (state.level < 6
            ? 0
            : state.level < 11
            ? 5
            : state.level < 16
            ? 10
            : state.level < 18
            ? 15
            : 20)
        : 0;
    bonusMS +=
      nameChamp == "Skarner" && state.steroidStats["P"]
        ? 68 +
          (state.level <= 7
            ? 2 * state.level
            : state.level <= 13
            ? 2 * 7 + 3 * (state.level - 7)
            : 2 * 7 + 3 * 6 + 4 * (state.level - 13))
        : 0;
    bonusMS +=
      nameChamp == "Vayne" && state.steroidStats["P"]
        ? 45 * (state.steroidStats["R"] ? 2 : 1)
        : 0;
    bonusMS += nameChamp == "Kled" && state.steroidStats["R"] ? 650 : 0;
    bonusMS +=
      nameChamp == "Rell" && state.eSkillPoint > 0
        ? state.level <= 6
          ? 5 + 3 * (state.level - 1)
          : state.level <= 11
          ? 20 + 4 * (state.level - 6)
          : state.level == 12
          ? 45
          : 50
        : 1;
    bonusMS +=
      state.mainThirdRune == "Relentless Hunter" ||
      state.secondSecondRune == "Relentless Hunter"
        ? 5 + 8 * state.stackBounty
        : 0;
    bonusMS +=
      state.mainFirstRune == "Magical Footwear" ||
      state.secondFirstRune == "Magical Footwear"
        ? 10
        : 0;
    bonusMS +=
      (state.mainThirdRune == "Waterwalking" ||
        state.secondSecondRune == "Waterwalking") &&
      state.steroidStats["Runes"]
        ? 25
        : 0;
    // https://leagueoflegends.fandom.com/wiki/Movement_speed
    obj["Move Speed"] =
      state.itemStats["SHOE"] +
      state.runeStats["MS"] +
      bonusMS +
      state.basicStatsChampion["Move Speed"];
    console.log(obj["Move Speed"]);
    obj["Move Speed"] *= state.hasStridebreaker
      ? 1 + 0.02 * state.nbLegendary
      : 1;
    obj["Move Speed"] *=
      nameChamp == "Aatrox" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? 1.4 + 0.2 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Ahri" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.4
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Akali" && state.steroidStats["P"]
        ? 1.3 +
          (state.level < 6
            ? 0
            : state.level < 11
            ? 0.1
            : state.level < 16
            ? 0.2
            : 0.3)
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Akali" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.25 + 0.05 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Bard" && state.steroidStats["P"] ? 1.24 : 1;
    obj["Move Speed"] *=
      nameChamp == "Bard" && state.steroidStats["W"] ? 1.3 : 1;
    obj["Move Speed"] *=
      nameChamp == "Annie" && state.steroidStats["E"]
        ? 1.2 + (0.3 / 17) * (state.level - 1)
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Janna" && state.steroidStats["P"] ? 1.06 : 1;
    obj["Move Speed"] *=
      nameChamp == "Jayce" &&
      state.steroidStats["Form"] &&
      state.steroidStats["E"]
        ? 1.25 + 0.05 * state.eSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Karma" && state.steroidStats["E"] ? 1.4 : 1;
    obj["Move Speed"] *=
      nameChamp == "Milio" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 1.125 + 0.025 * state.eSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Naafiri" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? 1.275 + 0.075 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Nilah" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.125 + 0.025 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Oriana" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.25 + 0.05 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp.includes("Nunu") && state.steroidStats["P"] ? 1.1 : 1;
    obj["Move Speed"] *=
      nameChamp == "Sivir" && state.steroidStats["R"] && state.rSkillPoint
        ? 1.15 + 0.05 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Soraka" && state.steroidStats["Q"] && state.qSkillPoint
        ? 1.175 + 0.025 * state.qSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Yuumi" && state.steroidStats["E"] ? 1.2 : 1;
    obj["Move Speed"] *=
      nameChamp == "Zilean" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 1.25 + 0.15 * state.eSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Blitzcrank" &&
      state.steroidStats["W"] &&
      state.wSkillPoint > 0
        ? 1.65 + 0.05 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Braum" && state.steroidStats["E"] ? 1.1 : 1;
    obj["Move Speed"] *=
      nameChamp == "Camille" && state.steroidStats["Q"] && state.qSkillPoint > 0
        ? 1.15 + 0.05 * state.qSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Corki" && state.steroidStats["P"] ? 1.4 : 1;
    obj["Move Speed"] *=
      nameChamp.includes("Mundo") &&
      state.steroidStats["R"] &&
      state.rSkillPoint > 0
        ? 1.05 + 0.1 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Draven" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.45 + 0.05 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Ekko" && state.steroidStats["P"]
        ? 1.5 +
          0.1 *
            (state.level < 6
              ? 0
              : state.level < 11
              ? 1
              : state.level < 16
              ? 2
              : 3)
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Evelynn" && state.steroidStats["E"] ? 1.3 : 1;
    obj["Move Speed"] *=
      nameChamp == "Fiora" && state.steroidStats["P"]
        ? 1.2 + 0.1 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Fiora" && state.steroidStats["R"]
        ? 1 + 0.1 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Gankplank" && state.steroidStats["P"]
        ? 1.15 + (0.15 / 17) * (state.level - 1)
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Garen" && state.steroidStats["Q"] ? 1.35 : 1;
    obj["Move Speed"] *=
      nameChamp == "Gnar" &&
      state.steroidStats["P"] &&
      !state.steroidStats["Form"]
        ? 1.2 + 0.2 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Heimerdinger" && state.steroidStats["P"] ? 1.2 : 1;
    obj["Move Speed"] *=
      nameChamp == "Jhin"
        ? 1.1 + 0.004 * Math.floor(obj["Attack Speed %"] / 100)
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Jinx" && state.steroidStats["P"] ? 2.75 : 1;
    obj["Move Speed"] *=
      nameChamp.includes("Kai") &&
      nameChamp.includes("Sa") &&
      state.steroidStats["E"] &&
      state.eSkillPoint > 0
        ? (1.5 + 0.05 * state.eSkillPoint) *
          (1 + 0.01 * Math.floor(obj["Attack Speed %"] / 100))
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Katarina" && state.wSkillPoint > 0
        ? 1.4 + 0.1 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Kayle" && state.steroidStats["P"] ? 1.1 : 1;
    obj["Move Speed"] *=
      nameChamp == "Kennen" && state.steroidStats["E"] ? 2 : 1;
    obj["Move Speed"] *=
      nameChamp.includes("Kha") &&
      nameChamp.includes("Zix") &&
      state.steroidStats["R"]
        ? 1.4
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Kled" && state.steroidStats["E"] ? 1.5 : 1;
    obj["Move Speed"] *=
      nameChamp.includes("Kog") &&
      nameChamp.includes("Maw") &&
      state.steroidStats["P"]
        ? 1.4
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Malphite" &&
      state.steroidStats["Q"] &&
      state.qSkillPoint > 0
        ? 1.15 + 0.05 * state.qSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Maokai" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? 1.3 + 0.1 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp.includes("Master") &&
      state.steroidStats["R"] &&
      state.rSkillPoint > 0
        ? 1.25 + 0.1 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Mordekaiser" && state.steroidStats["P"]
        ? state.level < 6
          ? 1.03
          : state.level < 11
          ? 1.06
          : 1.09
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Morgana" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? 0.8 + 0.25 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Neeko" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.15 + 0.05 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Nidalee" && state.steroidStats["P"] ? 1.3 : 1;
    obj["Move Speed"] *=
      nameChamp == "Nocturne" && state.steroidStats["E"] ? 1.9 : 1;
    obj["Move Speed"] *=
      nameChamp == "Nocturne" &&
      state.steroidStats["Q"] &&
      state.qSkillPoint > 0
        ? 1.1 + 0.05 * state.qSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Olaf" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? 0.95 + 0.25 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Pantheon" &&
      state.steroidStats["P"] &&
      state.steroidStats["E"]
        ? 1.6
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Poppy" && state.steroidStats["W"] ? 1.4 : 1;
    obj["Move Speed"] *=
      nameChamp == "Quinn" && state.wSkillPoint > 0
        ? 1.15 + 0.05 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Rakan" && state.steroidStats["R"] ? 1.75 : 1;
    obj["Move Speed"] *=
      nameChamp == "Rell" &&
      state.steroidStats["Form"] &&
      state.steroidStats["W"]
        ? 1.3
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Rell" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 1.25 + 0.05 * state.eSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Rengar" && state.steroidStats["P"]
        ? state.level < 7
          ? 1.3
          : state.level < 13
          ? 1.4
          : 1.5
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Rengar" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? 1.3 + 0.1 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Rumble" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.05 + 0.05 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Ryze" && state.steroidStats["Q"] && state.qSkillPoint > 0
        ? 1.24 + 0.04 * state.qSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Samira" && state.steroidStats["P"]
        ? 1.12 +
          0.03 *
            (state.level < 6
              ? 0
              : state.level < 11
              ? 1
              : state.level < 16
              ? 2
              : 3)
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Senna" && state.steroidStats["P"]
        ? 1.1 + (state.level < 6 ? 0 : state.level < 9 ? 0.05 : 0.1)
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Sett" && state.steroidStats["Q"] ? 1.3 : 1;
    obj["Move Speed"] *=
      nameChamp == "Singed" && state.steroidStats["P"] ? 1.25 : 1;
    obj["Move Speed"] *=
      nameChamp == "Sion" && state.steroidStats["P"] ? 1.67 : 1;
    obj["Move Speed"] *=
      nameChamp == "Skarner" && state.steroidStats["W"]
        ? 1.16 + 0.04 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Soraka" && state.steroidStats["P"] ? 1.7 : 1;
    obj["Move Speed"] *=
      nameChamp.includes("Tahm") &&
      nameChamp.includes("Kench") &&
      state.steroidStats["R"]
        ? 1.4
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Talon" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? 1.25 + 0.15 * state.rSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Taliyah" && state.steroidStats["P"]
        ? 1.1 +
          0.05 *
            (state.level < 9
              ? 0
              : state.level < 12
              ? 1
              : state.level < 15
              ? 3
              : 6)
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Teemo" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.12 + 0.08 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Trundle" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.12 + 0.08 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Twitch" && state.steroidStats["Q"] ? 1.1 : 1;
    obj["Move Speed"] *=
      nameChamp == "Udyr" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 1.23 + 0.07 * state.eSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Viego" && state.steroidStats["P"] ? 1.1 : 1;
    obj["Move Speed"] *=
      nameChamp == "Viktor" &&
      state.steroidStats["Q"] &&
      state.steroidStats["P"]
        ? 1.3
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Vladimir" && state.steroidStats["Q"]
        ? 1.1 +
          (state.level < 6
            ? 0
            : state.level < 11
            ? 0.1
            : state.level < 16
            ? 0.2
            : 0.3)
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Vladimir" && state.steroidStats["W"] ? 1.375 : 1;
    obj["Move Speed"] *=
      nameChamp == "Volibear" &&
      state.steroidStats["Q"] &&
      state.qSkillPoint > 0
        ? 1.08 + 0.08 * state.qSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Warwick" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.75 + 0.125 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *=
      nameChamp == "Wukong" && state.steroidStats["R"] ? 1.2 : 1;
    obj["Move Speed"] *=
      nameChamp == "Xayah" && state.steroidStats["W"] ? 1.3 : 1;
    obj["Move Speed"] *=
      nameChamp == "Yone" && state.steroidStats["E"] ? 1.15 : 1;
    obj["Move Speed"] *=
      nameChamp == "Zac" && state.steroidStats["R"] ? 1.5 : 1;
    obj["Move Speed"] *=
      nameChamp == "Zeri" && state.steroidStats["R"] ? 1.4 : 1;
    obj["Move Speed"] *=
      nameChamp == "Zoe" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.2 + 0.1 * state.wSkillPoint
        : 1;
    obj["Move Speed"] *= state.hasCrown ? 1 + 0.01 * state.nbLegendary : 1;
    obj["Move Speed"] *=
      state.hasBOTRK && state.steroidStats["Items"] ? 1.25 : 1;
    obj["Move Speed"] *=
      state.hasYoumuu && state.steroidStats["Items"] ? 1.25 : 1;
    obj["Move Speed"] *=
      state.hasHarvester && state.steroidStats["Items"] ? 1.25 : 1;
    obj["Move Speed"] *=
      state.hasPhantom && state.steroidStats["Items"] ? 1.07 : 1;
    obj["Move Speed"] *=
      state.hasRocketbelt && state.steroidStats["Items"] ? 1.3 : 1;
    obj["Move Speed"] *=
      state.hasShurelya && state.steroidStats["Items"] ? 1.3 : 1;
    obj["Move Speed"] *=
      state.hasLuden && state.steroidStats["Items"] ? 1.15 : 1;
    obj["Move Speed"] *=
      state.hasCosmicDrive && state.steroidStats["Items"] ? 1.2 : 1;
    obj["Move Speed"] *= state.hasROA && state.steroidStats["Items"] ? 1.35 : 1;
    obj["Move Speed"] *=
      state.hasForceNature && state.steroidStats["Items"] ? 1.1 : 1;
    obj["Move Speed"] *=
      state.hasStormrazor && state.steroidStats["Items"] ? 1.45 : 1;
    obj["Move Speed"] *=
      state.hasChemtank && state.steroidStats["Items"] ? 1.4 : 1;
    obj["Move Speed"] *=
      state.hasShojin && state.steroidStats["Items"]
        ? data["Melee?"] == 1
          ? 1.15
          : 1.1
        : 1;
    obj["Move Speed"] *= state.hasMejai
      ? state.stackMejai >= 10
        ? 1.1
        : 1
      : 1;
    obj["Move Speed"] *=
      nameChamp == "Cassiopeia" &&
      state.steroidStats["Q"] &&
      state.qSkillPoint > 0
        ? 1 + 0.25 + 0.05 * state.qSkillPoint
        : 1;
    obj["Move Speed"] *=
      state.mainRune == "Fleet Footwork" && state.steroidStats["Runes"]
        ? 1.2
        : 1;
    obj["Move Speed"] *=
      state.mainRune == "Predator" && state.steroidStats["Runes"]
        ? state.level < 8
          ? 1.25
          : 1.25 + 0.023 * (state.level - 7)
        : 1;
    obj["Move Speed"] *=
      state.mainRune == "Pstate.hase Rush" && state.steroidStats["Runes"]
        ? data["Melee?"] == 1
          ? state.level == 1
            ? 1.3
            : state.level == 2
            ? 1.3176
            : state.level == 3
            ? 1.3353
            : state.level == 4
            ? 1.3529
            : state.level == 5
            ? 1.3706
            : state.level == 6
            ? 1.3882
            : state.level == 7
            ? 1.4059
            : state.level == 8
            ? 1.4235
            : state.level == 9
            ? 1.4412
            : state.level == 10
            ? 1.4588
            : state.level == 11
            ? 1.4765
            : state.level == 12
            ? 1.4941
            : state.level == 13
            ? 1.5118
            : state.level == 14
            ? 1.5294
            : state.level == 15
            ? 1.5471
            : state.level == 16
            ? 1.5647
            : state.level == 17
            ? 1.5824
            : 1.6
          : state.level == 1
          ? 1.15
          : state.level == 2
          ? 1.1647
          : state.level == 3
          ? 1.1794
          : state.level == 4
          ? 1.1941
          : state.level == 5
          ? 1.2088
          : state.level == 6
          ? 1.2235
          : state.level == 7
          ? 1.2382
          : state.level == 8
          ? 1.2529
          : state.level == 9
          ? 1.2676
          : state.level == 10
          ? 1.2824
          : state.level == 11
          ? 1.2971
          : state.level == 12
          ? 1.3118
          : state.level == 13
          ? 1.3265
          : state.level == 14
          ? 1.3412
          : state.level == 15
          ? 1.3559
          : state.level == 16
          ? 1.3706
          : state.level == 17
          ? 1.3853
          : 1.4
        : 1;
    obj["Move Speed"] *=
      (state.mainFirstRune == "Nimbus Cloak" ||
        state.secondFirstRune == "Nimbus Cloak") &&
      state.steroidStats["Runes"]
        ? 1.25
        : 1;
    obj["Move Speed"] *=
      state.mainThirdRune == "Celerity" || state.secondSecondRune == "Celerity"
        ? 1.1
        : 1;
    obj["Move Speed"] *= 1 + 0.07 * state.gameStats["Cloud"];
    console.log(obj["Move Speed"]);
    obj["Move Speed"] *= state.bonusStats["Cloud"]
      ? 1.15 + (state.steroidStats["R"] ? 0.45 : 0)
      : 1;
    obj["Move Speed"] =
      obj["Move Speed"] - state.basicStatsChampion["Move Speed"];
    console.log(obj["Move Speed"]);
    // Critical %
    let bonusCrit =
      nameChamp == "Senna" ? Math.round(state.sennaStacks / 20) * 0.1 : 0;
    bonusCrit += nameChamp == "Tryndamere" && state.steroidStats["P"] ? 0.4 : 0;

    obj["Critical %"] =
      ((state.itemStats["CC"]/100) + bonusCrit) *
      ((nameChamp == "Yasuo" || nameChamp == "Yone") 
        ? 2.5
        : 1);

    // Life Steal
    let bonusLifeSteal =
      state.hasMalmortius && state.steroidStats["Items"] ? 0.12 : 0;
    bonusLifeSteal +=
      nameChamp.includes("Bel") &&
      nameChamp.includes("Veth") &&
      state.steroidStats["E"]
        ? 0.2 + 1
        : 0;
    bonusLifeSteal +=
      nameChamp.includes("Lee") &&
      nameChamp.includes("Sin") &&
      state.steroidStats["E"] &&
      state.eSkillPoint > 0
        ? (-0.5 + 5.5 * state.eSkillPoint) / 100
        : 0;
    bonusLifeSteal +=
      nameChamp == "Nasus"
        ? state.level < 7
          ? 0.11
          : state.level < 113
          ? 0.16
          : 0.21
        : 0;
    bonusLifeSteal +=
      nameChamp == "Olaf"
        ? (8 * (state.level - 1) * (0.7025 + 0.0175 * (state.level - 1))) / 100
        : 0;
    bonusLifeSteal += nameChamp == "Sion" && state.steroidStats["P"] ? 1 : 0;
    bonusLifeSteal +=
      nameChamp == "Udyr" && state.steroidStats["W"]
        ? 0.14 + 0.01 * state.wSkillPoint
        : 0;
    bonusLifeSteal += 0.0035 * state.stackLegendBloodline;

    let selfHealing = state.hasSpiritVisage ? 1.25 : 1;
    selfHealing *=
      (state.mainThirdRune == "Revitalize" ||
        state.secondSecondRune == "Revitalize") &&
      state.steroidStats["Runes"]
        ? 1.4
        : 1;
    selfHealing *= 1 + 0.06 * state.gameStats["Chemtech"];
    selfHealing *=
      nameChamp == "Aatrox" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? 1.15 + 0.1 * state.rSkillPoint
        : 1;
    selfHealing *= nameChamp == "Trundle" && state.steroidStats["W"] ? 1.25 : 1;
    obj["Lifesteal"] = (state.itemStats["LS"] + bonusLifeSteal) * selfHealing;

    // Hp Regen
    let bonusRegen = state.hasSpectre ? 1.5 : 0;
    bonusRegen +=
      nameChamp == "Singed" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? -0.01 + 0.07 * state.rSkillPoint
        : 0;
    bonusRegen +=
      (state.mainSecondRune == "Second Wind" ||
        state.secondFirstRune == "Second Wind" ||
        state.secondSecondRune == "Second Wind") &&
      state.steroidStats["Runes"]
        ? 0.03
        : 0;
    bonusRegen +=
      (state.mainSecondRune == "Second Wind" ||
        state.secondFirstRune == "Second Wind" ||
        state.secondSecondRune == "Second Wind") &&
      state.steroidStats["Runes"]
        ? 0.03
        : 0;

    obj["Hp Regen"] = state.itemStats["HP5"] + bonusRegen;
    obj["Hp Regen"] *= state.hasSpiritVisage ? 1.25 : 1;
    obj["Hp Regen"] *=
      nameChamp == "Trundle" && state.steroidStats["W"] ? 1.25 : 1;

    // Mana
    obj["Mana"] = state.itemStats["MP"] + state.runeStats["MP"];

    // Ability Power
    let bonusAP = state.hasArchangel ? 1 * Math.floor(obj["Mana"] * 0.01) : 0;
    bonusAP +=
      state.hasCrown && state.steroidStats["Items"]
        ? 10 + (state.level >= 9 ? 3 * (state.level - 8) : 0)
        : 0;
    bonusAP += state.hasCrown || state.hasRiftmaker ? 8 * state.nbLegendary : 0;
    bonusAP += state.hasDemonic ? Math.floor(obj["Hp"] * 0.02) : 0;
    bonusAP += state.hasEchoes ? 3 * Math.floor(0.25 * obj["Mana / Regen"]) : 0;
    bonusAP += state.hasEverfrost ? 10 * state.nbLegendary : 0;
    bonusAP += state.hasMejai ? 5 * state.stackMejai : 0;
    bonusAP += state.hasSeraph ? Math.floor(obj["Mana"] * 0.025) : 0;
    bonusAP +=
      state.hasFlowing && state.steroidStats["Items"]
        ? 3 + (15 / 17) * (state.level - 1)
        : 0;
    bonusAP +=
      nameChamp == "Singed" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? -5 + 35 * state.rSkillPoint
        : 0;
    bonusAP +=
      nameChamp == "Thresh" || nameChamp == "Veigar"
        ? 1 * state.gameStats["Minion"]
        : 0;
    bonusAP += nameChamp == "Vladimir" ? Math.floor(obj["Hp"] * 0.033) : 0;
    bonusAP +=
      state.mainRune == "Conqueror" && state.runeStats["ForceBit"] == 0
        ? (2 + 2.5 / (17 * (state.level - 1))) * state.stackConqueror
        : 0;
    bonusAP +=
      (state.secondFirstRune.includes("EyeBall") ||
        state.secondSecondRune.includes("EyeBall") ||
        state.mainSecondRune.includes("Eyeball")) &&
      state.runeStats["ForceBit"] == 0
        ? 2 * state.stackBounty + (state.stackBounty == 10 ? 10 : 0)
        : 0;
    bonusAP +=
      (state.secondFirstRune.includes("Poro") ||
        state.secondSecondRune.includes("Poro") ||
        state.mainSecondRune.includes("Poro")) &&
      state.runeStats["ForceBit"] == 0
        ? 2 * state.stackBounty + (state.stackBounty == 10 ? 10 : 0)
        : 0;
    bonusAP +=
      (state.secondFirstRune.includes("Zombie") ||
        state.secondSecondRune.includes("Zombie") ||
        state.mainSecondRune.includes("Zombie")) &&
      state.runeStats["ForceBit"] == 0
        ? 2 * state.stackBounty + (state.stackBounty == 10 ? 10 : 0)
        : 0;
    bonusAP +=
      (state.secondFirstRune.includes("Absolute Focus") ||
        state.secondSecondRune.includes("Absolute Focus") ||
        state.mainSecondRune.includes("EyeAbsolute Focusball")) &&
      state.runeStats["ForceBit"] == 0
        ? 3 + 27 / (17 * (state.level - 1))
        : 0;
    bonusAP +=
      (state.secondFirstRune.includes("Gathering Storm") ||
        state.secondSecondRune.includes("Gathering Storm") ||
        state.mainSecondRune.includes("Gathering Storm")) &&
      state.runeStats["ForceBit"] == 0
        ? state.gameStats["Gametime"] < 10
          ? 0
          : state.gameStats["Gametime"] < 20
          ? 8
          : state.gameStats["Gametime"] < 30
          ? 24
          : state.gameStats["Gametime"] < 40
          ? 84
          : 80
        : 0;

    let multiBonusAP = state.hasRabadon ? 1.4 : 1;
    multiBonusAP *= state.hasWardStone ? 1.2 : 1;
    multiBonusAP *= nameChamp == "Syndra" && state.steroidStats["P"] ? 1.15 : 1;
    multiBonusAP *= 1 + 0.05 * state.gameStats["Infernal"];
    obj["Ability Power"] =
      (bonusAP + state.itemStats["AP"] + state.runeStats["ForceBit"] == 0
        ? state.runeStats["Adaptive"]
        : 0) * multiBonusAP;

    // Range
    obj["Range"] =
      state.mainRune == "Lethal Tempo" && state.steroidStats["Runes"] ? 50 : 0;

    // Armor Penetration
    let armorFlat =
      nameChamp == "Aphelios"
        ? convertLethIntoArmorPen(5.5 * state.eSkillPoint)
        : 0;
    armorFlat +=
      state.hasYoumuu && state.steroidStats["Items"]
        ? convertLethIntoArmorPen(
            state.level < 8
              ? 3
              : state.level < 10
              ? 4
              : state.level < 12
              ? 5
              : 6 + 1 * (state.level - 12)
          )
        : 0;
    armorFlat +=
      (state.mainFirstRune == "Sudden Impact" ||
        state.secondFirstRune == "Sudden Impact") &&
      state.steroidStats["Runes"]
        ? convertLethIntoArmorPen(9)
        : 0;
    armorFlat += convertLethIntoArmorPen(state.itemStats["LE"]);

    let bonusArmorPen =
      nameChamp == "Darius" && state.eSkillPoint > 0
        ? 0.1 + 0.05 * state.eSkillPoint
        : 0;
    bonusArmorPen +=
      nameChamp == "Nilah" && state.qSkillPoint > 0
        ? 0.0033 * Math.floor(obj["Critical %"] * 100)
        : 0;
    bonusArmorPen += nameChamp == "Pantheon" ? 0.1 * state.rSkillPoint : 0;
    bonusArmorPen += nameChamp == "Yasuo" && state.steroidStats["R"] ? 0.5 : 0;
    bonusArmorPen += state.hasDivine ? 0.03 * state.nbLegendary : 0;
    bonusArmorPen += state.hasEclipse ? 0.04 * state.nbLegendary : 0;
    bonusArmorPen += state.hasRageblade ? 0.05 * state.nbLegendary : 0;
    bonusArmorPen +=
      state.hasBlackCleaver && state.steroidStats["Items"] ? 0.3 : 0;
    bonusArmorPen += nameChamp == "Garen" && state.steroidStats["E"] ? 0.25 : 0;
    bonusArmorPen +=
      nameChamp.includes("Jarvan") &&
      state.steroidStats["Q"] &&
      state.qSkillPoint > 0
        ? 0.06 + 0.04 * state.qSkillPoint
        : 0;
    bonusArmorPen +=
      nameChamp == "Jayce" && state.steroidStats["R"] && state.rSkillPoint
        ? 0.1 +
          (state.level < 6
            ? 0
            : state.level < 11
            ? 0.05
            : state.level < 16
            ? 0.1
            : 0.15)
        : 0;
    bonusArmorPen += nameChamp == "Kayle" && state.steroidStats["Q"] ? 0.15 : 0;
    bonusArmorPen +=
      nameChamp.includes("Kog") &&
      nameChamp.includes("Maw") &&
      state.steroidStats["Q"] &&
      state.qSkillPoint > 0
        ? 0.21 + 0.02 * state.qSkillPoint
        : 0;
    bonusArmorPen +=
      nameChamp == "Nasus" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.2 + 0.05 * state.eSkillPoint
        : 0;
    bonusArmorPen += nameChamp == "Olaf" && state.steroidStats["Q"] ? 0.2 : 0;
    bonusArmorPen +=
      nameChamp == "Renekton" &&
      state.steroidStats["P"] &&
      state.steroidStats["E"] &&
      state.eSkillPoint > 0
        ? 0.225 + 0.025 * state.eSkillPoint
        : 0;
    bonusArmorPen += nameChamp == "Sion" && state.steroidStats["E"] ? 0.2 : 0;
    bonusArmorPen +=
      nameChamp == "Trundle" && state.steroidStats["R"] ? 0.4 : 0;
    bonusArmorPen +=
      nameChamp == "Vi" && state.wSkillPoint > 0 && state.steroidStats["W"]
        ? 0.2
        : 0;
    bonusArmorPen +=
      nameChamp == "Wukong" && state.qSkillPoint > 0 && state.steroidStats["Q"]
        ? 0.05 + 0.05 * state.qSkillPoint
        : 0;
    bonusArmorPen +=
      nameChamp == "Corki" && state.eSkillPoint > 0 && state.steroidStats["E"]
        ? 0.05 + 0.03 * state.eSkillPoint
        : 0;
    bonusArmorPen +=
      nameChamp == "Rengar" && state.rSkillPoint > 0 && state.steroidStats["R"]
        ? 0.06 + 0.06 * state.rSkillPoint
        : 0;

    obj["Armor Penetration"] =
      (state.enemyStats["Armor"] + state.enemyStats["Armor Bonus"]) *
        bonusArmorPen +
      armorFlat;

    // Magic Pen
    let flatMP =
      state.hasRocketbelt || state.hasLuden ? 5 * state.nbLegendary : 0;
    flatMP += state.hasShadowflame
      ? 10 + state.steroidStats["Items"]
        ? 10
        : 0
      : 0;
    flatMP +=
      (state.mainFirstRune == "Sudden Impact" ||
        state.secondFirstRune == "Sudden Impact") &&
      state.steroidStats["Runes"]
        ? 7
        : 0;
    flatMP += state.hasAbyssal ? 5 + Math.floor(obj["Hp"] * 0.0012) : 0;

    let bonusMP =
      nameChamp == "Mordekaiser" && state.eSkillPoint > 0
        ? 0.025 + 0.025 * state.eSkillPoint
        : 0;
    bonusMP += state.hasDivine ? 0.03 * state.nbLegendary : 0;
    bonusMP += state.hasRageblade ? 0.06 * state.nbLegendary : 0;
    bonusMP +=
      nameChamp == "Evelynn" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.325 + 0.025 * state.eSkillPoint
        : 0;
    bonusMP +=
      nameChamp == "Jayce" && state.steroidStats["R"] && state.rSkillPoint
        ? 0.1 +
          (state.level < 6
            ? 0
            : state.level < 11
            ? 0.05
            : state.level < 16
            ? 0.1
            : 0.15)
        : 0;
    bonusMP += nameChamp == "Karthus" && state.steroidStats["W"] ? 0.15 : 0;
    bonusMP += nameChamp == "Kayle" && state.steroidStats["Q"] ? 0.15 : 0;
    bonusMP +=
      nameChamp.includes("Kog") &&
      nameChamp.includes("Maw") &&
      state.steroidStats["Q"] &&
      state.qSkillPoint > 0
        ? 0.21 + 0.02 * state.qSkillPoint
        : 0;
    bonusMP +=
      nameChamp == "Rumble" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.1 + 0.02 * state.eSkillPoint
        : 0;
    bonusMP += nameChamp == "Trundle" && state.steroidStats["R"] ? 0.4 : 0;
    bonusMP +=
      nameChamp == "Zoe" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 0.175 + 0.025 * state.eSkillPoint
        : 0;

    obj["Resist Penetration"] =
      (state.enemyStats["Magic Resist"] +
        state.enemyStats["Magic Resist Bonus"]) *
        bonusMP +
      flatMP;

    // Ability Haste

    let bonusAH =
      state.hasDraktharr ||
      state.hasEchoes ||
      state.hasLiandry ||
      state.hasHarvester ||
      state.hasROA ||
      state.hasShurelya
        ? 5 * state.nbLegendary
        : 0;
    bonusAH +=
      state.hasGoredrinker || state.hasTrinity ? 3 * state.nbLegendary : 0;
    bonusAH += state.hasFlowing && state.steroidStats["Items"] ? 20 : 0;
    bonusAH +=
      nameChamp == "Syndra" && state.rSkillPoint > 0
        ? 10 * state.rSkillPoint
        : 0;
    bonusAH +=
      state.mainSecondRune == "Transcendence" ||
      state.secondFirstRune == "Transcendence" ||
      state.secondSecondRune == "Transcendence"
        ? state.level < 5
          ? 0
          : state.level < 8
          ? 5
          : 10
        : 0;
    bonusAH += 7.5 * state.gameStats["Hextech"];
    bonusAH +=
      state.hasShojin && state.steroidStats["Items"]
        ? data["Melee?"] == 1
          ? 8 + 0.08 * obj["Attack Damage"]
          : 6 + 0.06 * obj["Attack Damage"]
        : 0;

    let multi = state.hasWardStone ? 1.2 : 1;
    multi +=
      (state.mainSecondRune == "Transcendence" ||
        state.secondFirstRune == "Transcendence" ||
        state.secondSecondRune == "Transcendence") &&
      state.steroidStats["Runes"] &&
      state.level >= 11
        ? 0.2
        : 0;
    obj["Ability Haste"] =
      (state.itemStats["AH"] + bonusAH + state.runeStats["AH"]) * multi;

    // SpellVamp
    let bonusSV =
      state.stackConqueror == 12 ? (data["Melee?"] == 1 ? 0.08 : 0.05) : 0;
    bonusSV +=
      nameChamp.includes("Lee") &&
      nameChamp.includes("Sin") &&
      state.steroidStats["E"] &&
      state.eSkillPoint > 0
        ? (-0.5 + 5.5 * state.eSkillPoint) / 100
        : 0;
    bonusSV += state.hasRiftmaker ? 0.02 * state.nbLegendary : 0;
    bonusSV +=
      nameChamp.includes("Sante") && state.steroidStats["Form"]
        ? 0.1 + 0.0075 * Math.floor(obj["Hp"] / 100)
        : 0;
    bonusSV +=
      nameChamp == "Aatrox" && state.eSkillPoint > 0
        ? 0.165 + 0.015 * state.eSkillPoint
        : 0;
    bonusSV +=
      nameChamp == "Fiddlesticks" &&
      state.wSkillPoint > 0 &&
      state.steroidStats["W"]
        ? 0.175 + 0.075 * state.wSkillPoint
        : 0;
    bonusSV +=
      nameChamp == "Hecarim" && state.wSkillPoint > 0 && state.steroidStats["W"]
        ? 0.25 + 0.02 * Math.floor(obj["Attack Damage"] / 100)
        : 0;
    bonusSV += nameChamp == "Morgana" ? 0.18 : 0;
    bonusSV +=
      nameChamp == "Kayn" && state.steroidStats["Form"]
        ? 0.2 + (0.1 / 17) * (state.level - 1)
        : 0;
    bonusSV += nameChamp == "Vladimir" && state.steroidStats["W"] ? 0.15 : 0;
    bonusSV +=
      nameChamp == "Warwick" && state.steroidStats["Q"] && state.qSkillPoint > 0
        ? 0.125 + 0.125 * state.qSkillPoint
        : 0;
    bonusSV += nameChamp == "Warwick" && state.steroidStats["R"] ? 1 : 0;

    obj["Spellvamp %"] = (state.itemStats["SV"] + bonusSV) * selfHealing;

    // Tenacity
    let bonusTenacity = state.hasIceborn ? 0.05 * state.nbLegendary : 0;
    bonusTenacity += state.hasSilvermere ? 0.5 : 0;
    bonusTenacity += state.hasSterak ? 0.3 : 0;
    bonusTenacity += nameChamp == "Garen" && state.steroidStats["W"] ? 0.6 : 0;
    bonusTenacity += nameChamp == "Milio" && state.steroidStats["R"] ? 0.65 : 0;
    bonusTenacity +=
      state.mainSecondRune == "Tenacity" ||
      state.secondFirstRune == "Tenacity" ||
      state.secondSecondRune == "Tenacity"
        ? 0.05 + 0.015 * state.stackLegendExceptBloodline
        : 0;
    bonusTenacity +=
      state.mainThirdRune == "Unflinching" ||
      state.secondSecondRune == "Unflinching"
        ? 0.05 + (state.steroidStats["Runes"] ? 0.2 : 0)
        : 0;
    bonusTenacity += 0.06 * state.gameStats["Chemtech"];

    obj["Tenacity %"] = state.itemStats["TC"] / 100 + bonusTenacity;

    // Mana Regen
    let bonusMP5 =
      nameChamp == "Singed" && state.steroidStats["R"] && state.rSkillPoint > 0
        ? -0.01 + 0.07 * state.rSkillPoint
        : 0;

    obj["Mana / Regen"] = state.itemStats["MP5"] + bonusMP5;
    
    handleChange("SET_ADDITIONNALSTATS", obj);
  }, [
    state.hasSilvermere,
    state.hasLiandry,
    state.hasShadowflame,
    state.hasDivine,
    state.hasRapidFireCanon,
    state.hasFlowing,
    state.hasSeraph,
    state.hasRiftmaker,
    state.hasRabadon,
    state.hasEverfrost,
    state.hasDemonic,
    state.hasArchangel,
    state.hasWarmog,
    state.hasSpectre,
    state.hasRedemption,
    state.hasMikael,
    state.hasEchoes,
    state.hasChalice,
    state.hasSpiritVisage,
    state.hasMalmortius,
    state.hasChemtank,
    state.hasStormrazor,
    state.hasShurelya,
    state.hasROA,
    state.hasCosmicDrive,
    state.hasHarvester,
    state.hasMejai,
    state.hasLuden,
    state.hasRocketbelt,
    state.hasCrown,
    state.hasBOTRK,
    state.hasWitsEnd,
    state.hasStridebreaker,
    state.hasMobility,
    state.hasHearthbound,
    state.hasEclipse,
    state.hasDraktharr,
    state.hasDeadMan,
    state.hasBlackCleaver,
    state.hasVerdant,
    state.hasForceNature,
    state.hasAbyssal,
    state.hasArmguard,
    state.hasJakSho,
    state.hasHullbreaker,
    state.hasGargoyle,
    state.hasRageknife,
    state.hasPhantom,
    state.hasShieldbow,
    state.hasRageblade,
    state.hasWinterApproach,
    state.hasIceborn,
    state.hasGoredrinker,
    state.hasFimbulwinter,
    state.hasRadiant,
    state.hasHeartsteel,
    state.hasBloodthirster,
    state.hasTrinity,
    state.hasWardStone,
    state.hasSterak,
    state.hasGaleforce,
    state.hasShojin,
    state.hasMuramana,
    state.hasManamune,
    state.hasRavenousHydra,
    state.hasIE,
    state.hasNavori,
    state.hasTitanicHydra,
    state.hasYoumuu,
    state.level,
    state.gameStats,
    state.itemStats,
    state.runeStats,
    state.enemyItemStats,
    state.enemyStats,
    state.bonusStats,
    state.steroidStats,
    state.apheliosStats,
    state.sennaStacks,
    state.rSkillPoint,
    state.qSkillPoint,
    state.wSkillPoint,
    state.eSkillPoint,
    state.mainFirstRune,
    state.mainSecondRune,
    state.mainRune,
    state.mainThirdRune,
    state.secondRune,
    state.secondFirstRune,
    state.secondSecondRune,
    state.stackBounty,
    state.stackConqueror,
    state.stackDarkHarvest,
    state.stackLegendBloodline,
    state.stackLegendExceptBloodline,
    state.stackMejai,
  ]);

  useEffect(() => {
    let objTotal = {
      AD: 0,
      AH: 0,
      AP: 0,
      APenF: 0,
      AR: 0,
      AS: 0,
      AvgAA: 0,
      Crit: 0,
      CritDMG: 0,
      CritHit: 0,
      DPS: 0,
      Gold: 0,
      HitDmg: 0,
      HPR: 0,
      Leth: 0,
      LS: 0,
      HP: 0,
      MisHPV: 0,
      MP: 0,
      MpenF: 0,
      MPR: 0,
      MR: 0,
      MS: 0,
      "Proc Item": 0,
      "Proc Rune": 0,
      "Proc Summ": 0,
      Shield: 0,
      TC: 0,
    };
    objTotal["Crit"] =
      state.basicStatsChampion["Critical %"] +
      state.additionnalStats["Critical %"];
    objTotal["MP"] =
      state.basicStatsChampion["Mana"] + state.additionnalStats["Mana"];

    objTotal["AD"] =
      state.basicStatsChampion["Attack Damage"] +
      state.additionnalStats["Attack Damage"];
    objTotal["AD"] +=
      state.steroidStats["R"] && nameChamp == "Aatrox"
        ? state.rSkillPoint == 1
          ? objTotal["AD"] * 0.2
          : state.rSkillPoint == 2
          ? objTotal["AD"] * 0.325
          : objTotal["AD"] * 0.45
        : 0;
    objTotal["AD"] +=
      nameChamp == "Olaf" && state.steroidStats["R"]
        ? 0 + 10 * state.rSkillPoint + 0.25 * objTotal["AD"]
        : 0;
    objTotal["AD"] +=
      nameChamp == "Naafiri" && state.steroidStats["R"]
        ? 10 +
          10 * (state.rSkillPoint - 1) +
          (0.1 + 0.05 * state.rSkillPoint) * objTotal["AD"]
        : 0;
    objTotal["AD"] +=
      nameChamp == "Trundle" && state.steroidStats["Q"]
        ? 0 +
          20 * state.qSkillPoint +
          (0.5 + 0.1 * state.qSkillPoint) * objTotal["AD"]
        : 0;
    objTotal["AD"] +=
      nameChamp == "Jhin"
        ? 0.03 +
          (state.level <= 9
            ? 0.01 * state.level
            : state.level <= 11
            ? 0.02 * state.level
            : 0.04 * state.level) +
          0.003 * objTotal["Crit"] +
          0.025 * state.additionnalStats["Attack Speed %"]
        : 0;
    objTotal["AD"] +=
      state.hasMuramana || state.hasManamune ? objTotal["MP"] * 0.025 : 0;

    objTotal["AH"] =
      state.basicStatsChampion["Ability Haste"] +
      state.additionnalStats["Ability Haste"];
    objTotal["AP"] =
      state.basicStatsChampion["Ability Power"] +
      state.additionnalStats["Ability Power"];
    objTotal["APenF"] =
      state.basicStatsChampion["Armor Penetration"] +
      state.additionnalStats["Armor Penetration"];
    objTotal["AR"] =
      state.basicStatsChampion["Armor"] + state.additionnalStats["Armor"];
    objTotal["AR"] +=
      nameChamp == "Gwen" && state.steroidStats["W"] && state.eSkillPoint > 0
        ? 15 + 2 * state.eSkillPoint + 0.07 * objTotal["AP"]
        : 0;
    objTotal["AR"] +=
      nameChamp == "Rammus" && state.wSkillPoint > 0
        ? 35 + ((30 + 10 * state.wSkillPoint) / 100) * objTotal["AR"]
        : 0;
    objTotal["AR"] +=
      nameChamp == "Taric" && state.wSkillPoint > 0
        ? ((9 * state.wSkillPoint) / 100) * objTotal["AR"]
        : 0;
    objTotal["AR"] +=
      nameChamp == "Malphite" &&
      state.steroidStats["W"] &&
      state.wSkillPoint > 0
        ? ((5 + 5 * state.eSkillPoint) / 100) * objTotal["AR"]
        : 0;

    objTotal["AS"] =
      state.basicStatsChampion["Attack Speed %"] +
      state.additionnalStats["Attack Speed %"];
    objTotal["AS"] +=
      nameChamp.includes("Renata") &&
      state.steroidStats["W"] &&
      state.wSkillPoint
        ? 0.1 +
          0.1 * state.wSkillPoint +
          0.02 * Math.floor(objTotal["AP"] / 100)
        : 0;
    objTotal["AS"] +=
      nameChamp.includes("Yuumi") &&
      state.steroidStats["E"] &&
      state.eSkillPoint
        ? 0.225 +
          0.025 * state.eSkillPoint +
          0.08 * Math.floor(objTotal["AP"] / 100)
        : 0;
    objTotal["AS"] +=
      nameChamp == "Kayle" && (state.steroidStats["P"] || state.level >= 16)
        ? 0.3 + 0.05 * Math.floor(objTotal["AP"] / 100)
        : 0;
    objTotal["AS"] +=
      nameChamp == "Volibear" && state.steroidStats["P"]
        ? 0.25 + 0.2 * Math.floor(objTotal["AP"] / 100)
        : 0;

    objTotal["AvgAA"] = 1;

    objTotal["CritDMG"] = 1.75 + state.itemStats["CDMG"]/100;
    objTotal["CritDMG"] *= nameChamp == "Jhin" ? 0.86 : 1;
    objTotal["CritDMG"] = nameChamp == "Ashe" ? 1 : objTotal["CritDMG"];
    objTotal["CritDMG"] =
      nameChamp == "Fiora" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 1.5 + 0.1 * state.eSkillPoint
        : objTotal["CritDMG"];
    objTotal["CritDMG"] *=
      nameChamp == "Shaco" && state.steroidStats["Q"] ? 1.4 : 1;
    objTotal["CritDMG"] *=
      nameChamp == "Yasuo" || nameChamp == "Yone" ? 0.9 : 1;
    objTotal["CritHit"] = 1;
    objTotal["DPS"] = 1;
    objTotal["Gold"] = state.itemStats["Gold"];
    objTotal["HitDmg"] = 1;
    objTotal["HPR"] =
      state.basicStatsChampion["Hp Regen"] + state.additionnalStats["Hp Regen"];
    objTotal["HPR"] +=
      (state.hasChalice || state.hasMikael || state.hasRedemption) &&
      !state.hasEchoes
        ? 0.25 * Math.floor(objTotal["HPR"] / 0.25)
        : 0;
    objTotal["HPR"] +=
      state.hasWarmog && objTotal["HP"] >= 1100 ? 0.25 * objTotal["HP"] : 0;
    objTotal["HPR"] += nameChamp.includes("Mundo")
      ? 0.004 + 0.019 * (state.level - 1) * objTotal["HP"]
      : 0;
    objTotal["HPR"] +=
      nameChamp.includes("Mundo") &&
      state.steroidStats["R"] &&
      state.rSkillPoint > 0
        ? 0.02 * state.rSkillPoint * objTotal["HP"]
        : 0;

    objTotal["HPR"] +=
      nameChamp == "Garen"
        ? 0.015 + 0.086 * (state.level - 1) * objTotal["HP"]
        : 0;
    objTotal["HPR"] +=
      nameChamp == "Wukong" && state.steroidStats["P"]
        ? 0.021 * objTotal["HP"]
        : 0;

    objTotal["Leth"] =
      state.basicStatsChampion["Armor Penetration"] +
      state.additionnalStats["Armor Penetration"];
    objTotal["LS"] =
      state.basicStatsChampion["Lifesteal"] +
      state.additionnalStats["Lifesteal"];
    objTotal["LS"] +=
      nameChamp == "Senna" && state.additionnalStats["Critical %"] > 1
        ? 0.35 * ((objTotal["Crit"]*100) - 100)
        : 0;

    objTotal["HP"] =
      state.basicStatsChampion["Hp"] + state.additionnalStats["Hp"];
    objTotal["HP"] +=
      state.hasFimbulwinter || state.hasWinterApproach
        ? 0.08 * objTotal["MP"]
        : 0;
    objTotal["HP"] += state.hasHeartsteel
      ? 0.01 * state.nbLegendary * objTotal["HP"]
      : 0;
    objTotal["HP"] +=
      state.hasRadiant && state.steroidStats["R"] ? 0.125 * objTotal["HP"] : 0;
    objTotal["HP"] += nameChamp == "Vladimir" ? 1.6 * objTotal["AP"] : 0;
    objTotal["HP"] +=
      nameChamp.includes("Veth") &&
      nameChamp.includes("Bel") &&
      state.steroidStats["Form"]
        ? 50 +
          50 * state.rSkillPoint +
          1.2 * state.additionnalStats["Attack Damage"] +
          0.9 * objTotal["AP"]
        : 0;

    objTotal["MisHPV"] = 1;
    objTotal["MpenF"] =
      state.basicStatsChampion["Resist Penetration"] +
      state.additionnalStats["Resist Penetration"];
    objTotal["MPR"] =
      state.basicStatsChampion["Mana / Regen"] +
      state.additionnalStats["Mana / Regen"];
    objTotal["MR"] =
      state.basicStatsChampion["Magic Resist"] +
      state.additionnalStats["Magic Resist"];
    objTotal["MR"] +=
      nameChamp == "Gwen" && state.steroidStats["W"] && state.eSkillPoint > 0
        ? 15 + 2 * state.eSkillPoint + 0.07 * objTotal["AP"]
        : 0;
    objTotal["MR"] +=
      nameChamp == "Rammus" && state.wSkillPoint > 0
        ? 10 + ((25 + 5 * state.wSkillPoint) / 100) * objTotal["MR"]
        : 0;

    objTotal["MS"] =
      state.basicStatsChampion["Move Speed"] +
      state.additionnalStats["Move Speed"];
    objTotal["MS"] +=
      nameChamp == "Sion" && state.steroidStats["R"] ? 950 - objTotal["MS"] : 0;
    objTotal["MS"] *=
      nameChamp == "Akshan" && state.steroidStats["Q"]
        ? 1.4 + 0.05 * Math.floor(objTotal["AP"] / 100)
        : 1;
    objTotal["MS"] *=
      nameChamp == "Lulu" && state.steroidStats["W"]
        ? 1.25 + 0.05 * Math.floor(objTotal["AP"] / 100)
        : 1;
    objTotal["MS"] *=
      nameChamp == "Kayle" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.2 +
          0.04 * state.wSkillPoint +
          0.08 * Math.floor(objTotal["AP"] / 100)
        : 1;
    objTotal["MS"] *=
      nameChamp == "Senna" && state.steroidStats["W"]
        ? 1.2 + 0.05 * Math.floor(objTotal["AP"] / 100)
        : 1;
    objTotal["MS"] *=
      nameChamp == "Seraphine" && state.steroidStats["W"]
        ? 1.2 + 0.04 * Math.floor(objTotal["AP"] / 100)
        : 1;
    objTotal["MS"] *=
      nameChamp.includes("Renata") &&
      state.steroidStats["W"] &&
      state.wSkillPoint > 0
        ? 1.075 +
          0.025 * state.wSkillPoint +
          0.01 * Math.floor(objTotal["AP"] / 100)
        : 1;
    objTotal["MS"] *=
      nameChamp == "Sona" && state.steroidStats["E"] && state.eSkillPoint
        ? 1.1 +
          0.01 * state.eSkillPoint +
          0.02 * Math.floor(objTotal["AP"] / 100)
        : 1;
    objTotal["MS"] *=
      nameChamp == "Janna" && state.wSkillPoint > 0
        ? 1.05 +
          0.01 * state.wSkillPoint +
          0.02 * Math.floor(objTotal["AP"] / 100)
        : 1;
    objTotal["MS"] *=
      nameChamp == "Lillia" && state.steroidStats["Q"] && state.qSkillPoint > 0
        ? 1.08 +
          0.04 * state.qSkillPoint +
          0.12 * Math.floor(objTotal["AP"] / 100)
        : 1;
    objTotal["MS"] *=
      nameChamp == "Pyke" && state.steroidStats["W"]
        ? 1.4 + 0.015 * objTotal["Leth"]
        : 1;
    objTotal["MS"] *=
      nameChamp == "Shyvana" && state.steroidStats["W"] && state.wSkillPoint > 0
        ? 1.25 +
          0.05 * state.wSkillPoint +
          0.08 * Math.floor(objTotal["AP"] / 100)
        : 1;
    objTotal["MS"] *=
      nameChamp == "Viego" && state.steroidStats["E"] && state.eSkillPoint > 0
        ? 1.225 +
          0.025 * state.eSkillPoint +
          0.04 * Math.floor(objTotal["AP"] / 100)
        : 1;
    objTotal["MS"] *=
      nameChamp == "Aphelios" &&
      state.apheliosStats["Main Weapon"] == "Severum, the Scythe Pistol" &&
      state.steroidStats["Q"]
        ? 1.2 + 0.1 * Math.floor(objTotal["AP"] / 100)
        : 1;

    objTotal["Proc Item"] = 1;
    objTotal["Proc Rune"] = 1;
    objTotal["Proc Summ"] = 1;
    objTotal["Shield"] = 2;
    objTotal["TC"] =
      state.additionnalStats["Tenacity %"] +
      state.basicStatsChampion["Tenacity %"];

    handleChange("SET_TOTALSTATS", objTotal);
  }, [
    state.level,
    state.itemStats,
    state.additionnalStats,
    state.basicStatsChampion,
    state.enemyStats,
    state.qSkillPoint,
    state.wSkillPoint,
    state.eSkillPoint,
    state.rSkillPoint,
    state.apheliosStats,
    state.hasHeartsteel,
    state.hasRadiant,
    state.hasWarmog,
    state.hasChalice,
    state.hasRedemption,
    state.hasMikael,
    state.hasManamune,
    state.hasMuramana,
    state.hasEchoes,
    state.hasWinterApproach,
    state.hasFimbulwinter,
    state.steroidStats,
  ]);

  useEffect(() => {
    if (data != undefined) {
      console.log(data);
      handleChange(
        "SET_PIMG",
        "../../images/passive/" + data["img"]["passive"] + ".png"
      );
      handleChange(
        "SET_QIMG",
        "../../images/spell/" + data["img"]["QSpell"] + ".png"
      );
      handleChange(
        "SET_WIMG",
        "../../images/spell/" + data["img"]["WSpell"] + ".png"
      );
      handleChange(
        "SET_EIMG",
        "../../images/spell/" + data["img"]["ESpell"] + ".png"
      );
      handleChange(
        "SET_RIMG",
        "../../images/spell/" + data["img"]["RSpell"] + ".png"
      );

      handleChange("SET_PDMG", modifyDMG(data, "P-DMG"));
      handleChange("SET_QDMG", modifyDMG(data, "Q-DMG"));
      handleChange("SET_WDMG", modifyDMG(data, "W-DMG"));
      handleChange("SET_EDMG", modifyDMG(data, "E-DMG"));
      handleChange("SET_RDMG", modifyDMG(data, "R-DMG"));

      handleChange("SET_PCD", modifyCD(data, "P-CD"));
      handleChange("SET_QCD", modifyCD(data, "Q-CD"));
      handleChange("SET_WCD", modifyCD(data, "W-CD"));
      handleChange("SET_ECD", modifyCD(data, "E-CD"));
      handleChange("SET_RCD", modifyCD(data, "R-CD"));
    }
  }, [
    data,
    state.totalStats,
    state.qSkillPoint,
    state.eSkillPoint,
    state.wSkillPoint,
    state.rSkillPoint,
  ]);

  const enemyDataPrep = async () => {
    /** ENEMY STATS */
    let enemy_obj = {
      Level: state.enemyLevel,
      Name: state.enemyName,
      Armor: 0,
      "Armor Bonus": 0,
      "Hp Bonus": 0,
      "Current Hp %": 100,
      "Current Hp": 0,
      Hp: 0,
      "Missing HP": 0,
      "Magic Resist": 0,
      "Magic Resist Bonus": 0,
    };

    if (enemy_obj["Name"] != "-") {
      const res = await fetch(
        `http://localhost:3000/data/champions/${enemy_obj["Name"]}.json`
      );
      const championDetails = await res.json();

      enemy_obj["Armor"] =
        championDetails["AR"] + championDetails["AR+"] * (state.enemyLevel - 1);
      enemy_obj["Hp"] =
        championDetails["HP"] + championDetails["HP+"] * (state.enemyLevel - 1);
      enemy_obj["Magic Resist"] =
        championDetails["MR"] + championDetails["MR+"] * (state.enemyLevel - 1);
    }
    enemy_obj["Armor"] += state.enemyItemStats["AR"];
    enemy_obj["Hp"] += state.enemyItemStats["HP"];
    enemy_obj["Magic Resist"] += state.enemyItemStats["MR"];
    enemy_obj["Current Hp"] = enemy_obj["Hp"];
    enemy_obj["Current Hp %"] = (enemy_obj["Hp"] != 0 ?
      (enemy_obj["Current Hp"] / enemy_obj["Hp"]) : 0 )* 100;
    handleChange("SET_ENEMY_STATS", enemy_obj);
  };

  const staticCD = {
    Aatrox: ["P", "Q"],
    Ahri: ["R"],
    Akali: ["R"],
    Akshan: ["P"],
    Alistar: ["P"],
    Amumu: ["Q", "W"],
    Anivia: ["P"],
    Aphelios: ["W"],
    Azir: ["P"],
    Blitzcrank: ["P"],
    Caitlyn: ["W"],
    Camille: ["P"],
    Corki: ["P", "R"],
    Mundo: ["P"],
    Evelynn: ["P"],
    Gangplank: ["P", "E"],
    Gragas: ["P"],
    Illaoi: ["P"],
    Ivern: ["W"],
    Jhin: ["R"],
    Jinx: ["Q"],
    Karthus: ["W"],
    Kindred: ["P", "Q"],
    Kled: ["P"],
    LeBlanc: ["P"],
    Malphite: ["P"],
    Malzahar: ["P"],
    Maokai: ["P"],
    Neeko: ["P"],
    Poppy: ["P"],
    Quinn: ["P"],
    Samira: ["R"],
    Shen: ["P"],
    Singed: ["Q"],
    Urgot: ["P"],
    Koz: ["W"],
    Vex: ["P"],
    Vi: ["P", "E"],
    Xerath: ["P", "R"],
    Yasuo: ["Q", "E"],
    Yone: ["Q", "W"],
    Yuumi: ["P,W"],
    Zac: ["P"],
    Ziggs: ["P"],
    Zilean: ["P"],
    Zyra: ["P"],
  };

  function modifyCD(dt, key) {
    let dataCD =
      typeof dt[key] === "string" ? getNumericFromString(dt[key]) : dt[key];
    for (let staKey in staticCD) {
      if (nameChamp.includes(staKey)) {
        console.log(key[0]);
        if (staticCD[staKey].includes(key[0])) {
          return dataCD;
        }
      }
    }
    return Math.floor(dataCD * (100 / (100 + state.totalStats["AH"])));
  }

  function modifyDMG(dt, key) {
    return typeof dt[key] === "string"
      ? getNumericFromString(dt[key]).toFixed(2)
      : dt[key].toFixed(2);
  }

  function convertLethIntoArmorPen(leth) {
    return leth * (0.6 + (0.4 * state.level) / 18);
  }

  function returnBoolIfHasItem(chaine) {
    let bool = false;
    if (state.itemSlot1.includes(chaine)) bool = true;
    if (
      state.itemSlot2.includes(chaine) ||
      state.itemSlot3.includes(chaine) ||
      state.itemSlot4.includes(chaine) ||
      state.itemSlot5.includes(chaine) ||
      state.itemSlot6.includes(chaine)
    )
      bool = true;
    if (state.elixirSlot.includes(chaine)) bool = true;
    return bool;
  }

  const majItemStats = async () => {
    let nb = 0;
    let obj = {
      AD: 0,
      AH: 0,
      AP: 0,
      "APE%": 0,
      AR: 0,
      AS: 0,
      CDMG: 0,
      Gold: 0,
      CC: 0,
      MS: 0,
      HP: 0,
      HP5: 0,
      LE: 0,
      LS: 0,
      HEAL: 0,
      APM: 0,
      ADM: 0,
      MP: 0,
      MPE: 0,
      "MPE%": 0,
      MP5: 0,
      MR: 0,
      "MS%": 0,
      MOH: 0,
      POH: 0,
      EPD: 0,
      MPD: 0,
      PPD: 0,
      SHI: 0,
      SHOE: 0,
      SV: 0,
      TC: 0,
    };
    if (state.itemSlot1 != "-") {
      obj = await addItemsStats(obj, state.itemSlot1, "SET_ITEM_IMG1");
      if (state.itemSlot1 in listItemsLegendary) {
        nb += 1;
      }
    }
    if (state.itemSlot2 != "-") {
      obj = await addItemsStats(obj, state.itemSlot2, "SET_ITEM_IMG2");
      if (state.itemSlot2 in listItemsLegendary) {
        nb += 1;
      }
    }

    if (state.itemSlot3 != "-") {
      obj = await addItemsStats(obj, state.itemSlot3, "SET_ITEM_IMG3");
      if (state.itemSlot3 in listItemsLegendary) {
        nb += 1;
      }
    }

    if (state.itemSlot4 != "-") {
      obj = await addItemsStats(obj, state.itemSlot4, "SET_ITEM_IMG4");
      if (state.itemSlot4 in listItemsLegendary) {
        nb += 1;
      }
    }

    if (state.itemSlot5 != "-") {
      obj = await addItemsStats(obj, state.itemSlot5, "SET_ITEM_IMG5");
      if (state.itemSlot5 in listItemsLegendary) {
        nb += 1;
      }
    }

    if (state.itemSlot6 != "-") {
      obj = await addItemsStats(obj, state.itemSlot6, "SET_ITEM_IMG6");
      if (state.itemSlot6 in listItemsLegendary) {
        nb += 1;
      }
    }

    if (state.elixirSlot != "-") {
      obj = await addItemsStats(obj, state.elixirSlot, "SET_ITEM_IMG7");
    }
    console.log(obj);
    handleChange("SET_ITEM_STATS", obj);
    handleChange("SET_NBLEGENDARY", nb);

    handleChange(
      "SET_HAS_WARDSTONE",
      returnBoolIfHasItem("Vigilant WardStone")
    );
    handleChange("SET_HAS_TRINITY", returnBoolIfHasItem("Trinity"));
    handleChange("SET_HAS_STERAK", returnBoolIfHasItem("Sterak's"));
    handleChange("SET_HAS_GALEFORCE", returnBoolIfHasItem("Galeforce"));
    handleChange("SET_HAS_SHOJIN", returnBoolIfHasItem("Shojin"));
    handleChange("SET_HAS_MURAMANA", returnBoolIfHasItem("Muramana"));
    handleChange(
      "SET_HAS_RAVENOUSHYDRA",
      returnBoolIfHasItem("Ravenous Hydra")
    );
    handleChange("SET_HAS_IE", returnBoolIfHasItem("Infinity Edge"));
    handleChange("SET_HAS_NAVORI", returnBoolIfHasItem("Navori"));
    handleChange("SET_HAS_YOUMUU", returnBoolIfHasItem("Youmuu"));
    handleChange("SET_HAS_TITANICHYDRA", returnBoolIfHasItem("Titanic"));
    handleChange("SET_HAS_BLOODTHIRSTER", returnBoolIfHasItem("Bloodthirster"));
    handleChange("SET_HAS_MANAMUNE", returnBoolIfHasItem("Manamune"));
    handleChange("SET_HAS_HEARTSTEEL", returnBoolIfHasItem("Heartsteel"));
    handleChange("SET_HAS_RADIANT", returnBoolIfHasItem("Radiant Virtue"));
    handleChange("SET_HAS_FIMBULWINTER", returnBoolIfHasItem("Fimbul"));
    handleChange("SET_HAS_GOREDRINKER", returnBoolIfHasItem("Goredrinker"));
    handleChange("SET_HAS_ICEBORN", returnBoolIfHasItem("Iceborn Gau"));
    handleChange(
      "SET_HAS_WINTERAPPROACH",
      returnBoolIfHasItem("Winter's Approach")
    );
    handleChange("SET_HAS_RAGEBLADE", returnBoolIfHasItem("Guinsoo"));
    handleChange("SET_HAS_SHIELDBOW", returnBoolIfHasItem("Shieldbow"));
    handleChange("SET_HAS_PHANTOM", returnBoolIfHasItem("Phantom"));
    handleChange("SET_HAS_RAGEKNIFE", returnBoolIfHasItem("Rageknife"));
    handleChange("SET_HAS_GARGOYLE", returnBoolIfHasItem("Gargoyle"));
    handleChange("SET_HULLBREAKER", returnBoolIfHasItem("Hullbreaker"));
    handleChange("SET_HAS_JAKSHO", returnBoolIfHasItem("Jak'Sho"));
    handleChange("SET_HAS_LOCKET", returnBoolIfHasItem("Locket of"));
    handleChange("SET_HAS_ARMGUARD", returnBoolIfHasItem("Seeker's Armguard"));
    handleChange("SET_HAS_ABYSSAL", returnBoolIfHasItem("Abyssal Mask"));
    handleChange("SET_HAS_FORCENATURE", returnBoolIfHasItem("Force of Nature"));
    handleChange("SET_HAS_VERDANT", returnBoolIfHasItem("Verdant"));
    handleChange("SET_HAS_BLACKCLEAVER", returnBoolIfHasItem("Black Cleaver"));
    handleChange("SET_HAS_DEADMAN", returnBoolIfHasItem("Dead Man's Plate"));
    handleChange("SET_HAS_DRAKTHARR", returnBoolIfHasItem("Draktharr"));
    handleChange("SET_HAS_ECLIPSE", returnBoolIfHasItem("Eclipse"));
    handleChange("SET_HAS_HEARTHBOUND", returnBoolIfHasItem("Hearthbound"));
    handleChange("SET_HAS_MOBILITY", returnBoolIfHasItem("Mobility Boots"));
    handleChange("SET_HAS_STRIDEBREAKER", returnBoolIfHasItem("Stridebreaker"));
    handleChange("SET_HAS_WITSEND", returnBoolIfHasItem("Wit's End"));
    handleChange(
      "SET_HAS_BOTRK",
      returnBoolIfHasItem("Blade of the Ruined King")
    );
    handleChange(
      "SET_HAS_CROWN",
      returnBoolIfHasItem("Crown of the Shattered Queen")
    );
    handleChange("SET_HAS_ROCKETBELT", returnBoolIfHasItem("Rocketbelt"));
    handleChange("SET_HAS_LUDEN", returnBoolIfHasItem("Luden"));
    handleChange("SET_HAS_MEJAI", returnBoolIfHasItem("Mejai"));
    handleChange("SET_HAS_HARVESTER", returnBoolIfHasItem("Night Harvester"));
    handleChange("SET_HAS_COSMICDRIVE", returnBoolIfHasItem("Cosmic Drive"));
    handleChange("SET_HAS_ROA", returnBoolIfHasItem("Rod of Ages"));
    handleChange("SET_HAS_SHURELYA", returnBoolIfHasItem("Shurelya"));
    handleChange("SET_HAS_STORMRAZOR", returnBoolIfHasItem("Stormrazor"));
    handleChange("SET_HAS_CHEMTANK", returnBoolIfHasItem("Chemtank"));
    handleChange(
      "SET_HAS_MALMORTIUS",
      returnBoolIfHasItem("Maw of Malmortius")
    );
    handleChange("SET_HAS_SPIRITVISAGE", returnBoolIfHasItem("Spirit Visage"));
    handleChange("SET_HAS_CHALICE", returnBoolIfHasItem("Chalice of Blessing"));
    handleChange("SET_HAS_ECHOES", returnBoolIfHasItem("Echoes of Helia"));
    handleChange("SET_HAS_MIKAEL", returnBoolIfHasItem("Mikael's Blessing"));
    handleChange("SET_HAS_REDEMPTION", returnBoolIfHasItem("Redemption"));
    handleChange("SET_HAS_SPECTRE", returnBoolIfHasItem("Spectre's Cowl"));
    handleChange("SET_HAS_WARMOG", returnBoolIfHasItem("Warmog"));
    handleChange("SET_HAS_ARCHANGEL", returnBoolIfHasItem("Archangel's Staff"));
    handleChange("SET_HAS_DEMONIC", returnBoolIfHasItem("Demonic Embrace"));
    handleChange("SET_HAS_EVERFROST", returnBoolIfHasItem("Everfrost"));
    handleChange("SET_HAS_RABADON", returnBoolIfHasItem("Rabadon's Deathcap"));
    handleChange("SET_HAS_RIFTMAKER", returnBoolIfHasItem("Riftmaker"));
    handleChange("SET_HAS_SERAPH", returnBoolIfHasItem("Riftmaker"));
    handleChange(
      "SET_HAS_FLOWING",
      returnBoolIfHasItem("Staff of Flowing Water")
    );
    handleChange(
      "SET_HAS_RAPIDFIRECANON",
      returnBoolIfHasItem("Rapid Firecannon")
    );
    handleChange("SET_HAS_DIVINE", returnBoolIfHasItem("Divine Sunderer"));
    handleChange("SET_HAS_SHADOWFLAME", returnBoolIfHasItem("Shadowflame"));
    handleChange("SET_HAS_LIANDRY", returnBoolIfHasItem("Liandry's Anguish"));
    handleChange("SET_HAS_SILVERMERE", returnBoolIfHasItem("Silvermere Dawn"));
  };

  const majItemEnemyStats = async () => {
    let nb = 0;
    let obj = {
      AD: 0,
      AH: 0,
      AP: 0,
      "APE%": 0,
      AR: 0,
      AS: 0,
      CDMG: 0,
      Gold: 0,
      CC: 0,
      MS: 0,
      HP: 0,
      HP5: 0,
      LE: 0,
      LS: 0,
      HEAL: 0,
      APM: 0,
      ADM: 0,
      MP: 0,
      MPE: 0,
      "MPE%": 0,
      MP5: 0,
      MR: 0,
      "MS%": 0,
      MOH: 0,
      POH: 0,
      EPD: 0,
      MPD: 0,
      PPD: 0,
      SHI: 0,
      SHOE: 0,
      SV: 0,
      TC: 0,
    };
    if (state.enemyItemSlot1 != "-") {
      obj = await addItemsStats(
        obj,
        state.enemyItemSlot1,
        "SET_ITEM_ENEMY_IMG1"
      );
      if (state.enemyItemSlot1 in listItemsLegendary) {
        nb += 1;
      }
    }
    if (state.enemyItemSlot2 != "-") {
      obj = await addItemsStats(
        obj,
        state.enemyItemSlot2,
        "SET_ITEM_ENEMY_IMG2"
      );
      if (state.enemyItemSlot2 in listItemsLegendary) {
        nb += 1;
      }
    }

    if (state.enemyItemSlot3 != "-") {
      obj = await addItemsStats(
        obj,
        state.enemyItemSlot3,
        "SET_ITEM_ENEMY_IMG3"
      );
      if (state.enemyItemSlot3 in listItemsLegendary) {
        nb += 1;
      }
    }

    if (state.enemyItemSlot4 != "-") {
      obj = await addItemsStats(
        obj,
        state.enemyItemSlot4,
        "SET_ITEM_ENEMY_IMG4"
      );
      if (state.enemyItemSlot4 in listItemsLegendary) {
        nb += 1;
      }
    }

    if (state.enemyItemSlot5 != "-") {
      obj = await addItemsStats(
        obj,
        state.enemyItemSlot5,
        "SET_ITEM_ENEMY_IMG5"
      );
      if (state.enemyItemSlot5 in listItemsLegendary) {
        nb += 1;
      }
    }

    if (state.enemyItemSlot6 != "-") {
      obj = await addItemsStats(
        obj,
        state.enemyItemSlot6,
        "SET_ITEM_ENEMY_IMG6"
      );
      if (state.enemyItemSlot6 in listItemsLegendary) {
        nb += 1;
      }
    }

    if (state.enemyElixirSlot != "-") {
      obj = await addItemsStats(
        obj,
        state.enemyElixirSlot,
        "SET_ITEM_ENEMY_IMG7"
      );
    }

    handleChange("SET_ENEMY_ITEM_STATS", obj);
  };

  const addItemsStats = async (obj, itemName, modify) => {
    const res = await fetch(
      `http://localhost:3000/data/items/${itemName}.json`
    );
    const itemDetails = await res.json();
    for (let key in itemDetails) {
      if (key != "img" && key != "Icon") {
        let newValue = itemDetails[key];
        if (typeof newValue === "string") {
          newValue = getNumericFromString(newValue);
        }
        obj[key] += newValue;
      }
      if (key == "img") {
        handleChange(modify, itemDetails["img"]);
      }
    }

    return obj;
  };

  const majStatsRune = () => {
    let obj = {
      ForceBit: 1,
      Adaptive: 0,
      AH: 0,
      AS: 0,
      AR: 0,
      HP: 0,
      MP: 0,
      MR: 0,
      MS: 0,
      Ultimate: 0,
    };
    if (state.itemStats["AD"] >= state.itemStats["AP"]) {
      obj["ForceBit"] = 1;
    } else {
      obj["ForceBit"] = 0;
    }
    if (state.offensiveShard == "Adaptive") {
      obj["Adaptive"] += 9;
    }
    if (state.mixedShard == "Adaptive") {
      obj["Adaptive"] += 9;
    }
    if (
      state.mainThirdRune == "Waterwalking" ||
      state.secondSecondRune == "Waterwalking"
    ) {
      obj["ForceBit"] == 1
        ? (obj["Adaptive"] += (3 + 15 * ((state.level - 1) / 17)).toFixed(0))
        : (obj["Adaptive"] += (5 + 25 * ((state.level - 1) / 17)).toFixed(0));
    }
    if (state.offensiveShard == "Attack Speed") {
      obj["AS"] += 0.08;
    }
    if (state.defensiveShard == "Health") {
      obj["HP"] += 15 + 125 * ((state.level - 1) / 17);
    }
    if (
      state.mainSecondRune == "Biscuit Delivery" ||
      state.secondFirstRune == "Biscuit Delivery" ||
      state.secondSecondRune == "Biscuit Delivery"
    ) {
      if (Math.floor(state.gameStats["Gametime"] / 2) * 40 >= 120)
        obj["MP"] += 120;
      else obj["MP"] += Math.floor(state.gameStats["Gametime"] / 2) * 40;
    }
    if (
      state.mainFirstRune == "Manaflow Band" ||
      state.secondFirstRune == "Manaflow Band"
    ) {
      obj["MP"] += 250;
    }
    if (state.mixedShard == "Armor") {
      obj["AR"] += 6;
    }
    if (state.defensiveShard == "Armor") {
      obj["AR"] += 6;
    }
    if (
      state.mainSecondRune == "Conditioning" ||
      state.secondFirstRune == "Conditioning" ||
      state.secondSecondRune == "Conditioning"
    ) {
      if (state.gameStats["Gametime"] >= 12) {
        obj["AR"] += 8;
        obj["MR"] += 8;
      }
    }
    if (state.mixedShard == "Magic Resist") {
      obj["MR"] += 8;
    }
    if (state.defensiveShard == "Magic Resist") {
      obj["MR"] += 8;
    }
    if (state.offensiveShard == "Ability Haste") {
      obj["AH"] += 8;
    }
    if (
      state.mainThirdRune == "Ultimate Hunter" ||
      state.secondSecondRune == "Ultimate Hunter"
    ) {
      obj["Ultimate"] = 6 + 5 * state.stackBounty;
    }
    handleChange("SET_RUNESTATS", obj);
  };

  function getNumericFromString(stringDamage) {
    let str = removeExcelFunctions(stringDamage);
    let scope = {
      // VOIR LES PLAGES NOMMEES

      Sc_Lin: (state.level - 1) / 17,
      data: data,
      runeStats: state.runeStats,
      basicStatsChampion: state.basicStatsChampion,
      additionnalStats: state.additionnalStats,
      B_Ardent: state.bonusStats["Ardent"],
      B_Chem: state.bonusStats["Chem"],
      B_Cloud: state.bonusStats["Cloud"],
      B_Elder: state.bonusStats["Elder"],
      B_Hex: state.bonusStats["Hextech"],
      B_Infernal: state.bonusStats["Infernal"],
      B_Mountain: state.bonusStats["Mountain"],
      B_Ocean: state.bonusStats["Ocean"],
      B_RecentHit: state.bonusStats["Recently Hit"],

      C_Aphelios_Stacks: state.apheliosStats["Crescend Stacks"],
      C_Aphelios_W1: state.apheliosStats["Main Weapon"],
      C_Aphelios_W2: state.apheliosStats["Sub Weapon"],
      C_SylasUltimate: state.sylasUltimate,

      E_AR: state.enemyStats["Armor"],
      E_BoAR: state.enemyStats["Armor Bonus"],
      E_BoHp: state.enemyStats["Hp Bonus"],
      E_CHP: state.enemyStats["Current Hp %"],
      E_CHPV: state.enemyStats["Current Hp"],
      E_IT_AR: state.enemyItemStats["AR"],
      E_IT_HP: state.enemyItemStats["HP"],
      E_IT_MR: state.enemyItemStats["MR"],
      E_Level: state.enemyStats["Level"],
      E_MHP: state.enemyStats["Hp"],
      E_MisHPV: state.enemyStats["Missing HP"],
      E_MR: state.enemyStats["Magic Resist"],
      E_Name: state.enemyStats["Name"],

      Gametime: state.gameStats["Gametime"],

      IT_AD: state.itemStats["AD"],
      IT_AH: state.itemStats["AH"],
      IT_AP: state.itemStats["AP"],
      IT_APEN: state.itemStats["APE%"],
      IT_AR: state.itemStats["AR"],
      IT_AS: state.itemStats["AS"],
      IT_CDMG: state.itemStats["CDMG"],
      IT_Cost: state.itemStats["Gold"],
      IT_Cost2: state.enemyItemStats["Gold"],
      IT_Crit: state.itemStats["CC"],
      IT_FlatMS: state.itemStats["MS"],
      IT_HP: state.itemStats["HP"],
      IT_HPR: state.itemStats["HP5"],
      IT_Leth: state.itemStats["LE"],
      IT_LS: state.itemStats["LS"],
      IT_MOD_Heal: state.itemStats["HEAL"],
      IT_MOD_Magic: state.itemStats["APM"],
      IT_MOD_Phys: state.itemStats["ADM"],
      IT_MP: state.itemStats["MP"],
      IT_Mpen: state.itemStats["MPE"],
      IT_MPenP: state.itemStats["MPE%"],
      IT_MPR: state.itemStats["MP5"] || 0,
      IT_MR: state.itemStats["MR"],
      IT_MS: state.itemStats["MS%"],
      IT_OH_Magic: state.itemStats["MOH"],
      IT_OH_Phys: state.itemStats["POH"],
      IT_Proc_Energy: state.itemStats["EPD"],
      IT_Proc_Magic: state.itemStats["MPD"],
      IT_Proc_Phys: state.itemStats["PPD"],
      IT_Shield: state.itemStats["SHI"],
      IT_Shoe: state.itemStats["SHOE"],
      IT_SV: state.itemStats["SV"],
      IT_TC: state.itemStats["TC"],
      ItemSet: 1,

      N_Chem: state.gameStats["Chemtech"],
      Kills: state.gameStats["Kills"],
      Language: 0,
      Legendary: state.nbLegendary,
      Minion: state.gameStats["Minion"],
      MOD_Heal:
        1 +
        state.itemStats["HEAL"] +
        ((state.mainThirdRune == "Revitalize" || state.secondSecondRune == "Revitalize") ? 0.05 + (100 <= 40 ? 0.1 : 0) : 0)  +
        state.gameStats["Chemtech"] * 0.06, // Revitalize CHPP (100)
      MOD_Hit: 1,
      MOD_Magic: 1,
      MOD_OH: 1,
      MOD_Phys: 1,
      MOD_SelfHeal: 1,
      MOD_True: 1,
      N_Cloud: state.gameStats["Cloud"],
      N_Hex: state.gameStats["Hextech"],
      N_Infernal: state.gameStats["Infernal"],
      N_Mountain: state.gameStats["Mountain"],
      N_Ocean: state.gameStats["Ocean"],
      Name: nameChamp,

      Self_BoAD: state.additionnalStats["Attack Damage"],

      OH_Phys: state.itemStats["POH"] * 1,
      OH_Magic:
        (state.itemStats["MOH"] +
          (state.bonusStats["Ardent"]
            ? 15 + (15 * (state.level - 1)) / 17
            : 0)) *
        1,
      OH_True:
        (nameChamp.toLowerCase().includes("master") &&
        state.eSkillPoint > 0 &&
        state.steroidStats["E"]
          ? 25 +
            5 * state.eSkillPoint +
            0.3 * state.additionnalStats["Attack Damage"]
          : 0) +
        (nameChamp.toLowerCase().includes("belveth") && state.rSkillPoint > 0
          ? ((3 +
              1.5 +
              state.rSkillPoint +
              0.09 * state.additionnalStats["Attack Damage"]) *
              state.stackDarkHarvest) /
            2
          : 0),

      P_E: state.eSkillPoint,
      P_Q: state.qSkillPoint,
      P_R: state.rSkillPoint,
      P_W: state.wSkillPoint,

      P_DMG : data["P-DMG"],

      ForceBit: state.runeStats["ForceBit"],
      R_Adap: state.runeStats["Adaptive"],
      R_AH: state.runeStats["AH"],
      R_AR: state.runeStats["AR"],
      R_AS: state.runeStats["AS"],
      R_HP: state.runeStats["HP"],
      R_MOD: 1,
      R_MP: state.runeStats["MP"],
      R_MR: state.runeStats["MR"],
      R_MS: state.runeStats["MS"],
      R_PTAMOD: 1,
      R_Ultimate: state.runeStats["Ultimate"],

      Self_AD: state.totalStats["AD"],
      Self_AH: state.totalStats["AH"],
      Self_AP: state.totalStats["AP"],
      Self_APenF: state.totalStats["APenF"],
      Self_AR: state.totalStats["AR"],
      Self_AS: state.totalStats["AS"],
      Self_AvgAA: state.totalStats["AvgAA"],
      Self_BaAD: state.basicStatsChampion["Attack Damage"],
      Self_BaMS: state.basicStatsChampion["Move Speed"],

      Self_BoAR: state.additionnalStats["Armor"],
      Self_BoAS: state.additionnalStats["Attack Speed %"],
      Self_BoHP: state.additionnalStats["Hp"],
      Self_BoMP: state.additionnalStats["Mana"],
      Self_BoMR: state.additionnalStats["Magic Resist"],
      Self_BoMS:
        state.additionnalStats["Move Speed"] -
        state.basicStatsChampion["Move Speed"],
      Self_BoMSP: state.additionnalStats["Move Speed"],
      Self_CHPP: 100,
      Self_Crit: state.totalStats["Crit"],
      Self_CritDMG: state.totalStats["CritDMG"],
      Self_CritHit: state.totalStats["CritHit"],
      Self_DPS: state.totalStats["DPS"],
      Self_Gold: state.totalStats["Gold"],
      Self_HitDmg: state.totalStats["HitDmg"],
      Self_HPR: state.totalStats["HPR"],
      Self_Leth: state.totalStats["Leth"],
      Self_Level: state.level,
      Self_LS: state.totalStats["LS"],
      Self_MaxCS: 0,
      Self_MaxGold: 500,
      Self_MHP: state.totalStats["HP"],
      Self_MisHPV: state.totalStats["MisHPV"],
      Self_MP: state.totalStats["MP"],
      Self_MpenF: state.totalStats["MpenF"],
      Self_MPR: state.totalStats["MPR"],
      Self_MR: state.totalStats["MR"],
      Self_MS: state.totalStats["MS"],
      Self_Proc_Item: state.totalStats["Proc Item"],
      Self_Proc_Rune: state.totalStats["Proc Rune"],
      Self_Proc_Summ: state.totalStats["Proc Summ"],
      Self_Shield: state.totalStats["Shield"],
      Self_TC: state.totalStats["TC"],

      Steroid_E: state.steroidStats["E"],
      Steroid_Form: state.steroidStats["Form"],
      Steroid_Items: state.steroidStats["Items"],
      Steroid_P: state.steroidStats["P"],
      Steroid_Q: state.steroidStats["Q"],
      Steroid_R: state.steroidStats["R"],
      Steroid_Runes: state.steroidStats["Runes"],
      Steroid_W: state.steroidStats["W"],
    };
    console.log(scope["OH_Magic"])
    console.log(scope["OH_Phys"])
    console.log(scope["OH_True"])
    if (typeof str === "string") {
      console.log(str)
      return evaluate(str, scope);
    }
    
    return str;
  }

  return (
    <>
      <div
        className="character-details"
        style={{ backgroundImage: `url(${state.imgSplash})` }}
      >
        <div className="character-banniere">
          <Link href={`/#${champion}`}>
            <img src="../../images/logo.PNG" alt="logo S.GG" />
          </Link>
          <p
            style={{
              width: "1px",
              height: "100px",
              backgroundColor: "#f9f8f8",
              borderRadius: "20px",
            }}
          ></p>
          {data != undefined && <h1>{nameChamp.toUpperCase()}</h1>}
          <p
            style={{
              width: "1px",
              height: "100px",
              backgroundColor: "#f9f8f8",
              borderRadius: "20px",
            }}
          ></p>
          <div>
            <p>Level</p>
            <select
              value={state.level}
              onChange={(e) =>
                handleChange("SET_LEVEL", parseInt(e.target.value))
              }
            >
              {options}
            </select>
          </div>
        </div>
        <div className="character-statistiques">
          {data != undefined && (
            <>
              <StatsTable></StatsTable>
              <SkillsTable></SkillsTable>
              <RunesTables />
              <ItemsStats></ItemsStats>
              <BonusStats></BonusStats>
              <EnemyStats></EnemyStats>
              <ItemsEnemyStats></ItemsEnemyStats>
              <GameStats></GameStats>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Layout;
