import React, { useState, useEffect } from 'react';
import './VideoPage.css';

const playlists = [
  { id: 1, title: 'Playlist 1 de fouuuuuuuuuuuuu', isVideoInPlaylist: true },
  { id: 2, title: 'Playlist 2', isVideoInPlaylist: true },
  { id: 3, title: 'Playlist 3', isVideoInPlaylist: false },
];

const handlePlaylistToggle = (playlistId) => {
  // Logique pour ajouter ou retirer la vidéo de la playlist avec l'id `playlistId`
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
      <button onClick={handleClick} className="playlist-button">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <i className="fa fa-plus"></i>
      </button>
      {open && (
        <div className="playlist-dropdown">
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
      )}
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

function VideoPage({video}) {
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
          <p><strong>Auteur:</strong> {video.author}</p>
          <PlaylistButton playlists={playlists} onPlaylistToggle={handlePlaylistToggle} />
          <div className='hGrid'>
            <LikeButton/>
            <p><strong>{video.numberOfLike} likes</strong></p>
          </div>
        </div>
      </div>

      {/* La Description */}
      <h2>Description :</h2>
      <p>{video.description}</p>

      {/* Ajouter un commentaire */}
      <h2>Ajouter un commentaire :</h2>
      <div className='hBar'>
      <textarea placeholder='Votre commentaire'></textarea>
      <button className='global-button'>Envoyer</button>
      </div>

      {/* Les commentaires */}
      <h2>Commentaires :</h2>
      <ul>
      {video.comments.map((comment) => (
        <li key={comment.id} className="comment-item">
            <p>{comment.author} : {comment.content}</p>
        </li>
      ))}
      </ul>
    </div>
  
  );
}

export default VideoPage;
