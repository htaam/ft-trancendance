
import { useState, useEffect } from "react";
import queryString from "query-string";
import { User } from '../../../../shared/interfaces/talk.interface'
import { LoginLayout } from '../../pages/Talk/Layout/LoginLayout';
import { RegForm } from '../../components/RegistrationForm/registrationForm'
import Home from '../../pages/Home/Home';

const callback = ({ }) => {
  const { code } = queryString.parse(window.location.search);
  console.log( code);
  const [callbackData, setcallbackData] = useState("none");

  useEffect(() => {
    fetch(`http://localhost:4000/auth/callback?code=${code}`, {
      method: 'GET',
    })}
  )

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

export default callback;
