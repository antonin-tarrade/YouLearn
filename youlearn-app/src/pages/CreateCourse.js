import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './CreateCourse.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import VideoForm from './VideoForm';
import { invokeGet, invokePostAndAwaitResponse } from '../api';


function CreateCourse() {

    const { userLoged } = useUser();
    const navigate = useNavigate();
    const [course, setCourse] = useState({ title: '', description: '' });
    const [videos, setVideos] = useState([{ id: generateId(), url: '', title: '', description: '', orderInCourse: 1 }]);
    const[teacher,setTeacher] = useState({})


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateId() {
        return getRandomInt(1,10000);
    }

    useEffect(() => {
        if (userLoged === null || userLoged.role !== "Teacher") {
            navigate('/login');
        }
    }, [userLoged, navigate]);

    useEffect(() => {
        console.log(userLoged.username);
        invokeGet("getTeacherInfos",{username: userLoged.username}).then(data => data.json()).then(teacher => {
            console.log(teacher);
            setTeacher(teacher);
            setCourse(prevCourse => ({
                ...prevCourse,
                owner: teacher,
                followers: [],
                videos: []
            }));
        });
        
    }, [userLoged]);


    const addVideo = () => {
        setVideos([...videos, { id: generateId(), url: '', title: '', description: '', orderInCourse: videos.length+1}]);
    };


    const removeVideo = (index) => {
        const values = [...videos];
        values.splice(index, 1);
        values.map((video,index) => video.orderInCourse = index+1);
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
        newVideos.map((video,index) => video.orderInCourse = index+1);
        setVideos(newVideos);
      };

    const onCourseSubmitted = () => {
        invokePostAndAwaitResponse("addCourse", course).then(data => data.json()).then(course => {
            setCourse(course);
            console.log(course);
            videos.map((video) => {
                    video.course = course;
                    console.log(video);
                    invokePostAndAwaitResponse("addVideo",video);
                }
            )
        });
        navigate('/');
    }

    if (userLoged === null) {
        return null;
    }
    return (
        <div className="create-course-page">
            <div className="course-form-container">
                <h1>Créer le cours :</h1>
                <form className="add-course-form" onSubmit={onCourseSubmitted}>
                    <label className='course-label'>
                        <p className='course-title-label'>Titre du cours :</p>
                        <input className="course-title-input" type="text" name="title" value={course.title} onChange={handleCourseChange} required />
                    </label>
                    <label className='course-label'>
                        <p className='course-description-label'>Description du cours :</p>
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
                    <button type="submit" className='global-button create-button'> Créer le cours</button>
                </form>
            </div>
        </div>

    );
}

export default CreateCourse;