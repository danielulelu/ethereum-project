import { useState } from "react";
import { Alchemy} from "alchemy-sdk";

const Accounts = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  const alchemy = new Alchemy(process.env.REACT_APP_ALCHEMY_KEY);

  const getBalance = async () => {
    const balance = await alchemy.core.getBalance(address);
    setBalance(balance);
  };

  return (
    <div>
      <h2>Accounts</h2>
      <input
        type="text"
        placeholder="Enter Ethereum address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={getBalance}>Get Balance</button>
      {balance && <h3>Balance: {balance}</h3>}
    </div>
  );
};
export default Accounts;
