import React, { useContext, useEffect ,useState} from "react";
import { useUser } from '../UserContext';
import { VideoRow } from './utils';
import { useNavigate } from "react-router-dom";
import { invokeGet } from "../api";

function SearchResultPage () {
    const navigate = useNavigate();
    const {search,userLoged} = useUser();
    const [videos,setVideos] = useState([]);

    useEffect(() => {
        if (userLoged === null) {
        navigate('/login');
        } 
    }, [userLoged, navigate]);

    useEffect(() => {
        console.log("search : " + search);
        invokeGet("searchForVideos",{search : search}).then(data => data.json()).then(videos => {
                setVideos(videos);
            }
        )

    },[search]);

    return (

        <div>
            <VideoRow titre={"Résultat de la recherche :"} videos={videos}/>
        </div>
    )
} 
export default SearchResultPage;