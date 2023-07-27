import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/context";

export default function EnemyStats() {
  const context = useContext(DataContext);

  if (!context) {
    // Afficher un spinner de chargement ou autre élément de transition ici
    return <div>Loading...</div>;
  }

  const { state, dispatch } = context;

  const handleStats = (typeStats, value) => {
    dispatch({ type: typeStats, payload: value });
  };

  let options = [];
  for (let i = 1; i <= 18; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  const character_name = [
    "-",
    "Aatrox",
    "Ahri",
    "Akali",
    "Akshan",
    "Alistar",
    "Amumu",
    "Anivia",
    "Annie",
    "Aphelios",
    "Ashe",
    "AurelionSol",
    "Azir",
    "Bard",
    "BelVeth",
    "Blitzcrank",
    "Brand",
    "Braum",
    "Caitlyn",
    "Camille",
    "Cassiopeia",
    "ChoGath",
    "Corki",
    "Darius",
    "Diana",
    "DrMundo",
    "Draven",
    "Ekko",
    "Elise",
    "Evelynn",
    "Ezreal",
    "Fiddlesticks",
    "Fiora",
    "Fizz",
    "Galio",
    "Gangplank",
    "Garen",
    "Gnar",
    "Gragas",
    "Graves",
    "Gwen",
    "Hecarim",
    "Heimerdinger",
    "Illaoi",
    "Irelia",
    "Ivern",
    "Janna",
    "JarvanIV",
    "Jax",
    "Jayce",
    "Jhin",
    "Jinx",
    "KSante",
    "KaiSa",
    "Kalista",
    "Karma",
    "Karthus",
    "Kassadin",
    "Katarina",
    "Kayle",
    "Kayn",
    "Kennen",
    "KhaZix",
    "Kindred",
    "Kled",
    "KogMaw",
    "LeBlanc",
    "LeeSin",
    "Leona",
    "Lillia",
    "Lissandra",
    "Lucian",
    "Lulu",
    "Lux",
    "MasterYi",
    "Malphite",
    "Malzahar",
    "Maokai",
    "Milio",
    "MissFortune",
    "Mordekaiser",
    "Morgana",
    "Naafiri",
    "Nami",
    "Nasus",
    "Nautilus",
    "Neeko",
    "Nidalee",
    "Nilah",
    "Nocturne",
    "Nunu & Willump",
    "Olaf",
    "Orianna",
    "Ornn",
    "Pantheon",
    "Poppy",
    "Pyke",
    "Qiyana",
    "Quinn",
    "Rakan",
    "Rammus",
    "RekSai",
    "Rell",
    "Renata",
    "Renekton",
    "Rengar",
    "Riven",
    "Rumble",
    "Ryze",
    "Samira",
    "Sejuani",
    "Senna",
    "Seraphine",
    "Sett",
    "Shaco",
    "Shen",
    "Shyvana",
    "Singed",
    "Sion",
    "Sivir",
    "Skarner",
    "Sona",
    "Soraka",
    "Swain",
    "Sylas",
    "Syndra",
    "TahmKench",
    "Taliyah",
    "Talon",
    "Taric",
    "Teemo",
    "Thresh",
    "Tristana",
    "Trundle",
    "Tryndamere",
    "TwistedFate",
    "Twitch",
    "Udyr",
    "Urgot",
    "Varus",
    "Vayne",
    "Veigar",
    "VelKoz",
    "Vex",
    "Vi",
    "Viego",
    "Viktor",
    "Vladimir",
    "Volibear",
    "Warwick",
    "Wukong",
    "Xayah",
    "Xerath",
    "XinZhao",
    "Yasuo",
    "Yone",
    "Yorick",
    "Yuumi",
    "Zac",
    "Zed",
    "Zeri",
    "Ziggs",
    "Zilean",
    "Zoe",
    "Zyra",
  ];

  let enemyNameOptions = [];
  for (let i = 0; i < character_name.length; i++) {
    let name = character_name[i];
    enemyNameOptions.push(
      <option value={name} key={i}>
        {name}
      </option>
    );
  }

  return (
    <div className="stats-table">
      <div>
        <h1>Enemy Statistics</h1>
      </div>
      <div className="stats-table-row">
        <table>
          <tbody>
            <tr>
              <td>Champion</td>
              <td>
                <select
                  value={state.enemyName}
                  onChange={(e) => {
                    handleStats("SET_ENEMY_NAME", e.target.value);
                  }}
                >
                  {enemyNameOptions}
                </select>
              </td>
            </tr>
            <tr>
              <td>Level</td>
              <td>
                <select
                  value={state.enemyLevel}
                  onChange={(e) => {
                    handleStats("SET_ENEMY_LEVEL", parseInt(e.target.value));
                  }}
                >
                  {options}
                </select>
              </td>
            </tr>
            <tr>
              <td>Hp</td>
              <td>{state.enemyStats["Hp"] + state.enemyStats["Hp Bonus"]}</td>
            </tr>
            <tr>
              <td>Armor</td>
              <td>
                {state.enemyStats["Armor"] + state.enemyStats["Armor Bonus"]}
              </td>
            </tr>
            <tr>
              <td>Magic Resist</td>
              <td>
                {state.enemyStats["Magic Resist"] +
                  state.enemyStats["Magic Resist Bonus"]}
              </td>
            </tr>
            <tr>
              <td>Current Hp</td>
              <td>{state.enemyStats["Current Hp"]}</td>
            </tr>
            <tr>
              <td>Current Hp %</td>
              <td>{state.enemyStats["Current Hp %"].toFixed(3)}</td>
            </tr>
            <tr>
              <td>Hp Bonus</td>
              <td>
                <input
                  type="number"
                  value={state.enemyStats["Hp Bonus"]}
                  min={0}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Armor: state.enemyStats["Armor"],
                      "Armor Bonus": state.enemyStats["Armor Bonus"],
                      "Hp Bonus": value,
                      "Current Hp %":
                        ((state.enemyStats["Hp"] +
                          value -
                          state.enemyStats["Missing HP"]) /
                          (state.enemyStats["Hp"] + value)) *
                        100,
                      "Current Hp":
                        state.enemyStats["Hp"] +
                        value -
                        state.enemyStats["Missing HP"],
                      Level: state.enemyStats["Level"],
                      Hp: state.enemyStats["Hp"],
                      "Missing HP": state.enemyStats["Missing HP"],
                      "Magic Resist": state.enemyStats["Magic Resist"],
                      "Magic Resist Bonus":
                        state.enemyStats["Magic Resist Bonus"],
                      Name: state.enemyStats["Name"],
                    };
                    handleStats("SET_ENEMY_STATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Armor Bonus</td>
              <td>
                <input
                  type="number"
                  min={0}
                  value={state.enemyStats["Armor Bonus"]}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Armor: state.enemyStats["Armor"],
                      "Armor Bonus": value,
                      "Hp Bonus": state.enemyStats["Hp Bonus"],
                      "Current Hp %": state.enemyStats["Current Hp %"],
                      "Current Hp": state.enemyStats["Current Hp"],
                      Level: state.enemyStats["Level"],
                      Hp: state.enemyStats["Hp"],
                      "Missing HP": state.enemyStats["Missing HP"],
                      "Magic Resist": state.enemyStats["Magic Resist"],
                      "Magic Resist Bonus":
                        state.enemyStats["Magic Resist Bonus"],
                      Name: state.enemyStats["Name"],
                    };
                    handleStats("SET_ENEMY_STATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Magic Resist Bonus</td>
              <td>
                <input
                  type="number"
                  min={0}
                  value={state.enemyStats["Magic Resist Bonus"]}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Armor: state.enemyStats["Armor"],
                      "Armor Bonus": state.enemyStats["Armor Bonus"],
                      "Hp Bonus": state.enemyStats["Hp Bonus"],
                      "Current Hp %": state.enemyStats["Current Hp %"],
                      "Current Hp": state.enemyStats["Current Hp"],
                      Level: state.enemyStats["Level"],
                      Hp: state.enemyStats["Hp"],
                      "Missing HP": state.enemyStats["Missing HP"],
                      "Magic Resist": state.enemyStats["Magic Resist"],
                      "Magic Resist Bonus": value,
                      Name: state.enemyStats["Name"],
                    };
                    handleStats("SET_ENEMY_STATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Missing Hp</td>
              <td>
                <input
                  type="number"
                  min={0}
                  value={state.enemyStats["Missing HP"]}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Armor: state.enemyStats["Armor"],
                      "Armor Bonus": state.enemyStats["Armor Bonus"],
                      "Hp Bonus": state.enemyStats["Hp Bonus"],
                      "Current Hp %":
                        ((state.enemyStats["Hp"] +
                          state.enemyStats["Hp Bonus"] -
                          value) /
                          (state.enemyStats["Hp"] +
                            state.enemyStats["Hp Bonus"])) *
                        100,
                      "Current Hp":
                        state.enemyStats["Hp"] +
                        state.enemyStats["Hp Bonus"] -
                        value,
                      Level: state.enemyStats["Level"],
                      Hp: state.enemyStats["Hp"],
                      "Missing HP": value,
                      "Magic Resist": state.enemyStats["Magic Resist"],
                      "Magic Resist Bonus":
                        state.enemyStats["Magic Resist Bonus"],
                      Name: state.enemyStats["Name"],
                    };
                    handleStats("SET_ENEMY_STATS", obj);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
