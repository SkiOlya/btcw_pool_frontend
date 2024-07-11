import React, { useEffect, useState } from "react";
import Modal from "./Components/Modal";
import "./home_container.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark,faTable } from "@fortawesome/free-solid-svg-icons";

const TransactionAccelerator = () => {
  const [transactionsAccelerator, setTransactionsAccelerator] = useState([]);
  const [valueTransaction, setValueTransaction] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [responseType, setResponseType] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [showTable, setShowTable] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const [transactionAcceleratorStats, setTransactionAcceleratorStats] = useState({ countTransactionAccelerator: 0, countConfirmedTransactionAccelerator: 0 });


  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  useEffect(() => {
    fetch('https://utxopool.com/api/transaction-accelerator/stats')//https://utxopool.com
        .then(response => response.json())
        .then(data => setTransactionAcceleratorStats(data))
        .catch(error => console.error('Error fetching mining stats:', error));
  }, []);

  const handleChangeTransaction = (e) => {
    const transactionValue = e.target.value.trim();
    setValueTransaction(transactionValue);
  
    if (transactionValue.length !== 64) {
      setErrorMessage('Transaction ID must be exactly 64 characters long.');
      setIsButtonDisabled(true);
    } else {
      setErrorMessage('');
      setIsButtonDisabled(false);
    }
  };

  const handleSubmitTransaction = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    const payload = {
      transactionId: valueTransaction
    };
  
    try {
      const response = await fetch('https://utxopool.com/api/transaction-accelerator', {//utxopool.com
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setModalMessage(data.message);
        setResponseType('success'); // Устанавливаем тип ответа на 'success'
        if (showTable) {
          fetchData(); 
        }
      } else {
        throw new Error(data.message); // Генерируем ошибку с сообщением от бекенда
      }
    } catch (error) {
      console.error('Error submitting transaction:', error);
      setModalMessage(error.message || 'Failed to submit transaction');
      setResponseType('error');
    }
    setIsLoading(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://utxopool.com/api/transactions-accelerator-table`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTransactionsAccelerator(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  const handleShowTable = async () => {
    setIsLoadingTable(true); // Показываем индикатор загрузки
    await fetchData(); // Загружаем данные
    setShowTable(true); // Показываем таблицу
    setIsLoadingTable(false); // Скрываем индикатор загрузки
  };

  return (
    <div
      id="home-section"
      className="pt-18 z-0 p-2 w-full h-100vh rounded-3xl bg-[#060030]"
    >
      <div className=" text-center space-y-2 py-2">
        <h1>BTCW Transaction Accelerator</h1>
      </div>
      <div className="row">
        {/* <div className="col-md-7 col-xl-4">
        </div> */}
        <div className="col-md-7 col-xl-7">
          <div className="container_byu space-y-5">
            <div className="brand-title text-center">Submit Transaction for Acceleration</div>
            <div className="inputs">
              <label>Please enter Transaction ID</label>
              <div className="container_byu_input">
                {/* <img src={token} className="byu_input-icon" /> */}
                <input
                  className="byu_input"
                  type="text"
                  placeholder="0"
                  value={valueTransaction}
                  onChange={handleChangeTransaction}
                />
                {errorMessage && <div style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</div>}
              </div>

              <button className="container_byu_button " disabled={isButtonDisabled} type="submit" onClick={() => {
                          handleSubmitTransaction();
                        }}>
                {isLoading ? "Processing..." : "Add Transaction"}
              </button>
              {/* disabled */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                className="bg-[#3d385a] text-center rounded-md w-full px-2 py-4 border-l-4 border-[#28A0F0] overflow-hidden text-2xl"
                style={{ flex: 1, marginRight: '10px' }}
                id="headlessui-disclosure-panel-:r3b:"
                data-headlessui-state="open"
              >
                <h1>
                  {transactionAcceleratorStats.countTransactionAccelerator}
                </h1>
                <h3 className="info-text">
                  Transactions in queue
                </h3>
              </div>
              <div
                className="bg-[#3d385a] text-center rounded-md w-full px-2 py-4 border-l-4 border-[#28A0F0] overflow-hidden text-2xl"
                style={{ flex: 1 }}
                id="headlessui-disclosure-panel-:r3b:"
                data-headlessui-state="open"
              >
                <h1>
                  {transactionAcceleratorStats.countConfirmedTransactionAccelerator}
                </h1>
                <h3 className="info-text">
                Total Accelerated Transactions
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!showTable && (
         <div className="row pt-5">
          <button className="btn btn-primary modal-close-btn" onClick={handleShowTable}>
          {isLoadingTable ? "Loading..." : <div> <FontAwesomeIcon icon={faTable} /> Show a list of queued transactions</div>}
        </button>
         </div>
        
      )}
      {showTable && (
        transactionsAccelerator && transactionsAccelerator.length > 0 ? 
        <div className="row">
          <div className="table-container">
          <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Wtxid</th>
                <th>Date added</th>
                </tr>
                </thead>
                <tbody>
                  {transactionsAccelerator.map((tx, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="tx-wtxid">
                        <a
                          href={`https://explorer2.bitcoin-pow.org/tx/${tx.transactionId}`}
                          target="_blank"
                          rel="noreferrer"
                          >
                            {tx.transactionId}
                        </a>
                      </td>
                      <td>{tx.dateAdded}</td>
                    </tr>
                  ))}
                </tbody>
          </table>
        </div>
        </div>
        </div>
        : <h2 className="brand-title text-center">Table is empty</h2>
      )}
      
      <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <div style={{color: "#000000", marginBottom:"15px", marginLeft:"25px", alignItems: "center"}}>
          {isLoading ? (
            <div className="">
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
          ) : responseType === 'success' ? (
            <div style={{ display: "flex", alignItems: "center", wordWrap: "break-word", overflowWrap: "break-word" }}>
              <div style={{ marginRight: "10px" }}>
                <FontAwesomeIcon icon={faCircleCheck} size="2xl" style={{color: "#00ad62", marginRight: "5px"}} />
              </div>
              <div style={{ wordWrap: "break-word", overflowWrap: "break-word", maxWidth: "90%" }}>
                {modalMessage}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", wordWrap: "break-word", overflowWrap: "break-word" }}>
              <div style={{ marginRight: "10px" }}>
                <FontAwesomeIcon icon={faCircleXmark} size="2xl" style={{color: "#fb1d04", marginRight: "5px"}} />
              </div>
              <div style={{ wordWrap: "break-word", overflowWrap: "break-word", maxWidth: "90%" }}>
                {modalMessage}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TransactionAccelerator;