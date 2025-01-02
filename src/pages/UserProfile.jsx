import React, { useState, useEffect } from 'react';
import api from '../api'; // Axios 인스턴스
import "../UserProfile.css";
import { CgProfile } from "react-icons/cg";

const UserProfile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        bio: '',
        avatar: null,
    });

    const [newAvatar, setNewAvatar] = useState(null);

    // 현재 활성화된 메뉴 상태
    const [activeMenu, setActiveMenu] = useState("Overview");

    // 메뉴 클릭 핸들러
    const handleMenuClick = (menuName) => {
        setActiveMenu(menuName);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/accounts/profile/');
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        setNewAvatar(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', profile.username);
        formData.append('email', profile.email);
        formData.append('bio', profile.bio);
        if (newAvatar) {
            formData.append('profile.avatar', newAvatar);
        }

        try {
            const response = await api.put('/accounts/profile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setProfile(response.data);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                {/* 사용자 사진 */}
                <div className="profile-userpic">
                    {profile.avatar ? <img src={profile.avatar} alt="User Avatar" /> : <CgProfile />}
                </div>
                {/* 사용자 이름 및 직업 */}
                <div className="profile-usertitle">
                    <h2>{profile.username}</h2>
                </div>
                {/* 버튼
                <div className="profile-userbuttons">
                    <button className="btn btn-primary">Follow</button>
                    <button className="btn btn-danger">Message</button>
                </div> */}
                {/* 메뉴 */}
                <div className="profile-usermenu">
                    <ul>
                        <li className={activeMenu === "Overview" ? "active" : ""}>
                            <a href="#" onClick={() => handleMenuClick("Overview")}>
                                <i className="fa fa-home"></i> Overview
                            </a>
                        </li>
                        <li className={activeMenu === "Account Settings" ? "active" : ""}>
                            <a href="#" onClick={() => handleMenuClick("Account Settings")}>
                                <i className="fa fa-cog"></i> Account Settings
                            </a>
                        </li>
                        <li className={activeMenu === "Tasks" ? "active" : ""}>
                            <a href="#" onClick={() => handleMenuClick("Tasks")}>
                                <i className="fa fa-tasks"></i> Tasks
                            </a>
                        </li>
                        <li className={activeMenu === "Help" ? "active" : ""}>
                            <a href="#" onClick={() => handleMenuClick("Help")}>
                                <i className="fa fa-question-circle"></i> Help
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* 메인 콘텐츠 */}
            <div className="profile-main">
                <h1>Welcome to your profile</h1>
                <p>Here you can manage your account settings, tasks, and more.</p>
            </div>
        </div>
    );
};

export default UserProfile;
