import React from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import './utils.css';


// Ligne de vidéo avec titre
export const VideoRow = ({videos, titre}) => {

    const { setVideo } = useUser();
    const navigate = useNavigate();

    const getYoutubeThumbnail = (url) => {
        const videoId = url.split('v=')[1];
        if (!videoId) return null;
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            return videoId.substring(0, ampersandPosition);
        }
        return videoId;
    };

    const handleGoToVideo = (video) => {
        setVideo(video);
        navigate('/video');
    };

    return (
        <div className="videoRow">
            {videos === undefined || videos.length === 0 ? (
                <h2>Aucune vidéo dans {titre}</h2>
            ) : (
                <>
                    <h2>{titre}</h2>
                    <div className="videoListContainer">
                        {videos.map((video, index) => {
                            const thumbnail = getYoutubeThumbnail(video.url);
                            return (
                                <div key={index} className="videoItem">
                                    {thumbnail && (
                                        <div className="thumbnailContainer">
                                            <button onClick={() => handleGoToVideo(video)} >
                                                <img
                                                    src={`https://img.youtube.com/vi/${thumbnail}/0.jpg`} 
                                                    alt={video.title}
                                                    className="thumbnail"
                                                />
                                            </button>
                                        </div>
                                    )}
                                    <div className="videoInfo">
                                        <button onClick={() => handleGoToVideo(video)} className="App-link">{video.title}</button>
                                        <p>
                                            {video.numberOfLike + "  "}
                                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                            <i className="fa fa-thumbs-up"></i>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

