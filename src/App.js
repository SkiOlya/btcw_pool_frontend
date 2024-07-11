import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import { AddressContext } from "./Components/AddressContext";
import Header from "./Components/Header";
import Home from "./Home";
import Top from "./Top";
import FeeCalculation from "./FeeCalculation";
import Poolblocks from "./Poolblocks"
import TransactionAccelerator from "./TransactionAccelerator"

function App() {
  return (
    <AddressContext.Provider value={{}}>
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white flex w-full flex-col">
          <Header />
          <div className="app-main">
            <div className="app-main__outer">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Home key={Home} />
                      {/* <About />
                      <HowToBuy />
                      <TokenomicsSection />
                      <Roadmap />
                      <Team /> */}
                    </>
                  }
                />
                <Route path="/poolblocks" element={<Poolblocks key={Poolblocks} />} />
                <Route path="/topAddresses" element={<Top key={Top} />} />
                <Route
                  path="/feeCalculation"
                  element={<FeeCalculation key={FeeCalculation} />}
                />
                <Route path="/txaccelerator" element={<TransactionAccelerator key={TransactionAccelerator} />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AddressContext.Provider>
  );
}

export default App;
