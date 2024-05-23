import React, { createContext, useState, useContext } from 'react';
import { userExample } from './data';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState(userExample);

    const [isSignedIn, setIsSignedIn] = useState(false);

    const [video, setVideo] = useState(false);

    return (
        <UserContext.Provider value={{ user, setUser, video, setVideo, isSignedIn, setIsSignedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
