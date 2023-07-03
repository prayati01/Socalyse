import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar,Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import { useDisptach} from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';
import Logo21 from '../../images/Logo21.png';
import "./styles.css"

const Navbar = ()=> {
      const classes = useStyles();
      const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
      const location = useLocation();
      const navigate = useNavigate();

      const Logout= () =>{
        localStorage.removeItem("profile")
        
        navigate('/auth');
        setUser(null);
      };

      const handleLogout =async(e)=>{
   
        window.open("http://localhost:5000/logout", "_self");
        // localStorage.removeItem("token")
      }
      
      console.log(user);

      useEffect(() => {
        const token =user?.token;

        if(token){
          const decodedToken = decode(token);

          if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser (JSON.parse(localStorage.getItem('profile')));
      }, [localStorage]);
return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to='/' className={classes.brandContainer}>
        <img src={Logo21} className={classes.image}  alt ='icon' height='100'/>
            
        </Link>
        <Toolbar className={classes.toolbar}>
        {user?(
          <div className={classes.profile}>
            {/* <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar> */}
            {/* <Typography className={classes.userName} variant="h6">{user.result.name}</Typography> */}
            <Button variant="contained" className={classes.logout} color="secondary" onClick={Logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
      {/* <label htmlFor="switch">Switch:</label>
    <input type="checkbox" id="switch" />
    <span className="slider"></span>
    
        <div className="s"></div>
       
        <div className="backgrounds"></div> */}
       
    
    </AppBar>
);
};


export default Navbar;