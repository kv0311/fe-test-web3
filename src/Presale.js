import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/BUSD.json';
import { ethers } from 'ethers';
import React from 'react';
import imageData from './data/image-data.json'

import { ToastContainer, toast } from 'react-toastify';
import { ReactNoti, notify, POSITION } from 'react-noti'
import { MaxUint256 } from '@ethersproject/constants'

const Img = ({ src }) => <span><img width={48} src={src} /></span>

const contractAddress = "0x4B20dd827Dc975A53FDCD48e3EB5aa5A96a0AA2A";
const abi = contract.abi;

function Create() {
    const [currentContractInstance, setCurrentContractInstance] = useState(null);
    
    const initContractInstance = () => {
        const { ethereum } = window;
         if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            const nftContract = new ethers.Contract(contractAddress, abi, signer);
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
    
    const buy = async (e) => {
        try{
            e.preventDefault();

            let contractInstance = currentContractInstance;
            if(!contractInstance){
                console.log("ds")
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            await contractInstance.approve("0xdF578d05fD9A1467d4BBf3A9B94041554757354D", BigInt(100000000 * 10**18))
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
                    {/* <form onSubmit={buy}> */}
                        {/* <input style={{ width: "75%", display: "inline-block" }} name="accessory" type="text" placeholder="Number" /> */}
                        <button className="nft-create" onClick={buy }> Buy </button>
                    {/* </form> */}
                </div>
            </div>
        </div>
    );
}

export default Create;
