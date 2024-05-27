import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './CoursePage.css'
import { VideoRow } from './utils';
import { invokeGet } from '../api';

function CoursePage() {

    const { userLoged, course, setUser } = useUser();
    const navigate = useNavigate();
    const [owner,setOwner] = useState(null);

    useEffect(() => {
        if (userLoged === null) {
        navigate('/login');
        } 
    }, [userLoged, navigate]);

    useEffect(() => {
        invokeGet("getCourseOwner",{id : course.id}).then(data => data.json()).then(owner => {
            console.log(owner);
            setOwner(owner);
        }
        )
    },[])


    if (userLoged === null) {
        return null;
    }

    const handleGoToUserPage = (user) => {
        setUser(user);
        navigate('/user');
    };

    return (
        <div className='CoursePageMain'>
            {console.log(course)}
            <h1>{course.title}</h1>
            <div className='course-infos'>
                <span>Par</span>
                {owner && <button className='App-link' onClick={() => handleGoToUserPage(owner.user)}>{owner.user.username}</button>}
            </div>
            <p>{course.description}</p>
            <div className='playlist-videos'>
                <VideoRow videos={course.videos} titre={"Vidéos du cour"}/>
            </div>
        </div>
    );
}

export default CoursePage;