import { useRouter } from 'next/router';
import CharacterDetails from './components/characterDetails';
import React, { useEffect, useState } from 'react';

export default function ChampionPage({championDetails, champion}){
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const [objDetails, setObjDetails] = useState('')

  useEffect(() => {
    setObjDetails(`Characters/${capitalizeFirstLetter(champion)}/CharacterRecords/Root`)
  },[])
 
  console.log(championDetails)
  return (
    <>
      {objDetails != '' && (
        <CharacterDetails
          mainData={championDetails}
          data={championDetails[objDetails]}
        />
      )}
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { champion } = params;

  // Fetch the champion data
  //const res = await fetch(`http://localhost:3000/data/${champion}.json`);
  const res = await fetch(`https://raw.communitydragon.org/13.11/game/data/characters/${champion.toLowerCase()}/${champion.toLowerCase()}.bin.json`);
 
  const championDetails = await res.json();


  return {
    props: {
      championDetails,
      champion
    }
  };
}
