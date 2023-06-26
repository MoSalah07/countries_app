import { useEffect, useState, useRef } from "react";
import Landing from "../Components/Landing";
import Search from "../Components/Search";
import { sortData } from "../Func/helperFunc";

function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();
  const selectRef = useRef();

  const handelInput = () => {
    const inputValue = inputRef.current.value;
    if (inputValue.trim()) {
      const fetchSearch = async () => {
        try {
          setLoading(true);
          const api = await fetch(
            `https://restcountries.com/v3.1/name/${inputValue}`
          );
          if (!api.ok) {
            throw Error("Not Found Item");
          }
          const data = await api.json();
          await sortData(data);
          setCountries(data);
          setLoading(false);
          setError(null);
        } catch (err) {
          setError( err.message );
          setLoading(false);
        }
      };
      fetchSearch();
    } else {
      fetchAllData();
    }
  };


  const handelSelect = () => {
    const selectValue = selectRef.current.value;
    if (selectValue.trim()) {
      const fetchSelect = async () => {
        setLoading(true);
        const api = await fetch(
          `https://restcountries.com/v3.1/region/${selectValue}`
        );
        const data = await api.json();
        await sortData(data);
        setCountries(data);
        setLoading(false);
      };
      if (selectValue === `All`) {
        fetchAllData();
      }
      fetchSelect();
    }
  };

  // Fetch All Data
  const fetchAllData = async () => {
    setLoading(true);
    const api = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await api.json();
    await sortData(data);
    setCountries( data );
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  // Fetch All Data
  return (
    <>
      <Search
        handelInput={handelInput}
        handelSelect={handelSelect}
        inputRef={inputRef}
        selectRef={selectRef}
      />
      <Landing countries={countries} loading={loading} error={error} />
    </>
  );
}

export default Home;
