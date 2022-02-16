import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import Create from './Create';
import Presale from './Presale';
import AirDrop from './AirDrop';



import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />} />
      <Route path="/airdrop" element={<AirDrop />} />
      <Route path="/presale" element={<Presale />} />


      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));