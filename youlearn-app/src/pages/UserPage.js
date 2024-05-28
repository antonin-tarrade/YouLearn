import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './UserPage.css'
import { VideoRow } from './utils';
import { invokeGet } from '../api';

function UserPage() {
    const { userLoged, user, setPlaylist , setCourse} = useUser();
    const [followedCourses, setFollowedCourses] = useState([]);
    const [playlists, setPlaylists] = useState([]);
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
        setStudent(null);
        setTeacher(null);
        user.role == "Teacher" ? 
        invokeGet("getTeacherInfos",{username: user.username}).then(data => data.json()).then(teacher => {
            console.log(teacher);
            setTeacher(teacher);
        })
        :
        invokeGet("getStudentInfos",{username: user.username}).then(data => data.json()).then(student => {
            console.log(student);
            setStudent(student);
        })

        
        invokeGet("getUserFollowedCourses",{username: user.username})
            .then(data => data.json())
            .then(followedCourses => {
                setFollowedCourses(followedCourses);
            });
        
        
        invokeGet("getUserPlaylists",{username: user.username})
            .then(data => data.json())
            .then(playlists => {
                setPlaylists(playlists);
            });
    
    },[user]);


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
                    {(user.role == "Student" && student || user.role == "Teacher" && teacher ) && <h2>{ user.role == "Student" ? "Departement : "  + student.department : "Cours : " + teacher.courses.map((course,index) => (index == 0 ? '' : ' - ') + course.title )}</h2>}
                    {ownPage && userLoged.role == "Teacher" && 
                        <div className='create-course'>
                            <button className="add-course-button" onClick={createCourse}>Ajouter un cour </button>
                        </div>}
                    <h2>Abonnements : {followedCourses.map((course,index) => (index == 0 ? '' : ' - ') + course.title)}</h2>
                </div>
            </div>
            <div className='user-videos'>
                <h2>Playlistes</h2>
                <div className='playlist-button-row'>
                    {playlists.length === 0 ? 
                    <p>{ownPage ? '' : "Aucune Playlists" }</p> :
                    playlists.map((playlist) => (
                        <button className='playliste-button' onClick={() => handleGoToPlaylistPage(playlist)}> {playlist.title} </button>
                    ))

                    }
                    {ownPage && <Link to='/createplaylist'>
                        <button className='playliste-button'> + </button>
                    </Link>}
                </div>
                <div>    
                <h2>Cours</h2>
                <div className='playlist-button-row'>
                    {teacher && teacher.courses.map((course) => (
                        <button className='global-button' onClick={() => handleGoToCoursePage(course)}>{course.title}</button>
                    ))}
                </div>
                </div>
                <div className='liked-videos'>
                    <VideoRow videos={user.likedVideos} titre={"Vidéos likées"}/>
                </div>
            </div>
        </div>
    );
}

export default UserPage;