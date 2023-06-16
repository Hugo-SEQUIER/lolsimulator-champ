import { useRouter } from 'next/router';
import CharacterDetails from './components/characterDetails';
import React, { useEffect, useState } from 'react';

export default function ChampionPage({championDetails, champion}){
  console.log(champion)
  return (
    <>
      {championDetails != undefined && (
        <CharacterDetails
          data={championDetails}
          nameChamp={champion}
        />
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
  const res = await fetch(`http://localhost:3000/data/${champion}.json`);
  //const res = await fetch(`https://raw.communitydragon.org/13.11/game/data/characters/${champion.toLowerCase()}/${champion.toLowerCase()}.bin.json`);
 
  const championDetails = await res.json();

  
  return {
    props: {
      championDetails,
      champion
    }
  };
}
