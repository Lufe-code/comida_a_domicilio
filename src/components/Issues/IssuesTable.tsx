import React, { useEffect, useState } from "react";
import { getIssues, getIssuesByMotorcycle, deleteIssue } from "../../api/Issue.api";
import { IssueResponse } from "../../types/Issue.type";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const getImageUrl = (image_url: string) => {
  if (image_url.startsWith('http')) return image_url;
  const cleanPath = image_url.replace(/^([\\/]+)/, '').replace(/\\/g, '/');
  return `${API_URL}/${cleanPath}`;
};

const IssueTable: React.FC<{ onlyForMotorcycle?: boolean }> = ({ onlyForMotorcycle }) => {
  const { motorcycleId } = useParams<{ motorcycleId?: string }>();
  const [issues, setIssues] = useState<IssueResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (onlyForMotorcycle && motorcycleId) {
      getIssuesByMotorcycle(Number(motorcycleId)).then(setIssues);
    } else {
      getIssues().then(setIssues);
    }
  }, [onlyForMotorcycle, motorcycleId]);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar esta incidencia?")) {
      await deleteIssue(id);
      setIssues(issues.filter(i => i.id !== id));
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Incidencias {onlyForMotorcycle && motorcycleId ? `de Moto #${motorcycleId}` : ""}</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Status</th>
            <th>Fotos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => (
            <tr key={issue.id}>
              <td>{issue.id}</td>
              <td>{issue.description}</td>
              <td>{issue.issue_type}</td>
              <td>{new Date(issue.date_reported).toLocaleString()}</td>
              <td>{issue.status}</td>
              <td>
                {issue.photos && issue.photos.length > 0 ? (
                  issue.photos.map(photo => (
                    <img
                      key={photo.id}
                      src={getImageUrl(photo.image_url)}
                      alt={photo.caption || "foto"}
                      style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6, marginRight: 4 }}
                    />
                  ))
                ) : (
                  <span>Sin fotos</span>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(issue.id)} style={{ color: "red" }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueTable;