const CreateListing = () => {
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
              type='file'
              id='images'
              accept='image/*'
              multiple
              className='p-3 border-gray-300 rounded w-full'
            />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
              Upload
            </button>
          </div>
          <button
            type='submit'
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
