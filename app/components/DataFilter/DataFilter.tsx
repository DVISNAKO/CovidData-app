import React from "react";

interface DataFilterProps {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedColumn: string;
  handleColumnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  valueFrom: string;
  valueTo: string;
  handleValueFromChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleValueToChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DataFilter: React.FC<DataFilterProps> = ({
  searchTerm,
  handleSearchChange,
  selectedColumn,
  handleColumnChange,
  valueFrom,
  valueTo,
  handleValueFromChange,
  handleValueToChange,
}) => {
  return (
    <div className="flex gap-2 my-3">
      <div className="data-filter ml-2">
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          type="text"
          className="form-control w-[140px]"
          placeholder="Поиск по стране"
          aria-label="Поиск по стране"
          aria-describedby="button-addon2"
        />
      </div>
      <select
        value={selectedColumn}
        onChange={handleColumnChange}
        className="form-select form-select-sm w-[180px]"
        aria-label="Small select example"
      >
        <option value="">Фильтр по полю</option>
        <option value="cases">Кол. Случаев</option>
        <option value="deaths">Кол. Смертей</option>
        <option value="popData2019">Кол. случаев всего</option>
      </select>

      <input
        value={valueFrom}
        onChange={handleValueFromChange}
        type="number"
        className="form-control w-[140px]"
        placeholder="значение от"
      />
      <input
        value={valueTo}
        onChange={handleValueToChange}
        type="number"
        className="form-control w-[140px]"
        placeholder="значение до"
      />
    </div>
  );
};

export default DataFilter;
