"use client";
import React from 'react';
import MetaMaskConnector from '../components/metamaskconnect';
import { ethers } from 'ethers';

const NewInsurance = () => {
  const {
    account,
    chainId,
    balance,
    isConnected,
    error,
    connectWallet,
    disconnectWallet,
    getAccountData,
    switchNetwork,
    isMetaMaskInstalled,
  } = MetaMaskConnector();


  const handleSmartContractCall = async () => {
    const accountData = getAccountData();

    if (!accountData.isConnected) {
      alert('Please connect your wallet first');
      return;
    };

    const provider = new ethers.AlchemyProvider(chainId, rpc_url);

    // Use accountData.account, accountData.provider, etc. for smart contract calls
    console.log('Account data for smart contract:', accountData);


  };

  const deployer = process.env.DEPLOYER_PRIVATE_KEY;
  const contractAddress = process.env.NEXT_PUBLIC_INSURANCE_CONTRACT_ADDRESS;
  const rpc_url = process.env.SEPOLIA_RPC_URL;
  const [wallet, setWallet] = React.useState(null);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Wallet Connection</h2>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect MetaMask
        </button>
      ) : (
        <div className="space-y-3">
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            <p><strong>Account:</strong> {account}</p>

            <p><strong>Chain ID:</strong> {chainId}</p>

          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSmartContractCall}
              className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Call Smart Contract
            </button>

            <button
              onClick={disconnectWallet}
              className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Disconnect
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => switchNetwork('0x1')} // Ethereum Mainnet
              className="flex-1 bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Mainnet
            </button>
            <button
              onClick={() => switchNetwork('0xaa36a7')} // Sepolia Testnet
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Sepolia
            </button>
            <button
              onClick={() => switchNetwork('0x89')} // Polygon
              className="flex-1 bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Polygon
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewInsurance;
