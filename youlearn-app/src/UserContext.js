import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
    const [userLoged, setUserLoged] = useState(null);
    const [user, setUser] = useState(null);
    const [video, setVideo] = useState(null);
    const [course, setCourse] = useState(null);
    const [playlist, setPlaylist] = useState(null);

    return (
        <UserContext.Provider value={{ userLoged, setUserLoged, user, setUser, video, setVideo, course, setCourse, playlist, setPlaylist }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
