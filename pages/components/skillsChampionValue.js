import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/context";

export default function SkillsTable() {

    const {pCD,pDMG,pImg,qCD,qDMG,qImg,qSkillPoint,wCD,wDMG,wImg,wSkillPoint,eCD,eDMG,eImg,eSkillPoint,rCD,rDMG,rImg,rSkillPoint,setESkillPoint,setQSkillPoint,setRSkillPoint,setWSkillPoint} = useContext(DataContext);
    
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
                                <img
                                    alt={'Passive img'}
                                    src={pImg} 
                                />
                            </td>
                            <td>Passive</td>
                            <td>0</td>
                            <td>{pDMG}</td>
                            <td>{pCD}</td>
                            <td>{Math.floor(pDMG/pCD)}</td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    alt={'Q img'}
                                    src={qImg} 
                                />
                            </td>
                            <td>Q</td>
                            <td>
                                <input
                                    type="number" 
                                    value={qSkillPoint}
                                    max={5}
                                    min={0}
                                    onChange={(e) => {
                                        let value = e.target.value
                                        value = value != "" ? parseInt(value) : 0
                                        setQSkillPoint(value)
                                    }}
                                />
                            </td>
                            <td>{qDMG}</td>
                            <td>{qCD}</td>
                            <td>{Math.floor(qDMG/qCD)}</td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    alt={'W img'}
                                    src={wImg} 
                                />
                            </td>
                            <td>W</td>
                            <td>
                                <input
                                    type="number" 
                                    value={wSkillPoint}
                                    max={5}
                                    min={0}
                                    onChange={(e) => {
                                        let value = e.target.value
                                        value = value != "" ? parseInt(value) : 0
                                        setWSkillPoint(value)
                                    }}
                                />
                            </td>
                            <td>{wDMG}</td>
                            <td>{wCD}</td>
                            <td>{Math.floor(wDMG/wCD)}</td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    alt={'E img'}
                                    src={eImg} 
                                />
                            </td>
                            <td>E</td>
                            <td>
                                <input
                                    type="number" 
                                    value={eSkillPoint}
                                    max={5}
                                    min={0}
                                    onChange={(e) => {
                                        let value = e.target.value
                                        value = value != "" ? parseInt(value) : 0
                                        setESkillPoint(value)
                                    }}
                                />
                            </td>
                            <td>{eDMG}</td>
                            <td>{eCD}</td>
                            <td>{Math.floor(eDMG/eCD)}</td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    alt={'R img'}
                                    src={rImg} 
                                />
                            </td>
                            <td>R</td>
                            <td>
                                <input
                                    type="number" 
                                    value={rSkillPoint}
                                    max={3}
                                    min={0}
                                    onChange={(e) => {
                                        let value = e.target.value
                                        value = value != "" ? parseInt(value) : 0
                                        setRSkillPoint(value)
                                    }}
                                />
                            </td>
                            <td>{rDMG}</td>
                            <td>{rCD}</td>
                            <td>{Math.floor(rDMG/rCD)}</td>
                        </tr>  
                    </tbody>
                </table>
            </div>
        </div>
    )
}