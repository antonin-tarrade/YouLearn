import React from 'react';
import { Link } from 'react-router-dom';
import './utils.css';

const getYoutubeThumbnail = (url) => {
    const videoId = url.split('v=')[1];
    if (!videoId) return null;
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
        return videoId.substring(0, ampersandPosition);
    }
    return videoId;
};

export const videoRow = (videos, titre) => {
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
                                            <Link to="/video">
                                                <img
                                                    src={`https://img.youtube.com/vi/${thumbnail}/0.jpg`} 
                                                    alt={video.title}
                                                    className="thumbnail"
                                                />
                                            </Link>
                                        </div>
                                    )}
                                    <div className="videoInfo">
                                        <Link to="/video" className="App-link">{video.title}</Link>
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

