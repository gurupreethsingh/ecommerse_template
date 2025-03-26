import React, {useState , useEffect} from 'react'
import { jwtDecode } from 'jwt-decode';
import UserComponent from '../../components/common_components/UserComponent';



const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decoded = jwtDecode(token);
            setUser(decoded);
          } catch (error) {
            console.error('Invalid token:', error);
          }
        }
      }, []);

    if (!user) {
        return null; // Don't render anything if not logged in
      }

  return (
    <div className="container">
      <div className='flex items-center justify-between'>
        <h1>Dashboard</h1>
        </div>
    </div>
  )
}

export default Dashboard
