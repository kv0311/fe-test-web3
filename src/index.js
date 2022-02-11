import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import Create from './Create';
import Test from './Test';
import Tsb from './TSB';



import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/create" element={<Create />} />
      <Route path="/test" element={<Test />} />
      <Route path="/tsb" element={<Tsb />} />


      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));