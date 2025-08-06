import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { initSocket,getSocket } from '../socket.js'; 

function LoginPage() {
  const [form, setForm] = useState({
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

  const login = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    if (!email || !password) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Connexion réussie !");
        // Sauvegarde l'ID utilisateur
        localStorage.setItem('user', JSON.stringify(data));

        // 👇 Initialisation de socket.io avec l'ID utilisateur
        initSocket(data.id);
        const socket = getSocket();
        socket.emit('registerUser', { userId: data.id, email });

        // 🔁 Redirige vers /?home
        navigate('/main');
      } else {
        alert(data.error || "Identifiants invalides");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion au serveur");
    }
  };

  const style = {
    page: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent:'center',
      flexDirection: 'row',
      color: 'white',
      fontFamily: 'sans-serif',
    },
    left: {
      position:'fixed',
      top:'5%',
      left:'5%'
    },
    logo: {
      fontSize: '6rem',
      color: 'white',
      textShadow: '4px 0px 0px #1CD500',
      margin: 0,
    },
    right: {
      width: '80vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      width: '60%',
    },
    inputBlock: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '0.5rem',
      fontSize: '1rem',
    },
    input: {
      backgroundColor:'white',
      color:'black',
      borderRadius: '0.5rem',
      border: 'none',
      padding: '1rem',
      fontSize: '1rem',
      outline: 'none',
    },
    button: {
      height:'5.5vh'
    }
  };

  return (
    <div style={style.page}>
      <div style={style.left}>
        <h1>
          <Link to="/main" style={style.logo}>Y</Link>
        </h1>
      </div>
      <div style={style.right}>
        <form style={style.form} onSubmit={login}>
          <div style={style.inputBlock}>
            <label htmlFor="email" style={style.label}>Adresse mail</label>
            <input
              type="email"
              id="email"
              style={style.input}
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div style={style.inputBlock}>
            <label htmlFor="password" style={style.label}>Password</label>
            <input
              type="password"
              id="password"
              style={style.input}
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" style={style.button}>Connexion</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;