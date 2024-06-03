import { CovidData } from "@/app/utility/type";
import React, { useState, useEffect } from "react";
import DataFilter from "../DataFilter/DataFilter";
import PeriodFilter from "../PeriodFilter/PeriodFilter";
import Pagination from "../Pagination/Pagination";

interface DataFilterProps {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentPages: number[];
  setCurrentPage: (page: number) => void;
  nextGroup: () => void;
  prevGroup: () => void;
  totalGroups: number;
  currentGroup: number;
  data: CovidData[];
  resetFilters: () => void;
  startDate: string;
  endDate: string;
  handleStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  applyDateFilter: () => void;
  filteredData: CovidData[];
}

const Schedule: React.FC<DataFilterProps> = ({
  searchTerm,
  handleSearchChange,
  currentPages,
  setCurrentPage,
  nextGroup,
  prevGroup,
  totalGroups,
  currentGroup,
  data,
  resetFilters,
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  applyDateFilter,
  filteredData,
}) => {
  const [localCurrentPage, setLocalCurrentPage] = useState(1);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [valueFrom, setValueFrom] = useState<string>("");
  const [valueTo, setValueTo] = useState<string>("");

  const postsPerPage = 20;

  useEffect(() => {
    setLocalCurrentPage(1);
  }, [searchTerm, startDate, endDate, selectedColumn, valueFrom, valueTo]);

  const filteredPosts = filteredData.filter((item) => {
    const matchesCountry = item.countriesAndTerritories
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCases = searchTerm
      ? item.cases.toString().includes(searchTerm)
      : true;
    const matchesDeaths = searchTerm
      ? item.deaths.toString().includes(searchTerm)
      : true;
    
    let matchesValueRange = true;
    if (selectedColumn && valueFrom && valueTo) {
      const columnValue = item[selectedColumn as keyof CovidData];
      matchesValueRange = columnValue >= parseFloat(valueFrom) && columnValue <= parseFloat(valueTo);
    }

    return (matchesCountry || matchesCases || matchesDeaths) && matchesValueRange;
  });

  const indexOfLastPost = localCurrentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(event.target.value);
  };

  const handleValueFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueFrom(event.target.value);
  };

  const handleValueToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueTo(event.target.value);
  };

  const resetAllFilters = () => {
    resetFilters();
    setSelectedColumn("");
    setValueFrom("");
    setValueTo("");
  };

  return (
    <div className="flex flex-col w-[900px] border-2 bg-slate-300">
      <div className="flex justify-center items-center">
        <div className="input-group mb-1">
          <DataFilter
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            selectedColumn={selectedColumn}
            handleColumnChange={handleColumnChange}
            valueFrom={valueFrom}
            valueTo={valueTo}
            handleValueFromChange={handleValueFromChange}
            handleValueToChange={handleValueToChange}
          />
        </div>
      </div>
      <div className="flex justify-center items-center mx-3">
        <PeriodFilter
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          applyDateFilter={applyDateFilter}
        />
        <button
          type="button"
          className="btn btn-outline-secondary w-42 mb-2 mx-2"
          onClick={resetAllFilters}
        >
          Сбросить фильтры
        </button>
      </div>
      <div className="container mt-2">
        <table className="table-auto w-full text-center text-xs border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Страна</th>
              <th className="border px-4 py-2">Кол. Случаев</th>
              <th className="border px-4 py-2">Кол. Смертей</th>
              <th className="border px-4 py-2">Кол. случаев всего</th>
              <th className="border px-4 py-2">Кол. смертей всего</th>
              <th className="border px-4 py-2">Кол. случаев на 1000 жителей</th>
              <th className="border px-4 py-2">Кол. смертей на 1000 жителей</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((item) => (
              <tr key={`${item.dateRep}-${item.countryterritoryCode}`}>
                <td className="border px-4 py-2">
                  {item.countriesAndTerritories}
                </td>
                <td className="border px-4 py-2">{item.cases}</td>
                <td className="border px-4 py-2">{item.deaths}</td>
                <td className="border px-4 py-2">{item.popData2019}</td>
                <td className="border px-4 py-2">{item.deaths}</td>
                <td className="border px-4 py-2">
                  {((item.cases / item.popData2019) * 1000).toFixed(2)}
                </td>
                <td className="border px-4 py-2">
                  {((item.deaths / item.popData2019) * 1000).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={localCurrentPage}
        setCurrentPage={setLocalCurrentPage}
        totalPosts={filteredPosts.length}
        postsPerPage={postsPerPage}
      />
    </div>
  );
};

export default Schedule;
