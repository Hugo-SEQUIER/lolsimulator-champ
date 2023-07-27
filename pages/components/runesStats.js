import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/context";

export default function RunesTables() {
  const { state, dispatch } = useContext(DataContext);

  const listMainRune = [
    "-",
    "Precision",
    "Domination",
    "Sorcery",
    "Resolve",
    "Inspiration",
  ];

  const precisionMainRunes = [
    "-",
    "Press The Attack",
    "Lethal Tempo",
    "Fleet Foot",
    "Conqueror",
  ];
  const precisionFirstRune = ["-", "Overheal", "Triumph", "Presence of Mind"];
  const precisionSecondRune = ["-", "Alacrity", "Tenacity", "Bloodline"];
  const precisionThirdRune = ["-", "Coup de Grace", "Cut Down", "Last Stand"];

  const dominationMainRunes = [
    "-",
    "Electrocute",
    "Predator",
    "Dark Harvest",
    "Hail of Blades",
  ];
  const dominationFirstRune = [
    "-",
    "Cheap Shot",
    "Taste of Blood",
    "Sudden Impact",
  ];
  const dominationSecondRune = [
    "-",
    "Zombie Ward",
    "Ghost Poro",
    "Eyeball Collection",
  ];
  const dominationThirdRune = [
    "-",
    "Treasure Hunter",
    "Ingenious Hunter",
    "Relentless Hunter",
    "Ultimate Hunter",
  ];

  const sorceryMainRunes = ["-", "Summon Aery", "Arcane Comet", "Phase Rush"];
  const sorceryFirstRune = [
    "-",
    "Nullifying Orb",
    "Manaflow Band",
    "Nimbus Cloak",
  ];
  const sorcerySecondRune = [
    "-",
    "Transcendence",
    "Celerity",
    "Absolute Focus",
  ];
  const sorceryThirdRune = ["-", "Scorch", "Waterwalking", "Gathering Storm"];

  const resolveMainRune = [
    "-",
    "Grasp of the Undying",
    "Aftershock",
    "Guardian",
  ];
  const resolveFirstRune = ["-", "Demolish", "Font of Life", "Shield Bash"];
  const resolveSecondRune = [
    "-",
    "Conditioning",
    "Second Wind",
    "Bone Plating",
  ];
  const resolveThirdRune = ["-", "Overgrowth", "Revitalize", "Unflinching"];

  const inspirationMainRunes = [
    "-",
    "Unsealed Spellbook",
    "Glacial Augment",
    "First Strike",
  ];
  const inspirationFirstRune = [
    "-",
    "Hextech Flashtrap",
    "Magical Footwear",
    "Perfect Timing",
  ];
  const inspirationSecondRune = [
    "-",
    "Futures Market",
    "Minion Dematerializer",
    "Biscuit Delivery",
  ];
  const inspirationThirdRune = [
    "-",
    "Cosmic Insight",
    "Approach Velocity",
    "Time Warp Tonic",
  ];

  const listOffensiveShard = [
    "-",
    "Adaptive Force",
    "Attack Speed",
    "Ability Haste",
  ];
  const listMixedShard = ["-", "Adaptive Force", "Armor", "MagicResist"];
  const listDefensiveShard = ["-", "Health", "Armor", "MagicResist"];

  const listLegend = [
    "Alacrity",
    "Tenacity",
    "Zombie Ward",
    "Ghost Poro",
    "Eyeball Collection",
  ];
  const listBounty = [
    "Treasure Hunter",
    "Ingenious Hunter",
    "Relentless Hunter",
    "Ultimate Hunter",
  ];

  const setUpMainRunes = (nameRune) => {
    let optionRune = [];
    if (nameRune == "Precision") {
      for (let i = 0; i < precisionMainRunes.length; i++) {
        optionRune.push(
          <option value={precisionMainRunes[i]} key={i * 65}>
            {precisionMainRunes[i]}
          </option>
        );
      }
    }
    if (nameRune == "Domination") {
      for (let i = 0; i < dominationMainRunes.length; i++) {
        optionRune.push(
          <option value={dominationMainRunes[i]} key={i * 77}>
            {dominationMainRunes[i]}
          </option>
        );
      }
    }
    if (nameRune == "Sorcery") {
      for (let i = 0; i < sorceryMainRunes.length; i++) {
        optionRune.push(
          <option value={sorceryMainRunes[i]} key={i * 88}>
            {sorceryMainRunes[i]}
          </option>
        );
      }
    }
    if (nameRune == "Resolve") {
      for (let i = 0; i < resolveMainRune.length; i++) {
        optionRune.push(
          <option value={resolveMainRune[i]} key={i * 99}>
            {resolveMainRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Inspiration") {
      for (let i = 0; i < inspirationMainRunes.length; i++) {
        optionRune.push(
          <option value={inspirationMainRunes[i]} key={i * 80}>
            {inspirationMainRunes[i]}
          </option>
        );
      }
    }
    return optionRune;
  };

  const setUpFirstRunes = (nameRune) => {
    let optionRune = [];
    if (nameRune == "Precision") {
      for (let i = 0; i < precisionFirstRune.length; i++) {
        optionRune.push(
          <option value={precisionFirstRune[i]} key={i}>
            {precisionFirstRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Domination") {
      for (let i = 0; i < dominationFirstRune.length; i++) {
        optionRune.push(
          <option value={dominationFirstRune[i]} key={i}>
            {dominationFirstRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Sorcery") {
      for (let i = 0; i < sorceryFirstRune.length; i++) {
        optionRune.push(
          <option value={sorceryFirstRune[i]} key={i}>
            {sorceryFirstRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Resolve") {
      for (let i = 0; i < resolveFirstRune.length; i++) {
        optionRune.push(
          <option value={resolveFirstRune[i]} key={i}>
            {resolveFirstRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Inspiration") {
      for (let i = 0; i < inspirationFirstRune.length; i++) {
        optionRune.push(
          <option value={inspirationFirstRune[i]} key={i}>
            {inspirationFirstRune[i]}
          </option>
        );
      }
    }
    return optionRune;
  };

  const setUpSecondRunes = (nameRune) => {
    let optionRune = [];
    if (nameRune == "Precision") {
      for (let i = 0; i < precisionSecondRune.length; i++) {
        optionRune.push(
          <option value={precisionSecondRune[i]} key={i}>
            {precisionSecondRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Domination") {
      for (let i = 0; i < dominationSecondRune.length; i++) {
        optionRune.push(
          <option value={dominationSecondRune[i]} key={i}>
            {dominationSecondRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Sorcery") {
      for (let i = 0; i < sorcerySecondRune.length; i++) {
        optionRune.push(
          <option value={sorcerySecondRune[i]} key={i}>
            {sorcerySecondRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Resolve") {
      for (let i = 0; i < resolveSecondRune.length; i++) {
        optionRune.push(
          <option value={resolveSecondRune[i]} key={i}>
            {resolveSecondRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Inspiration") {
      for (let i = 0; i < inspirationSecondRune.length; i++) {
        optionRune.push(
          <option value={inspirationSecondRune[i]} key={i}>
            {inspirationSecondRune[i]}
          </option>
        );
      }
    }
    return optionRune;
  };

  const setUpThirdRunes = (nameRune) => {
    let optionRune = [];
    if (nameRune == "Precision") {
      for (let i = 0; i < precisionThirdRune.length; i++) {
        optionRune.push(
          <option value={precisionThirdRune[i]} key={i}>
            {precisionThirdRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Domination") {
      for (let i = 0; i < dominationThirdRune.length; i++) {
        optionRune.push(
          <option value={dominationThirdRune[i]} key={i}>
            {dominationThirdRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Sorcery") {
      for (let i = 0; i < sorceryThirdRune.length; i++) {
        optionRune.push(
          <option value={sorceryThirdRune[i]} key={i}>
            {sorceryThirdRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Resolve") {
      for (let i = 0; i < resolveThirdRune.length; i++) {
        optionRune.push(
          <option value={resolveThirdRune[i]} key={i}>
            {resolveThirdRune[i]}
          </option>
        );
      }
    }
    if (nameRune == "Inspiration") {
      for (let i = 0; i < inspirationThirdRune.length; i++) {
        optionRune.push(
          <option value={inspirationThirdRune[i]} key={i}>
            {inspirationThirdRune[i]}
          </option>
        );
      }
    }
    return optionRune;
  };

  const handleRunes = (typeRune, value) => {
    dispatch({ type: typeRune, payload: value });
  };

  return (
    <div className="stats-table">
      <div>
        <h1>Runes</h1>
      </div>
      <div className="stats-table-row">
        <table>
          <thead>
            <tr>
              <td colSpan="2">Main Tree</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Main Rune</td>
              <td>
                <select
                  value={state.nameMainRune}
                  onChange={(e) => {
                    handleRunes("SET_NAMEMAINRUNE", e.target.value);
                  }}
                >
                  {listMainRune.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            {state.nameMainRune != "" && state.nameMainRune != "-" && (
              <>
                <tr>
                  <td>Keystone</td>
                  <td>
                    <select
                      value={state.mainRune}
                      onChange={(e) => {
                        handleRunes("SET_MAINRUNE", e.target.value);
                      }}
                    >
                      {setUpMainRunes(state.nameMainRune).map((value) => {
                        return value;
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>First Rune</td>
                  <td>
                    <select
                      value={state.mainFirstRune}
                      onChange={(e) => {
                        handleRunes("SET_MAINFIRSTRUNE", e.target.value);
                      }}
                    >
                      {setUpFirstRunes(state.nameMainRune).map((value) => {
                        return value;
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Second Rune</td>
                  <td>
                    <select
                      value={state.mainSecondRune}
                      onChange={(e) => {
                        handleRunes("SET_MAINSECONDRUNE", e.target.value);
                      }}
                    >
                      {setUpSecondRunes(state.nameMainRune).map((value) => {
                        return value;
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Third Rune</td>
                  <td>
                    <select
                      value={state.mainThirdRune}
                      onChange={(e) => {
                        handleRunes("SET_MAINTHIRDRUNE", e.target.value);
                      }}
                    >
                      {setUpThirdRunes(state.nameMainRune).map((value) => {
                        return value;
                      })}
                    </select>
                  </td>
                </tr>
              </>
            )}
          </tbody>
          <thead>
            <tr>
              <td colSpan="2">Secondary Tree</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Second Rune</td>
              <td>
                <select
                  value={state.secondRune}
                  onChange={(e) => {
                    handleRunes("SET_SECONDRUNE", e.target.value);
                  }}
                >
                  {listMainRune.map((value, index) => {
                    if (value == "-")
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                    if (value != state.nameMainRune)
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                  })}
                </select>
              </td>
            </tr>
            {state.secondRune != "" && state.secondRune != "-" && (
              <>
                <tr>
                  <td>First Rune</td>
                  <td>
                    <select
                      value={state.secondFirstRune}
                      onChange={(e) => {
                        handleRunes("SET_SECONDFIRSTRUNE", e.target.value);
                      }}
                    >
                      {setUpFirstRunes(state.secondRune).map((value) => {
                        return value;
                      })}
                      {setUpSecondRunes(state.secondRune).map((value) => {
                        return value;
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Second Rune</td>
                  <td>
                    <select
                      value={state.secondSecondRune}
                      onChange={(e) => {
                        handleRunes("SET_SECONDSECONDRUNE", e.target.value);
                      }}
                    >
                      {setUpSecondRunes(state.secondRune).map((value) => {
                        return value;
                      })}
                      {setUpThirdRunes(state.secondRune).map((value) => {
                        return value;
                      })}
                    </select>
                  </td>
                </tr>
              </>
            )}
          </tbody>
          <thead>
            <tr>
              <td colSpan="2">Shards</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Offensive Shard</td>
              <td>
                <select
                  value={state.offensiveShard}
                  onChange={(e) => {
                    handleRunes("SET_OFFENSIVESHARD", e.target.value);
                  }}
                >
                  {listOffensiveShard.map((value, index) => {
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
              <td>Mixed Shard</td>
              <td>
                <select
                  value={state.mixedShard}
                  onChange={(e) => {
                    handleRunes("SET_MIXEDSHARD", e.target.value);
                  }}
                >
                  {listMixedShard.map((value, index) => {
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
              <td>Defensive Shard</td>
              <td>
                <select
                  value={state.defensiveShard}
                  onChange={(e) => {
                    handleRunes("SET_DEFENSIVESHARD", e.target.value);
                  }}
                >
                  {listDefensiveShard.map((value, index) => {
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
          {(state.nameMainRune == "Precision" ||
            state.nameMainRune == "Domination" ||
            state.secondRune == "Precision" ||
            state.secondRune == "Domination") && (
            <>
              <thead>
                <tr>
                  <td colSpan="2">Stacks</td>
                </tr>
              </thead>
              <tbody>
                {state.mainRune == "Conqueror" && (
                  <tr>
                    <td>Conqueror</td>
                    <td>
                      <input
                        type="number"
                        value={state.stackConqueror}
                        max={12}
                        min={0}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value != "" ? parseInt(value) : 0;
                          handleRunes("SET_STACKCONQUEROR", value);
                        }}
                      />
                    </td>
                  </tr>
                )}
                {state.mainRune == "Dark Harvest" && (
                  <tr>
                    <td>Dark Harvest</td>
                    <td>
                      <input
                        type="number"
                        value={state.stackDarkHarvest}
                        min={0}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value != "" ? parseInt(value) : 0;
                          handleRunes("SET_STACKDARKHARVEST", value);
                        }}
                      />
                    </td>
                  </tr>
                )}
                {(listLegend.includes(state.mainSecondRune) ||
                  listLegend.includes(state.secondFirstRune) ||
                  listLegend.includes(state.secondSecondRune)) && (
                  <tr>
                    <td>Legend</td>
                    <td>
                      <input
                        type="number"
                        value={state.stackLegendExceptBloodline}
                        max={10}
                        min={0}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value != "" ? parseInt(value) : 0;
                          handleRunes("SET_STACKLEGENDEXCEPTBLOODLINE", value);
                        }}
                      />
                    </td>
                  </tr>
                )}
                {(state.mainSecondRune == "Bloodline" ||
                  state.secondFirstRune == "Bloodline" ||
                  state.secondSecondRune == "Bloodline") && (
                  <tr>
                    <td>Legend : Bloodline</td>
                    <td>
                      <input
                        type="number"
                        value={state.stackLegendBloodline}
                        max={15}
                        min={0}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value != "" ? parseInt(value) : 0;
                          handleRunes("SET_STACKLEGENDBLOODLINE", value);
                        }}
                      />
                    </td>
                  </tr>
                )}
                {(listBounty.includes(state.mainThirdRune) ||
                  listBounty.includes(state.secondSecondRune)) && (
                  <tr>
                    <td>Bounty</td>
                    <td>
                      <input
                        type="number"
                        value={state.stackBounty}
                        max={5}
                        min={0}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value != "" ? parseInt(value) : 0;
                          handleRunes("SET_STACKBOUNTY", value);
                        }}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
}
