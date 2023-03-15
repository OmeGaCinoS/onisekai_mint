import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"
import img1 from "../assets/images/ISAMU_fade_down.png"
import img2 from "../assets/images/GWECKO_fade_down.png"
import crystal from "../assets/images/crystal.png"
import crystal_loop from "../assets/images/crystal_loop.png"
import sticker from "../assets/images/mint it sticker.png"

// Web3 Imports
import abi from '../utility/abi.json'
import ReactLoading from 'react-loading';
import MerkleTree from 'merkletreejs';
import keccak256 from 'keccak256';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { _hashIzanagi, _hashIzanami } from '../utility/Helper'


// Contract Setup.

import { REACT_APP_CONTRACT_ADDRESS } from '../utility/Constant'

const SELECTEDNETWORK = "5";
const SELECTEDNETWORKNAME = "Goerli";
const nftquantity = 1000;




const Mint = () => {

  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const [errormsg, setErrorMsg] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalSupply, settotalSupply] = useState(0);

  const [status, setStatus] = useState(0);
  // const [account, setAccount] = useState('')
  const [walletConnected, setWalletConnected] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [value, setValue] = useState(0);
  const [HexProofMain, setHexProofMain] = useState(null);
  const [HexProofSecond, setHexProofSecond] = useState(null);
  // const [colorCode, setColorCodePublic] = useState(false)
  const [colorCode, setColorCode] = useState(false);

  async function emptyErrorMsg() {
    setErrorMsg(false)
  }

  async function startConnection() {
    await emptyErrorMsg()
    if (isConnected) {
      console.log("Connection Made !!!")
      fetch(address)
    } else {
      setErrorMsg("Connect Your wallet");
    }
  }

  async function fetch(metamakAcc) {
    console.log("metamakAcc", metamakAcc)
    await emptyErrorMsg();

    setisLoading(true)

    window.web3 = new Web3(window.ethereum);
    const web3 = window.web3;
    if (await web3.eth.net.getId() == SELECTEDNETWORK) {

      const contractaddress = REACT_APP_CONTRACT_ADDRESS;
      const ct = new web3.eth.Contract(abi, contractaddress);
      settotalSupply(await ct.methods.totalSupply().call());

      if (nftquantity - await ct.methods.totalSupply().call() == 0) {
        setErrorMsg("All NFTs minted, Sale has ended");
      }

      let statusValue = await ct.methods.getStatus().call()
      // let statusValue = "2";

      console.log("status", statusValue)
      if (statusValue === '0') {
        setErrorMsg("SALE IS NOT ACTIVE");
        setisLoading(false)
        return;
      } else if (statusValue === '1') {
        setStatus(1);
        console.log("IZANAGI sale is on");
        await hashIZG(metamakAcc);
        return;
      } else if (statusValue === '2') {
        setStatus(2);
        console.log("IZANAMI Sale is on");
        await hashIZM(metamakAcc);
        return;
      }
    }
    else {
      setisLoading(false)
      setErrorMsg("Select \"" + SELECTEDNETWORKNAME + "\" network in your wallet to buy the nft.");
    }
  }


  async function hashIZG(metamakAcc) {

    await _hashIzanagi(metamakAcc)
      .then((hex) => {

        if (hex.length > 0) {
          setHexProofMain(hex)
          setisLoading(false)
          setWalletConnected(true);
        } else {

          setisLoading(false);
          setErrorMsg("Sorry , You are not in Izanagi List");
        }
      })
  }


  async function hashIZM(metamakAcc) {

    await _hashIzanami(metamakAcc)
      .then((hex) => {

        if (hex.length > 0) {
          setHexProofSecond(hex)
          setisLoading(false)
          setWalletConnected(true);
          setErrorMsg("Izanami Sale On")

        } else {
          setisLoading(false);
          setErrorMsg("Sorry , You are not in Izanami List");

        }
      })
  }


  async function loadWeb3White(_colorCode) {
    await emptyErrorMsg()
    console.log("White list Sale IZG ---- > ")

    if (isConnected) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const web3 = window.web3;
      // Meta Mask Connected Account Address

      if (await web3.eth.net.getId() == SELECTEDNETWORK) {
        // // creating contract instance
        const contractaddress = REACT_APP_CONTRACT_ADDRESS;
        const ct = new web3.eth.Contract(abi, contractaddress);

        let current = await ct.methods.totalSupply().call();
        if (Number(current) === nftquantity) {
          console.log("Sold out");
          setErrorMsg("Sold out")
          return;
        }

        if (_colorCode == 1) {

          let redMinted = await ct.methods.totalRedMinted().call();
          if ((parseInt(redMinted) + parseInt(1)) - 1 > 500) {
            setErrorMsg("Red Crystal Limit Reached!")
            return;
          }
        } else {

          let blueMinted = await ct.methods.totalBlueMinted().call();
          if ((parseInt(blueMinted) + parseInt(2)) - 1 > 1000) {
            setErrorMsg("Blue Crystal Limit Reached!")
            return;
          }
        }

        let checkAddressBalance = await ct.methods.izglistClaimedBy(address).call();
        if (checkAddressBalance >= 2) {
          setErrorMsg("Max mint limit reached for this wallet!");
          return;
        }

        let price = await ct.methods.getIzgListPrice(2).call();
        await ct.methods.mintIZG(2, HexProofMain, _colorCode).send({ from: address, value: price });

        settotalSupply(await ct.methods.totalSupply().call());
        setQuantity(1);
      } else { setErrorMsg("Select \"" + SELECTEDNETWORKNAME + "\" network in your wallet to buy the nft") };
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      { setErrorMsg("browser not detected. You should consider trying MetaMask!") }
    }
  }


  async function loadWeb3Public(_colorCode) {
    await emptyErrorMsg()
    console.log("Public Sale IZM ---- > ")

    if (isConnected) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const web3 = window.web3;
      // Meta Mask Connected Account Address

      if (await web3.eth.net.getId() == SELECTEDNETWORK) {
        // // creating contract instance
        const contractaddress = REACT_APP_CONTRACT_ADDRESS;
        const ct = new web3.eth.Contract(abi, contractaddress);

        let current = await ct.methods.totalSupply().call();
        if (Number(current) === nftquantity) {
          console.log("Sold out");
          setErrorMsg("Sold out")
          return;
        }

        if (_colorCode == 1) {

          let redMinted = await ct.methods.totalRedMinted().call();
          if ((parseInt(redMinted) + parseInt(1)) - 1 > 500) {
            setErrorMsg("Red Crystal Limit Reached!")
            return;
          }
        } else {

          let blueMinted = await ct.methods.totalBlueMinted().call();
          if ((parseInt(blueMinted) + parseInt(2)) - 1 > 1000) {
            setErrorMsg("Blue Crystal Limit Reached!")
            return;
          }
        }

        let checkAddressBalance = await ct.methods.IZM_ClaimedBy(address).call();
        if (checkAddressBalance >= 1) {
          setErrorMsg("Max mint limit reached for this wallet!");
          return;
        }

        let price = await ct.methods.getPrice(quantity).call();
        await ct.methods.mint(quantity, HexProofSecond, _colorCode).send({ from: address, value: price });

        settotalSupply(await ct.methods.totalSupply().call());
        setQuantity(1);
      } else { setErrorMsg("Select \"" + SELECTEDNETWORKNAME + "\" network in your wallet to buy the nft") };
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      { setErrorMsg("browser not detected. You should consider trying MetaMask!") }
    }
  }

  async function mintNFTBlue() {
    if (!walletConnected) {
      return setErrorMsg("Click on \"Mint Crystal\" to start!");

    }

    // 2 is Blue
    if (status === 1) {
      loadWeb3White(2)
    } else {
      loadWeb3Public(2)
    }

  }

  async function mintNFTRed() {
    if (!walletConnected) {
      return setErrorMsg("Click on \"Mint Crystal\" to start!");

    }

    // 1 is Red
    if (status === 1) {
      loadWeb3White(1)
    } else {
      loadWeb3Public(1)
    }
  }


  return (
    <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center justify-center px-7 sm:flex-row xl:items-end xl:justify-between">
      {/* box */}
      <div className="relative z-20 mb-9 flex max-w-[300px] flex-grow flex-col gap-5 rounded bg-white/60 p-4 sm:min-h-[400px] sm:w-full sm:max-w-xl sm:p-14">
        <img
          src={sticker}
          alt="sticker"
          className="absolute -left-7 -top-7 w-24 sm:w-40 md:-left-16 md:-top-16 md:w-60"
        />
        <div className="flex justify-between gap-5">
          <div>
            <div onClick={() => { mintNFTBlue() }} className="flex items-center justify-center cursor-pointer rounded bg-[#d1cecba6] [box-shadow:0_7px_10px_#00000045] xl:p-6">
              <motion.img
                src={crystal}
                alt=""
                className="w-56"
                whileHover={{ filter: "brightness(1.2)" }}
              />
            </div>
          </div>
          <div>
            <div onClick={() => { mintNFTRed() }} className="flex items-center justify-center cursor-pointer rounded bg-[#d1cecba6] [box-shadow:0_7px_10px_#00000045] xl:p-6">
              <motion.img
                src={crystal_loop}
                alt=""
                className="w-56"
                whileHover={{ filter: "brightness(1.2)" }}
              />
            </div>
          </div>
        </div>

        {walletConnected && isConnected ? <>
          {/* <div className="rounded bg-[#4f4f4fa6] p-2 [box-shadow:0_7px_10px_#00000078]">
            <input
              type="number"
              className="w-full border-none bg-transparent pr-2 text-right font-bebas-neue text-3xl font-bold text-white outline-none placeholder:text-white"
              placeholder="MAX"
            />
          </div> */}
          <div className="flex gap-1 md:gap-5">
            <div className="flex justify-center gap-1 rounded bg-[#4f4f4fa6] p-2 text-sm [box-shadow:0_7px_10px_#00000078] sm:min-w-[200px] sm:text-2xl md:gap-3">
              <span className="font-freeSans-bold">Total:</span>
              <h3 className="font-freeSans-bold">Free Mint</h3>
            </div>

            <button
              className="flex-grow rounded-full bg-accent-light-red py-2 text-center font-bebas-neue text-xl text-white sm:text-2xl md:text-4xl">
              <span className="">PICK</span>{" "}
              <span className="text-lg md:text-3xl">A</span>{" "}
              <span className="">SIDE</span>
            </button>
          </div>
        </> : <>

          <button
            onClick={() => startConnection()}
            className="flex-grow rounded-full bg-accent-light-red py-2 text-center font-bebas-neue text-xl text-white sm:text-2xl md:text-4xl">
            <span className="">MINT</span>{" "}
            <span className="text-lg md:text-3xl">A</span>{" "}
            <span className="">CRYSTAL</span>
          </button>

        </>}

        {isLoading && <>

          <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
            <ReactLoading type={'spin'} color={'#000'} height={'32px'} width={'32px'} />
          </div>
        </>
        }
        {errormsg &&
          <>
            <div className="flex justify-center gap-1 rounded bg-[#4f4f4fa6] p-2 text-sm [box-shadow:0_7px_10px_#00000078] sm:min-w-[200px] sm:text-2xl md:gap-3">
              <span className="font-freeSans-bold">{errormsg.toUpperCase()}</span>
            </div>
          </>

        }


      </div>

      <div className="relative top-12 flex items-end sm:static sm:block xl:flex">
        <img
          src={img1}
          alt="character"
          className="relative left-2 -z-10 h-full max-h-[300px] object-contain sm:absolute sm:left-0 sm:bottom-0 sm:max-h-[510px] xl:relative xl:left-14 xl:max-h-[620px]"
        />
        <img
          src={img2}
          alt="character"
          className="relative right-2 h-full max-h-[340px] object-contain sm:absolute sm:right-0 sm:bottom-0 sm:max-h-[580px] xl:static xl:max-h-[700px]"
        />
      </div>
    </div>
  )
}

export default Mint
