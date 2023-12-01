import React from 'react';
import * as iheart from "../../images/heart.png";

import './Profile.css';

const Achievments: React.FC = () => {    
    return (
        <div className="achievments">
            <div className="icons-row">
                <span>Last Achievments</span>
                <div className='item'>
                    <img className="icon-img" src={iheart.default} alt="Profile image" />
                    <img className="icon-img" src={iheart.default} alt="Profile image" />
                    <img className="icon-img" src={iheart.default} alt="Profile image" />
                    <img className="icon-img" src={iheart.default} alt="Profile image" />
                </div>
            </div>
        </div>
    )
};

export default Achievments;
