import React, { useState } from "react";
import { PrivateToken } from "../Config/ABI/PrivateToken";
import { Token } from "../Config/ABI/Token";
import Web3 from "web3";

// import {PrivateSale,TokenContract} from "../Config/Contract";

import { store } from "../Redux/store";
export const web3_ = new Web3(window.ethereum);

export const AccountUpdate = () => {
  window.ethereum.on("accountsChanged", async (accounts) => { });
};



export const NetworkChanged = async () => {


  if (window.ethereum) {
    let chainID = await web3_.eth.getChainId()
    if (chainID != 56) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
      })

    }
    window.ethereum.on("networkChanged", async (res) => {
      if (res != 56) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
        })


      }
    })
  }
}

// export const _IDOSaleContract = new web3_.eth.Contract(
//   ICOSaleABI_,
//   PolyCruzFactoryContractAddress
// );
// export const _TeamTokenContract = new web3_.eth.Contract(
//   PayoutTokenABI,
//   TeamTokenAddress
// );

/*----------------------------------------------------------------------------------------------------------------------------- */
