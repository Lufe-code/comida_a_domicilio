import React from "react";
import { useForm } from "react-hook-form";
import { IssueData } from "../../types/Issue.type";

interface Props {
  onSubmit: (data: IssueData) => void;
  loading?: boolean;
  defaultValues?: Partial<IssueData>;
  motorcycleId?: number;
}

const IssueForm: React.FC<Props> = ({ onSubmit, loading, defaultValues, motorcycleId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IssueData>({
    defaultValues: {
      ...defaultValues,
      motorcycle_id: motorcycleId ?? defaultValues?.motorcycle_id ?? undefined,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Descripción:</label>
      <textarea {...register("description", { required: true })} />
      {errors.description && <span>La descripción es obligatoria</span>}

      <label>Tipo de incidencia:</label>
      <input {...register("issue_type", { required: true })} />
      {errors.issue_type && <span>El tipo es obligatorio</span>}

      <label>Fecha de reporte:</label>
      <input type="datetime-local" {...register("date_reported", { required: true })} />
      {errors.date_reported && <span>La fecha es obligatoria</span>}

      <label>Estado:</label>
      <select {...register("status", { required: true })}>
        <option value="">Seleccione</option>
        <option value="open">Abierta</option>
        <option value="in_progress">En progreso</option>
        <option value="closed">Cerrada</option>
      </select>
      {errors.status && <span>El estado es obligatorio</span>}

      <label>ID de Moto:</label>
      <input
        type="number"
        {...register("motorcycle_id", { required: true, valueAsNumber: true })}
        disabled={!!motorcycleId}
      />
      {errors.motorcycle_id && <span>La moto es obligatoria</span>}

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default IssueForm;
export {};