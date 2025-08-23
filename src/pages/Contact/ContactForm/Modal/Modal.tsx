import styles from "./Modal.module.css";

interface ModalProps {
  message: string;
  isError: boolean;
  onClose: () => void;
}

export default function Modal({ message, isError, onClose }: ModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p className={isError ? styles.error : styles.success}>{message}</p>
        <button className={styles.modalButton} onClick={onClose}>
          {isError ? "Try Again" : "OK"}
        </button>
      </div>
    </div>
  );
}
