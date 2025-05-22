import React from "react";
import { useForm } from "react-hook-form";
import { ShiftData } from "../../types/Shift.type";
import { DriverResponse } from "../../types/driver.type";
import { MotorcycleResponse } from "../../types/Motorcycle.type";

interface Props {
  onSubmit: (data: ShiftData) => void;
  loading?: boolean;
  defaultValues?: Partial<ShiftData>;
  drivers: DriverResponse[];
  motorcycles: MotorcycleResponse[];
}

const ShiftForm: React.FC<Props> = ({
  onSubmit,
  loading,
  defaultValues,
  drivers,
  motorcycles,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ShiftData>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Conductor:</label>
      <select {...register("driver_id", { required: true })}>
        <option value="">Seleccione</option>
        {drivers.map(driver => (
          <option key={driver.id} value={driver.id}>
            {driver.name} ({driver.license_number})
          </option>
        ))}
      </select>
      {errors.driver_id && <span>El conductor es obligatorio</span>}

      <label>Moto:</label>
      <select {...register("motorcycle_id", { required: true })}>
        <option value="">Seleccione</option>
        {motorcycles.map(moto => (
          <option key={moto.id} value={moto.id}>
            {moto.license_plate} - {moto.brand}
          </option>
        ))}
      </select>
      {errors.motorcycle_id && <span>La moto es obligatoria</span>}

      <label>Inicio:</label>
      <input type="datetime-local" {...register("start_time", { required: true })} />
      {errors.start_time && <span>La fecha de inicio es obligatoria</span>}

      <label>Fin:</label>
      <input type="datetime-local" {...register("end_time", { required: true })} />
      {errors.end_time && <span>La fecha de fin es obligatoria</span>}

      <label>Estado:</label>
      <select {...register("status", { required: true })}>
        <option value="">Seleccione</option>
        <option value="active">Activo</option>
        <option value="completed">Completado</option>
        <option value="cancelled">Cancelado</option>
      </select>
      {errors.status && <span>El estado es obligatorio</span>}

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default ShiftForm;