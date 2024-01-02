import React, { useState, useEffect } from 'react';
import { User } from '../../../../shared/interfaces/talk.interface'
import { LoginLayout } from '../../pages/Talk/Layout/LoginLayout';
import { RegForm } from '../RegistrationForm/registrationForm'
import Home from '../../pages/Home/Home';

export const Registration = () => {

    const [user, setUser] = useState<User>();
    
    useEffect(() => {
        const currentUser = JSON.parse(sessionStorage.getItem('user') ?? '{}');
        if (currentUser.id) {
            setUser(currentUser);
        }
    }, []);
      
    const register = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formValue = (e.currentTarget.elements[0] as HTMLInputElement).value;

        const newUser = {
            id: Date.now().toLocaleString().concat(formValue),
            userName: formValue,
        };

        sessionStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    return (
        <>
            {user && user.id ? (
                <Home />
            ) : (
                <LoginLayout>
                    <RegForm register={register}></RegForm>
                </LoginLayout>
            )}
        </>
    );
};

export default Registration;



