import { useRouter } from 'next/router';
import CharacterDetails from './components/characterDetails';
import React, { useEffect, useState, useReducer } from 'react';
import { initialState, reducer } from '../reducer/reducer';
import { DataContext } from '../context/context';

export default function ChampionPage({championDetails, champion}){
  console.log(champion)

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      {championDetails != undefined && (
        <DataContext.Provider value={{ state, dispatch }}>
          <CharacterDetails
            data={championDetails}
            nameChamp={champion}
          />
        </DataContext.Provider>
      )}
    </>
  );
};

export async function getServerSideProps({ params }) {
  let { champion } = params;
  if (champion.includes("Nunu")){
    champion = "Nunu"
  }
  if (champion.includes("Renata")){
    champion = "Renata"
  }
  // Fetch the champion data
  const res = await fetch(`http://localhost:3000/data/champions/${champion}.json`);
  //const res = await fetch(`https://raw.communitydragon.org/13.11/game/data/characters/${champion.toLowerCase()}/${champion.toLowerCase()}.bin.json`);
 
  const championDetails = await res.json();

  
  return {
    props: {
      championDetails,
      champion
    }
  };
}
