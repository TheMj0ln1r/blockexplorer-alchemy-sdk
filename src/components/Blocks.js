import { useEffect, useState } from 'react';
import { Utils } from "alchemy-sdk";
import {useNavigate} from 'react-router-dom';


import "./App.css";

function Blocks({alchemy, blockNum, setBlockNum}){
    const [block, setBlock] = useState("");

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [pactive, setpActive] = useState(false);
    const [nactive, setnActive] = useState(false);

    async function handleOnclick(evt){
        evt.preventDefault()
        const latestBlock =  await alchemy.core.getBlockNumber();
        // console.log(blockNum, latestBlock, blockNum<latestBlock);
        if(evt.target.value === "Previous Block"){
            setBlockNum(blockNum-1); 
            getFullBlock();
            setpActive(true);
            setnActive(false);
        }else if(evt.target.value === "Next Block" && (blockNum < latestBlock)){
            setBlockNum(blockNum+1);
            getFullBlock();
            setnActive(true)
            setpActive(false);
        }
        else{
            setnActive(false)
            setpActive(false)
        }
        
    }
    async function getFullBlock(){
        try {
            console.log(blockNum);
            let block = await alchemy.core.getBlockWithTransactions(Utils.hexlify(parseInt(blockNum)));
            console.log(block);
            setBlock(block);
            setLoading(false);
        } catch(e) {
            console.log(e);
            navigate("/", { state: { berror: "Block does not exist" } });
        }
    }

    useEffect(() => {
        getFullBlock();
    }, [alchemy]);

    if(loading){
        return <div><h4>Loading....</h4></div>
    }
    return(
    <div className='container'>
        <input type="button" onClick={handleOnclick} 
            className={pactive ? "button active":"button"} 
            value="Previous Block"
            style={{width:'16%',justifyContent:"center"}}/>
        <input type="button" onClick={handleOnclick} 
            className={nactive ? "button active":"button"} 
            value="Next Block"
            style={{width:'16%', justifyContent:"center"}}/>
        <input type="button" className="button" onClick={()=>{navigate("/")}} value="Home"/>
            <span><b>Block Hash : </b> {block.hash}</span>
            <span><b>Parent Block Hash : </b>{block.parentHash}</span>
            <span><b>Block Number : </b>{block.number}</span>
            <span><b>Nonce : </b>{block.nonce}</span>
            <span><b>gasLimit : </b>{parseInt(block.gasLimit._hex)}</span>
            <span><b>gasUsed : </b>{parseInt(block.gasUsed._hex)}</span>
            <span><b>Miner : </b>{block.miner}</span>
            <span><b>Transactions:</b></span>
            {block.transactions.map((transaction, index) => (
            <div key={index}>
                <span><b>Transaction-{index}</b> {transaction.from} <b>to</b> {transaction.to} <b>Value</b> {Utils.formatEther(transaction.value._hex)} ETH</span>
            </div>
            ))}
    </div>
    );
}

export default Blocks;