import { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import React from 'react';

import contract from './contracts/Generative.json';
const contractAddress = "0x6c1F1305772ff63b2a029af2Bb7866124d5A2CFF";
const abi = contract.abi;


function Airdrop() {
    const [currentContractInstance, setCurrentContractInstance] = useState(null);
    
    const initContractInstance = () => {
        const { ethereum } = window;

         if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const nftContract = new ethers.Contract(contractAddress, abi, signer);
            console.log("Init new contract instance: %s",nftContract);
            return nftContract;
            // console.log(str)
            // console.log("Initialize payment");
            // let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01") });

            // console.log("Mining... please wait");
            // await nftTxn.wait();

            // console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

         } else {
            console.log("Ethereum object does not exist");
         }
    }
    
      const createProposal =async (e) => {
          try{
            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)
            // await contractInstance.createProposal(1000,0,10,12345667,{ value: ethers.utils.parseEther("0.01")})
            // await contractInstance.investProposal(1,BigInt("100000000000000000"),{ value: ethers.utils.parseEther("0.105")})
            
            console.log(await contractInstance.generateSVG({
                parts: '0x00021e140605000137020001370f0004000237020002370e0003000337020003370d0002000437020004370c0003000337020003370d0004000237020002370e0005000137020001370f000d370b000d370b000d370b000d370b000d370b000d370b000d370600057d0d370600017d017e017d017e017d0b37097d017e017d017e017d0b370d7d0a370523097d0b370d7d',
                background: 'd5d7e1'
            }))
            // await contractInstance.createProposal(1000,0,10,12345667)

          }catch (err){
              console.log(err)
          }
    }
    
    return (
        <div style={{ background: "#d5d7e1", height: "600px", position: "relative" }}>
            <div className="navArrowsContainer">
                <div className="nft-form form-style-8">
                    <button onClick={createProposal}>claim</button>
                </div>
            </div>
        </div>

 );
    }
export default Airdrop;
