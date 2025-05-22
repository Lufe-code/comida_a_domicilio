import React from "react";
import { useForm } from "react-hook-form";
import { DriverData } from "../../types/driver.type";

interface Props {
  onSubmit: (data: DriverData) => void;
  loading?: boolean;
  defaultValues?: Partial<DriverData>;
}

const DriverForm: React.FC<Props> = ({ onSubmit, loading, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DriverData>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nombre:</label>
      <input {...register("name", { required: true })} />
      {errors.name && <span>El nombre es obligatorio</span>}

      <label>Email:</label>
      <input type="email" {...register("email", { required: true })} />
      {errors.email && <span>El email es obligatorio</span>}

      <label>Teléfono:</label>
      <input {...register("phone", { required: true })} />
      {errors.phone && <span>El teléfono es obligatorio</span>}

      <label>Licencia:</label>
      <input {...register("license_number", { required: true })} />
      {errors.license_number && <span>La licencia es obligatoria</span>}

      <label>Estado:</label>
      <select {...register("status", { required: true })}>
        <option value="">Seleccione</option>
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
        <option value="in_shift">En turno</option>
      </select>
      {errors.status && <span>El estado es obligatorio</span>}

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default DriverForm;