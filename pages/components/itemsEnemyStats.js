import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/context";

export default function ItemsEnemyStats() {
  const { state, dispatch } = useContext(DataContext);

  const handleItems = (typeItems, value) => {
    dispatch({ type: typeItems, payload: value });
  };

  const listItemsMythics = [
    "-",
    "Crown of the Shattered Queen",
    "Divine Sunderer",
    "Duskblade of Draktharr",
    "Echoes of Helia",
    "Eclipse",
    "Evenshroud",
    "Everfrost",
    "Galeforce",
    "Goredrinker",
    "Guinsoo's Rageblade",
    "Heartsteel",
    "Hextech Rocketbelt",
    "Iceborn Gauntlet",
    "Infinity Edge",
    "Jak'Sho The Protean",
    "Liandry's Anguish",
    "Locket of the Iron Solari",
    "Luden's Tempest",
    "Moonstone Renewer",
    "Navori Quickblade",
    "Night Harvester",
    "Radiant Virtue",
    "Riftmaker",
    "Rod Of Ages",
    "Shurelya's Battlesong",
    "Stridebreaker",
    "Trinity Force",
    "Youmuu's Ghostblade",
  ];

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

  const listBoots = [
    "-",
    "Berserker's Greaves",
    "Boots",
    "Boots of Swiftness",
    "Ionian Boots of Lucidity",
    "Mercury's Treads",
    "Mobility Boots",
    "Plated Steelcaps",
    "Sorcerer's Shoes",
  ];

  const listElixir = [
    "-",
    "Elixir of Iron",
    "Elixir of Sorcery",
    "Elixir of Wrath",
  ];

  const listEpicItem = [
    "-",
    "Aegis of the Legion",
    "Aether Wisp",
    "Bami's Cinder",
    "Bandleglass Mirror",
    "Blighting Jewel",
    "Bramble Vest",
    "Catalyst of Aeons",
    "Caulfield's Warhammer",
    "Chain Vest",
    "Chalice of Blessing",
    "Crystalline Bracer",
    "Executioner's Calling",
    "Fiendish Codex",
    "Forbidden Idol",
    "Frostfang",
    "Giant's Belt",
    "Glacial Buckler",
    "Harrowing Crescent",
    "Hearthbound Axe",
    "Hexdrinker",
    "Hextech Alternator",
    "Ironspike Whip",
    "Kindlegem",
    "Kircheis Shard",
    "Last Whisper",
    "Leeching Leer",
    "Lifewell Pendant",
    "Lost Chapter",
    "Negatron Cloak",
    "Noonquiver",
    "Oblivion Orb",
    "Phage",
    "Quicksilver Sash",
    "Rageknife",
    "Recurve Bow",
    "Runesteel Spaulders",
    "Seeker's Armguard",
    "Serrated Dirk",
    "Spectre's Cowl",
    "Targon's Buckler",
    "Tiamat",
    "Vampiric Scepter",
    "Verdant Barrier",
    "Warden's Mail",
    "Watchful Wardstone",
    "Winged Moonplate",
    "Zeal",
  ];

  const listBasicItem = [
    "-",
    "Amplifying Tome",
    "B. F. Sword",
    "Blasting Wand",
    "Cloak of Agility",
    "Cloth Armor",
    "Dagger",
    "Faerie Charm",
    "Long Sword",
    "Needlessly Large Rod",
    "Null-Magic Mantle",
    "Pickaxe",
    "Rejuvenation Bead",
    "Ruby Crystal",
    "Sapphire Crystal",
    "Sheen",
  ];

  const listStarterItem = [
    "-",
    "Cull",
    "Dark Seal",
    "Doran's Blade",
    "Doran's Ring",
    "Doran's Shield",
    "Relic Shield",
    "Spectral Sickle",
    "Spellthief's Edge",
    "Steel Shoulderguards",
    "Tear of the Goddess",
  ];

  return (
    <div className="stats-table">
      <div>
        <h1>Enemy Items</h1>
      </div>
      <div className="stats-table-row">
        <table>
          <tbody>
            <tr>
              <td>
                {state.enemyItemSlot1 != "-" && (
                  <img
                    src={`../../images/item/${state.itemEnemyImg1}`}
                    alt="Item Mythic"
                  />
                )}
                {state.enemyItemSlot1 == "-" && "Mythic"}
              </td>
              <td>
                <select
                  value={state.enemyItemSlot1}
                  onChange={(e) => {
                    handleItems("SET_ENEMY_ITEM_SLOT1", e.target.value);
                  }}
                >
                  {listItemsMythics.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                {state.enemyItemSlot2 != "-" && (
                  <img
                    src={`../../images/item/${state.itemEnemyImg2}`}
                    alt="Item 2"
                  />
                )}
                {state.enemyItemSlot2 == "-" && "Item 2"}
              </td>
              <td>
                <select
                  value={state.enemyItemSlot2}
                  onChange={(e) => {
                    handleItems("SET_ENEMY_ITEM_SLOT2", e.target.value);
                  }}
                >
                  {listStarterItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listBoots.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}

                  {listBasicItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listEpicItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listItemsLegendary.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                {state.enemyItemSlot3 != "-" && (
                  <img
                    src={`../../images/item/${state.itemEnemyImg3}`}
                    alt="Item 3"
                  />
                )}
                {state.enemyItemSlot3 == "-" && "Item 3"}
              </td>
              <td>
                <select
                  value={state.enemyItemSlot3}
                  onChange={(e) => {
                    handleItems("SET_ENEMY_ITEM_SLOT3", e.target.value);
                  }}
                >
                  {listStarterItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listBoots.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listBasicItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listEpicItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listItemsLegendary.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                {state.enemyItemSlot4 != "-" && (
                  <img
                    src={`../../images/item/${state.itemEnemyImg4}`}
                    alt="Item 4"
                  />
                )}
                {state.enemyItemSlot4 == "-" && "Item 4"}
              </td>
              <td>
                <select
                  value={state.enemyItemSlot4}
                  onChange={(e) => {
                    handleItems("SET_ENEMY_ITEM_SLOT4", e.target.value);
                  }}
                >
                  {listStarterItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listBoots.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listBasicItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listEpicItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listItemsLegendary.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                {state.enemyItemSlot5 != "-" && (
                  <img
                    src={`../../images/item/${state.itemEnemyImg5}`}
                    alt="Item 5"
                  />
                )}
                {state.enemyItemSlot5 == "-" && "Item 5"}
              </td>
              <td>
                <select
                  value={state.enemyItemSlot5}
                  onChange={(e) => {
                    handleItems("SET_ENEMY_ITEM_SLOT5", e.target.value);
                  }}
                >
                  {listStarterItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listBoots.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listBasicItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listEpicItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listItemsLegendary.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                {state.enemyItemSlot6 != "-" && (
                  <img
                    src={`../../images/item/${state.itemEnemyImg6}`}
                    alt="Item 6"
                  />
                )}
                {state.enemyItemSlot6 == "-" && "Item 6"}
              </td>
              <td>
                <select
                  value={state.enemyItemSlot6}
                  onChange={(e) => {
                    handleItems("SET_ENEMY_ITEM_SLOT6", e.target.value);
                  }}
                >
                  {listStarterItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listBoots.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listBasicItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listEpicItem.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                  {listItemsLegendary.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                {state.enemyElixirSlot != "-" && (
                  <img
                    src={`../../images/item/${state.itemEnemyImg7}`}
                    alt="Elixir"
                  />
                )}
                {state.enemyElixirSlot == "-" && "Elixir"}
              </td>
              <td>
                <select
                  value={state.enemyElixirSlot}
                  onChange={(e) => {
                    handleItems("SET_ENEMY_ELIXIRSLOT", e.target.value);
                  }}
                >
                  {listElixir.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
