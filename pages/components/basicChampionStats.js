import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/context";

function StatsTable() {

    const {totalStats, additionnalStats, hasRapidFireCanon, textMana} = useContext(DataContext);
    const [stats, setStats] = useState({
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

    const [firstHalf, setFirstHalf] = useState([])
    const [secondHalf, setSecondHalf] = useState([])

    useEffect(() => {
        if (totalStats != undefined && additionnalStats != undefined && hasRapidFireCanon != undefined && textMana != undefined){
            let obj = {
                "Hp": totalStats["HP"],
                "Attack Damage": totalStats["AD"],
                "Attack Speed %": totalStats["AS"],
                "Armor": totalStats["AR"],
                "Magic Resist": totalStats["MR"],
                "Move Speed": Math.floor(totalStats["MS"]),
                "Lifesteal": totalStats["LS"],
                "Critical %":  totalStats["Crit"], 
                "Hp Regen": totalStats["HPR"],

                [textMana] : totalStats["MP"],
                "Ability Power": totalStats["AP"],
                "Range": Math.floor((basicStatsChampion["Range"] + additionnalStats["Range"]) * (hasRapidFireCanon ? 1.35 : 1)),
                "Armor Penetration": totalStats["APenF"],
                "Resist Penetration": totalStats["MpenF"],
                "Ability Haste": totalStats["AH"],
                "Spellvamp %": additionnalStats["Spellvamp %"],
                "Tenacity %": totalStats["TC"],
                [textMana + " / Regen"]: totalStats["MPR"],
            }
            setStats(obj)
            
            const keys = Object.keys(obj);
            const half = Math.ceil(keys.length / 2); 
            setFirstHalf(keys.slice(0, half))
            setSecondHalf(keys.slice(half))
        }
    },[totalStats, additionnalStats, hasRapidFireCanon, textMana])

    return (
        <div className="stats-table">
            <div>
                <h1>Statistics</h1>
            </div>
            <div className="stats-table-row">
                <table>
                <tbody>
                    {firstHalf.map(key => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{stats[key] % 1 == 0 ? stats[key] : Number(stats[key]).toFixed(3)}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
                <table>
                <tbody>
                    {secondHalf.map(key => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{stats[key] % 1 == 0 ? stats[key] : Number(stats[key]).toFixed(3)}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StatsTable;