import { useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const TransactionDetails = () => {

  const [transactionDetails, setTransactionDetails] = useState()

  const getTransactionDetails = async (hash) => {
    const transaction = await alchemy.core.getTransactionReceipt(
      hash
    );
    setTransactionDetails(transaction);
  };

  return (
    <div>
      <h3>Transaction Details</h3>
      {transactionDetails ? (
        <pre>{JSON.stringify(getTransactionDetails, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TransactionDetails;