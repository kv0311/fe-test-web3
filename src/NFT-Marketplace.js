import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/NFT-Marketplace.json';
import { ethers } from 'ethers';
import { Container, Row, Col } from 'react-bootstrap';
// const contractAddress = "0x40765897dcb241eea862d7908fdfb4d773e24fc4"; final
// const contractAddress = "0x4f588b315aa4d69c3c00395cff33326c0254809c";
// const contractAddress = "0xa3f18350B5A4eFBdd6E55656dac1370420E9a24E"; bsc done
const contractAddress ="0x766C579c09856d7F7Eff88297DF9F6b683ba7768"


const abi = contract.abi;

function NFTMaketplace() {

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
            // await contractInstance.openTrade(1, 10)
            console.log(await contractInstance.getTrade(1))
            // console.log(await contractInstance.tokenURI(1))

        } catch (err){
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

export default NFTMaketplace;
