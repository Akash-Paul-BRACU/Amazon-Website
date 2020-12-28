

import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name: '',
    email: '',
    photo: '',
    password: '',
  });

  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn =() =>{
     handleGoogleSignIn()
     .then(res =>{
        handleResponse(res, true);
     } )
  }

  const fbSignIn =() =>{
    handleFbSignIn()
    .then(res =>{
       handleResponse(res, true);
    } )
 }

  const signOut =() =>{
      handleSignOut()
      .then(res =>{
          handleResponse(res, false);
      })

  }

  const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
     
  }
  const handleBlur = (event) => {

    let isFieldValid = true;
    if (event.target.name === "email") {

      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);

    }
  }
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>{
        handleResponse(res, true);
      })

    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    event.preventDefault();
  }

  
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in</button>
      }
      <button onClick={fbSignIn}>Login with Facebook</button>

      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our own Authentications</h1>
      <p>Name:{user.name}</p>
      <p>Email:{user.email}</p>
      <p>Password:{user.password}</p>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" placeholder="Your Name" onBlur={handleBlur} />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Email Address" required /> <br />
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Password" required /> <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      { user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'LoggedIn'} successfully</p>}
    </div>
  );
}

export default Login;
