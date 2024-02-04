import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setmessage] = useState('');

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        if (data.status !== 'success') {
          throw new Error(data.message);
        }
        setLandlord(data.user);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.userName} </span>{' '}
            for{' '}
            <span className=' font-semibold'>{listing.name.toLowerCase()}</span>
          </p>

          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-slate-700 text-white p-3 text-center uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
