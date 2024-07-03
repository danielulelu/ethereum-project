import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Accounts from "./pages/Accounts.jsx";
import TransactionDetails from "./components/TransactionDetails.jsx";
import TransactionsList from "./components/TransactionsList.jsx";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockDetails, setBlockDetails] = useState(null);


  // adding pagination
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);

  const getBlockDetails = async (blockNumber) => {
    const block = await alchemy.core.getBlockWithTransactions(blockNumber);
    setBlockDetails(block);
  };

  const totalTransactions = blockDetails ? blockDetails.transactions.length : 0;
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
  const currentTransactions = blockDetails
    ? blockDetails.transactions.slice(
        (currentPage - 1) * transactionsPerPage,
        currentPage * transactionsPerPage
      )
    : [];

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Ethereum Explorer</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/accounts">Accounts</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route path="/" exact>
            <h2>Block Number: {blockNumber}</h2>
            <button onClick={() => getBlockDetails(blockNumber)}>
              Get Block Details
            </button>

            {blockDetails && (
              <div>
                <h3>Block Details</h3>
                <table className="block-details">
                  <tbody>
                    <tr>
                      <td>Number:</td>
                      <td>{blockDetails.number}</td>
                    </tr>
                    <tr>
                      <td>Timestamp:</td>
                      <td>
                        {new Date(
                          blockDetails.timestamp * 1000
                        ).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Hash:</td>
                      <td>{blockDetails.hash}</td>
                    </tr>
                    <tr>
                      <td>Parent Hash:</td>
                      <td>{blockDetails.parentHash}</td>
                    </tr>
                    <tr>
                      <td>Miner:</td>
                      <td>{blockDetails.miner}</td>
                    </tr>
                    <tr>
                      <td>Gas Used:</td>
                      <td>{blockDetails.gasUsed.toString()}</td>
                    </tr>
                    <tr>
                      <td>Gas Limit:</td>
                      <td>{blockDetails.gasLimit.toString()}</td>
                    </tr>
                    <tr>
                      <td>Transactions:</td>
                      <td>{blockDetails.transactions.length}</td>
                    </tr>
                  </tbody>
                </table>
                <TransactionsList
                  transactions={currentTransactions}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
             
            )}
          </Route>

          <Route path="/accounts" element={<Accounts />}>
            <Accounts />
          </Route>
          <Route path="/details" element={<TransactionDetails />}>
            <TransactionDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
