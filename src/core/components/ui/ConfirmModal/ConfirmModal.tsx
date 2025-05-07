import React from 'react';

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: (id?: string) => void;
  onCancel: () => void;
  identifier?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  identifier,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="w-[528px] h-[232px] bg-gradient-to-r from-[#DEDEDE] to-[#ABD1F5] rounded-[10px] relative p-9">
        <div className="mb-8">
          <h2 className="text-[20px] leading-[24px] font-normal font-['Exo 2'] text-black mb-2">{title}</h2>
          <p className="text-[20px] leading-[24px] font-normal font-['Exo 2'] text-black">{message}</p>
        </div>
        <div className="absolute bottom-9 left-9 right-9 flex justify-between">
          <button
            onClick={onCancel}
            className="w-[160px] h-[40px] bg-[#B2B2B2] text-black text-[20px] leading-[24px] font-['Exo 2'] rounded-[10px] shadow-[2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => onConfirm(identifier)}
            className="w-[160px] h-[40px] bg-[#F17C7C] text-black text-[20px] leading-[24px] font-['Exo 2'] rounded-[10px] shadow-[2px_2px_5px_rgba(0,0,0,0.25)]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;