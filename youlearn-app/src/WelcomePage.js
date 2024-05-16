import React from 'react';
import SignInForm from './SignInForm';

function WelcomePage({isSignedIn, onSignIn, userEmail}) {
  // If the user is not signed in, render the SignInForm
  return <SignInForm onSignIn={onSignIn} />;
}

export default WelcomePage;