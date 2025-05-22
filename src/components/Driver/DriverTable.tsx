import React, { useEffect, useState } from "react";
import { getDrivers, deleteDriver } from "../../api/driver.api";
import { DriverResponse } from "../../types/driver.type";
import { useNavigate } from "react-router-dom";

const DriverTable: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDrivers().then(setDrivers);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este conductor?")) {
      await deleteDriver(id);
      setDrivers(drivers.filter(d => d.id !== id));
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Conductores</h1>
      <button onClick={() => navigate('/drivers/new')} style={{marginBottom: 16}}>Crear Conductor</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Licencia</th>
            <th>Estado</th>
            <th>Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id}>
              <td>{driver.name}</td>
              <td>{driver.email}</td>
              <td>{driver.phone}</td>
              <td>{driver.license_number}</td>
              <td>{driver.status}</td>
              <td>{new Date(driver.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => navigate(`/drivers/${driver.id}/edit`)}>Editar</button>
                <button onClick={() => handleDelete(driver.id)} style={{color: "red", marginLeft: 8}}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTable;