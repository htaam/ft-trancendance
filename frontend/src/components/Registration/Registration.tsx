import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Registration: React.FC = () => {
    const [nickname, setNickname ] = useState('');
    const [country, setCountry] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const socket = io('http://localhost:3000');

        // Listen for registrations
        socket.on('registrationResponse', (response: any) => {
            console.log(response); 
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleRegister = () => {
        const socket = io('http://localhost:3000');

        // Emit data to the server
        socket.emit('registerPlayer', { nickname, country, avatar });
    };

    return (
        <div>
            <h1>Registration</h1>
            <label>Nickname:</label>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <br />
            <label>Country:</label>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            <br />
            <label>Avatar URL:</label>
            <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            <br />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Registration;