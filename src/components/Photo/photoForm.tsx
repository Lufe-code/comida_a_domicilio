import React from "react";
import { useForm } from "react-hook-form";
import { PhotoData } from "../../types/photo.types";

interface Props {
  onSubmit: (data: PhotoData) => void;
  loading?: boolean;
  defaultValues?: Partial<PhotoData>;
}

const PhotoForm: React.FC<Props> = ({ onSubmit, loading, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PhotoData>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Imagen (URL o ruta):</label>
      <input {...register("image_url", { required: true })} />
      {errors.image_url && <span>La imagen es obligatoria</span>}

      <label>Descripción:</label>
      <input {...register("caption")} />

      <label>ID de Incidencia:</label>
      <input type="number" {...register("issue_id", { required: true, valueAsNumber: true })} />
      {errors.issue_id && <span>El ID de incidencia es obligatorio</span>}

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default PhotoForm;