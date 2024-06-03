import React, { useState, useEffect } from "react";
import Chart from "../Chart/Chart"; // Import the Chart component
import { CovidData } from "../../utility/type"; // Adjust the path as needed

interface TableProps {
  countries: string[]; // Array of country names
  data: CovidData[]; // Array of Covid data
}

const Table: React.FC<TableProps> = ({ countries, data }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [filteredData, setFilteredData] = useState<CovidData[]>([]);

  useEffect(() => {
    const filtered = data.filter(
      (item) => item.countriesAndTerritories === selectedCountry
    );
    setFilteredData(filtered);
  }, [selectedCountry, data]);

  return (
    <div className="w-[700px] border-2 bg-slate-200">
      <div className="flex gap-5 items-center mt-3">
        <h2 className="ml-5">Страна</h2>
        <select
          className="form-select form-select-sm w-32"
          aria-label="Small select example"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="w-[480px] h-[400px] border-2 m-2">
        <Chart data={filteredData} />
      </div>
    </div>
  );
};

export default Table;
