import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShift } from "../../api/Shift.api"; // <-- lowercase "shift"
import { getDrivers } from "../../api/driver.api";
import { getMotorcycles } from "../../api/motorcycle.api";
import ShiftForm from "./ShiftForm";
import { ShiftData } from "../../types/Shift.type";
import { DriverResponse } from "../../types/driver.type";
import { MotorcycleResponse } from "../../types/Motorcycle.type";

const ShiftCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState<DriverResponse[]>([]);
  const [motorcycles, setMotorcycles] = useState<MotorcycleResponse[]>([]);

  useEffect(() => {
    getDrivers().then(setDrivers);
    getMotorcycles().then(setMotorcycles);
  }, []);

  return (
    <ShiftForm
      drivers={drivers}
      motorcycles={motorcycles}
      onSubmit={async (data: ShiftData) => {
        await createShift(data);
        navigate("/shifts");
      }}
    />
  );
};

export default ShiftCreatePage;