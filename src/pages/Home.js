import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!(localStorage.getItem('token')))
    navigate('/login');

  }, []);
  return (
    <div className="text-center">
      <h1>Welcome {localStorage.getItem('userName')} !</h1>
      <p>Your financial management journey starts here.</p>
    </div>
  );
};

export default Home;
