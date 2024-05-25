import React, { useEffect } from 'react';
import { VideoRow } from './utils';
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
            <VideoRow videos={userLoged.likedVideos} titre="Vidéos likées" />

            <h1>Tes Playlistes</h1>
            <div className="videoList">
                {userLoged.playlists.map((playlist) => (
                    <VideoRow videos={playlist.videos} titre={playlist.title} key={playlist.title} />
                ))}
            </div>

            <h1>Tes abonnements</h1>
            <div className="videoList">
                {userLoged.cours.map((cour, index) => (
                    <VideoRow videos={cour.videos} titre={cour.title} key={index} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
