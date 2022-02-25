import { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import React from 'react';

import contract from './contracts/Farm.json';
const contractAddress = "0xdF578d05fD9A1467d4BBf3A9B94041554757354D";
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
    
      const fund =async (e) => {
          try{
            let contractInstance = currentContractInstance;
            if(!contractInstance){
                contractInstance = initContractInstance();
                setCurrentContractInstance(contractInstance);
            }
            console.log(contractInstance)
            await contractInstance.fund(BigInt(100000 * 10 ** 18))
            // await contractInstance.investProposal(1,BigInt("100000000000000000"),{ value: ethers.utils.parseEther("0.105")})
            
        //    await contractInstance.buyTokenByStableToken(BigInt(10**18))
            // await contractInstance.createProposal(1000,0,10,12345667)

          }catch (err){
              console.log(err)
          }
    }

    const add =async (e) => {
        try{
          let contractInstance = currentContractInstance;
          if(!contractInstance){
              contractInstance = initContractInstance();
              setCurrentContractInstance(contractInstance);
          }
          console.log(contractInstance)
          await contractInstance.add(10, '0x621e88d457410d119be630a410f1c99b2e12511b', false)
        // console.log(await contractInstance.poolLength()
          // await contractInstance.investProposal(1,BigInt("100000000000000000"),{ value: ethers.utils.parseEther("0.105")})
          
      //    await contractInstance.buyTokenByStableToken(BigInt(10**18))
          // await contractInstance.createProposal(1000,0,10,12345667)

        }catch (err){
            console.log(err)
        }
  }

  const deposit =async (e) => {
    try{
      let contractInstance = currentContractInstance;
      if(!contractInstance){
          contractInstance = initContractInstance();
          setCurrentContractInstance(contractInstance);
      }
      console.log(contractInstance)
      await contractInstance.deposit(0, BigInt(100000 * 10 ** 18))
    // console.log(await contractInstance.poolLength()
      // await contractInstance.investProposal(1,BigInt("100000000000000000"),{ value: ethers.utils.parseEther("0.105")})
      
  //    await contractInstance.buyTokenByStableToken(BigInt(10**18))
      // await contractInstance.createProposal(1000,0,10,12345667)

    }catch (err){
        console.log(err)
    }
}

const deposited =async (e) => {
    try{
      let contractInstance = currentContractInstance;
      if(!contractInstance){
          contractInstance = initContractInstance();
          setCurrentContractInstance(contractInstance);
      }
      console.log(await contractInstance.deposited(0, "0xEBd42256B90f002d19C8f2ed4Eed406765759F57"))
      
    // console.log(await contractInstance.poolLength()
      // await contractInstance.investProposal(1,BigInt("100000000000000000"),{ value: ethers.utils.parseEther("0.105")})
      
  //    await contractInstance.buyTokenByStableToken(BigInt(10**18))
      // await contractInstance.createProposal(1000,0,10,12345667)

    }catch (err){
        console.log(err)
    }
}

const pendingReward =async (e) => {
    try{
      let contractInstance = currentContractInstance;
      if(!contractInstance){
          contractInstance = initContractInstance();
          setCurrentContractInstance(contractInstance);
      }
      console.log(parseInt(await contractInstance.pending(0, "0xEBd42256B90f002d19C8f2ed4Eed406765759F57"))/10**18)
      
    // console.log(await contractInstance.poolLength()
      // await contractInstance.investProposal(1,BigInt("100000000000000000"),{ value: ethers.utils.parseEther("0.105")})
      
  //    await contractInstance.buyTokenByStableToken(BigInt(10**18))
      // await contractInstance.createProposal(1000,0,10,12345667)

    }catch (err){
        console.log(err)
    }
}

const withdraw =async (e) => {
    try{
      let contractInstance = currentContractInstance;
      if(!contractInstance){
          contractInstance = initContractInstance();
          setCurrentContractInstance(contractInstance);
      }
      console.log(await contractInstance.withdraw(0, BigInt(30*10**18)))
      
    // console.log(await contractInstance.poolLength()
      // await contractInstance.investProposal(1,BigInt("100000000000000000"),{ value: ethers.utils.parseEther("0.105")})
      
  //    await contractInstance.buyTokenByStableToken(BigInt(10**18))
      // await contractInstance.createProposal(1000,0,10,12345667)

    }catch (err){
        console.log(err)
    }
}

    
    return (
        <div style={{ background: "#d5d7e1", height: "600px", position: "relative" }}>
            <div className="navArrowsContainer">
                <div className="nft-form form-style-8">
                    <button onClick={fund}>Fund</button>
                    <button onClick={add}>Add</button>
                    <button onClick={deposit}>Deposit</button>
                    <button onClick={deposited}>deposited</button>
                    <button onClick={pendingReward}>pendingreward</button>
                    <button onClick={withdraw}>withdraw</button>


                    

                </div>
            </div>
        </div>

 );
    }
export default Airdrop;
