import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import Protected from './components/Protected';
import CreateListing from './pages/CreateListing';
import ShowListings from './pages/ShowListings';
import UpdateListing from './pages/UpdateListing';
import SingleListing from './pages/SingleListing';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route
          path='/profile'
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path='/create-listing'
          element={
            <Protected>
              <CreateListing />
            </Protected>
          }
        />
        <Route
          path='/listings/:userId'
          element={
            <Protected>
              <ShowListings />
            </Protected>
          }
        />
        <Route
          path='/update-listing/:listingId'
          element={
            <Protected>
              <UpdateListing />
            </Protected>
          }
        />
        <Route
          path='/listing/:listingId'
          element={
            <Protected>
              <SingleListing />
            </Protected>
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
