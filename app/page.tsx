"use client";

import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Schedule from "./components/Schedule/Schedule";
import Table from "./components/Table/Table";
import axios from "axios";
import { CovidData } from "./utility/type";

export default function Home() {
  const [isActive, setisActive] = useState(true);
  const [data, setData] = useState<CovidData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState<CovidData[]>([]);
  const [countriesList, setCountriesList] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/"
        );
        const records = response.data.records;
        setData(records);
        setFilteredData(records);

        const uniqueCountries = [...new Set(records.map((item: CovidData) => item.countriesAndTerritories))];
        setCountriesList(uniqueCountries);

        // Calculate min and max dates
        const dates = records.map((item: CovidData) => new Date(item.dateRep.split('/').reverse().join('-')));
        const minDate = new Date(Math.min.apply(null, dates));
        const maxDate = new Date(Math.max.apply(null, dates));
        
        // Format dates as yyyy-mm-dd for input fields
        const formatDate = (date: Date) => date.toISOString().split('T')[0];

        setStartDate(formatDate(minDate));
        setEndDate(formatDate(maxDate));
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
    setCurrentPage(1);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
    setCurrentPage(1);
  };

  const applyDateFilter = () => {
    applyFilters();
  };

  const applyFilters = () => {
    let filtered = data;
    if (startDate && endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.dateRep.split('/').reverse().join('-'));
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.countriesAndTerritories.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredData(filtered);
    const uniqueCountries = [...new Set(filtered.map((item: CovidData) => item.countriesAndTerritories))];
    setCountriesList(uniqueCountries);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setFilteredData(data);

    // Reset to the initial date range
    const dates = data.map((item: CovidData) => new Date(item.dateRep.split('/').reverse().join('-')));
    const minDate = new Date(Math.min.apply(null, dates));
    const maxDate = new Date(Math.max.apply(null, dates));

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    setStartDate(formatDate(minDate));
    setEndDate(formatDate(maxDate));

    const uniqueCountries = [...new Set(data.map((item: CovidData) => item.countriesAndTerritories))];
    setCountriesList(uniqueCountries);
  };

  return (
    <div className="container">
      <NavBar isActive={isActive} setisActive={setisActive} />
      <div className="container">
        {isActive ? (
          <Schedule
            data={data}
            currentPages={[]}
            setCurrentPage={setCurrentPage}
            nextGroup={() => {}}
            prevGroup={() => {}}
            totalGroups={1}
            currentGroup={1}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            resetFilters={resetFilters}
            startDate={startDate}
            endDate={endDate}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            applyDateFilter={applyDateFilter}
            filteredData={filteredData}
          />
        ) : (
          <Table countries={countriesList} data={filteredData} />
        )}
      </div>
    </div>
  );
}
