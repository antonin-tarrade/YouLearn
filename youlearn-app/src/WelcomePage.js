import React from "react";
import LogInForm from "./LoginForm";
import Header from "./Header";

function WelcomePage ({onLogIn,onSignin,userId,isSignedIn}) {
    return (
        <div className="welcome-page">
        <Header userId={userId} isSignedIn={isSignedIn}/>
        <LogInForm onLogIn={onLogIn} onSignin={onSignin}/>
        </div>
    )       
}
export default WelcomePage;