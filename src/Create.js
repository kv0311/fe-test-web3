import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/NFTCollectible.json';
import { ethers } from 'ethers';
import { Container, Row, Col } from 'react-bootstrap';
// const contractAddress = "0x40765897dcb241eea862d7908fdfb4d773e24fc4"; final
const contractAddress = "0x4f588b315aa4d69c3c00395cff33326c0254809c";

const abi = contract.abi;

function Create() {

//    const checkWalletIsConnected = async () => {
//       const { ethereum } = window;

//       if (!ethereum) {
//          console.log("Make sure you have Metamask installed!");
//          return;
//       } else {
//          console.log("Wallet exists! We're ready to go!")
//       }

//       const accounts = await ethereum.request({ method: 'eth_accounts' });

//       if (accounts.length !== 0) {
//          const account = accounts[0];
//          console.log("Found an authorized account: ", account);
//          setCurrentAccount(account);
//       } else {
//          console.log("No authorized account found");
//       }
//    }

   const addAccessory = (e) => {
        console.log(e)
   }

   return (
      <div style={{ background: "#d5d7e1", height: "600px", position: "relative" }}>
         <div className="navArrowsContainer">
         <div className="nft-form form-style-8">
            <h2>Add svg index</h2>
            <form>
                <input style={{width: "75%",display: "inline-block"}} type="text" value="field1" placeholder="Accessory" />
                <button className="nft-create" onclick={{addAccessory}} value="field1" type="submit"> Create </button>
            </form>
            <form>
                <input style={{width: "75%",display: "inline-block"}} type="text" name="field1" placeholder="Body" />
                <button className="nft-create" onclick={{addAccessory}}> Create </button>
            </form>
            <form>
                <input style={{width: "75%",display: "inline-block"}} type="text" name="field1" placeholder="Glasses" />
                <button className="nft-create" onclick={{addAccessory}}> Create </button>
            </form>
            <form>
                <input style={{width: "75%",display: "inline-block"}} type="text" name="field1" placeholder="Head" />
                <button className="nft-create" onclick={{addAccessory}}> Create </button>
            </form>
            <form>
                <input style={{width: "75%",display: "inline-block"}} type="text" name="field1" placeholder="Color" />
                <button className="nft-create" onclick={{addAccessory}}> Create </button>
            </form>
            </div>
         </div>
      </div>
   );
}

export default Create;
