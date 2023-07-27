import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/context";

export default function SkillsTable({ nameChamp }) {
  const { state, dispatch } = useContext(DataContext);

  const handleLevelSpell = (typeSpell, value) => {
    dispatch({ type: typeSpell, payload: value });
  };

  const handleAphelios = (key, value) => {
    let obj = {
      "Crescend Stacks": state.apheliosStats["Crescend Stacks"],
      "Main Weapon": state.apheliosStats["Main Weapon"],
      "Sub Weapon": state.apheliosStats["Sub Weapon"],
    }
    obj[key] = value
    dispatch({ type: "SET_APHELIOSSTATS", payload: obj });
  };

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

  const apheliosWeapon = [
    "-",
    "Calibrum, the Sniper Rifle",
    "Severum, the Scythe Pistol",
    "Gravitum, the Gravity Cannon",
    "Infernum, the Flamethrower",
    "Crescendum, the Chakram",

  ]

  const [qBonusPoint, setQBonusPoint] = useState(0)
  const [wBonusPoint, setWBonusPoint] = useState(0)
  const [eBonusPoint, setEBonusPoint] = useState(0)
  const [rBonusPoint, setRBonusPoint] = useState(0)

  useEffect(()=> {
    if (nameChamp == "Aphelios" || nameChamp == "Jayce" || nameChamp == "Udyr"){
      setQBonusPoint(1)
      setWBonusPoint(1)
      setEBonusPoint(1)
      setRBonusPoint(-3)
    }
    if (nameChamp == "Udyr"){
      setRBonusPoint(3)
    }
    if (nameChamp == "Yuumi"){
      setQBonusPoint(1)
      setWBonusPoint(-1)
      setEBonusPoint(0)
      setRBonusPoint(0)
    }
  },[])

  let options = [];
  for (let charac of character_name) {
    options.push(
      <option value={charac} key={charac}>
        {charac}
      </option>
    );
  }
 
  useEffect(() => {
    let mainWeapon = state.apheliosStats["Main Weapon"]
    if (mainWeapon != "-"){
      if (mainWeapon == 'Calibrum, the Sniper Rifle'){
        handleLevelSpell("SET_QIMG", "../../images/spell/Aphelios_Cali.jpg")
        handleLevelSpell("SET_EIMG", "../../images/spell/Calibrum.jpg")
      }
      if (mainWeapon == 'Severum, the Scythe Pistol'){
        handleLevelSpell("SET_QIMG", "../../images/spell/Aphelios_Sever.jpg")
        handleLevelSpell("SET_EIMG", "../../images/spell/Severum.jpg")
      }
      if (mainWeapon == 'Gravitum, the Gravity Cannon'){
        handleLevelSpell("SET_QIMG", "../../images/spell/Aphelios_Grav.jpg")
        handleLevelSpell("SET_EIMG", "../../images/spell/Gravitum.jpg")
      }
      if (mainWeapon == 'Infernum, the Flamethrower'){
        handleLevelSpell("SET_QIMG", "../../images/spell/Aphelios_Infer.jpg")
        handleLevelSpell("SET_EIMG", "../../images/spell/Infernum.jpg")
      }
      if (mainWeapon == 'Crescendum, the Chakram'){
        handleLevelSpell("SET_QIMG", "../../images/spell/Aphelios_Cres.jpg")
        handleLevelSpell("SET_EIMG", "../../images/spell/Crescendum.jpg")
      }
    }
  },[state.apheliosStats])
  let optionsAphelios = [];

  for (let weapon of apheliosWeapon) {
    optionsAphelios.push(
      <option value={weapon} key={weapon}>
        {weapon.split(",")[0]}
      </option>
    );
  }

  return (
    <div className="stats-table skills-table">
      <div>
        <h1>Skills</h1>
      </div>
      <div className="stats-table-row skills-table-row">
        <table>
          <tbody>
            <tr>
              <td>/</td>
              <td>Spell</td>
              <td>Points</td>
              <td>Damage</td>
              <td>CD</td>
              <td>Damage / CD</td>
            </tr>
            <tr>
              <td>
                <img alt={"Passive img"} src={state.pImg} />
              </td>
              <td>Passive</td>
              <td>0</td>
              <td>{state.pDMG}</td>
              <td>{state.pCD}</td>
              <td>{Math.floor(state.pDMG / state.pCD)}</td>
            </tr>
            <tr>
              <td>
                <img alt={"Q img"} src={state.qImg} width={64} height={64} />
              </td>
              <td>Q</td>
              <td>
                <input
                  type="number"
                  value={state.qSkillPoint}
                  max={5 + qBonusPoint}
                  min={0}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    handleLevelSpell("SET_QSKILLPOINT", value);
                  }}
                />
              </td>
              <td>{state.qDMG}</td>
              <td>{state.qCD}</td>
              <td>{Math.floor(state.qDMG / state.qCD)}</td>
            </tr>
            <tr>
              <td>
                <img alt={"W img"} src={state.wImg} />
              </td>
              <td>W</td>
              <td>
                <input
                  type="number"
                  value={state.wSkillPoint}
                  max={5 + wBonusPoint}
                  min={0}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    handleLevelSpell("SET_WSKILLPOINT", value);
                  }}
                />
              </td>
              <td>{state.wDMG}</td>
              <td>{state.wCD}</td>
              <td>{Math.floor(state.wDMG / state.wCD)}</td>
            </tr>
            {nameChamp == "Aphelios" && (
              <>
              <tr>
              <td>
                <img alt={"E img"} src={state.eImg} width={64} height={64}/>
              </td>
              <td>Weapon</td>
              <td >
                  <select value={state.apheliosStats["Main Weapon"]} onChange={(e) => handleAphelios("Main Weapon" ,e.target.value)}>
                    {optionsAphelios}
                  </select>
                </td>
              <td>{state.eDMG}</td>
              <td>{state.eCD}</td>
              <td>{Math.floor(state.eDMG / state.eCD)}</td>
            </tr>
              </>
            )}
            {nameChamp != "Aphelios" && (
              <>
                <tr>
                <td>
                  <img alt={"E img"} src={state.eImg} />
                </td>
                <td>E</td>
                <td>
                  <input
                    type="number"
                    value={state.eSkillPoint}
                    max={5 + eBonusPoint}
                    min={0}
                    onChange={(e) => {
                      let value = e.target.value;
                      value = value != "" ? parseInt(value) : 0;
                      handleLevelSpell("SET_ESKILLPOINT", value);
                    }}
                  />
                </td>
                <td>{state.eDMG}</td>
                <td>{state.eCD}</td>
                <td>{Math.floor(state.eDMG / state.eCD)}</td>
              </tr>
              </>
            )}
            
            <tr>
              <td>
                <img alt={"R img"} src={state.rImg} />
              </td>
              <td>R</td>
              <td>
                <input
                  type="number"
                  value={state.rSkillPoint}
                  max={3 + rBonusPoint}
                  min={0}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    handleLevelSpell("SET_RSKILLPOINT", value);
                  }}
                />
              </td>
              <td>{state.rDMG}</td>
              <td>{state.rCD}</td>
              <td>{Math.floor(state.rDMG / state.rCD)}</td>
            </tr>
          </tbody>
          {nameChamp == "Sylas" && (
            <tbody>
              <tr>
                <td>
                  Sylas Ultimate
                </td>
                <td colSpan={5}>
                  <select value={state.sylasUltimate} onChange={(e) => handleLevelSpell("SET_SYLASULTIMATE", e.target.value)}>
                    {options}
                  </select>
                </td>
              </tr>
            </tbody>
          )}
          { /**nameChamp == "Aphelios" && (
            <tbody>
              <tr>
                <td>
                Crescend Stacks
                </td>
                <td colSpan={5}>
                  <input
                    type="number"
                    value={state.apheliosStats["Crescend Stacks"]}
                    max={20}
                    min={0}
                    onChange={(e) => {
                      let value = e.target.value;
                      value = value != "" ? parseInt(value) : 0;
                      handleAphelios("Crescend Stacks" ,value)
                    }}
                  />
                </td>
              </tr>
            </tbody>
                  ) **/}
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let { champion } = params;
  if (champion.includes("Nunu")) {
    champion = "Nunu";
  }
  if (champion.includes("Renata")) {
    champion = "Renata";
  }
  // Fetch the champion data
  const res = await fetch(
    `http://localhost:3000/data/champions/${champion}.json`
  );
  //const res = await fetch(`https://raw.communitydragon.org/13.11/game/data/characters/${champion.toLowerCase()}/${champion.toLowerCase()}.bin.json`);

  const championDetails = await res.json();

  return {
    props: {
      championDetails,
    },
  };
}
