import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import toast from 'react-hot-toast';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading } = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setFormData({ email: '', password: '' });
      const data = await res.json();
      if (data.status != 'success') {
        dispatch(signInFailure());
        throw new Error(data.message);
      }
      dispatch(signInSuccess(data.userInfo));
      toast.success('Sign In Successful');
      navigate('/');
    } catch (error) {
      dispatch(signInFailure());
      toast.error(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=' text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={handleInputChange}
          value={formData.email}
          type='email'
          id='email'
          placeholder='email'
          className='border p-3 rounded-lg '
        />
        <input
          onChange={handleInputChange}
          value={formData.password}
          type='password'
          id='password'
          placeholder='password'
          className='border p-3 rounded-lg '
        />

        <button
          disabled={loading}
          type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
