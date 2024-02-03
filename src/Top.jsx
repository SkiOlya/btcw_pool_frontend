import React, { useEffect, useState } from "react";
const StatisticsTable = ({
  statistics,
  onAddressClick,
  currentPage,
  itemsPerPage,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Mining address</th>
          <th>Amount of blocks</th>
          <th>Total mined BTCW</th>
          <th>Today's Mined Blocks</th>
        </tr>
      </thead>
      <tbody>
        {statistics.map((stat, index) => (
          <tr key={index}>
            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td>
              <button
                onClick={() => onAddressClick(stat.address)}
                style={{
                  background: "none",
                  color: "inherit",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {stat.address}
              </button>
              {/* {stat.address} */}
              {/* <a href="#" onClick={() => onAddressClick(stat.address)}>
                {stat.address}
              </a> */}
            </td>
            <td>{stat.amountBlocks}</td>
            <td>{stat.totalMined}</td>
            <td>{stat.todaysMinedBlocks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Компонент для отображения второй таблицы
const AddressStatisticsTable = ({ statistics }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Mined Blocks</th>
        </tr>
      </thead>
      <tbody>
        {statistics.map((stat, index) => (
          <tr key={index}>
            <td>{stat.formatted_date}</td>
            <td>{stat.reward_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  return (
    <div className="pagination-container">
      {Array.from({ length: pageCount }, (_, index) => index + 1).map(
        (page) => (
          <button
            className="btn btn-primary"
            key={page}
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

const Top = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 300;

  const [statistics, setStatistics] = useState([]);
  const [addressStats, setAddressStats] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    // Загрузка статистики при монтировании компонента
    fetchStatistics();
  }, [currentPage]);

  const fetchStatistics = async () => {
    console.log("Начинаю запрос ");
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    setSelectedDate(formattedDate);
    try {
      const response = await fetch(
        `http://83.147.245.64/api/aggregated-data?page=${currentPage}&limit=${itemsPerPage}` //185.124.108.45    83.147.245.64
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setStatistics(result.data);
      setTotalItems(result.totalItems);
    } catch (error) {
      console.error("Ошибка при загрузке данных: ", error);
    }
  };

  useEffect(() => {
    // Проверяем, есть ли данные в statistics и устанавливаем первый адрес
    if (statistics.length > 0) {
      setSelectedAddress(statistics[0].address);
      handleAddressClick(statistics[0].address);
    }
  }, [statistics]);

  const fetchData = async (startDate, endDate, address) => {
    const response = await fetch(
      `http://83.147.245.64/api/statisticsaddress?startdate=${startDate}&enddate=${endDate}&address=${address}` //localhost:8080
    );
    const rawData = await response.json();
    // Преобразование массива массивов в массив объектов
    const processedData = rawData.map((item) => ({
      formatted_date: item[0],
      reward_count: item[1],
    }));
    return processedData;
  };

  const handleAddressClick = async (address) => {
    setSelectedAddress(address);
    const startDate = "2023-12-05"; // Пример начальной даты
    const endDate = selectedDate;
    // const endDate = "2024-01-19"; // Пример конечной даты
    const data = await fetchData(startDate, endDate, address);
    setAddressStats(data);
  };

  // Обработчик изменения страницы
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      id="home-section"
      className="pt-18 z-0 p-2 my-2 w-full rounded-3xl bg-[#060030]"
    >
      <div className="text-center space-y-12 "></div>
      <div className="row">
        <div className="col-10 col-xl-7">
          <h2>Request Date: {selectedDate}</h2>
          <h1>Statistics</h1>
          <Pagination
            totalItems={totalItems} // Общее количество элементов
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <StatisticsTable
            statistics={statistics}
            onAddressClick={handleAddressClick}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
          <Pagination
            totalItems={totalItems} // Общее количество элементов
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="col-5 col-xl-3">
          {selectedAddress && (
            <>
              <h1>Statistics for Address:</h1>
              <h2>{selectedAddress}</h2>
              <AddressStatisticsTable statistics={addressStats} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Top;
