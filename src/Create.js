import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/NFTCollectible.json';
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
const contractAddress = "0xe90e18364e8b4e6af2b2e8745d3a0edc0e1d61da";
const abi = contract.abi;

function Create() {
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
    const test = async () => {
        const contractIn = initContractInstance;
        console.log(contractIn.accessory);
    }
    test()
    const addAccessory = async (e) => {
        try{
            e.preventDefault();
            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)

            await contractInstance.addAccessories(JSON.parse(e.target.elements.accessory.value));
            notify.success("Add accessory success");
        } catch (err){
            notify.error('Error message', {
                title: 'Add accessory fail',
              })
            console.log(err)
        }
        
    }
    const handleSuccessClick = () => {
        toast('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      }
    const addBodies = async(e) => {
        try{
            e.preventDefault();
            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)

            await contractInstance.addBodies(JSON.parse(e.target.elements.body.value));
            notify.success("Add Bodies success");
        } catch (err){
            console.log(err)
        }
        
    }
    const addGlasses = async(e) => {
        try{
            e.preventDefault();
            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)

            await contractInstance.addGlasseses(JSON.parse(e.target.elements.glasses.value));
            notify.success("Add Bodies glass");
        } catch (err){
            console.log(err)
        }
        
    }
    const addHeads = async(e) => {
        try{
            e.preventDefault();
            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)

            await contractInstance.addHeads(JSON.parse(e.target.elements.head.value));
            notify.success("Add Head glass");
        } catch (err){
            console.log(err)
        }
        
    }
    const addColors = async(e) => {
        try{
            e.preventDefault();
            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)

            await contractInstance.addColors(JSON.parse(e.target.elements.color.value));
            notify.success("Add Color glass");
        } catch (err){
            console.log(err)
        }
        
    }
    return (
        <div style={{ background: "#d5d7e1", height: "600px", position: "relative" }}>
            <div className="navArrowsContainer">
                <div className="nft-form form-style-8">
                    <h2>Add svg index</h2>
                    <form onSubmit={addAccessory}>
                        <input style={{ width: "75%", display: "inline-block" }} name="accessory" type="text" placeholder="Accessory" />
                        <button className="nft-create" type="submit"> Create </button>
                    </form>

                    <form onSubmit={addBodies}>
                        <input style={{ width: "75%", display: "inline-block" }} name="body" type="text" placeholder="Body" />
                        <button className="nft-create" type="submit"> Create </button>
                    </form>

                    <form onSubmit={addGlasses}>
                        <input style={{ width: "75%", display: "inline-block" }} name="glasses" type="text" placeholder="Glass" />
                        <button className="nft-create" type="submit"> Create </button>
                    </form>

                    <form onSubmit={addHeads}>
                        <input style={{ width: "75%", display: "inline-block" }} name="head" type="text" placeholder="Head" />
                        <button className="nft-create" type="submit"> Create </button>
                    </form>

                    <form onSubmit={addColors}>
                        <input style={{ width: "75%", display: "inline-block" }} name="color" type="text" placeholder="Color" />
                        <button className="nft-create" type="submit"> Create </button>
                    </form>
                    <button onClick={handleSuccessClick}>Success!</button>
                </div>
            </div>
        </div>
    );
}

export default Create;
