import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShift, updateShift } from "../../api/Shift.api";
import { getDrivers } from "../../api/driver.api";
import { getMotorcycles } from "../../api/motorcycle.api";
import ShiftForm from "./ShiftForm";
import { ShiftData } from "../../types/Shift.type";
import { DriverResponse } from "../../types/driver.type";
import { MotorcycleResponse } from "../../types/Motorcycle.type";

const ShiftEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState<Partial<ShiftData>>();
  const [drivers, setDrivers] = useState<DriverResponse[]>([]);
  const [motorcycles, setMotorcycles] = useState<MotorcycleResponse[]>([]);

  useEffect(() => {
    getDrivers().then(setDrivers);
    getMotorcycles().then(setMotorcycles);
    if (id) {
      getShift(Number(id)).then(shift => {
        setDefaultValues(shift);
      });
    }
  }, [id]);

  return (
    <ShiftForm
      defaultValues={defaultValues}
      drivers={drivers}
      motorcycles={motorcycles}
      onSubmit={async (data) => {
        if (id) {
          await updateShift(Number(id), data);
          navigate("/shifts");
        }
      }}
    />
  );
};

export default ShiftEditPage;