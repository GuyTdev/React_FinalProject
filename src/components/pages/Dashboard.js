import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import '../styles.css'
import Menu from './Menu';
const Dashboard = () => {
    let navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState("")


    useEffect(() => {
        const userEmail = sessionStorage.getItem('userEmail');
        let authToken = sessionStorage.getItem('Auth Token')
        setLoggedInUser(userEmail )
        if (authToken) {
            navigate('/dashboard')
        }

        if (!authToken) {
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleSignOut = () => {
        sessionStorage.removeItem('Auth Token')
        sessionStorage.removeItem('userEmail')
        navigate('/')
    }

    return (
        <div >
            <div className='top_right'>
                Logged in as <b>{loggedInUser.split('@')[0]} </b>
            <Button variant='outlined' onClick={handleSignOut}>Sign Out</Button>
            </div>
            <div className='App'>
                LoggedIn Dashboard
                <Menu />
            </div>
        </div>
    )
}

export default Dashboard