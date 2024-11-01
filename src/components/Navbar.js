import React from 'react';
import { Link ,useLocation,useNavigate} from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token'); // Check if the user is logged in
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold"><Link className="text-white hover:bg-blue-700 px-3 py-2 rounded" to="/">HisabKitab</Link></h1>
        <ul className="flex space-x-4">
         
          {token ? (
            <>
             <li>
             <button
               className="text-white hover:bg-blue-700 px-3 py-2 rounded"
               onClick={() => { navigate('/add-expense');  }} 
             >
               Expenses
             </button>
           </li>
            <li>
              <button
                className="text-white hover:bg-blue-700 px-3 py-2 rounded"
                onClick={() => { localStorage.removeItem('token');navigate('/login');  }} 
              >
                Logout
              </button>
            </li></>
          ) : (
            <>
              <li><Link className="text-white hover:bg-blue-700 px-3 py-2 rounded" to="/login">Login</Link></li>
              <li><Link className="text-white hover:bg-blue-700 px-3 py-2 rounded" to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;