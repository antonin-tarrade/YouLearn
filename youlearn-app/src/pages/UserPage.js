import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './UserPage.css'
import { VideoRow } from './utils';

function UserPage() {

    const { userLoged, user, setPlaylist } = useUser();
    const navigate = useNavigate();
    let ownPage  = userLoged == user;

    useEffect(() => {
        if (userLoged === null) {
        navigate('/login');
        }
    }, [userLoged, navigate]);

    if (userLoged === null) {
        return null;
    }
    
    const createCourse = () => {
        navigate('/createcourse');
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
                    {ownPage && userLoged.role == 1 && 
                        <div className='create-course'>
                            <button className="add-course-button" onClick={createCourse}>Ajouter un cour </button>
                        </div>}
                    <h2>Abonnements : {user.followedCourses.map((course,index) => (index == 0 ? '' : ' - ') + course.title)}</h2>
                </div>
            </div>
            <div className='user-videos'>
                <h2>Playlistes</h2>
                <div className='playlist-button-row'>
                    {user.playlists.map((playlist) => (
                        <button className='playliste-button' onClick={() => handleGoToPlaylistPage(playlist)}> {playlist.title} </button>
                    ))}
                    <Link to='/createplaylist'>
                        <button className='playliste-button'> + </button>
                    </Link>
                </div>
                <div className='liked-videos'>
                    <VideoRow videos={user.likedVideos} titre={"Vidéos likées"}/>
                </div>
            </div>
        </div>
    );
}

export default UserPage;