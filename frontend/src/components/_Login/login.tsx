import React from 'react';
import "./login.css";

export const LoginForm = ({
  login,
}: {
  login: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <div className="my-auto">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          login(e);
      }}
      className="form" autoComplete="off">
      <div className="control">
        <h1>Sign In</h1>
      </div>

      <div className="control block-cube block-input">
        <input name="username" type="text" placeholder="Username" />
        <div className="bg-top">
          <div className="bg-inner"></div>
        </div>
        <div className="bg-right">
          <div className="bg-inner"></div>
        </div>
        <div className="bg">
          <div className="bg-inner"></div>
        </div>
      </div>

      {/* Add Password */}
      {/* <div className="control block-cube block-input">
        <input name="password" type="password" placeholder="Password" />
        <div className="bg-top">
          <div className="bg-inner"></div>
        </div>
        <div className="bg-right">
          <div className="bg-inner"></div>
        </div>
        <div className="bg">
          <div className="bg-inner"></div>
        </div>
      </div> */}

      <button className="btn block-cube block-cube-hover" type="submit">
        <div className="bg-top">
          <div className="bg-inner"></div>
        </div>
        <div className="bg-right">
          <div className="bg-inner"></div>
        </div>
        <div className="bg">
          <div className="bg-inner"></div>
        </div>
        <div className="text">Log In</div>
      </button>

      <div className="credits">
        <a href="https://codepen.io/marko-zub/" target="_blank">
          My other codepens
        </a>
      </div>
    </form>
    </div>
  );
};