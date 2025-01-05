import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        user: null,
    });

    // 로그인 함수
    const login = (user) => {
        setAuth({ isLoggedIn: true, user });
        localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true, user })); // 상태를 localStorage에 저장
    };

    // 로그아웃 함수
    const logout = () => {
        setAuth({ isLoggedIn: false, user: null });
        localStorage.removeItem('auth'); // localStorage에서 삭제
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload(); // 앱 상태 초기화
    };

    // 새로고침 시 상태 복원
    useEffect(() => {
        const storedAuth = localStorage.getItem('auth'); // localStorage에서 상태 가져오기
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth)); // JSON 문자열을 객체로 변환하여 상태 복원
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
