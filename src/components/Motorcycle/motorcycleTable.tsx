import React, { useEffect, useState } from "react";
import { getMotorcycles, deleteMotorcycle } from "../../api/motorcycle.api";
import { MotorcycleResponse } from "../../types/Motorcycle.type";
import { useNavigate } from "react-router-dom";

const MotorcycleTable: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<MotorcycleResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMotorcycles().then(setMotorcycles);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar esta moto?")) {
      await deleteMotorcycle(id);
      setMotorcycles(motorcycles.filter(m => m.id !== id));
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Motos</h1>
      <button onClick={() => navigate('/motorcycles/new')} style={{marginBottom: 16}}>Crear Moto</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Año</th>
            <th>Status</th>
            <th>Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {motorcycles.map(moto => (
            <tr key={moto.id}>
              <td>{moto.id}</td>
              <td>{moto.license_plate}</td>
              <td>{moto.brand}</td>
              <td>{moto.year}</td>
              <td>{moto.status}</td>
              <td>{new Date(moto.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => navigate(`/motorcycles/${moto.id}/edit`)}>Editar</button>
                <button onClick={() => handleDelete(moto.id)} style={{color: "red", marginLeft: 8}}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MotorcycleTable;