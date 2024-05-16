import React, { useState, useEffect } from 'react';
import './VideoPage.css';

const video = {
  title: 'Les flexbox',
  description: 'Dans ce cours approfondi, vous découvrirez toutes les fonctionnalités clés de CSS. Il s\'agit du cours CSS le plus complet que nous ayons publié à ce jour. Donc, si vous souhaitez devenir un expert des feuilles de style en cascade, ce cours est fait pour vous.',
  url: 'https://www.youtube.com/embed/OXGznpKZ_sA?autoplay=1',
  numberOfLike: 3149,
  cour: 'CSS',
  author: 'Pierre Giraud'
};

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

function VideoPage() {
  return (
    <div className='videoPageMain'>

      <h1>{video.cour} - {video.title}</h1>

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LikeButton/>
          <p style={{ marginLeft: '30px' }}><strong>{video.numberOfLike} likes</strong></p>
        </div>
      </div>

      <p><strong>Description:</strong> {video.description}</p>

    </div>
  );
}

export default VideoPage;
