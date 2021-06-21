import React, { useContext } from 'react';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router-dom';
import login from '../../Images/login.gif';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    
    const history=useHistory();
    const location =useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

              
                var token = credential.accessToken;
                // The signed-in user info.
                const {displayName,email} = result.user;
                const signedInUser={name:displayName,email};
                setLoggedInUser(signedInUser);
                console.log(signedInUser);
                history.replace(from);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

    }

    return (
        <section style={{height: '600px' , width: '100%'}} className="row d-flex align-items-center" >
            <div className="row">
                <div className="col-md-4 offset-md-1">
                    <img style={{height:'300px'}}  src={login} alt="" />
                </div>
                <div className="col-md-6 ms-auto">
                <div style={{border:'1 px solid cyan'}} className="login text-center mt-5 p-5">
                <h1>Google SIgn</h1>
                <br />
                <button onClick={handleGoogleSignIn} className="btn btn-primary">Google Sign In</button>
            </div>
                </div>
            </div>
        </section>
    );
};

export default Login;