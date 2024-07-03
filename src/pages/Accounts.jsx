import { useState } from "react";
import { Alchemy } from "alchemy-sdk";

const Accounts = () => {
  const [address, setAddress] = useState("");
  const [setBalance] = useState(0);

  const alchemy = new Alchemy(process.env.REACT_APP_ALCHEMY_KEY);

  const getBalance = async () => {
    const newBalance = await alchemy.core.getBalance(address);
    setBalance(newBalance);
  };

  return (
    <div>
      <h2>Accounts</h2>
      <input
        type="text"
        className="input"
        placeholder="Enter Ethereum address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={getBalance}>Get Balance</button>
    </div>
  );
};
export default Accounts;
