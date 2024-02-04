import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  profileUpdateStart,
  profileUpdateSuccess,
  profileUpdateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../redux/user/userSlice';
import Spinner from '../components/Spinner';
import ShowListings from './ShowListings';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setfilePerc] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(undefined);
  const [formData, setFormData] = useState({
    userName: currentUser.userName,
    avatar: currentUser.avatar,
  });

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleInputChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            avatar: downloadURL,
          });
        });
      }
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(profileUpdateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status !== 'success') {
        dispatch(profileUpdateFailure());
        throw new Error(data.message);
      }
      dispatch(profileUpdateSuccess(data.userInfo));
      toast.success('Profile Updated successfully!');
    } catch (error) {
      toast.error(error.message);
      dispatch(profileUpdateFailure());
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      dispatch(deleteUserSuccess());
      navigate('/');
    } catch (error) {
      toast.error(error.message);
      dispatch(deleteUserFailure());
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.status !== 'success') {
        dispatch(signOutUserFailure());
        throw new Error(data.message);
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure());
      toast.error(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg m-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleUpdate} className='flex flex-col gap-4'>
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type='file'
          ref={fileRef}
          className='hidden'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt='profile'
          className='mt-2 self-center rounded-full object-cover h-24 w-24 cursor-pointer'
        />
        <p className='text-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image Upload(image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-300'>Successfully Uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          onChange={handleInputChange}
          id='userName'
          value={formData.userName}
          className='border p-3 rounded-lg'
        />
        <input
          type='email'
          disabled
          value={currentUser.email}
          className='border p-3 rounded-lg'
        />

        <button
          disabled={loading}
          type='submit'
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? <Spinner /> : 'Update'}
        </button>

        <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to='/create-listing'
        >
          Create Listing
        </Link>
      </form>

      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign Out
        </span>
      </div>
      <Link
        to={`/listings/${currentUser._id}`}
        className='text-green-700 font-semibold mt-5'
      >
        Show Listings
      </Link>
    </div>
  );
};

export default Profile;
