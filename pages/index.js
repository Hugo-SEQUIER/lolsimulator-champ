import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
export default function Accueil({ character_name }) {

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [list_character, set_list_character] = useState(character_name) 
  
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    let array = []
    for (let character of character_name){
      if (character.toLowerCase().includes(searchTerm.toLocaleLowerCase())) array.push(character)
    }
    set_list_character(array)
  },[searchTerm])

  return (
    <>
      <div className='accueil'>
        <div className='banniere'>
              <img
                src="../images/logo.PNG"
                alt="logo S.GG" 
              />
              <p style={{width : '1px', height : '100%', backgroundColor : '#f9f8f8', borderRadius : '20px'}}></p>
              <div>
                <h2>Unleash Your Strategy: The Ultimate League of Legends Stuff and Damage Simulator</h2>
                <p>Discover the ultimate simulator for stuff and damage of League of Legends characters. Optimize your gameplay strategy, test different stuff, and assess the impact on your favorite characters' damage. Start simulating now.</p>
              </div>
        </div>
        <div className='search-character'>
          <div>
            <img src="/images/loupe.png" alt="search" />
            <input
              type="text"
              placeholder="Search a champion"
              spellCheck="false"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='sectionBox'>
          {list_character.map((value, index) => {
            let linkName = value.replace("'", "");
            linkName = linkName.replace(" ","")
            linkName = linkName.replace(" ","")
            linkName = linkName.replace(".","")
            linkName = linkName.replace("é","e")
            linkName = linkName.replace("î","i")
            return (
              <Link href={linkName} key={index}>
                <div id={linkName} className='card-character' > 
                  <img
                    alt={value}
                    src={"../images/loading/" + linkName + "_0.jpg"}
            
                  />
                  <div className='button-character'  >
                    <p  >{value.toUpperCase()}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  // Remplacez ceci par le chargement réel des données
  const character_name = [
      "Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe","Aurelion Sol","Azir","Bard","Bel'Veth","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia","Cho'Gath","Corki","Darius","Diana","Dr. Mundo","Draven","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna","Jarvan IV","Jax","Jayce","Jhin","Jinx","K'Santé","Kai'Sa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","Kha'Zix","Kindred","Kled","Kog'Maw","Leblanc","Lee Sin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Master Yi","Malphite","Malzahar","Maokai","Milio","Miss Fortune","Mordekaiser","Morgana","Naafiri","Nami","Nasus","Nautilus","Neeko","Nidalee","Nilah","Nocturne","Nunu & Willump","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","Rek'Sai","Rell","Renata Glasc","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Séraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Sylas","Syndra","Tahm Kench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","Twisted Fate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Vel'Koz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","Wukong","Xayah","Xerath","Xin Zhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Zeri","Ziggs","Zilean","Zoé","Zyra"
  ]
  return {
    props: {
      character_name
    }
  }
}
