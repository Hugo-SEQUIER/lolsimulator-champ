import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/context";

function StatsTable() {
  const { state, dispatch } = useContext(DataContext);

  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);
  const [stats, setStats] = useState({});
  useEffect(() => {
    if (state != undefined) {
      let obj = {
        Hp: state.totalStats["HP"],
        "Attack Damage": state.totalStats["AD"],
        "Attack Speed %": state.totalStats["AS"],
        Armor: state.totalStats["AR"],
        "Magic Resist": state.totalStats["MR"],
        "Move Speed": Math.floor(state.totalStats["MS"]),
        Lifesteal: state.totalStats["LS"],
        "Critical %": state.totalStats["Crit"],
        "Hp Regen": state.totalStats["HPR"],

        [state.textMana]: state.totalStats["MP"],
        "Ability Power": state.totalStats["AP"],
        Range: Math.floor(
          (state.basicStatsChampion["Range"] +
            state.additionnalStats["Range"]) *
            (state.hasRapidFireCanon ? 1.35 : 1)
        ),
        "Armor Penetration": state.totalStats["APenF"],
        "Resist Penetration": state.totalStats["MpenF"],
        "Ability Haste": state.totalStats["AH"],
        "Spellvamp %": state.additionnalStats["Spellvamp %"],
        "Tenacity %": state.totalStats["TC"],
        [state.textMana + " / Regen"]: state.totalStats["MPR"],
      };
      const keys = Object.keys(obj);
      const half = Math.ceil(keys.length / 2);
      const firstHalf = keys.slice(0, half);
      const secondHalf = keys.slice(half);
      console.log(state.totalStats["AS"])
      setStats(obj);
      setFirstHalf(firstHalf);
      setSecondHalf(secondHalf);
    }
  }, [
    state.totalStats,
    state.additionnalStats,
    state.basicStatsChampion,
    state.textMana,
    state.hasRapidFireCanon,
  ]);
  return (
    <div className="stats-table">
      <div>
        <h1>Statistics</h1>
      </div>
      <div className="stats-table-row">
        <table>
          <tbody>
            {firstHalf.map((key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  {stats[key] % 1 == 0
                    ? stats[key]
                    : Number(stats[key]).toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <tbody>
            {secondHalf.map((key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  {stats[key] % 1 == 0
                    ? stats[key]
                    : Number(stats[key]).toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatsTable;
