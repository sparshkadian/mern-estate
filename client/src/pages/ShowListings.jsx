import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ShowListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  console.log(listings);

  useEffect(() => {
    getUserListings();
  }, []);

  const getUserListings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.status !== 'success') {
        throw new Error(data.message);
      }
      setListings(data.userListings);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      {!loading && listings.length === 0 && (
        <p className='text-center font-bold text-4xl'>There are no Listings</p>
      )}

      <div className='max-w-lg sm:max-w-4xl mx-auto p-4 flex flex-col gap-4'>
        {!loading &&
          listings.length > 0 &&
          listings.map((listing) => {
            return (
              <div
                className='mt-4 cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-all ease-in-out duration-300 border-2 flex justify-between items-center'
                key={listing._id}
              >
                <img
                  src={listing.imageUrls[0]}
                  className='w-[40%]'
                  alt='listing-cover'
                />
                <p className='font-bold text-xl'>{listing.name}</p>
                <div className='p-2 flex flex-col gap-5 items-center'>
                  <span className='font-semibold text-red-600'>DELETE</span>
                  <span className='font-semibold text-green-600'>EDIT</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShowListings;
