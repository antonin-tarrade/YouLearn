import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

import './VideoPage.css';


function VideoPage() {

  const { userLoged, video } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoged === null) {
      navigate('/login');
      }
  }, [userLoged, navigate]);

  
  const handlePlaylistToggle = (playlistId) => {
    // logique pour ajouter ou retirer la video de la playlist
  };
  
  const PlaylistButton = ({ playlists, onPlaylistToggle }) => {
    const [open, setOpen] = useState(false);
    
    const handleClick = () => {
      setOpen(!open);
    };
    
    const handleCheckboxChange = (playlistId) => {
      onPlaylistToggle(playlistId);
    };
    
    return (
      <div className="playlist-button-container">
        <button 
          onClick={handleClick} 
          className={`playlist-button ${open ? 'open' : ''}`}
          >
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <i className="fa fa-plus"></i>
        </button>
        <div className={`playlist-dropdown ${open ? 'open' : ''}`}>
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id} className="playlist-item">
                <label>
                  <input
                    type="checkbox"
                    checked={playlist.isVideoInPlaylist}
                    onChange={() => handleCheckboxChange(playlist.id)}
                    />
                  {playlist.title}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  const LikeButton = () => {
    const [liked, setLiked] = useState(false);
    
    const handleClick = () => {
      setLiked(!liked);
    };
    
    return (
      <button onClick={handleClick} className={liked ? 'liked' : ''}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <i className="fa fa-thumbs-up"></i>
      </button>
    );
  }
  
  const [comment, setComment] = useState('');
  
  const handleSendComment = () => {
    if (comment.trim()) {
      console.log('Comment sent:', comment);
      setComment('');
    }
  };
  
  if (userLoged === null) {
    return null;
  }
  
  return (
    <div className='videoPageMain'>
      {/* Titre */}
      <h1>{video.cour} - {video.title}</h1>

      {/* Video */}
      <div className='vGrid'>
        <iframe 
          width="960"
          height="540"
          src={video.url} 
          title={video.title} 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>

        <div className='hBar'>
          <p>
            <strong>Auteur : </strong>
            <span className='App-link'>{video.author}</span>
          </p>
          <PlaylistButton playlists={userLoged.playlists} onPlaylistToggle={handlePlaylistToggle} />
          <div className='hGrid'>
            <LikeButton />
            <p><strong>{video.numberOfLike} likes</strong></p>
          </div>
        </div>
      </div>

      {/* La Description */}
      <h2>Description :</h2>
      <p>{video.description}</p>

      {/* Ajouter un commentaire */}
      <h2>Ajouter un commentaire :</h2>
      <div className='comment-bar'>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Votre commentaire'
        ></textarea>
        <button className='send-button' onClick={handleSendComment}>Envoyer</button>
      </div>

      {/* Les commentaires */}
      <h2>Commentaires :</h2>
      <ul className='comments'>
        {video.comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <p className='author'>{comment.author}: </p>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoPage;
