import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './CreatePlaylist.css';
import {invokePostAndAwaitResponse } from '../api';

function CreatePlaylist() {
    const { userLoged } = useUser();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState({ title: '', description: '' , isPrivate: false, author: null, videos : []});

    useEffect(() => {
        if (userLoged === null) {
            navigate('/login');
        }
    }, [userLoged, navigate]);

    const handlePlaylistChange = (event) => {
        setPlaylist({ ...playlist, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        playlist.author = userLoged;
        console.log(playlist);
        invokePostAndAwaitResponse("addPlaylist",playlist);
        navigate('/user');
    };

    if (userLoged === null) {
        return null;
    }

    return (
        <div className="create-course-page">
            <div className="course-form-container">
                <h1>Créer une Playlist :</h1>
                <form className="add-course-form" onSubmit={handleSubmit}>
                    <label className='course-label'>
                        <p className='course-title-label'>Titre de la playlist :</p>
                        <input className="course-title-input" type="text" name="title" value={playlist.title} onChange={handlePlaylistChange} required />
                    </label>
                    <label className='course-label'>
                        <p className='course-description-label'>Description de la playlist :</p>
                        <textarea className="course-description-input" name="description" value={playlist.description} onChange={handlePlaylistChange} required />
                    </label>
                    <button type="submit" className='global-button create-button'>Créer la playlist</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePlaylist;
