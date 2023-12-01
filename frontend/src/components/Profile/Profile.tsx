import React from 'react';
import * as iprofile from "../../images/perfil-icon.png";
import * as iheart from "../../images/heart.png";
import * as idrop from "../../images/drop.png";
import * as imedal from "../../images/medal.png";
import './Profile.css';

const Profile: React.FC = () => {    
    return (
        <div className="container-profile">
            <div className='frame'>
                <img className="profile-img" src={iprofile.default} alt="Profile image" />
                <h2 className="nickname">Marventrian</h2>
                <div className="icons-row">
                    <div className='item'>
                        <img className="icon-img" src={iheart.default} alt="Profile image" />
                        <span className='win'>5</span>
                    </div>
                    <div className='item'>
                        <img className="icon-img" src={idrop.default} alt="Profile image" />
                        <span className='lose'>2</span>
                    </div>
                    <div className='item'>
                        <img className="icon-img" src={imedal.default} alt="Profile image" />
                        <span className='wins'>471</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;
