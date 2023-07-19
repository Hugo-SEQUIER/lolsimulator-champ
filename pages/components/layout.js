import { useRouter } from 'next/router'
import { DataContext } from "../../context/context"
import Link from 'next/link'
const Layout = ({ data, nameChamp }) => {
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext);

    let options = [];
    for (let i = 1; i <= 18; i++) {
        options.push(<option value={i} key={i}>{i}</option>);
    }

    const handleChange = (event) => {
        dispatch({type : "SET_LEVEL", payload : (parseInt(event.target.value))});
    };

    return (
    <>
        <div className="character-details" style={{backgroundImage: `url(${state.imgSplash})`}}>
            <div className='character-banniere'>
                <Link href={'/'}>
                    <img
                        src="../../images/logo.PNG"
                        alt="logo S.GG" 
                    />
                </Link>
                <p style={{width : '1px', height : '100px', backgroundColor : '#f9f8f8', borderRadius : '20px'}}></p>
                {data != undefined && (
                    <h1>{nameChamp.toUpperCase()}</h1>
                )}
                <p style={{width : '1px', height : '100px', backgroundColor : '#f9f8f8', borderRadius : '20px'}}></p>
                <div>
                    <p>Level</p>
                    <select value={state.level} onChange={handleChange}>
                        {options}
                    </select>
                </div>
            </div>
        </div>
    </>
    );
};

export default Layout;
