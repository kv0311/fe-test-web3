import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/NFTCollectible.json';
import { ethers } from 'ethers';
import { Container, Row, Col } from 'react-bootstrap';
// const contractAddress = "0x40765897dcb241eea862d7908fdfb4d773e24fc4"; final
const contractAddress = "0x6cbc5511a89cfd6e8d80d0c57810b4265fd80520";


const abi = contract.abi;

function Home() {

   const [currentAccount, setCurrentAccount] = useState(null);

   const [currentNFT, setCurrentNFT] = useState(null);

   const [currentIndex, setCurrentIndex] = useState(1);

   const [currentIndexNFT, setCurrentIndexNFT] = useState(1);



   const checkWalletIsConnected = async () => {
      const { ethereum } = window;

      if (!ethereum) {
         console.log("Make sure you have Metamask installed!");
         return;
      } else {
         console.log("Wallet exists! We're ready to go!")
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
         const account = accounts[0];
         console.log("Found an authorized account: ", account);
         setCurrentAccount(account);
      } else {
         console.log("No authorized account found");
      }
   }

   const connectWalletHandler = async () => {
      const { ethereum } = window;

      if (!ethereum) {
         alert("Please install Metamask!");
      }

      try {
         const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
         console.log("Found an account! Address: ", accounts[0]);
         setCurrentAccount(accounts[0]);
      } catch (err) {
         console.log(err)
      }
   }

   const mintNftHandler = async () => {
      try {
         const { ethereum } = window;

         if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const nftContract = new ethers.Contract(contractAddress, abi, signer);
            let randomString = (Math.random() + 1).toString(36).substring(2);
            await nftContract.create(randomString)

            // console.log(str)
            // console.log("Initialize payment");
            // let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01") });

            // console.log("Mining... please wait");
            // await nftTxn.wait();

            // console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

         } else {
            console.log("Ethereum object does not exist");
         }
      } catch (err) {
         console.log(err);
      }
   }

   const getNft = async (nftIndex) => {
      try {
         const { ethereum } = window;

         if (ethereum) {
            console.log("get nft: %s",nftIndex)
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const nftContract = new ethers.Contract(contractAddress, abi, signer);
            let str = await nftContract.tokenURI(nftIndex.toString())
            let decodeMSG = atob(str.split(',')[1]);
            setCurrentNFT(decodeMSG.split(`"image":"`)[1].split(`"}`)[0])
         }
      } catch (err) {
         console.log("dont have nft")
         setCurrentNFT("")
      }
   }
   const increaseIndex = () => {
      getNft(currentIndex + 1);
      setCurrentIndex(currentIndex + 1);
      console.log(currentIndex);
   }

   const decreaseIndex = () => {
      getNft(currentIndex - 1);
      setCurrentIndex(currentIndex - 1);
      console.log(currentIndex);
   }

   const connectWalletButton = () => {
      return (
         <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
            Connect Wallet
         </button>
      )
   }

   const mintNftButton = () => {
      return (
         <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
            Mint NFT
         </button>
      )
   }

   useEffect(() => {
      checkWalletIsConnected();
   }, [])

   return (
      <div style={{ background: "#d5d7e1", height: "600px", position: "relative" }}>
         <div className="navArrowsContainer">
            <div className="textArrow">{`Noun ${currentIndex}`}</div>
            <button className="leftArrow" onClick={decreaseIndex}>←</button>
            <button className="rightArrow" onClick={increaseIndex} >→</button></div>
         <div>
            <div className="nftImg">
               {currentNFT ? <img src={currentNFT}></img> : <h1 className="notFound">Dont have this image</h1>}
            </div>
            {currentAccount ? mintNftButton() : connectWalletButton()}
         </div>
      </div>

   );
}

export default Home;
