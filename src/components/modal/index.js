import './styles.css';

const Modal = ({ children, show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container">
        <div className="modal" role="dialog" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" type="button" onClick={onClose}>&times;</button>
          <div className="content-container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;