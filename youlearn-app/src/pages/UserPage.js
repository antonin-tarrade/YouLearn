import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './UserPage.css'
import { VideoRow } from './utils';
import { invokeGet } from '../api';

function UserPage() {

    const { userLoged, user, setPlaylist , setCourse} = useUser();
    const navigate = useNavigate();
    let ownPage  = userLoged == user;
    const [teacher,setTeacher] = useState(null);
    // const [courses,setCourses] = useState([]);
    const [student,setStudent] = useState(null);

    useEffect(() => {
        if (userLoged === null) {
        navigate('/login');
        }
    }, [userLoged, navigate]);

    useEffect(() => {
        user.role == "Teacher" ? 
        initTeacherInfos()
        :
        invokeGet("getStudentInfos",{username: user.username}).then(data => data.json()).then(student => {
            setStudent(student);
        })
    },[]);

    function initTeacherInfos(){
        invokeGet("getTeacherInfos",{username: user.username}).then(data => data.json()).then(teacher => {
            console.log(teacher);
            setTeacher(teacher);
        });
    }


    if (userLoged === null) {
        return null;
    }
    
    const createCourse = () => {
        navigate('/createcourse');
    }

    const handleGoToPlaylistPage = (playlist) => {
        setPlaylist(playlist);
        navigate('/playlist');
    };

    const handleGoToCoursePage = (course) => {
        setCourse(course);
        navigate('/course');
    };

    return (
        <div className='userPageMain'>      
            <div className='user-info'>
                <div className='pp-container'>
                    <h1 className='letter'>{user.username[0]}</h1>
                </div>
                <div className='info-container'>
                    <h1>{user.username}</h1>
                    {(student || teacher ) && <h2>{ user.role == "Student" ? "Departement : "  + student.department : "Cours : " + teacher.courses.map((course,index) => (index == 0 ? '' : ' - ') + course.title )}</h2>}
                    {ownPage && userLoged.role == "Teacher" && 
                        <div className='create-course'>
                            <button className="add-course-button" onClick={createCourse}>Ajouter un cour </button>
                        </div>}
                    <h2>Abonnements : {user.followedCourses.map((course,index) => (index == 0 ? '' : ' - ') + course.title)}</h2>
                </div>
            </div>
            <div className='user-videos'>
                {userLoged.role == "Student" ?
                    <div>    
                        <h2>Playlists</h2>
                        <div className='playlist-button-row'>
                            {user.playlists.map((playlist) => (
                                <button className='global-button' onClick={() => handleGoToPlaylistPage(playlist)}>{playlist.title}</button>
                            ))}
                        </div>
                    </div> 
                    : 
                    <div>    
                        <h2>Cours</h2>
                        <div className='playlist-button-row'>
                            {teacher && teacher.courses.map((course) => (
                                <button className='global-button' onClick={() => handleGoToCoursePage(course)}>{course.title}</button>
                            ))}
                        </div>
                    </div>
                }
                <div className='liked-videos'>
                    <VideoRow videos={user.likedVideos} titre={"Vidéos likées"}/>
                </div>
            </div>
        </div>
    );
}

export default UserPage;