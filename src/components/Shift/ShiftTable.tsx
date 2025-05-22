import React, { useEffect, useState } from "react";
import { getShifts, deleteShift } from "../../api/Shift.api";
import { ShiftResponse } from "../../types/Shift.type";
import { useNavigate } from "react-router-dom";

const ShiftTable: React.FC = () => {
  const [shifts, setShifts] = useState<ShiftResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getShifts().then(setShifts);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este turno?")) {
      await deleteShift(id);
      setShifts(shifts.filter(s => s.id !== id));
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Turnos</h1>
      <button onClick={() => navigate('/shifts/new')} style={{marginBottom: 16}}>Crear Turno</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Conductor</th>
            <th>Moto</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Estado</th>
            <th>Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map(shift => (
            <tr key={shift.id}>
              <td>{shift.id}</td>
              <td>{shift.driver?.name}</td>
              <td>{shift.motorcycle?.license_plate}</td>
              <td>{new Date(shift.start_time).toLocaleString()}</td>
              <td>{new Date(shift.end_time).toLocaleString()}</td>
              <td>{shift.status}</td>
              <td>{new Date(shift.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => navigate(`/shifts/${shift.id}/edit`)}>Editar</button>
                <button onClick={() => handleDelete(shift.id)} style={{color: "red", marginLeft: 8}}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftTable;