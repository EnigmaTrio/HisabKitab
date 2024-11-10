import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!(localStorage.getItem('token')))
    navigate('/demo');

  }, []);
  return (
    <div className='text-center text-white pt-16'>
      <h1 className="text-4xl font-bold mt-4 mb-6 drop-shadow-lg">Welcome {localStorage.getItem('userName') }! </h1>
      <p>Your financial management journey starts here.</p>
    </div>
  );
};

export default Home;