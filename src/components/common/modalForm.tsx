import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 320, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 8, right: 12, background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;