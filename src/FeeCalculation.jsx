import React, { useEffect, useState } from "react";
import "./loader.css"
import ScrollToTopButton from './Components/ScrollToTopButton';

const FeeCalculation = () => {
  const [transactions, setTransactions] = useState([]);
  const [averageFeePerVSize, setAverageFeePerVSize] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeesData = async () => {
      try {
        setIsLoading(true); 
        const response = await fetch("https://utxopool.com/api/fees/calculate"); 
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTransactions(data.transactions);
        setAverageFeePerVSize(data.averageFeePerVSize);
        setIsLoading(false);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setIsLoading(false);
      }
    };

    fetchFeesData();
  }, []);

  return (
    <div
      id="home-section"
      className="pt-18 z-0 p-2 my-2 w-full rounded-3xl bg-[#060030]"
    >
      <div className="text-center space-y-12 ">
        <h1>Fee calculation</h1>
      </div>
      <div className="row">
        <div className="table-container">
          {isLoading ? (
            <div className="container">
              <div className="loader">
                <div className="ball moving"></div>
                <div className="balls">
                  <div className="ball"></div>
                  <div className="ball"></div>
                  <div className="ball"></div>
                  <div className="ball"></div>
                  <div className="ball moving"></div>
                </div>
              </div>

              <svg>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                </filter>
              </svg>
            </div>
          ) : (
            <>
              <h1 className="pb-3">
              Average fee rate: {averageFeePerVSize.toFixed(8)}
              </h1>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Fee per VSize</th>
                      <th>VSize</th>
                      <th>Wtxid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, index) => (
                      <tr key={index}>
                        <td>{tx.feePerVSize.toFixed(8)}</td>
                        <td>{tx.vSize}</td>
                        <td className="tx-wtxid">
                          <a
                            href={`https://explorer2.bitcoin-pow.org/tx/${tx.wtxid}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {tx.wtxid}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default FeeCalculation;
