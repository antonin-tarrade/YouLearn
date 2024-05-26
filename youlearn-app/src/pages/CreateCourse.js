import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './CreateCourse.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import VideoForm from './VideoForm';


function CreateCourse() {

    // const [items, setItems] = useState([{ id: 'item-1', content: 'Item 1' }]);
    const { userLoged } = useUser();
    const navigate = useNavigate();
    const [course, setCourse] = useState({ title: '', description: '' });
    const [videos, setVideos] = useState([{ id: `video-${generateId()}`, url: '', title: '', description: '', order: 1 }]);

    function generateId() {
        return Math.random().toString(36).slice(2, 10);
    }

    useEffect(() => {
        if (userLoged === null || userLoged.role !== 1) {
            navigate('/login');
        }
    }, [userLoged, navigate]);

    useEffect(() => {
        let teacher = {};
        setCourse(prevCourse => ({
            ...prevCourse,
            owner: teacher,
            followers: [],
            videos: videos
        }));
    }, [videos]);


    const addVideo = () => {
        setVideos([...videos, { id: `video-${generateId()}`, url: '', title: '', description: '', order: videos.length+1}]);
    };


    const removeVideo = (index) => {
        const values = [...videos];
        values.splice(index, 1);
        values.map((video,index) => video.order = index+1);
        setVideos(values);
    };

    const handleInputChange = (index, event) => {
        const values = [...videos];
        values[index][event.target.name] = event.target.value;
        setVideos(values);
    };

    const handleCourseChange = (event) => {
        setCourse({ ...course, [event.target.name]: event.target.value });
    };


    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const newVideos = Array.from(videos);
        const [reorderedVideos] = newVideos.splice(result.source.index, 1);
        newVideos.splice(result.destination.index, 0, reorderedVideos);
        newVideos.map((video,index) => video.order = index+1);
        setVideos(newVideos);
      };

    if (userLoged === null) {
        return null;
    }
    return (
        <div className="create-course-page">
            <div className="course-form-container">
                <h1>Créer le cour :</h1>
                <form className="add-course-form">
                    <label className='course-label'>
                        <p className='course-title-label'>Titre du cour :</p>
                        <input className="course-title-input" type="text" name="title" value={course.title} onChange={handleCourseChange} required />
                    </label>
                    <label className='course-label'>
                        <p className='course-description-label'>Description du cour :</p>
                        <textarea className="course-description-input" name="description" value={course.description} onChange={handleCourseChange} required />
                    </label>
                    <p>Videos :</p>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="items">
                            {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef} style={{ listStyle: 'none', padding: 0 }}>
                                {videos.map((video, index) => (
                                <VideoForm  index={index} video={video} removeVideo={removeVideo} handleInputChange={handleInputChange} />
                                ))}
                                {provided.placeholder}
                            </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <button type="button" className="add-video-button" onClick={addVideo}>Ajouter une vidéo</button>
                    <button type="button" className='global-button create-button'> Créer le cour</button>
                </form>
            </div>
        </div>

    );
}

export default CreateCourse;