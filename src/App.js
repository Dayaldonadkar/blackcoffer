import { useEffect, useState } from "react";
import "./App.css";

import UserData from "./jsondata.json";
import BarChart from "./Component/Barchart";

console.log(UserData);

function App() {
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  // const [userData, setUserData] = useState({
  //   labels: filteredData.map((data) => data.country),
  //   datasets: [
  //     {
  //       label: "Users Gained",
  //       data: UserData.map((data) => data.intensity),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });

  useEffect(() => {
    const getUniqueCountries = () => {
      const countries = UserData?.map((item) => item?.country);
      const uniqueCountries = [...new Set(countries)];
      return uniqueCountries;
    };
    setUniqueCountries(getUniqueCountries);
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (selectedCountry) {
        const filteredItems = UserData?.filter(
          (item) => item?.country === selectedCountry
        );
        setFilteredData(filteredItems);
      }
    };
    filterData();
  }, [selectedCountry]);

  const handleCountryChange = () => {
    let countryId = document.getElementById("countryDropdown");
    //   console.log(userSortValue, "userSort");
    let countryValue = countryId.options[countryId.selectedIndex].value;
    // console.log(sort_value, "sortvalue");
    setSelectedCountry(countryValue);
  };

  // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT

  return (
    <div>
      <label htmlFor="countryDropdown">Select a country:</label>
      <select
        id="countryDropdown"
        onChange={handleCountryChange}
        value={selectedCountry || ""}
      >
        <option value="" disabled>
          Select a country
        </option>
        {uniqueCountries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <div>
        <ul className="text-black">
          {filteredData.map((item) => {
            return (
              <li>
                {item?.intensity} - {item?.country}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
