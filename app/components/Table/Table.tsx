'use client'

import React, { useState, useEffect } from "react";
import Chart from "../Chart/Chart"; // Import the Chart component
import { CovidData } from "../utility/type"; // Import the type for CovidData

interface TableProps {
  countries: string[]; // Array of country names
  data: CovidData[]; // Array of all data
}

const Table: React.FC<TableProps> = ({ countries, data }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(countries[0]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filteredData, setFilteredData] = useState<CovidData[]>([]);

  useEffect(() => {
    const filterData = () => {
      let countryData = data.filter(item => item.countriesAndTerritories === selectedCountry);
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        countryData = countryData.filter(item => {
          const itemDate = new Date(item.dateRep.split('/').reverse().join('-'));
          return itemDate >= start && itemDate <= end;
        });
      }
      setFilteredData(countryData);
    };

    filterData();
  }, [selectedCountry, startDate, endDate, data]);

  useEffect(() => {
    // Automatically set date range to the min and max dates from data when data or selectedCountry changes
    if (data.length > 0 && selectedCountry) {
      const countryData = data.filter(item => item.countriesAndTerritories === selectedCountry);
      const dates = countryData.map((item: CovidData) => new Date(item.dateRep.split('/').reverse().join('-')));
      const minDate = new Date(Math.min.apply(null, dates));
      const maxDate = new Date(Math.max.apply(null, dates));
      setStartDate(minDate.toISOString().split('T')[0]);
      setEndDate(maxDate.toISOString().split('T')[0]);
    }
  }, [data, selectedCountry]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <div className="w-[700px] border-2 bg-slate-200">
      <div className="flex gap-5 items-center mt-3">
        <h2 className="ml-5">Страна</h2>
        <select
          className="form-select form-select-sm w-32"
          aria-label="Small select example"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Все страны</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-5 items-center mt-3 ml-5">
        <label>Начальная дата</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
        <label>Конечная дата</label>
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </div>
      <div className="w-[480px] h-[400px] border-2 m-2">
        <Chart data={filteredData} />
      </div>
    </div>
  );
};

export default Table;
