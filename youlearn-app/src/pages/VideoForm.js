import React from "react";
import { Draggable } from "react-beautiful-dnd";
import './VideoForm.css'

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
                        <div className="video-preview">
                            <iframe 
                                width="350"
                                height="280"
                                src={video.url} 
                                title={video.title} 
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                    
                </div>
                )}
    </Draggable>
}

export default VideoForm;