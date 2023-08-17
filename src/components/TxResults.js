import { useEffect, useState } from 'react';
import { Utils } from "alchemy-sdk";
import {useNavigate} from 'react-router-dom';


import "./App.css";

function TxResults({alchemy, txHash}){
    const [tx, setTx] = useState({});

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

   useEffect(() => {
        async function getTransaction(){
            try {
                let tx = await alchemy.transact.getTransaction(txHash);
                setTx(tx);
                setLoading(false);
            } catch(e) {
                console.log(e);
                navigate("/", { state: { txerror: "Tx does not exist" } });
            }
        }
        getTransaction();

    }, [alchemy, txHash, navigate]);

    if(loading){
        return <div><h4>Loading....</h4></div>
    }
    return(
    <div className='container'>
            <span><b>Tx Hash : </b> {tx.hash}</span>
            <span><b>Block Hash : </b>{tx.blockHash}</span>
            <span><b>Block Number : </b>{tx.blockNumber}</span>
            <span><b>from : </b>{tx.from}</span>
            <span><b>to : </b>{tx.to}</span>
            <span><b>gasLimit : </b>{parseInt(tx.gasLimit._hex)}</span>
            <span><b>gasPrice : </b>{ Utils.formatUnits(tx.gasLimit._hex,"gwei")}</span>
            <span><b>Value : </b>{Utils.formatEther(tx.value._hex)} Eth</span>
            <span><b>Data : </b>{tx.data}</span>
            <input type="button" className="button" onClick={()=>{navigate("/")}} value="Home"/>
    </div>
    );
}

export default TxResults;