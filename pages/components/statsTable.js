import React from "react";

function StatsTable({ stats, additionnalStats }) {
  const keys = Object.keys(stats);
  const half = Math.ceil(keys.length / 2);
  const firstHalf = keys.slice(0, half);
  const secondHalf = keys.slice(half);
  console.log("StatsTable")
  console.log(stats)
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
