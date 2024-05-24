import React, { useEffect } from 'react';
import { videoRow } from './utils';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const { userLoged } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (userLoged === null) {
            navigate('/login');
        }
    }, [userLoged, navigate]);

    if (userLoged === null) {
        return null;
    }

    return (
        <div className='homePageMain'>
            <h1>Welcome {userLoged.username}!</h1>
            {videoRow(userLoged.likedVideos, "Vidéos likées")}

            <h1>Tes Playlistes</h1>
            <div className="videoList">
                {userLoged.playlists.map((playlist) => (
                    videoRow(playlist.videos, playlist.title)
                ))}
            </div>

            <h1>Tes abonnements</h1>
            <div className="videoList">
                {userLoged.cours.map((cour, index) => (
                    videoRow(cour.videos, cour.title)
                ))}
            </div>
        </div>
    );
}

export default HomePage;
