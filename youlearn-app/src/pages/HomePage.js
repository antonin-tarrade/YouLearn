import React, { useEffect } from 'react';
import { VideoRow } from './utils';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../img/search.svg';
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

            {userLoged.role == "Teacher" && 
            <div>
                <h2>Créer un cours :</h2>
                <Link to='/createcourse' className='App-link'>Creer un cours</Link>
            </div>}

            <VideoRow videos={userLoged.likedVideos} titre="Vidéos likées" />

            <h1>Tes Abonnements</h1>
            <div className="videoList">
                {userLoged.followedCourses.length > 0 ?
                    userLoged.followedCourses.map((cour, index) => (
                    <VideoRow videos={cour.videos} titre={cour.title} key={index} />
                    ))
                    : <h2>Auncun cours suivis, fait une recherche avec l'icone <SearchIcon className='inline-search-icon'/> pour trouver les cours qui t'interressent !</h2>
                }
            </div>
            <h1>Tes Playlists</h1>
            <div className="videoList">
                {userLoged.playlists.length > 0 ? 
                    userLoged.playlists.map((playlist) => (
                    <VideoRow videos={playlist.videos} titre={playlist.title} key={playlist.title} />
                    )) 
                    : <h2>Aucune playlists, clique sur le + en dessous d'une vidéo pour l'ajouter à une playlist !</h2>
                }
            </div>

        </div>
    );
}

export default HomePage;
