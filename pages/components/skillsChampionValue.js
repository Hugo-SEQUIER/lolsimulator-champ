import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/context";

export default function SkillsTable() {
  const { state, dispatch } = useContext(DataContext);

  const handleLevelSpell = (typeSpell, value) => {
    dispatch({ type: typeSpell, payload: value });
  };

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
                <img alt={"Q img"} src={state.qImg} />
              </td>
              <td>Q</td>
              <td>
                <input
                  type="number"
                  value={state.qSkillPoint}
                  max={5}
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
                  max={5}
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
            <tr>
              <td>
                <img alt={"E img"} src={state.eImg} />
              </td>
              <td>E</td>
              <td>
                <input
                  type="number"
                  value={state.eSkillPoint}
                  max={5}
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
            <tr>
              <td>
                <img alt={"R img"} src={state.rImg} />
              </td>
              <td>R</td>
              <td>
                <input
                  type="number"
                  value={state.rSkillPoint}
                  max={3}
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
        </table>
      </div>
    </div>
  );
}
