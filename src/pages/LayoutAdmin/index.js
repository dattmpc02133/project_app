import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LayoutAdmin = () => {
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('Bearer');

    useEffect(() => {
        if (!loggedInUser) {
            // Redirect
            navigate('/login');
        }
    }, []);
    return <div>Quản trị Admin</div>;
};

export default LayoutAdmin;
