import Web3 from "web3";
import React, { useState } from "react";
import { store } from "../Redux/store";
import Swal from "sweetalert2";
let web3 = new Web3(window.ethereum);
// conncet Wallet
export async function connectToWallet() {
  try {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = accounts[0];
  return { accountAddress: account };
}catch(err){
  Swal.fire("Please Connect To The  Wallet")
}
}

//Get user metamask balance
export async function getAccountBalance(netwokrAddress) {
  let balance = (await web3.eth.getBalance(netwokrAddress)) / Math.pow(10, 18);
  return { accountBalance: balance };
}

export async function getAllAccountDetails() {

  return connectToWallet().then(async (res) => {
    
    store.getState().ConnectivityReducer.metamaskAddress = res.accountAddress;
    console.log(res.accountAddress,"ghvcdhsvcdvbhsdvb")
    return getAccountBalance(res.accountAddress).then(async (res) => {
      store.getState().ConnectivityReducer.metamaskBalance = res.accountBalance;
      console.log(res.accountBalance,"vnfvfnbvubrtnbr")
      return { result: await store.getState().ConnectivityReducer.metamaskAddress };
    });
  });

}

//check network
export async function showCurrentNetwork() {
  return web3.eth.getChainId().then(async (networkID) => {
    switch (networkID) {
      case 1:
        store.getState().ConnectivityReducer.metamaskNetwork = "Ethereum";
        return "Ethereum";
      //   break;
      case 56:
        store.getState().ConnectivityReducer.metamaskNetwork = "Binance";
        return "Binance";
        break;
      case 97:
        store.getState().ConnectivityReducer.metamaskNetwork =
          "Binance:Testnet";
        break;
      default:
        store.getState().ConnectivityReducer.metamaskNetwork = "";
    }
    return networkID;
  });
}

// LOgout
export async function walletDisconnect() {
  console.log(store.getState());
  store.dispatch({ type: "WALLET_DISCONNECT" });
  console.log(store.getState());
  return true;
}