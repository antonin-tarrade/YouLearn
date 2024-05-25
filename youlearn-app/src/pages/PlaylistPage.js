import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './PlaylistPage.css'
import { VideoRow } from './utils';

function PlaylistPage() {

    const { userLoged, setUser, playlist } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (userLoged === null) {
        navigate('/login');
        }
    }, [userLoged, navigate]);

    if (userLoged === null) {
        return null;
    }

    const handleGoToUserPage = (user) => {
        setUser(user);
        navigate('/user');
    };

    return (
        <div className='PlatlistPageMain'>      
            <h1>{playlist.title}</h1>
            <div className='playlist-infos'>
                <span>Par</span>
                <button className='App-link' onClick={() => handleGoToUserPage(playlist.author)}>{playlist.author.username}</button>
            </div>
            <p>{playlist.description}</p>
            <div className='playlist-videos'>
                    <VideoRow videos={playlist.videos} titre={"Vidéos de la playlist"}/>
            </div>
        </div>
    );
}

export default PlaylistPage;