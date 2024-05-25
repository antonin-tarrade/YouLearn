import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './UserPage.css'
import { VideoRow } from './utils';

function UserPage() {

    const { userLoged, user, setPlaylist } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (userLoged === null) {
        navigate('/login');
        }
    }, [userLoged, navigate]);

    if (userLoged === null) {
        return null;
    }

    const handleGoToPlaylistPage = (playlist) => {
        setPlaylist(playlist);
        navigate('/playlist');
    };

    return (
        <div className='userPageMain'>      
            <div className='user-info'>
                <div className='pp-container'>
                    <h1 className='letter'>{user.username[0]}</h1>
                </div>
                <div className='info-container'>
                    <h1>{user.username}</h1>
                    <h2>{user.role == 0 ? "Departement : "  + user.department : "Cours : ..."}</h2>
                    <h2>Abonnements : {user.followedCourses.map((course,index) => (index == 0 ? '' : ' - ') + course.title)}</h2>
                </div>
            </div>
            <div className='user-videos'>
                <h2>Playlistes</h2>
                <div className='playlist-button-row'>
                    {user.playlists.map((playlist) => (
                        <button className='global-button' onClick={() => handleGoToPlaylistPage(playlist)}>{playlist.title}</button>
                    ))}
                </div>
                <div className='liked-videos'>
                    <VideoRow videos={user.likedVideos} titre={"Vidéos likées"}/>
                </div>
            </div>
        </div>
    );
}

export default UserPage;