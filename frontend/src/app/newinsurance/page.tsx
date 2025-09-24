"use client";
import React from 'react';
import { ethers } from 'ethers';
import { AlertCircle, Wallet, Shield, Plus } from 'lucide-react';
import { InsuranceABI } from '../../../abi/insurance';


const contractAddress = "0x49d6B08c3B968eb4D25a4BEFf093c88bB1C2BcE9"; //
const deployer = "0x92896f08bc775A9AD882687D56aE6427839933D6"
interface WalletState {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  contract: ethers.Contract | null;
}


declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}
export let useContract: any;

const NewInsurance = () => {
  const [wallet, setWallet] = React.useState<WalletState>({
    account: null,
    provider: null,
    signer: null,
    contract: null
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [formData, setFormData] = React.useState({
    premium: '',
    coverage: ''
  });
  const [txHash, setTxHash] = React.useState('');


  React.useEffect(() => {
    initializeProvider();
    checkExistingConnection();
  }, []);




  const initializeProvider = async (): Promise<void> => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setWallet((prev: WalletState) => ({ ...prev, provider }));
      } else {
        setError('MetaMask not detected. Please install MetaMask.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError('Failed to initialize provider: ' + errorMessage);
    }
  };

  const checkExistingConnection = async (): Promise<void> => {
    try {
      if (window.ethereum) {
        const accounts: string[] = await window.ethereum.request({
          method: 'eth_accounts'
        });
        if (accounts.length > 0) {
          await connectWallet();
        }
      }
    } catch (err) {
      console.log('No existing connection found');
    }
  };

  const connectWallet = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');

      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer: ethers.JsonRpcSigner = await provider.getSigner();
      const account: string = await signer.getAddress();

      // Create contract instance
      let contract = new ethers.Contract(contractAddress, InsuranceABI, signer);
      useContract = contract;

      setWallet({
        account,
        provider,
        signer,
        contract
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError('Failed to connect wallet: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const checkOwner = () => {
    console.log(wallet.account);
    console.log(deployer);
    if (wallet.account == deployer) {
      alert("Bhai Yeh toh wahi banda hai ");

    } else {
      alert("Bhai yeh koi dusra banda hai ");
    }
  };


  const trailContract = async () => {
    if (!wallet.contract) {
      setError("Contract not initialized yet. Connect your wallet first!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Use the contract from wallet state
      const contractWithSigner = wallet.contract.connect(wallet.signer!);
      //@ts-ignore
      const tx = await contractWithSigner.newInsurance(
        "Life Policy",                               // _name
        ethers.parseEther(formData.premium || "1"),  // _premium
        ethers.parseEther(formData.coverage || "100"), // _sumAssured
        30,                                           // _payInterval
        ethers.parseEther("0.5"),                     // _initialPayment
        "Family",                                     // _insuranceFor
        "My first insurance",                         // _holderRemark
        Math.floor(Date.now() / 1000),               // _startDate
        Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // _endDate
        10                                            // _numOfSubscribers
      );

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("Insurance created:", receipt.transactionHash);
      setTxHash(receipt.transactionHash);
    } catch (err: any) {
      setError(err?.message || "Failed to create insurance");
    } finally {
      setLoading(false);
    }
  };



  type SetWalletFunction = React.Dispatch<React.SetStateAction<WalletState>>;
  type SetErrorFunction = React.Dispatch<React.SetStateAction<string>>;
  type SetLoadingFunction = React.Dispatch<React.SetStateAction<boolean>>;


  interface Props {
    setWallet: SetWalletFunction;
    setError: SetErrorFunction;
    setLoading: SetLoadingFunction;
    contractAddress: string;
    InsuranceABI: ethers.InterfaceAbi;
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };




  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">

      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Create Insurance Policy</h1>
      </div>


      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}


      {!wallet.account ? (
        <div className="text-center py-8">
          <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-500 mb-4">Connect your MetaMask wallet to create insurance policies</p>
          <button
            onClick={connectWallet}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      ) : (
        <div>

          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <span className="text-green-700 font-medium">

              </span>
            </div>
          </div>


          <div className="space-y-6">
            <div>
              <label htmlFor="premium" className="block text-sm font-medium text-gray-700 mb-2">
                Premium Amount (ETH)
              </label>
              <input
                type="number"
                id="premium"
                name="premium"
                value={formData.premium}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                placeholder="0.1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="coverage" className="block text-sm font-medium text-gray-700 mb-2">
                Coverage Amount (ETH)
              </label>
              <input
                type="number"
                id="coverage"
                name="coverage"
                value={formData.coverage}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                placeholder="1.0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button onClick={trailContract}>
              Check Owner
            </button>


          </div>


          {txHash && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700">
                <strong>Transaction Hash:</strong>{' '}
                <a
                  href={`https://etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >

                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewInsurance;