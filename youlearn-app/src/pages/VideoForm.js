import React from "react";
import { Draggable } from "react-beautiful-dnd";

function VideoForm ({video, index, handleInputChange , removeVideo}){
    const videoFormInput = (name, type, label, value, index) => (
        <div className='video-form-input'>
            <p>{label}</p>
            <input type={type} name={name} value={value} onChange={event => handleInputChange(index, event)} />
        </div>
    );
    

   return <Draggable key={video.id} draggableId={video.id} index={index}>
                {(provided) => (
                  <div  ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                    userSelect: 'none',
                    padding: '16px',
                    margin: '0 0 8px 0',
                    backgroundColor: '#456C86',
                    color: 'white',
                    ...provided.draggableProps.style,
                    }}>
                    
                    <div>
                        {video.order}
                        <button type="button" className="remove-video-button" onClick={() => removeVideo(index)}>X</button>
                    </div>
                    <div>
                        {videoFormInput("title", "text", "Video Title", video.title, index)}
                        {videoFormInput("url", "text", "Video URL", video.url, index)}
                        {videoFormInput("description", "text-area", "Video Description", video.description, index)}
                    </div>
                    <div>
                        
                    </div>
                    
                </div>
                )}
    </Draggable>
}

export default VideoForm;