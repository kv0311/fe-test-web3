import { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import React from 'react';

import contract from './contracts/Airdrop.json';
const contractAddress = "0x66bA8a9C0c04b88FE7613d22f36e0Ea2B811e156";
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
    
      const testFunction =async (e) => {
          try{
            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)
            await contractInstance.claim("0xEBd42256B90f002d19C8f2ed4Eed406765759F57",{ value: ethers.utils.parseEther("0.1")})
            console.log(tokenId)
          }catch (err){
              console.log(err)
          }
    }
    const addWhitelist =async (e) => {
        let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            const data = await contractInstance.tokenURI(1);
            const abc = await contractInstance.functions.getListNFTIdByAddress()
            const abc1 = await contractInstance.functions.ownerOf(1)
            console.log(abc1)

            console.log(abc)
            console.log(data)
            // console.log(contractInstance)
            // await contractInstance.addWhitelist(
            //     ["0x1a521Ac995ABCbc2baB882325E0427Ac0dDfd06e"]
            // )
            // let response = await contractInstance.setMinter();
            // console.log(response)
    }
    const test =async (e) => {
        let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            const listProject = await contractInstance.getListProject(
            )
            console.log(listProject)

            // let response = await contractInstance.setMinter();
            // console.log(response)
    }
    const invest =async (e) => {
        try{
            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            const listProject = await contractInstance.invest("120000","12000","1"
            )
            console.log(listProject)
        }catch (err){
            console.log(err)
        }
        

            // let response = await contractInstance.setMinter();
            // console.log(response)
    }
    return (
        <div style={{ background: "#d5d7e1", height: "600px", position: "relative" }}>
            <div className="navArrowsContainer">
                <div className="nft-form form-style-8">
                    <button onClick={testFunction}>claim</button>
                </div>
            </div>
        </div>
    );
}

export default Airdrop;
