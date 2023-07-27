import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/context";

export default function GameStats() {
  const context = useContext(DataContext);

  if (!context) {
    // Afficher un spinner de chargement ou autre élément de transition ici
    return <div>Loading...</div>;
  }

  const { state, dispatch } = context;

  const handleGame = (typeGame, value) => {
    dispatch({ type: typeGame, payload: value });
  };

  return (
    <div className="stats-table">
      <div>
        <h1>Game Stats</h1>
      </div>
      <div className="stats-table-row">
        <table>
          <tbody>
            <tr>
              <td>Gametime</td>
              <td>
                <input
                  type="number"
                  value={state.gameStats["Gametime"]}
                  min={0}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Gametime: value,
                      Chemtech: state.gameStats["Chemtech"],
                      Kills: state.gameStats["Kills"],
                      Minion: state.gameStats["Minion"],
                      Cloud: state.gameStats["Cloud"],
                      Hextech: state.gameStats["Hextech"],
                      Infernal: state.gameStats["Infernal"],
                      Mountain: state.gameStats["Mountain"],
                      Ocean: state.gameStats["Ocean"],
                    };
                    handleGame("SET_GAMESTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Kills</td>
              <td>
                <input
                  type="number"
                  value={state.gameStats["Kills"]}
                  min={0}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Gametime: state.gameStats["Gametime"],
                      Chemtech: state.gameStats["Chemtech"],
                      Kills: value,
                      Minion: state.gameStats["Minion"],
                      Cloud: state.gameStats["Cloud"],
                      Hextech: state.gameStats["Hextech"],
                      Infernal: state.gameStats["Infernal"],
                      Mountain: state.gameStats["Mountain"],
                      Ocean: state.gameStats["Ocean"],
                    };
                    handleGame("SET_GAMESTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Minion</td>
              <td>
                <input
                  type="number"
                  value={state.gameStats["Minion"]}
                  min={0}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Gametime: state.gameStats["Gametime"],
                      Chemtech: state.gameStats["Chemtech"],
                      Kills: state.gameStats["Kills"],
                      Minion: value,
                      Cloud: state.gameStats["Cloud"],
                      Hextech: state.gameStats["Hextech"],
                      Infernal: state.gameStats["Infernal"],
                      Mountain: state.gameStats["Mountain"],
                      Ocean: state.gameStats["Ocean"],
                    };
                    handleGame("SET_GAMESTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Chemtech</td>
              <td>
                <input
                  type="number"
                  value={state.gameStats["Chemtech"]}
                  min={0}
                  max={4}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Gametime: state.gameStats["Gametime"],
                      Chemtech: value,
                      Kills: state.gameStats["Kills"],
                      Minion: state.gameStats["Minion"],
                      Cloud: state.gameStats["Cloud"],
                      Hextech: state.gameStats["Hextech"],
                      Infernal: state.gameStats["Infernal"],
                      Mountain: state.gameStats["Mountain"],
                      Ocean: state.gameStats["Ocean"],
                    };
                    handleGame("SET_GAMESTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Cloud</td>
              <td>
                <input
                  type="number"
                  value={state.gameStats["Cloud"]}
                  min={0}
                  max={4}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Gametime: state.gameStats["Gametime"],
                      Chemtech: state.gameStats["Chemtech"],
                      Kills: state.gameStats["Kills"],
                      Minion: state.gameStats["Minion"],
                      Cloud: value,
                      Hextech: state.gameStats["Hextech"],
                      Infernal: state.gameStats["Infernal"],
                      Mountain: state.gameStats["Mountain"],
                      Ocean: state.gameStats["Ocean"],
                    };
                    handleGame("SET_GAMESTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Hextech</td>
              <td>
                <input
                  type="number"
                  value={state.gameStats["Hextech"]}
                  min={0}
                  max={4}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Gametime: state.gameStats["Gametime"],
                      Chemtech: state.gameStats["Chemtech"],
                      Kills: state.gameStats["Kills"],
                      Minion: state.gameStats["Minion"],
                      Cloud: state.gameStats["Cloud"],
                      Hextech: value,
                      Infernal: state.gameStats["Infernal"],
                      Mountain: state.gameStats["Mountain"],
                      Ocean: state.gameStats["Ocean"],
                    };
                    handleGame("SET_GAMESTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Infernal</td>
              <td>
                <input
                  type="number"
                  value={state.gameStats["Infernal"]}
                  min={0}
                  max={4}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Gametime: state.gameStats["Gametime"],
                      Chemtech: state.gameStats["Chemtech"],
                      Kills: state.gameStats["Kills"],
                      Minion: state.gameStats["Minion"],
                      Cloud: state.gameStats["Cloud"],
                      Hextech: state.gameStats["Hextech"],
                      Infernal: value,
                      Mountain: state.gameStats["Mountain"],
                      Ocean: state.gameStats["Ocean"],
                    };
                    handleGame("SET_GAMESTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Mountain</td>
              <td>
                <input
                  type="number"
                  value={state.gameStats["Mountain"]}
                  min={0}
                  max={4}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Gametime: state.gameStats["Gametime"],
                      Chemtech: state.gameStats["Chemtech"],
                      Kills: state.gameStats["Kills"],
                      Minion: state.gameStats["Minion"],
                      Cloud: state.gameStats["Cloud"],
                      Hextech: state.gameStats["Hextech"],
                      Infernal: state.gameStats["Infernal"],
                      Mountain: value,
                      Ocean: state.gameStats["Ocean"],
                    };
                    handleGame("SET_GAMESTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Ocean</td>
              <td>
                <input
                  type="number"
                  value={state.gameStats["Ocean"]}
                  min={0}
                  max={4}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value != "" ? parseInt(value) : 0;
                    let obj = {
                      Gametime: state.gameStats["Gametime"],
                      Chemtech: state.gameStats["Chemtech"],
                      Kills: state.gameStats["Kills"],
                      Minion: state.gameStats["Minion"],
                      Cloud: state.gameStats["Cloud"],
                      Hextech: state.gameStats["Hextech"],
                      Infernal: state.gameStats["Infernal"],
                      Mountain: state.gameStats["Mountain"],
                      Ocean: value,
                    };
                    handleGame("SET_GAMESTATS", obj);
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
