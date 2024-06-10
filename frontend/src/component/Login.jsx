import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserSignUpPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("")
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function UserhandleSignUp(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("")

       try {
            const response = await fetch('http://localhost:3000/User/signup', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    name: name
                }),
                headers: {
                   'Content-Type': 'application/json',
                }
        }

        );
            const data = await response.json();
            setLoading(false);
            if(response.ok) {
            navigate('user-card');
            setMessage(data.message)
            }
            else {
               setError(data.message)
            }
       } 
       catch(err) {
            setLoading(false);
            setError("An error occured")
       }
    }
            
    return  <div>
        <form onSubmit={UserhandleSignUp}>
            <label htmlFor="username">Username:</label> 
            <input type="text" style={{padding: 10, margin: 10}} value={username} name="username" onChange={(e) => {
                setUsername(e.target.value)
            }}/>
            <br />
            <label htmlFor="password">Password:</label>
            <input type="text" value={password} name="password" onChange={(e) => {
                setPassword(e.target.value)
            }} />
            <br />
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" onChange={(e) => {
                setName(e.target.value)
            }}/>
            <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {err && <p style={{ color: 'red' }}>{err}</p>}
                {message &&  <p style={{ color: 'green' }}>{err}</p>}
        </form>
    </div>
    
}

export function AdminSignUpPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();



    async function AdminhandleSignUp(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("")
       try {
            const response = await fetch('http://localhost:3000/Admin/signup', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    name: name
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
        }

        );
            const data = await response.json();
            setLoading(false);
            if(response.ok) {
                navigate('admin-card');
                 setMessage(data.message);
            }
            else {
              setMessage(data.message);
            }
       } 
       catch(err) {
            setLoading(false);
            setError("An error occured")
       }
    }
   
    return <div>
        <form onSubmit={AdminhandleSignUp}>
            <label htmlFor="username">Username:</label> <br />
            <input type="text" value={username} name="username" onChange={(e) => {
                setUsername(e.target.value)
            }}/>
            <br />
            <label htmlFor="password">Password:</label>
            <input type="text" value={password} name="password" onChange={(e) => {
                setPassword(e.target.value)
            }} />
            <br />
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" onChange={(e) => {
                setName(e.target.value)
            }}/>
            <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {err && <p style={{ color: 'red' }}>{err}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
        </form>
    </div>
}

export function UserSignIn() {
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const [err, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function UserhandleSignIn(e) {
        e.preventDefault();
        setError("");
        setMessage("")

        try {
            const response = await fetch('http://localhost:3000/User/signin',
             {   method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
             }
            )
            const data = await response.json();
            if(response.ok) {
                navigate('user-card');
                setMessage(data.message);
            }
            else {
                setError(data.message);
            }

        }
        catch(error) {
            setError(error)
        }
    }

    return (
        <div>
            <form onSubmit={UserhandleSignIn}>
            <label htmlFor="username">Username:</label> <br />
            <input type="text" value={username} name="username" onChange={(e) => {
                setUsername(e.target.value)
            }}/>
            <br />
            <label htmlFor="password">Password:</label>
            <input type="text" value={password} name="password" onChange={(e) => {
                setpassword(e.target.value)
            }} />
            <br />
            <label htmlFor="name">Name:</label>
            
            <button type="submit" >
                    Sign In
                </button>
                {err && <p style={{ color: 'red' }}>{err}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
        </form>
        </div>
    )
}

export function AdminSignIn() {
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const [err, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function UserhandleSignIn(e) {
        e.preventDefault();
        setMessage("");
        setError("")

        try {
            const response = await fetch('http://localhost:3000/Admin/signin',
             {   method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
             }
            )
            const data = await response.json();
            if(response.ok) {
                navigate('admin-card');
                setMessage(data.message)
            }
            else {
                setError(data.message)
            }

        }
        catch(error) {
           setError(error)
        }
    }

    return (
        <div>
            <form onSubmit={UserhandleSignIn}>
            <label htmlFor="username">Username:</label> <br />
            <input type="text" value={username} name="username" onChange={(e) => {
                setUsername(e.target.value)
            }}/>
            <br />
            <label htmlFor="password">Password:</label>
            <input type="text" value={password} name="password" onChange={(e) => {
                setpassword(e.target.value)
            }} />
            <br />
            <label htmlFor="name">Name:</label>
            
            <button type="submit" >
                    Sign In
                </button>
                {err && <p style={{ color: 'red' }}>{err}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
        </form>
        </div>
    )
}

