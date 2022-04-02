import { AppBar, Toolbar, Typography, makeStyles, Tooltip } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../images/logo.png';
const useStyle = makeStyles(theme => ({
  component: {
    background: '#FFFFFF',
    color: 'black'
  },
  container: {
    justifyContent: 'flex-start',
    '&  >*': {
      padding: 20,
      color: 'black',
      textDecoration: 'none'
    }
  },
  link: {
    marginRight:'-12px',
    textDecoration: 'none',
    color: 'inherit'
  },
  linkhide: {
    [theme.breakpoints.down('md')]: {
     display:'none'
  },
  textDecoration: 'none',
  color: 'inherit',
  marginTop: 5,
},
}))

const Navbar = () => {
  const history = useHistory();
  const classes = useStyle();
  const user = useSelector((state) => state.user.currentUser);
  const userprofile = useSelector((state) => state.userprofile.currentUserprofile);
  const [userprofiledata, setUserprofiledata] = useState('');
  const imgbefore = `http://localhost:8000/${userprofiledata.slice(7,)}`;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8000/userprofile/${user.id}`);
      setUserprofiledata(response.data.userprofile.picture);
    }
    fetchData();
  }, [userprofile])
  function logout() {
    localStorage.clear();
    history.push('/login')
  }
  return (
    <AppBar className={classes.component}>
      <Toolbar className={classes.container}>
        <Link to='/' className={classes.linklogo}>
          <img src={logo} height={60} width={90} />
        </Link>
        <Link to='/' className={classes.link}>
          <Typography>HOME</Typography>
        </Link>
        <Link to='/about' className={classes.link}>
          <Typography>ABOUT</Typography>
        </Link>
        {user ?
          <>
            <Link onClick={logout} to='/login' className={classes.link}>
              <Typography>SIGNOUT</Typography>
            </Link>
            <Link to='/createuserprofile' className={classes.link}>
              <Typography>PROFILE</Typography>
            </Link>
          </> :
          <>
            <Link to='/login' className={classes.link}>
              <Typography>LOGIN</Typography>
            </Link>
            <Link to='/register' className={classes.link}>
              <Typography>REGISTER</Typography>
            </Link>
          </>
        }
        {user ?
          <>
            <Link to='/' className={classes.linkhide}>
              <Tooltip title={user.name.toUpperCase()}>
                <Avatar src={imgbefore} sx={{ display: 'block', height: '65px', width: '63px', marginLeft: '650px' }} />
              </Tooltip>
            </Link>
          </>
          :
          <Link to='/login' className={classes.linkhide}>
            <Typography style={{ marginLeft: 650 }}><AccessibilityNewIcon /></Typography>
          </Link>
        }
      </Toolbar>
    </AppBar>
  )
}
export default Navbar;