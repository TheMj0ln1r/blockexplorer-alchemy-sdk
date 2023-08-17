import { useEffect, useState } from 'react';
import { Utils } from "alchemy-sdk";
import {useNavigate} from 'react-router-dom';


import "./App.css";

function SearchResults({alchemy, address }){
    const [balance, setBalance] = useState(0);
    const [numTx, setNumTx] = useState(0);
    const [acType, setAcType] = useState("");

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

   useEffect(() => {
        async function getBalance(){
            try {
                let blns = await alchemy.core.getBalance(address);
                setBalance(Utils.formatEther(blns._hex));
                setLoading(false);
            } catch(e) {
                console.log(e);
                navigate("/", { state: { error: "Address does not exist" } });
            }
        }
        getBalance();
        async function getNumOfTransactions(){
            try{
                let totalTx = await alchemy.core.getTransactionCount(address);
                setNumTx(totalTx);
            }
            catch(e) {
                console.log(e);
            }
        }
        getNumOfTransactions();
        async function checkType(){
            try{
                let type = await alchemy.core.isContractAddress(address);
                setAcType(type);
            }
            catch(e){
                console.log(e);
            }
        }
        checkType();

    }, [alchemy, address, navigate]);

    if(loading){
        return <div><h4>Loading....</h4></div>
    }
    return(
    <div className='container'>
            <b>Account : </b> {address}<br/>
            <b>Account Type :</b> {acType ? "Contract" : "EOA"}<br/>
            <b>Balance : </b> {balance} <i>ETH</i><br/>
            <b>Total Transactions : </b> {numTx}<br/>
            
            <input type="button" className="button" onClick={()=>{navigate("/")}} value="Home"/>
    </div>
    );
}

export default SearchResults;
