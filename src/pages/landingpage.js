import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
    <img src="/hisabkitalimage.png" alt="" className='h-screen w-screen bg-cover bg-center'></img>
    <button onClick={() => navigate('/login')}
    className='mt-8 px-6 py-3 bg-white font-semibold rounded-full shadow-md hover:bg-blue-800'>Sign In</button>
    </div>
  );
};

export default LandingPage;