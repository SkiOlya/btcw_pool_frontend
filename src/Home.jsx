import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Modal from "./Components/Modal";
import "./home_container.css";
import "./home_tooltip.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [stats, setStats] = useState({ count: 0, totalReward: 0 });
  const [valueUtxo, setValueUtxo] = useState('');
  const [valueSum, setValueSum] = useState(0);
  const [valueAddress, setValueAddress] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleChangeUtxo = (e) => {
    const utxoValue = e.target.value;
    // Разрешаем ввод только целых чисел
    if (/^\d*$/.test(utxoValue)) {
      setValueUtxo(utxoValue);
      // Рассчитываем valueSum на основе введённого количества UTXO
      const ratio = 0.0055;
      const sumValue = utxoValue ? parseInt(utxoValue) * ratio : 0;
      setValueSum(parseFloat(sumValue.toFixed(4)));
    }
  };

  useEffect(() => {
    fetch('https://utxopool.com/api/pool-mining-history/stats')
        .then(response => response.json())
        .then(data => setStats(data))
        .catch(error => console.error('Error fetching mining stats:', error));
  }, []);

  return (
    <div
      id="home-section"
      className="pt-18 z-0 p-2 w-full h-100vh rounded-3xl bg-[#060030]"
    >
      <div className=" text-center space-y-2 py-2">
        <h1>Welcome to BTCW UTXO Pool !</h1>
        {/* <h1>Under Construction</h1>
        <div className="row flex justify-center items-center">
          <div className="col-10 col-sm-6 col-md-6 col-xl-3 w-full rounded-2xl">
            <img className="rounded-2xl logo" src={home} alt="home"></img>
          </div>
        </div>

        <h2>
          We are excited to introduce BTCW Pool. Our platform is currently under
          development
        </h2>
        <h2>
          While we put the finishing touches on BTCW Pool, check out the current
          top mining addresses on our network.
        </h2> */}
      </div>
      <div className="row">
        <div className="col-md-7 col-xl-4">
          <div className=" text-center row bg-[#110e26] rounded-lg w-full m-3 p-4 space-y-4 shadow-border-blue-500 flex items-center">
          <div
            className="bg-[#3d385a] rounded-md w-full px-2 py-4 border-l-4 border-[#28A0F0] overflow-hidden text-2xl"
            id="headlessui-disclosure-panel-:r3b:"
            data-headlessui-state="open"
          >
            <h1>
              10000000
            </h1>
            <h3 className="info-text">
              Pool utxo
            </h3>
          </div>
          <div
            className="bg-[#3d385a] rounded-md w-full px-2 py-4 border-l-4 border-[#28A0F0] overflow-hidden text-2xl"
            id="headlessui-disclosure-panel-:r3b:"
            data-headlessui-state="open"
          >
            <h1>
              1
            </h1>
            <h3 className="info-text">
              Miners
            </h3>
          </div>
          <div
            className="bg-[#3d385a] rounded-md w-full px-2 py-4 border-l-4 border-[#28A0F0] overflow-hidden text-2xl"
            id="headlessui-disclosure-panel-:r3b:"
            data-headlessui-state="open"
          >
            <h1>
              20%
            </h1>
            <h3 className="info-text">
              Pool Fee
            </h3>
          </div>
          <div
            className="bg-[#3d385a] rounded-md w-full px-2 py-4 border-l-4 border-[#28A0F0] overflow-hidden text-2xl"
            id="headlessui-disclosure-panel-:r3b:"
            data-headlessui-state="open"
          >
            <div className="flex-container">
              <div>
                <h1>
                  {stats.count}
                </h1>
                <h3 className="info-text">
                  Blocks mining
                </h3>
              </div>
              <div className="diagonal-divider"></div>
              <div>
              <h1>
                {Math.floor(Number(stats.totalReward))}
                </h1>
                <h3 className="info-text">
                  BTCW mined
                </h3>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="col-md-7 col-xl-7">
          <div className="container_byu">
          {/* <div className="brand-logo"></div> */}
          <div className="brand-title text-center">Byu UTXO in pool</div>
          <div className="inputs">
            <label>UTXO count</label>
            <div className="container_byu_input">
              {/* <img src={token} className="byu_input-icon" /> */}
              <input
                className="byu_input"
                type="text"
                placeholder="0"
                value={valueUtxo}
                onChange={handleChangeUtxo}
              />
            </div>
            
            <label>Price (BTCW)</label>
            <div className="container_byu_input_disabled">
              {/* <img src={usdt} className="byu_input-icon" /> */}
              <input
                className="byu_input"
                type="text"
                placeholder="0"
                disabled
                value={valueSum}
              />
            </div>

            <label>Your address for payment of rewards
              <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip className='custom-tooltip'>
                  In this field you must enter your address to which you have access. 
                  Payments from the pool will be sent to this address, 
                  and you will also use this address to identify yourself on the pool.
                </Tooltip>}
                >
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    className="ml-1"
                    style={{ verticalAlign: "top" }}
                  />
                </OverlayTrigger>
            </label>
            <div className="container_byu_input">
              {/* <img src={usdt} className="byu_input-icon" /> */}
              <input
                className="byu_input"
                type="text"
                placeholder="0"
                value={valueAddress}
              />
            </div>

            <button className="container_byu_button " disabled type="submit" onClick={() => {
                        openModal();
                      }}>
              SOON...
            </button>
            {/* disabled */}
          </div>
        </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {/* <NFTInformation gpu={selectedGPU} networks={networks} /> */}
        <h1>Welcome to BTCW UTXO Pool !</h1>
        {valueAddress}
      </Modal>
    </div>
  );
};

export default Home;
//Get payment address