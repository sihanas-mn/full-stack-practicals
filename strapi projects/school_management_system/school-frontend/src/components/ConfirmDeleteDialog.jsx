import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  itemName = "",
  itemType = "record",
  isLoading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex-shrink-0 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to delete{" "}
              {itemName ? (
                <span className="font-semibold text-slate-900">"{itemName}"</span>
              ) : (
                `this ${itemType}`
              )}
              ? This action will permanently remove it from the Strapi database and unlink related records.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Delete {itemType}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
