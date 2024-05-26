import React from "react";
import { Draggable } from "react-beautiful-dnd";
import './VideoForm.css'
import { getYoutubeID } from './utils';

function VideoForm ({video, index, handleInputChange , removeVideo}){
    const videoFormInput = (name, type, label, value, index) => (
        <div className='video-form-input'>
            <p>{label}</p>
            { type == 'text-area' ?
                <textarea name={name} value={value} onChange={event => handleInputChange(index, event)} /> :
                <input type={type} name={name} value={value} onChange={event => handleInputChange(index, event)} />
            }
        </div>
    );
    
   return <Draggable key={video.id} draggableId={video.id} index={index}>
                {(provided) => (
                  <div className='video-form' ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                    userSelect: 'none',
                    ...provided.draggableProps.style,
                    }}>
                    
                    <div className="video-form-header">
                        {video.order}
                        <button type="button" className="remove-video-button" onClick={() => removeVideo(index)}>x</button>
                    </div>
                    <div className="video-form-main">
                        <div className="video-info">
                            {videoFormInput("title", "text", "Video Title", video.title, index)}
                            {videoFormInput("url", "text", "Video URL", video.url, index)}
                            {videoFormInput("description", "text-area", "Video Description", video.description, index)}
                        </div>
                        <div className="thumbnailContainer">
                            <img
                                src={`https://img.youtube.com/vi/${getYoutubeID(video.url)}/0.jpg`}
                                className="thumbnail"
                                width="400px"
                            />
                        </div>
                    </div>
                    
                </div>
                )}
    </Draggable>
}

export default VideoForm;