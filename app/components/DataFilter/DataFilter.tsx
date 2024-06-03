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
        className="form-select form-select-sm w-[180px]"
        aria-label="Small select example"
        value={selectedColumn}
        onChange={handleColumnChange}
      >
        <option value="">Фильтр по полю</option>
        <option value="cases">Кол. Случаев</option>
        <option value="deaths">Кол. Смертей</option>
        <option value="popData2019">Кол. случаев всего</option>
        <option value="casesPerThousand">Кол. случаев на 1000 жителей</option>
        <option value="deathsPerThousand">Кол. смертей на 1000 жителей</option>
      </select>
      <input
        className="form-control w-[140px]"
        placeholder="значение от"
        value={valueFrom}
        onChange={handleValueFromChange}
      />
      <input
        className="form-control w-[140px]"
        placeholder="значение до"
        value={valueTo}
        onChange={handleValueToChange}
      />
    </div>
  );
};

export default DataFilter;
