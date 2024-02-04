import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const SingleListing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const { listingId } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.status !== 'success') {
          throw new Error(data.message);
        }
        setListing(data.listing);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  return (
    <main>
      {loading && (
        <div className='pt-5'>
          <Spinner />
        </div>
      )}

      {listing && !loading && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => {
              return (
                <SwiperSlide key={url}>
                  <div
                    className='h-[550px]'
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}
    </main>
  );
};

export default SingleListing;
