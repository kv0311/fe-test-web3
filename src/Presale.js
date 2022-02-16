import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/Presale.json';
import { ethers } from 'ethers';
import React from 'react';
import imageData from './data/image-data.json'

import { ToastContainer, toast } from 'react-toastify';
import { ReactNoti, notify, POSITION } from 'react-noti'
import { MaxUint256 } from '@ethersproject/constants'

const Img = ({ src }) => <span><img width={48} src={src} /></span>

const contractAddress = "0xe9B195e0c497668F8eC66F1623511b4Cc12B6B45";
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
    const buy = async (e) => {
        try{
            e.preventDefault();
            console.log(e.target.elements.accessory.value)

            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            const amount = String(parseInt(e.target.elements.accessory.value) * 0.01)
            contractInstance.buyToken("0xEBd42256B90f002d19C8f2ed4Eed406765759F57",parseInt(e.target.elements.accessory.value),{ value: ethers.utils.parseEther(amount)})
        } catch (err){
            notify.error('Error message', {
                title: 'Add accessory fail',
              })
            console.log(err)
        }
        
    }
    const handleSuccessClick =async (e) => {
        let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)

            let response = await contractInstance.tokenURI(0);
            console.log(response)
      }
    const setFounder =async (e) => {
        let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)

            let response = await contractInstance.setFounder("0xEBd42256B90f002d19C8f2ed4Eed406765759F57");
            console.log(response)
      }
      const setMinter =async (e) => {
        let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)

            let response = await contractInstance.setMinter();
            console.log(response)
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
            const bodies = imageData.images.bodies.map(e =>e.data)
            console.log(bodies)
            await contractInstance.addManyBodies(bodies);
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
            const glasses = imageData.images.glasses.map(e =>e.data)
            console.log(glasses)
            await contractInstance.addManyGlasses(glasses);
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
            const heads = imageData.images.heads.map(e =>e.data)
            console.log(heads.slice(200))
            // await contractInstance.addHeads(JSON.parse(e.target.elements.head.value));
            await contractInstance.addManyHeads(heads.slice(200));

            notify.success("Add Head glass");
        } catch (err){
            console.log(err)
        }
    }
    const addColors = async(e) => {
        try{
            e.preventDefault();
            console.log(imageData.palette)
            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)

            // await contractInstance.addColors(JSON.parse(e.target.elements.color.value));
            await contractInstance.addManyColorsToPalette(0,imageData.palette);

            notify.success("Add Color glass");
        } catch (err){
            console.log(err)
        }
        
    }

    const addBackground = async(e) => {
        try{
            e.preventDefault();
            console.log(imageData.palette)
            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)
            console.log(imageData.bgcolors)
            // await contractInstance.addColors(JSON.parse(e.target.elements.color.value));
            await contractInstance.addManyBackgrounds(imageData.bgcolors);

            notify.success("Add Color glass");
        } catch (err){
            console.log(err)
        }
        
    }
    return (
        <div style={{ background: "#d5d7e1", height: "600px", position: "relative" }}>
            <div className="navArrowsContainer">
                <div className="nft-form form-style-8">
                    <form onSubmit={buy}>
                        <input style={{ width: "75%", display: "inline-block" }} name="accessory" type="text" placeholder="Number" />
                        <button className="nft-create" type="submit"> Buy </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Create;
