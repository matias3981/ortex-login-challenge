import './styles.css'

const ModalContent = () => (
  <div className="modal-content">
    <h5 className="title">So...did you forget your password?</h5>
    <p className="caption">No problem! Just enter your email and we will send the instructions</p>
    <form className="forgot-password__form">
      <input type="text" className="form__input" placeholder="Your Email here"/>
      <button className="form__button--primary">Submit</button>
    </form>
  </div>
);

export default ModalContent;