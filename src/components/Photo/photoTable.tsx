import React, { useEffect, useState } from "react";
import { getPhotos, deletePhoto } from "../../api/photo.api";
import { PhotoResponse } from "../../types/photo.types";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const getImageUrl = (image_url: string) => {
  if (image_url.startsWith('http')) return image_url;
  const cleanPath = image_url.replace(/^([\\/]+)/, '').replace(/\\/g, '/');
  return `${API_URL}/${cleanPath}`;
};

const PhotoTable: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPhotos().then(setPhotos);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar esta foto?")) {
      await deletePhoto(id);
      setPhotos(photos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Fotos</h1>
      <button onClick={() => navigate('/photos/new')} style={{marginBottom: 16}}>Agregar Foto</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Descripción</th>
            <th>Incidencia</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {photos.map(photo => (
            <tr key={photo.id}>
              <td>{photo.id}</td>
              <td>
                <img
                  src={getImageUrl(photo.image_url)}
                  alt={photo.caption || "foto"}
                  style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }}
                />
              </td>
              <td>{photo.caption}</td>
              <td>{photo.issue_id}</td>
              <td>{new Date(photo.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => navigate(`/photos/${photo.id}/edit`)}>Editar</button>
                <button onClick={() => handleDelete(photo.id)} style={{color: "red", marginLeft: 8}}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PhotoTable;