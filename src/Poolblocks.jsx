import React, { useEffect, useState } from "react";
import PoolBloskChart from './Components/PoolBloskChart'; // Путь до вашего компонента
import moment from 'moment';
import ScrollToTopButton from './Components/ScrollToTopButton';
moment.defaultFormatUtc = true;


const Poolblocks = () => {
  const [transactions, setTransactions] = useState([]);

  const [startDate, setStartDate] = useState(moment.utc().startOf('day').subtract(1, 'month').add(1, 'day').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment.utc().startOf('day').format('YYYY-MM-DD'));

  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://utxopool.com/api/pool-mining-history/latest`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePrevClick = () => {
    // Перемещаем интервал на месяц назад
    const newStartDate = moment.utc(startDate).startOf('day').subtract(1, 'month').format('YYYY-MM-DD');
    const newEndDate = moment.utc(endDate).startOf('day').subtract(1, 'month').format('YYYY-MM-DD');
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setIsNextDisabled(false);
  };

  const handleNextClick = () => {
    // Перемещаем интервал на месяц вперед
    const newStartDate = moment.utc(startDate).startOf('day').add(1, 'month').format('YYYY-MM-DD');
    const newEndDate = moment.utc(endDate).startOf('day').add(1, 'month').format('YYYY-MM-DD');
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    // Проверяем, если следующий месяц больше или равен текущей дате, то блокируем кнопку "Next Month"
    if (moment.utc(newEndDate).isSameOrAfter(moment.utc().startOf('day'))) {
      setIsNextDisabled(true);
    }
  };

  const truncateMiddle = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }
  
    const startLength = Math.ceil((maxLength - 3) / 2);
    const endLength = Math.floor((maxLength - 3) / 2);
    return `${str.substr(0, startLength)}...${str.substr(str.length - endLength)}`;
  };


  return (
    <div
      id="home-section"
      className="pt-18 z-0 p-2 my-2 w-full rounded-3xl bg-[#060030]"
    >
      <div className="text-center space-y-12 ">
        <h1 className="pb-3">
            Pool mining blocks
            </h1>
        </div>
      <div className="column">
        <div className="table-container">
        {/* <h2>Pool Activity Chart</h2> */}
        <div className="pagination-container">
          <button className="btn btn-primary" onClick={handlePrevClick}>Prev</button>
          <button className="btn btn-primary" onClick={handleNextClick} disabled={isNextDisabled}>Next</button>
        </div>
        
        <PoolBloskChart startDate={startDate} endDate={endDate}/>
        </div>
        <div className="table-container">
          
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Time Found</th>
                  <th>Reward</th>
                  <th>Height</th>
                  <th>Block Hash</th>
                  <th>Miner Address</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.timeFound}</td>
                    <td>{tx.reward}</td>
                    <td>{tx.height}</td>
                    <td className="tx-wtxid">
                      <a
                        href={`https://explorer2.bitcoin-pow.org/block/${tx.blockHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {truncateMiddle(tx.blockHash, 24)} {/* Отобразить первые 4 символа, последние 4 символа и 3 точки в середине */}
                      </a>
                    </td>
                    <td>{tx.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Poolblocks;
