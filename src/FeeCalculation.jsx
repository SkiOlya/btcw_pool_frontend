import React, { useEffect, useState } from "react";

const FeeCalculation = () => {
  const [transactions, setTransactions] = useState([]);
  const [averageFeePerVSize, setAverageFeePerVSize] = useState(0);

  useEffect(() => {
    // Здесь функция для получения данных о комиссиях и обновления состояний
    const fetchFeesData = async () => {
      try {
        const response = await fetch("http://83.147.245.64/api/fees/calculate"); // Используйте ваш правильный URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTransactions(data.transactions);
        setAverageFeePerVSize(data.averageFeePerVSize);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchFeesData();
  }, []);

  return (
    <div
      id="home-section"
      className="pt-18 z-0 p-2 my-2 w-full rounded-3xl bg-[#060030]"
    >
      <div className="text-center space-y-12 "></div>
      <div className="row">
        <div className="table-container">
          <h1 className="pb-3">
            Average fee rate: {averageFeePerVSize.toFixed(8)}
            {/* Average Fee per VSize: {averageFeePerVSize.toFixed(8)} sats/vByte */}
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
        </div>
      </div>
    </div>
  );
};

export default FeeCalculation;
