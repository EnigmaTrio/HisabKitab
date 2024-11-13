import React from 'react';
import { Link ,useLocation,useNavigate} from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token'); // Check if the user is logged in
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-600 p-4 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold"><Link className="text-white hover:bg-blue-700 px-3 py-2 rounded" to="/">HisabKitab</Link></h1>
        <ul className="flex space-x-4">
         
          {token ? (
            <>
            <li>
             <button
               className="text-white hover:bg-blue-700 px-3 py-2 rounded"
               onClick={() => { navigate('/budget');  }} 
             >
               Budget
             </button>
             <button
               className="text-white hover:bg-blue-700 px-3 py-2 rounded"
               onClick={() => { navigate('/add-expense');  }} 
             >
               Expenses
             </button>
             <button
               className="text-white hover:bg-blue-700 px-3 py-2 rounded"
               onClick={() => { navigate('/spending');  }} 
             >
               Spending
             </button>
            </li>

            <li>
              <button
                className="text-white hover:bg-blue-700 px-3 py-2 rounded"
                onClick={() => { localStorage.removeItem('token');navigate('/demo');  }} 
              >
                Logout
              </button>
            </li></>
          ) : (
           null
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;