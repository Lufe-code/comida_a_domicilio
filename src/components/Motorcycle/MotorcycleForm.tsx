import React from "react";
import { useForm } from "react-hook-form";
import { MotorcycleData } from "../../types/Motorcycle.type";

interface Props {
  onSubmit: (data: MotorcycleData) => void;
  loading?: boolean;
  defaultValues?: Partial<MotorcycleData>;
}

const MotorcycleForm: React.FC<Props> = ({ onSubmit, loading, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<MotorcycleData>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Placa:</label>
      <input {...register("license_plate", { required: true })} />
      {errors.license_plate && <span>La placa es obligatoria</span>}

      <label>Marca:</label>
      <input {...register("brand", { required: true })} />
      {errors.brand && <span>La marca es obligatoria</span>}

      <label>Año:</label>
      <input type="number" {...register("year", { required: true, valueAsNumber: true })} />
      {errors.year && <span>El año es obligatorio</span>}

      <label>Status:</label>
      <select {...register("status", { required: true })}>
        <option value="">Seleccione</option>
        <option value="available">Disponible</option>
        <option value="in_use">En uso</option>
        <option value="maintenance">Mantenimiento</option>
      </select>
      {errors.status && <span>El estado es obligatorio</span>}

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default MotorcycleForm;