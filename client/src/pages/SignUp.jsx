import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from '../redux/user/userSlice';
import Spinner from '../components/Spinner';
import OAuth from '../components/OAuth';
import toast from 'react-hot-toast';

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUpStart());
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setFormData({ userName: '', email: '', password: '' });
      const data = await res.json();
      if (data.status != 'success') {
        dispatch(signUpFailure());
        throw new Error(data.message);
      }
      dispatch(signUpSuccess(data.newUser));
      toast.success('Account Created Successfully');
      navigate('/sign-in');
    } catch (error) {
      dispatch(signUpFailure());
      toast.error(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=' text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={handleInputChange}
          value={formData.userName}
          type='text'
          id='userName'
          placeholder='username'
          className='border p-3 rounded-lg '
        />
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
          {loading ? <Spinner /> : 'Sign Up'}
        </button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
