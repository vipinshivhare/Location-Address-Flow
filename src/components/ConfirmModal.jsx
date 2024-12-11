import React from "react";
import "./ConfirmModal.css"; 

export default function ConfirmModal({ address, onConfirm, onCancel }) {
  return (
    <div className="confirm-modal">
      <div className="modal-content">
        <h3>Is this your correct address?</h3>
        <p>{address}</p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
