import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import SearchResults from './SearchResults';
import Home from "./Home";
import TxResults from './TxResults';
import Blocks from './Blocks';

function App() {

  const [address, setAddress] = useState("");
  const [txHash, setTxHash] = useState("");
  const [blockNum, setBlockNum] = useState("");

  const [settings, setSettings] = useState({
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  });
  const [alchemy, setAlchemy] = useState(new Alchemy(settings));


  return( 
    <div className="App">
      <Routes>
          <Route path="/" element={<Home alchemy={alchemy} address={address} setAddress={setAddress} txHash={txHash} setTxHash={setTxHash} blockNum={blockNum} setBlockNum={setBlockNum}/>} />
          <Route path="/searchresults" element={<SearchResults alchemy={alchemy} address={address}/>} />
          <Route path="/tx" element={<TxResults alchemy={alchemy} txHash={txHash}/>} />
          <Route path="/block" element={<Blocks alchemy={alchemy} blockNum={blockNum} setBlockNum={setBlockNum}/>} />
      </Routes>
    </div>
  );
}

export default App;
