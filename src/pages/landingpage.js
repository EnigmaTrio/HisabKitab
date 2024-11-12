import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className='pt-3.5'>
      <img 
        src="hisabkitalimage.png" alt="Image with clickable areas" 
        className=" w-screen bg-cover bg-center" 
        useMap="#image-map" 
      />

      <map name="image-map">
        <area 
          target="" 
          alt="HisabKitab Image" 
          title="SignIn"
          onClick={() => navigate('/signup')}
          coords="406,623,69,544" 
          shape="rect" 
        />
      </map>
    </div>
  );
};

export default LandingPage;