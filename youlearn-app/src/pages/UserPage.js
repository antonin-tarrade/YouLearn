import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

function UserPage() {

    const { user } = useUser();

    return (
        <h1>{user.username}</h1>
    );
}

export default UserPage;