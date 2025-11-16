import React from 'react';
import styles from './AddBtn.module.css';

interface AddButtonProps {
  onClick: () => void;
  text?: string;
  disabled?: boolean;
}

function AddBtn({ onClick, text, disabled }: AddButtonProps) {
  const buttonText = text || 'Chọn';

  return (
    <button
      className={`${styles.addBtn} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
}

export default AddBtn;
