import './App.css';
import { useForm } from 'react-hook-form';
import Modal from './components/modal';
import { useState } from 'react';
import ModalContent from './components/modal-content';
import EuroUsdModalContent from './components/eurousd-modal-content';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showEuroUsdModal, setShowEuroUsdModal] = useState(false);

  const onSubmit = async (data) => {
    if (data) {
      try {
        const response = await fetch('/login', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        return response.json();
      } catch (e) {
        throw new Error(e);
      }
    }
  };

  const handleModalVisibility = () => setShowForgotPasswordModal(true);

  const handleEuroUsdModalVisibility = () => setShowEuroUsdModal(true);

  const onForgotPasswordModalClose = () => {
    setShowForgotPasswordModal(false);
  };

  const onEuroUsdModalClose = () => {
    setShowEuroUsdModal(false);
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <div className='brand'>
          <img
            src='https://s3-eu-west-1.amazonaws.com/tpd/logos/5ecec4306efff50001863129/0x0.png'
            alt='ortex-logo'
          />
        </div>
        <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('email', {
              required: 'Enter an email Address',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Enter a valid email address',
              },
            })}
            className='form__input'
            type='text'
            name='email'
            placeholder='Email'
          />
          {errors?.email && (
            <span className='input-message--error'>
              {errors?.email?.message}
            </span>
          )}
          <input
            {...register('password', {
              required: 'Enter a password',
              minLength: {
                value: 6,
                message: 'Min. 6 characters are required',
              },
            })}
            className='form__input'
            type='password'
            name='password'
            placeholder='Password'
          />
          {errors?.password && (
            <span className='input-message--error'>
              {errors?.password?.message}
            </span>
          )}
          <button className='form__button--primary' type='submit'>
            Login
          </button>
          <span
            onClick={handleModalVisibility}
            className='text-gray-400 text-sm mt-4 self-center hover:underline cursor-pointer'
          >
            Forgot the password?
          </span>
          <span
            onClick={handleEuroUsdModalVisibility}
            className='text-gray-400 text-sm self-center hover:underline cursor-pointer'
          >
            Check EURO/USD exchange rate
          </span>
        </form>
      </div>
      <Modal show={showForgotPasswordModal} onClose={onForgotPasswordModalClose}>
        <ModalContent />
      </Modal>
      <Modal show={showEuroUsdModal} onClose={onEuroUsdModalClose}>
        <EuroUsdModalContent />
      </Modal>
    </div>
  );
}

export default App;
