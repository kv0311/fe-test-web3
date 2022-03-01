import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import Create from './Create';
import Presale from './Presale';
import AirDrop from './AirDrop';
import Proposal from './Proposal';
import Descriptor from './Descriptor';
import NFTManagement from './NFT-Management';
import NFTMarketplace from './NFT-Marketplace';







import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />} />
      <Route path="/airdrop" element={<AirDrop />} />
      <Route path="/presale" element={<Presale />} />
      <Route path="/proposal" element={<Proposal />} />
      <Route path="/descriptor" element={<Descriptor />} />
      <Route path="/nft" element={<NFTManagement />} />
      <Route path="/nft-marketplace" element={<NFTMarketplace />} />




      

      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));