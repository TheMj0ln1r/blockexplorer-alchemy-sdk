import {Link, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';

import "./App.css";

function Home({alchemy, address, setAddress, txHash, setTxHash, blockNum, setBlockNum}){
    const setValue = (setter) => (evt) => setter(evt.target.value);

    const navigate = useNavigate();
    let location = useLocation();
  
    function accountDetails(evt){
      evt.preventDefault();
      try{
        navigate("/searchresults",{state:null})
      }
      catch(e){
        console.log(e);
      }
    }
    function txDetails(evt){
        evt.preventDefault();
        try{
          navigate("/tx",{state:null})
        }
        catch(e){
          console.log(e);
        }
    }
    function blockDetails(evt){
      evt.preventDefault();
      try{
        navigate("/block",{state:null})
      }
      catch(e){
        console.log(e);
      }
    }
    const [latest, setLatest] = useState("");
    async function getLatestBlock(){
      try {
          let latest = await alchemy.core.getBlockNumber();
          setLatest(latest);
      } catch(e) {
          console.log(e);
      }
  }
    useEffect(() => {
        const interval = setInterval(() => {
          // Function to run every 10 seconds
          getLatestBlock();
        }, 1000);
        // Clean up the interval when the component is unmounted
        return () => {
          clearInterval(interval);
        };
    });

    return( 
    <>
        <div className='container'>
            <h1>Mj0ln1rs ETH Block Explorer MainNet</h1>
            <form onSubmit={accountDetails} className="searchAddress">
            <h4>Account Details</h4>
            <label>
            <input placeholder='Enter account address to get details' value={address} onChange={setValue(setAddress)} required></input>
            <input type="submit" className="button" value="Search" ></input>
            </label>
            {location.state && location.state.error ? (<div>{location.state.error}</div>) : (<></>)}
            </form>

            <form onSubmit={txDetails} className="searchAddress">
            <h4>Transaction Details</h4>
            <label>
            <input placeholder='Enter Transaction hash to get details' value={txHash} onChange={setValue(setTxHash)} required></input>
            <input type="submit" className="button" value="Search" ></input>
            </label>
            {location.state && location.state.txerror ? (<div>{location.state.txerror}</div>) : (<></>)}
            </form>

            <form onSubmit={blockDetails} className="searchAddress">
            <h4>Block Details</h4>
            <b>Latest Block : {latest}</b><br/><br/>
            <label>
            <input placeholder='Enter Block Number to get details' value={blockNum} onChange={setValue(setBlockNum)} required></input>
            <input type="submit" className="button" value="Search" ></input>
            
            </label>
            {location.state && location.state.berror ? (<div>{location.state.berror}</div>) : (<></>)}
            </form>
        </div>
    </>
    )
}

export default Home;