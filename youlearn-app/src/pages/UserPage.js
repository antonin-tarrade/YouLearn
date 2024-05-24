import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

function UserPage() {

    const { userLoged, user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (userLoged === null) {
        navigate('/login');
        }
    }, [userLoged, navigate]);

    if (userLoged === null) {
        return null;
    }

    return (
        <h1>{user.username}</h1>
    );
}

export default UserPage;