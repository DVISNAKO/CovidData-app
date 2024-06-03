import React from "react";

interface PeriodFilterProps {
  startDate: string;
  endDate: string;
  handleStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PeriodFilter: React.FC<PeriodFilterProps> = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
}) => {
  return (
    <div className="flex gap-3 items-center mb-2 mr-2">
      <label htmlFor="startDate">Период от:</label>
      <input
        className="form-control w-[140px]"
        type="date"
        id="startDate"
        value={startDate}
        onChange={handleStartDateChange}
      />
      <label htmlFor="endDate">До:</label>
      <input
        className="form-control w-[140px]"
        type="date"
        id="endDate"
        value={endDate}
        onChange={handleEndDateChange}
      />
    </div>
  );
};

export default PeriodFilter;
