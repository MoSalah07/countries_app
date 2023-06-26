import Home from "./pages/Home";
import Header from "./Components/Header";
import CountryDetails from "./pages/CountryDetails";
import {Route, Routes} from 'react-router-dom'
import { createContext} from 'react';
import Mode from "./Func/Mode";

export const AllData = createContext();

function App() {
  const { dark, switchMode } = Mode();


  const option = {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

    return (
    <AllData.Provider value={{dark, switchMode, option}}>
      <div className={`app ${dark ? 'dark-mode' : ''}`}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/country-details/:name' element={<CountryDetails />} />
        </Routes>
      </div>
    </AllData.Provider>
  );
}

export default App;
