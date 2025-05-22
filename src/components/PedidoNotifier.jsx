import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationSound = '/sounds/notification.mp3'; // Ajusta la ruta si cambiaste el nombre o ubicación

function PedidoNotifier({ pedidos }) {
  const [ultimoPedidoId, setUltimoPedidoId] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!pedidos || pedidos.length === 0) return;

    const nuevoPedido = pedidos[pedidos.length - 1];

    if (nuevoPedido.id !== ultimoPedidoId) {
      setUltimoPedidoId(nuevoPedido.id);

      // Mostrar notificación visual
      toast.info(`¡Nuevo pedido asignado! Pedido #${nuevoPedido.id}`, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
      });

      // Reproducir sonido
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [pedidos, ultimoPedidoId]);

  return (
    <>
      <ToastContainer />
      <audio ref={audioRef} src={NotificationSound} />
    </>
  );
}

export default PedidoNotifier;
