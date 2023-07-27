import { useRouter } from "next/router";
import React, { useEffect, useState, useReducer } from "react";
import { initialState, reducer } from "../reducer/reducer";
import { DataContext } from "../context/context";
import Layout from "./components/layout";
export default function ChampionPage({ championDetails, champion }) {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      {championDetails != undefined && (
        <DataContext.Provider value={{ state, dispatch }}>
          <Layout data={championDetails} nameChamp={champion} />
        </DataContext.Provider>
      )}
    </>
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
  let res
  // Fetch the champion data
  if (champion != NaN) {
    res = await fetch(
      `http://localhost:3000/data/champions/${champion}.json`
    );
  }
    
  //const res = await fetch(`https://raw.communitydragon.org/13.11/game/data/characters/${champion.toLowerCase()}/${champion.toLowerCase()}.bin.json`);
  if (!res.ok) {
    console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    return { props: { data: null } };
  }
  const championDetails = await res.json();

  return {
    props: {
      championDetails,
      champion,
    },
  };
}
