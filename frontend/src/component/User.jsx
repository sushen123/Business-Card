
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function UsersHome() {
  const navigate = useNavigate();

    return  <div>
            <h1>Welcome to our page</h1>
            <h3> Are you new to this page! Click Below</h3>
            <button
            style={{padding: 10, margin: 10}}
            onClick={() => navigate('/user-signup')}>Sign Up</button>
            <br />
            <h3>If you are already signup! Click Below</h3>
            <button
            style={{padding: 10, margin: 10}}
            onClick={() => navigate('/user-signin')}
            >
                SignIn
            </button>
        </div>
    
}

export function UserCreatCard() {
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [interest, setInterest] = useState("");
    const [linkedin, setlinkedin] = useState("");
    const [twitter, setTwitter] = useState("");
    const [message, setMessage] = useState("");
    const [err, setError] = useState("");
    
    async function UserhandleCard(e) {
      e.preventDefault();
      setMessage("");
      setError("");

      try {
        const response = await fetch('http://localhost:3000/User/eCard', {
          method: 'POST',
          body: JSON.stringify({
            name: "Sushen",
            description: description,
            interest: interest,
            linkedin: linkedin,
            twitter: twitter,
          
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          
        });

        const data = await response.json();
        if(response.ok) {
          setMessage(data.message);
        }
        else{
          setError(data.message);
        }
      }
      catch(error) {
        setError(error)
      }
    }
   
    return <div>
      <form onSubmit={UserhandleCard}>
      <h2>Please give me details for Business Card</h2>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" style={{
        marginLeft: 40,
        marginBottom: 10
      }} onChange={(e) => {
        setName(e.target.value);
      }}/>
      <br />
      <label htmlFor="description">Description:</label>
      <input type="text" name="description" style={{
        marginLeft: 5,
        marginBottom: 10
      }} onChange={(e) => {
        setDescription(e.target.value);
      }} />
      <br />
      <label htmlFor="interest">Interest:</label>
      <input type="text" name="interest" style={{
        marginLeft: 28,
        marginBottom: 10
      }} onChange={(e) => {
        setInterest(e.target.value);
      }} />
      <br />
      <label htmlFor="linkedin">LinkedIn Link:</label>
      <input type="text" name="linkedin" style={{
        marginLeft: 10,
        marginBottom: 10
      }} onChange={(e) => {
        setlinkedin(e.target.value);
        
      }} />
      <br />
      <label htmlFor="twitter">Twitter Link:</label>
      <input type="text" name="twitter" style={{
        marginLeft: 10,
        marginBottom: 10
      }} onChange={(e) => {
        setTwitter(e.target.value);
      }} />
      <br />
      <button type="submit" style={{
        backgroundColor: 'greenyellow'
      }} >Submit</button>
      {err && <p style={{color: 'red'}}>{err}</p>}
      {message && <p style={{color: 'green'}}>{message}</p>}
     </form>
   
    

    <div style={styles.card}>
      <h2 style={styles.name}>{name}</h2>
      <p style={styles.description}>{description}</p>
      <h3 style={styles.interestsHeader}>Interests</h3>
     <h1> {interest}</h1>
      <div style={styles.socialLinks}>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{...styles.link, marginLeft: '0px'}}>
          LinkedIn
        </a>
        <br />
        <a href={twitter} target="_blank" rel="noopener noreferrer" style={styles.link}>
          Twitter
        </a>
      </div>
    </div>
    </div>

}

// Styles
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f9fa'
  },
  name: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333',
  },
  description: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '15px',
  },
  socialLinks: {
    display: 'flex',
    marginBottom: '15px',
  },
  link: {
    textDecoration: 'none',
    color: '#fff', // Text color
    padding: '10px 15px', // Padding for the button
    borderRadius: '5px', // Border radius for rounded corners
    backgroundColor: '#007BFF', // Background color for the button
    display: 'inline-block', // Display as inline-block to be side by side
    margin: '10px', // Margin between buttons
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle lift
  },
  interestsHeader: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#333',
  },
  interestsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  interestItem: {
    fontSize: '14px',
    marginBottom: '5px',
    color: '#555',
  },
};

