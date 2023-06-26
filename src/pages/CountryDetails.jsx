import React, { useContext, useEffect, useState } from "react";
import { AllData } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowSmLeft } from 'react-icons/hi';
import { handelNumbers } from '../Func/helperFunc';
import { SpinnerDotted } from 'spinners-react';

function CountryDetails() {
  const {dark, option } = useContext(AllData);
  const params = useParams();
  const [countries, setCountries] = useState( [] );
  const [loading, setLoading] = useState( false );
  const navigate = useNavigate();


  const goBack = () => {
    navigate( '/' );
  };


  const handelBorder = (code) => {
    navigate(`/country-details/${code}`)
  }

  const fetchByCode = async (code) => {
    setLoading(true);
    const api = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await api.json();
    setCountries(data);
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    fetchByCode(params.name);
  }, [params.name]);

  // Render Elements Complex
  const renderElementByCode = countries.map((item, key) => {
    const {
      flags: { svg },
      population = "Not Available",
      name: { common = "Not Available", nativeName = "Not Available" },
      region = "Not Available",
      subregion = "Not Available",
      capital = "Not Available",
      tld = "Not Available",
      currencies = "Not Available",
      languages = [],
      borders = [],
    } = item;


    const native = Object.values(nativeName);
    const renderNative = native.map((item) => item.common);
    const currency = Object.values( currencies );

    const lang = Object.values(languages).map((item, index) => (
      <span key={index}>{item}</span>
    ));

    // let border = [];
    const border = borders?.map((item, index) => (
      <span onClick={() => handelBorder(item)} key={index}>{item}</span>
    ));
    
    return (
      <div className="wrapper container" key={key}>
        <div className="back" onClick={goBack}>
          <HiArrowSmLeft/>
          <button>back</button>
        </div>
        <div className="card">
          <div className="img">
            <img src={svg} alt="" />
          </div>
          <div className="container-details">
            <div className="common-details">
              <div className="left-col">
                <h3>{common}</h3>
                <p>
                  native name: <span>{renderNative[0] || "Not Available"}</span>
                </p>
                <p>
                  population: <span>{handelNumbers(population) || "Not Available"}</span>
                </p>
                <p>
                  region: <span>{region || "Not Available"}</span>
                </p>
                <p>
                  subregion: <span>{subregion || "Not Available"}</span>
                </p>
                <p>
                  native name: <span>{capital || "Not Available"}</span>
                </p>
              </div>
              <div className="right-col">
                <p>
                  top level domain: <span>{tld[0] || "Not Available"}</span>
                </p>
                <p>
                  currencies: <span>{currency[0].name || "Not Available"}</span>
                </p>
                <p>languages:{lang.length === 0 ? <span>Not Available</span> : lang }</p>
              </div>
            </div>
            <div className="borders">
              <p>
                Border Countries:{" "}
                {border.length === 0 ? <span className="border-empty">Not Available</span> : border}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={`country-details ${dark ? 'dark-mode' : ''}`}>
      {loading && <div style={option}> <SpinnerDotted size={50} thickness={100} speed={100} color="#36ad47" /> </div>}
      {countries && renderElementByCode}
    </div>
  );
}

export default CountryDetails;
