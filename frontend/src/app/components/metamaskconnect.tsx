import { useState, useEffect } from 'react';

declare global {
    interface Window {
        ethereum: any; 
        
    }
}

const MetaMaskConnector = () => {
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState('');
  const [balance, setBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');


  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };


  const connectWallet = async () => {
    try {
      if (!isMetaMaskInstalled()) {
        setError('MetaMask is not installed. Please install MetaMask extension.');
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        const selectedAccount = accounts[0];
        setAccount(selectedAccount);
        setIsConnected(true);
        setError('');

 
        const networkId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        setChainId(networkId);

   
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [selectedAccount, 'latest'],
        });
        

        const balanceInEther = parseInt(balance, 16) / Math.pow(10, 18);
        setBalance(balanceInEther.toFixed(4));

        console.log('Connected to MetaMask:', {
          account: selectedAccount,
          chainId: networkId,
          balance: balanceInEther,
        });
      }
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
      setError('Failed to connect to MetaMask. Please try again.');
    }
  };
 
  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount('');
    setChainId('');
    setBalance('');
    setIsConnected(false);
    setError('');
  };



  const getAccountData = () => {
    return {
      account,
      chainId,
      balance,
      isConnected,
      provider: window.ethereum,
    };
  };
  


  useEffect(() => {
    if (isMetaMaskInstalled()) {
 
      window.ethereum.on('accountsChanged', (accounts:any) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      });


      window.ethereum.on('chainChanged', (chainId :any) => {
        setChainId(chainId);

      });
    }


    return () => {
      if (isMetaMaskInstalled()) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  // Switch to a specific network (e.g., Ethereum Mainnet, Polygon, etc.)
  const switchNetwork = async (chainId : any) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (err) {
      console.error('Error switching network:', err);
      setError('Failed to switch network.');
    }
  };

  return {
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
  };
};

export default MetaMaskConnector;