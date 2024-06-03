import React from "react";

interface PeriodFilterProps {
  startDate: string;
  endDate: string;
  handleStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  applyDateFilter: () => void; // Add this line
}

const PeriodFilter: React.FC<PeriodFilterProps> = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  applyDateFilter,
}) => {
  return (
    <div className="flex gap-2 my-2">
      <input
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        className="form-control w-[140px]"
        placeholder="Start Date"
      />
      <input
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        className="form-control w-[140px]"
        placeholder="End Date"
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={applyDateFilter}
      >
        Применить
      </button>
    </div>
  );
};

export default PeriodFilter;
