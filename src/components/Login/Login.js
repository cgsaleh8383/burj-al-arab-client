import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            storeAuthToken();
            // ...
          })
          .catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(true)
        .then(function (idToken) {
            sessionStorage.setItem('token', idToken)
            history.replace(from);
        })
        .catch(function (error) {
            // Handle error
        });
    }

  
    return (
        <div style={{ textAlign: 'center', margin: '100px' }}>
            <h1>Hei You are not logged in this site. Please log in now.</h1>
            <Button onClick={handleGoogleSignIn} variant="contained" color="primary">
                Google Sign in
            </Button>
        </div>
    );
};

export default Login;