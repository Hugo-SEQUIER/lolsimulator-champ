import { useRouter } from 'next/router';
import CharacterDetails from './components/characterDetails';

export default function ChampionPage({championDetails, champion}){

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  let obj_Details = `Characters/${capitalizeFirstLetter(champion)}/CharacterRecords/Root`

  console.log(championDetails)
  return (
    <CharacterDetails
      mainData={championDetails}
      data={championDetails[obj_Details]}
    />
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
