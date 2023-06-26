import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AllData } from "../App";
import { handelNumbers } from '../Func/helperFunc';
import { SpinnerDotted } from 'spinners-react';

function Landing({ countries, loading, error }) {
  const { dark, option } = useContext(AllData);

  const renderAllCountries = countries.map((item, index) => {
    const {
      flags: { svg },
      name: { common },
      population,
      region,
      capital,
      cca3,
    } = item;
    return (
      <Link key={index + 1} to={`/country-details/${cca3}`}>
        <div className="card" key={index}>
          <div className="img">
            <img src={svg} alt="" />
          </div>
          <div className="info">
            <h3>{common || "Not Available"}</h3>
            <p>
              population: <span>{handelNumbers(population) || "Not Available"}</span>
            </p>
            <p>
              region: <span>{region || "Not Available"}</span>
            </p>
            <p>
              capital: <span>{capital || "Not Available"}</span>
            </p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className={`landing ${ dark ? "dark-mode" : "" }`}>
        {loading && <div style={option}> <SpinnerDotted size={50} thickness={100} speed={100} color="#36ad47" /> </div>}
      <div className="container countries">
        {error === null ? countries && renderAllCountries : <h3>{error}</h3>}
      </div>
    </div>
  );
}



export default Landing;
