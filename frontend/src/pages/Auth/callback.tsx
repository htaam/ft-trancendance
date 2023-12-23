
import React, { useState, useEffect } from "react";
import queryString from "query-string";


const callback = ({ }) => {
  const { code } = queryString.parse(window.location.search);
  console.log( code);
  const [callbackData, setcallbackData] = useState("none");

  useEffect(() => {
    fetch(`http://localhost:4000/auth/callback?code=${code}`, {
      method: 'GET',
    })}
  )

  return (
    <div className="callback">
    </div>
  );
}

export default callback;
