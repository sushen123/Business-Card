
import { useNavigate } from "react-router-dom";

export function AdminHome() {
  const navigate = useNavigate();

    return  <div>
            <h1>Welcome to our page</h1>
            <h3> Are you new to this page! Click Below</h3>
            <button
            style={{padding: 10, margin: 10}}
            onClick={() => navigate('/admin-signup')}>Sign Up</button>
            <br />
            <h3>If you are already signup! Click Below</h3>
            <button
            style={{padding: 10, margin: 10}}
            onClick={() => navigate('/admin-signin')}
            >
                SignIn
            </button>
        </div>
    
}



