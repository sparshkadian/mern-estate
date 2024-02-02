import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = () => {
    if (files.length === 0) {
      setImageUploadError('No image selected');
    } else if (files.length > 0 && files.length < 7) {
      setImageUploadError(false);
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError('Image Upload Failed (2mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing!');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className='p-3 max-w-5xl mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Create a Listing</h1>
      <form className='flex flex-col sm:flex-row gap-5'>
        {/* Left Panel */}
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
          />
          <textarea
            type='text'
            placeholder='Decription'
            className='border p-3 rounded-lg'
            id='decription'
            required
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
          />

          {/* CheckBoxes */}
          <div className='flex gap-6 flex-wrap'>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='sell' className='w-5' />
              <label htmlFor='sell'>Sell</label>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='renting' className='w-5' />
              <label htmlFor='renting'>Rent</label>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='parking' className='w-5' />
              <label htmlFor='parking'>Parking Spot</label>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='furnished' className='w-5' />
              <label htmlFor='furnished'>Furnisihed</label>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='offer' className='w-5' />
              <label htmlFor='offer'>Offer</label>
            </div>
          </div>

          {/* Beds...DiscountedPrice */}
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                className='p-3 border-gray-300 rounded-lg'
                required
              />
              <label htmlFor='bedrooms'>Beds</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                className='p-3 border-gray-300 rounded-lg'
                required
              />
              <label htmlFor='bathrooms'>Baths</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='1'
                max='10'
                className='p-3 border-gray-300 rounded-lg'
                required
              />
              <div className='text-xs flex flex-col items-center'>
                <label htmlFor='regularPrice'>Regular Price</label>
                <span>($ / months)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountPrice'
                min='1'
                max='10'
                className='p-3 border-gray-300 rounded-lg'
                required
              />
              <div className='text-xs flex flex-col items-center'>
                <label htmlFor='discountPrice'>Discounted Price</label>
                <span>($ / months)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-nomral text-gray-600 ml-2'>
              The first image will be the cover(max 6)
            </span>
          </p>

          <div className='flex gap-4'>
            <input
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              type='file'
              id='images'
              accept='image/*'
              multiple
              className='border p-3 border-gray-300 rounded w-full'
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageUpload}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-600'>{imageUploadError && imageUploadError}</p>

          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Create Listing
          </button>

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => {
              return (
                <div
                  key={url}
                  className='flex justify-between p-3 border items-center'
                >
                  <img
                    src={url}
                    alt='listing image'
                    className='w-20 h-20 object-contain rounded-lg'
                  />
                  <button
                    onClick={() => {
                      handleRemoveImage(index);
                    }}
                    type='button'
                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
