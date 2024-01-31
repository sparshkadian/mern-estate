import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? children : <Navigate to='/sign-in' />;
};

export default Protected;
