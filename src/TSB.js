import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/iconex.json';
import { ethers } from 'ethers';
import React from 'react';
import imageData from './data/image-data.json'

import { ToastContainer, toast } from 'react-toastify';
import { ReactNoti, notify, POSITION } from 'react-noti'
const Img = ({ src }) => <span><img width={48} src={src} /></span>

// const contractAddress = "0x40765897dcb241eea862d7908fdfb4d773e24fc4"; final
const contractAddress = "0x6c4F76CAD02FC226451cfD4194F6e94f0DA8D18f";
const abi = contract.abi;

function TSB() {
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
    
    
      const addProject =async (e) => {
          try{
            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)
            const tokenId =await contractInstance.claim(2);
            console.log(tokenId)
          }catch (err){
              console.log(err)
          }
        
            
            // await contractInstance.addProject(
            //     "1",
            //     "Testing1",
            //     "0xEBd42256B90f002d19C8f2ed4Eed406765759F57",
            //     "100000000000000000000",
            //     "0",
            //     "100000000000000000000",
            //     "10",
            //     "0xEBd42256B90f002d19C8f2ed4Eed406765759F57",
            //     99999999999,
            //     0,
            // )
            // let response = await contractInstance.setMinter();
            // console.log(response)
    }
    const addWhitelist =async (e) => {
        let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            const data = await contractInstance.getABC();
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
                    <h2>Add svg index</h2>
                    <button onClick={addProject}>add project</button>

                    <button onClick={addWhitelist}>add whitelist</button>
                    <button onClick={test}>get</button>
                    <button onClick={invest}>invest</button>



                </div>
            </div>
        </div>
    );
}

export default TSB;
