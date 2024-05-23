import React from 'react';
import './HomePage.css';

function HomePage({ user }) {

    const getYoutubeThumbnail = (url) => {
        const videoId = url.split('v=')[1];
        if (!videoId) return null;
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            return videoId.substring(0, ampersandPosition);
        }
        return videoId;
    };

    const videoRow = (videos) => {
        return (
            <div className="videoRow">
                {videos.map((video, index) => {
                    const thumbnail = getYoutubeThumbnail(video.url);
                    return (
                        <div key={index} className="videoItem">
                            <p>{video.cour} - {video.title}</p>
                            {thumbnail && (
                                <div className="thumbnailContainer">
                                    <img 
                                        src={`https://img.youtube.com/vi/${thumbnail}/0.jpg`} 
                                        alt={video.title} 
                                        className="thumbnail"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className='homePageMain'>
            <h1>Welcome {user.username}!</h1>
            {/* <div className="playlist">
                <h2>Vidéos likées</h2>
                <div className="playlistContent">
                    {videoRow(user.likedVideos)}
                </div>
            </div>

            <h1>Tes Playlistes</h1>
            <div className="videoList">
                {user.playlists.map((playlist, index) => (
                    <div key={index} className="playlist">
                        <h2>{playlist.title}</h2>
                        <div className="playlistContent">
                            {videoRow(playlist.videos)}
                        </div>
                    </div>
                ))}
            </div>

            <h1>Tes abonnements</h1>
            <div className="videoList">
                {user.cours.map((cour, index) => (
                    <div key={index} className="playlist">
                        <h2>{cour.title}</h2>
                        <div className="playlistContent">
                            {videoRow(cour.videos)}
                        </div>
                    </div>
                ))}
            </div> */}


        </div>
    );
}

export default HomePage;
