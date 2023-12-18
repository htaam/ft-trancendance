import React from 'react';
import "../Talk.css";

export const TalkLayout = ({
  children,
}: {
  children: React.ReactElement[];
}) => {
  return (
    <div className="talkLayout">
      <div className="centered-container">
        <div className="children">{children}</div>
      </div>
    </div>
  );
};