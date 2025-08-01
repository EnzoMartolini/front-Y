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
  
    return (
      <div style={pageStyle}>
        <div style={leftStyle}>
          <h1>
            <a href="/?home" style={logoStyle}>
              Y
            </a>
          </h1>
        </div>
        <div style={rightStyle}>
          <form style={formStyle}>
            <div style={inputBlockStyle}>
              <label htmlFor="username" style={labelStyle}>Nom d'utilisateur</label>
              <input type="text" id="username" style={inputStyle} />
            </div>
            <div style={inputBlockStyle}>
              <label htmlFor="email" style={labelStyle}>Adresse mail</label>
              <input type="email" id="email" style={inputStyle} />
            </div>
            <div style={inputBlockStyle}>
              <label htmlFor="password" style={labelStyle}>Mot de passe</label>
              <input type="password" id="password" style={inputStyle} />
            </div>
            <div style={inputBlockStyle}>
              <label htmlFor="confirm" style={labelStyle}>Confirmer le mot de passe</label>
              <input type="password" id="confirm" style={inputStyle} />
            </div>
            <button type="submit" style={buttonStyle}>S'inscrire</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default RegisterPage;
  