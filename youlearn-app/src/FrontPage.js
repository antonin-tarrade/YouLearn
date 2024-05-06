import React from 'react';
import SignInForm from './SignInForm';

function FrontPage({ isSignedIn, onSignIn, userEmail}) {
  // If the user is not signed in, render the SignInForm
  if (!isSignedIn) {
    return <SignInForm onSignIn={onSignIn} />;
  }

  // Otherwise, render the main content of the FrontPage
  return (
    <div>
      <p>Welcome {userEmail}</p>
    </div>
  );
}

export default FrontPage;