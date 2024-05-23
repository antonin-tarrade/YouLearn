import React from 'react';
import { videoRow } from './utils';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import { userExample } from '../data';

function HomePage() {

    const { user } = useUser();     

    console.log(user);

    return (
        <div className='homePageMain'>
            <h1>Welcome {user.username}!</h1>
            {videoRow(user.likedVideos, "Vidéos likées")}

            <h1>Tes Playlistes</h1>
            <div className="videoList">
                {user.playlists.map((playlist) => (
                    videoRow(playlist.videos, playlist.title)
                ))}
            </div>

            <h1>Tes abonnements</h1>
            <div className="videoList">
                {user.cours.map((cour, index) => (
                    videoRow(cour.videos, cour.title)
                ))}
            </div>

        </div>
    );
}

export default HomePage;