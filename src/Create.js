import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/Descriptor.json';
import { ethers } from 'ethers';
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { ReactNoti, notify, POSITION } from 'react-noti'
const Img = ({ src }) => <span><img width={48} src={src} /></span>
const options = {
  title: 'Toast title',
  autoDismiss: true,
  timeOut: 5000,
  pauseOnHover: true,
  showProgress: false
}
// const contractAddress = "0x40765897dcb241eea862d7908fdfb4d773e24fc4"; final
const contractAddress = "0x109eB2D3fE5F83238925b1BD1b90FfD9a69b94BA";
const abi = contract.abi;

function Create() {
    const [currentContractInstance, setCurrentContractInstance] = useState(null);
    const [currentNFT, setCurrentNFT] = useState(null);

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
   
    const handleSuccessClick = async(e) => {
        e.preventDefault();
        console.log(e.target.elements.accessory.value)
        const contractIn = initContractInstance();
        console.log(contractIn)
        const str=  await contractIn.dataURI(0, {
                 background: e.target.elements.background.value,
                 body: e.target.elements.body.value,
                 accessory: e.target.elements.accessory.value,
                 head: e.target.elements.head.value,
                 glasses: e.target.elements.glasses.value
            
        })
        let decodeMSG = atob(str.split(',')[1]);
            console.log(JSON.parse(decodeMSG))
            console.log(JSON.parse(decodeMSG).image)
            setCurrentNFT(JSON.parse(decodeMSG))
      }
    
        
    return (
        <div style={{ background: "#d5d7e1", height: "600px", position: "relative" }}>
            <div className="nftImg" style={{left: "34%",top: "0%"}} >
               {currentNFT ? <img src={currentNFT.image}></img> : <h1 className="notFound">Dont have this image</h1>}
            </div>
            <div className="navArrowsContainer">
                <div className="nft-form form-style-8">
                    <h2>Get NFT By Index</h2>
                    <form onSubmit={handleSuccessClick}>
                        <input style={{ width: "75%", display: "inline-block" }} name="accessory" type="text" placeholder="Accessory" />
                        <input style={{ width: "75%", display: "inline-block" }} name="body" type="text" placeholder="Body" />
                        <input style={{ width: "75%", display: "inline-block" }} name="glasses" type="text" placeholder="Glass" />
                        <input style={{ width: "75%", display: "inline-block" }} name="head" type="text" placeholder="Head" />
                        <input style={{ width: "75%", display: "inline-block" }} name="background" type="text" placeholder="Background" />
                        <button className="nft-create">Get</button>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default Create;
