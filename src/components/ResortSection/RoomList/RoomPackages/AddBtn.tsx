import styles from './AddBtn.module.css';

interface AddButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

function AddBtn({ onClick, disabled }: AddButtonProps) {
  return (
    <button
      className={`${styles.addBtn} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Thêm vào giỏ hàng"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={styles.cartIcon}
      >
        <path d="M12 5v14M5 12h14"></path>
      </svg>
    </button>
  );
}

export default AddBtn;
