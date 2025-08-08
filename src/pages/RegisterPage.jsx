import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterPage() {
    const pageStyle = {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      color: 'white',
      fontFamily: 'sans-serif',
    };
    
    const leftStyle = {
      position: 'fixed',
      top: '5%',
      left: '5%',
    };
    
    const logoStyle = {
      fontSize: '6rem',
      color: 'white',
      textShadow: '4px 0px 0px #1CD500',
      margin: 0,
    };
    
    const rightStyle = {
      width: '80vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
    
    const formStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      width: '60%',
    };
    
    const inputBlockStyle = {
      display: 'flex',
      flexDirection: 'column',
    };
    
    const labelStyle = {
      marginBottom: '0.5rem',
      fontSize: '1rem',
    };
    
    const inputStyle = {
      backgroundColor: 'white',
      color: 'black',
      borderRadius: '0.5rem',
      border: 'none',
      padding: '1rem',
      fontSize: '1rem',
      outline: 'none',
    };
    
    const buttonStyle = {
      height: '5.5vh',
    };

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
    
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    const {username, email, password} = form;
    
    if (!username || !email || !password) {
      alert("Merci de remplir tous les champs.");
      return;
    }
    
    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      
      const data = await res.json();

      if(res.ok) {
        console.log("Register réussi");
        
        // CORRECTION : Stocker l'utilisateur complet comme dans le login
        localStorage.setItem('user', JSON.stringify(data));
        
        // Rediriger vers /main
        navigate('/main');
      } else {
        alert(data.error || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la connexion au serveur");
    }
  }
    
  return (
    <div style={pageStyle}>
      <div style={leftStyle}>
        <h1>
          <Link to="/" style={logoStyle}>
            Y
          </Link>
        </h1>
      </div>
      <div style={rightStyle}>
        <form style={formStyle} onSubmit={register}>
          <div style={inputBlockStyle}>
            <label htmlFor="username" style={labelStyle}>Nom d'utilisateur</label>
            <input type="text" id="username" style={inputStyle} value={form.username} onChange={handleChange}/>
          </div>
          <div style={inputBlockStyle}>
            <label htmlFor="email" style={labelStyle}>Adresse mail</label>
            <input type="email" id="email" style={inputStyle} value={form.email} onChange={handleChange}/>
          </div>
          <div style={inputBlockStyle}>
            <label htmlFor="password" style={labelStyle}>Mot de passe</label>
            <input type="password" id="password" style={inputStyle} value={form.password} onChange={handleChange}/>
          </div>
          <button type="submit" style={buttonStyle}>S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;