import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
    const [userLoged, setUserLoged] = useState(null);
    const [user, setUser] = useState(null);
    const [video, setVideo] = useState(null);
    const [cour, setCour] = useState(null);
    const [playlist, setPlaylist] = useState(null);

    return (
        <UserContext.Provider value={{ userLoged, setUserLoged, user, setUser, video, setVideo, cour, setCour, playlist, setPlaylist }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
