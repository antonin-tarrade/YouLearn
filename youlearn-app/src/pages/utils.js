import React , {useState,useEffect} from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { invokeGet} from '../api';
import './utils.css';


// Obtenir l'ID de la vidéo Youtube
export const getYoutubeID = (url) => {
    const videoId = url.split('v=')[1];
    if (!videoId) return null;
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
        return videoId.substring(0, ampersandPosition);
    }
    return videoId;
};


// Ligne de vidéo avec titre
export const VideoRow = ({videos, titre}) => {

    const { setVideo } = useUser();
    const navigate = useNavigate();
    const [numberOfLikes,setNumberofLikes] = useState([]);

    const handleGoToVideo = (video) => {
        setVideo(video);
        navigate('/video');
    };

    useEffect(() => {
        videos.forEach((video, index) => {
          invokeGet("getVideoLikesAmount", { id: video.id })
            .then(data => data.json())
            .then(number => {
              setNumberofLikes(prevLikes => {
                const newLikes = [...prevLikes];
                newLikes[index] = number;
                return newLikes;
              });
            });
        });
      }, [videos]);

    return (
        <div className="videoRow">
            {videos === undefined || videos.length === 0 ? (
                <h2>Aucune vidéo dans {titre}</h2>
            ) : (
                <>
                    <h2>{titre}</h2>
                    <div className="videoListContainer">
                        {videos.map((video, index) => {
                            
                            const thumbnail = getYoutubeID(video.url);
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
                                            {numberOfLikes[index] + "  "}
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

