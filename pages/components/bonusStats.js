import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/context";

export default function BonusStats() {
  const { state, dispatch } = useContext(DataContext);

  const handleBonus = (typeBonus, value) => {
    dispatch({ type: typeBonus, payload: value });
  };

  return (
    <div className="stats-table">
      <div>
        <h1>Bonus Stats</h1>
      </div>
      <div className="stats-table-row">
        <table>
          <thead>
            <tr>
              <td colSpan="2">Soul</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chemtech</td>
              <td>
                <input
                  type="checkbox"
                  id="chemSoul"
                  name="chemSoul"
                  checked={state.bonusStats["Chem"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      Ardent: state.bonusStats["Ardent"],
                      Chem: value,
                      Cloud: false,
                      Elder: state.bonusStats["Elder"],
                      Hextech: false,
                      Infernal: false,
                      Mountain: false,
                      Ocean: false,
                      "Recently Hit": state.bonusStats["Recently Hit"],
                    };
                    handleBonus("SET_BONUSSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Cloud</td>
              <td>
                <input
                  type="checkbox"
                  id="cloudSoul"
                  name="cloudSoul"
                  checked={state.bonusStats["Cloud"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      Ardent: state.bonusStats["Ardent"],
                      Chem: false,
                      Cloud: value,
                      Elder: state.bonusStats["Elder"],
                      Hextech: false,
                      Infernal: false,
                      Mountain: false,
                      Ocean: false,
                      "Recently Hit": state.bonusStats["Recently Hit"],
                    };
                    handleBonus("SET_BONUSSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Hextech</td>
              <td>
                <input
                  type="checkbox"
                  id="hexSoul"
                  name="hexSoul"
                  checked={state.bonusStats["Hextech"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      Ardent: state.bonusStats["Ardent"],
                      Chem: false,
                      Cloud: false,
                      Elder: state.bonusStats["Elder"],
                      Hextech: value,
                      Infernal: false,
                      Mountain: false,
                      Ocean: false,
                      "Recently Hit": state.bonusStats["Recently Hit"],
                    };
                    handleBonus("SET_BONUSSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Infernal</td>
              <td>
                <input
                  type="checkbox"
                  id="infernalSoul"
                  name="infernalSoul"
                  checked={state.bonusStats["Infernal"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      Ardent: state.bonusStats["Ardent"],
                      Chem: false,
                      Cloud: false,
                      Elder: state.bonusStats["Elder"],
                      Hextech: false,
                      Infernal: value,
                      Mountain: false,
                      Ocean: false,
                      "Recently Hit": state.bonusStats["Recently Hit"],
                    };
                    handleBonus("SET_BONUSSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Mountain</td>
              <td>
                <input
                  type="checkbox"
                  id="mountainSoul"
                  name="mountainSoul"
                  checked={state.bonusStats["Mountain"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      Ardent: state.bonusStats["Ardent"],
                      Chem: false,
                      Cloud: false,
                      Elder: state.bonusStats["Elder"],
                      Hextech: false,
                      Infernal: false,
                      Mountain: value,
                      Ocean: false,
                      "Recently Hit": state.bonusStats["Recently Hit"],
                    };
                    handleBonus("SET_BONUSSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Ocean</td>
              <td>
                <input
                  type="checkbox"
                  id="oceanSoul"
                  name="oceanSoul"
                  checked={state.bonusStats["Ocean"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      Ardent: state.bonusStats["Ardent"],
                      Chem: false,
                      Cloud: false,
                      Elder: state.bonusStats["Elder"],
                      Hextech: false,
                      Infernal: false,
                      Mountain: false,
                      Ocean: value,
                      "Recently Hit": state.bonusStats["Recently Hit"],
                    };
                    handleBonus("SET_BONUSSTATS", obj);
                  }}
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <td colSpan="2">Other</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ardent</td>
              <td>
                <input
                  type="checkbox"
                  id="ardent"
                  name="ardent"
                  checked={state.bonusStats["Ardent"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      Ardent: value,
                      Chem: state.bonusStats["Chem"],
                      Cloud: state.bonusStats["Cloud"],
                      Elder: state.bonusStats["Elder"],
                      Hextech: state.bonusStats["Hextech"],
                      Infernal: state.bonusStats["Infernal"],
                      Mountain: state.bonusStats["Mountain"],
                      Ocean: state.bonusStats["Ocean"],
                      "Recently Hit": state.bonusStats["Recently Hit"],
                    };
                    handleBonus("SET_BONUSSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Elder</td>
              <td>
                <input
                  type="checkbox"
                  id="elder"
                  name="elder"
                  checked={state.bonusStats["Elder"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      Ardent: state.bonusStats["Ardent"],
                      Chem: state.bonusStats["Chem"],
                      Cloud: state.bonusStats["Cloud"],
                      Elder: value,
                      Hextech: state.bonusStats["Hextech"],
                      Infernal: state.bonusStats["Infernal"],
                      Mountain: state.bonusStats["Mountain"],
                      Ocean: state.bonusStats["Ocean"],
                      "Recently Hit": state.bonusStats["Recently Hit"],
                    };
                    handleBonus("SET_BONUSSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Recently Hit</td>
              <td>
                <input
                  type="checkbox"
                  id="recent"
                  name="recent"
                  checked={state.bonusStats["Recently Hit"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      Ardent: state.bonusStats["Ardent"],
                      Chem: state.bonusStats["Chem"],
                      Cloud: state.bonusStats["Cloud"],
                      Elder: state.bonusStats["Elder"],
                      Hextech: state.bonusStats["Hextech"],
                      Infernal: state.bonusStats["Infernal"],
                      Mountain: state.bonusStats["Mountain"],
                      Ocean: state.bonusStats["Ocean"],
                      "Recently Hit": value,
                    };
                    handleBonus("SET_BONUSSTATS", obj);
                  }}
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <td colSpan="2">Active / Passive Bonus</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Passive</td>
              <td>
                <input
                  type="checkbox"
                  id="steroidPassive"
                  name="steroidPassive"
                  checked={state.steroidStats["P"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      E: state.steroidStats["E"],
                      Form: state.steroidStats["Form"],
                      Items: state.steroidStats["Items"],
                      P: value,
                      Q: state.steroidStats["Q"],
                      R: state.steroidStats["R"],
                      Runes: state.steroidStats["Runes"],
                      W: state.steroidStats["W"],
                    };
                    handleBonus("SET_STEROIDSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Q</td>
              <td>
                <input
                  type="checkbox"
                  id="steroidQ"
                  name="steroidQ"
                  checked={state.steroidStats["Q"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      E: state.steroidStats["E"],
                      Form: state.steroidStats["Form"],
                      Items: state.steroidStats["Items"],
                      P: state.steroidStats["P"],
                      Q: value,
                      R: state.steroidStats["R"],
                      Runes: state.steroidStats["Runes"],
                      W: state.steroidStats["W"],
                    };
                    handleBonus("SET_STEROIDSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>W</td>
              <td>
                <input
                  type="checkbox"
                  id="steroidW"
                  name="steroidW"
                  checked={state.steroidStats["W"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      E: state.steroidStats["E"],
                      Form: state.steroidStats["Form"],
                      Items: state.steroidStats["Items"],
                      P: state.steroidStats["P"],
                      Q: state.steroidStats["Q"],
                      R: state.steroidStats["R"],
                      Runes: state.steroidStats["Runes"],
                      W: value,
                    };
                    handleBonus("SET_STEROIDSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>E</td>
              <td>
                <input
                  type="checkbox"
                  id="steroidE"
                  name="steroidE"
                  checked={state.steroidStats["E"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      E: value,
                      Form: state.steroidStats["Form"],
                      Items: state.steroidStats["Items"],
                      P: state.steroidStats["P"],
                      Q: state.steroidStats["Q"],
                      R: state.steroidStats["R"],
                      Runes: state.steroidStats["Runes"],
                      W: state.steroidStats["W"],
                    };
                    handleBonus("SET_STEROIDSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>R</td>
              <td>
                <input
                  type="checkbox"
                  id="steroidR"
                  name="steroidR"
                  checked={state.steroidStats["R"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      E: state.steroidStats["E"],
                      Form: state.steroidStats["Form"],
                      Items: state.steroidStats["Items"],
                      P: state.steroidStats["P"],
                      Q: state.steroidStats["Q"],
                      R: value,
                      Runes: state.steroidStats["Runes"],
                      W: state.steroidStats["W"],
                    };
                    handleBonus("SET_STEROIDSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Form</td>
              <td>
                <input
                  type="checkbox"
                  id="steroidForm"
                  name="steroidForm"
                  checked={state.steroidStats["Form"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      E: state.steroidStats["E"],
                      Form: value,
                      Items: state.steroidStats["Items"],
                      P: state.steroidStats["P"],
                      Q: state.steroidStats["Q"],
                      R: state.steroidStats["R"],
                      Runes: state.steroidStats["Runes"],
                      W: state.steroidStats["W"],
                    };
                    handleBonus("SET_STEROIDSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Items</td>
              <td>
                <input
                  type="checkbox"
                  id="steroidItems"
                  name="steroidItems"
                  checked={state.steroidStats["Items"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      E: state.steroidStats["E"],
                      Form: state.steroidStats["Form"],
                      Items: value,
                      P: state.steroidStats["P"],
                      Q: state.steroidStats["Q"],
                      R: state.steroidStats["R"],
                      Runes: state.steroidStats["Runes"],
                      W: state.steroidStats["W"],
                    };
                    handleBonus("SET_STEROIDSTATS", obj);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Runes</td>
              <td>
                <input
                  type="checkbox"
                  id="steroidRunes"
                  name="steroidRunes"
                  checked={state.steroidStats["Runes"]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    let obj = {
                      E: state.steroidStats["E"],
                      Form: state.steroidStats["Form"],
                      Items: state.steroidStats["Items"],
                      P: state.steroidStats["P"],
                      Q: state.steroidStats["Q"],
                      R: state.steroidStats["R"],
                      Runes: value,
                      W: state.steroidStats["W"],
                    };
                    handleBonus("SET_STEROIDSTATS", obj);
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
