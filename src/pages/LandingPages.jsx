import { Navigate, useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';

function LandingPages () {
    const landingPageStyle = {
        justifyContent:"space-around",
        alignSelf:"center",
        height: '90vh',
        width: '100vw',
        display: 'flex',
    }
    const divStyle = {
        padding:"2%",
        display:'flex',
        justifyContent:'center',
        width:'50vw',
    }

    const divLeftStyle = {
        ...divStyle,
    }

    const divRightStyle = {
        ...divStyle,
        flexDirection:"column"
    }
    const logoStyle = {
        fontSize: 314,
        color: 'white',
        textShadow: '4px 0px 0px #1CD500',
    }
    const sloganStyle = {
        width:'50%'
    }

    const buttonStyle = {
        margin:"1%"
    }

    const navigate = useNavigate()
    return <div id="landingPage" style={landingPageStyle}>
                <div id="logo" style={divLeftStyle}><h1 id="logo" style={logoStyle}>Y</h1></div>
                <span
                    style={{
                        display: 'block',
                        width: '4px',
                        height: '50vw',
                        backgroundColor: 'white',
                        margin: '2rem auto',
                        borderRadius: '2px',
                    }}
                    ></span>                
                    <div id="divRight" style={divRightStyle}>
                        <h1 style={sloganStyle}>
                            L’écho du <span style={{ color: 'green' }}>monde</span>, autrement
                        </h1>
                        <button style={buttonStyle} onClick={() => navigate("/login")}>Se connecter</button>
                        <button style={buttonStyle} onClick={() => navigate("/register")}>S'inscrire</button>
                    </div>
            </div>
}

export default LandingPages