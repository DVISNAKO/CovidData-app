import React, { FC } from "react";

interface NavBarProps {
  isActive: boolean;
  setisActive: (value: boolean) => void;
}

const NavBar: FC<NavBarProps> = ({ isActive, setisActive }) => {
  const handleTableClick = () => {
    setisActive(false);
  };

  const handleScheduleClick = () => {
    setisActive(true);
  };

  return (
    <div>
      <ul className="flex nav gap-1 mx-3 my-2">
        <li className="nav-item">
          <button
            type="button"
            className={`btn btn-light ${!isActive ? "active" : ""}`}
            onClick={handleTableClick}
          >
            Таблица
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`btn btn-light ${isActive ? "active" : ""}`}
            onClick={handleScheduleClick}
          >
            График
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;