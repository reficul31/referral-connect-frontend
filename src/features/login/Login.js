import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Login.module.css';
import { queryAsync, selectEmail, selectIsAuthenticated, selectPassword, selectSecret, setEmail, setPassword } from './loginSlice';

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const secret = useSelector(selectSecret);

    if (isAuthenticated && secret !== '') {
        navigate('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(queryAsync({email, password}));
    }

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input value={email} placeholder="Email Address" className={styles.loginInput} type="text" onChange={e => dispatch(setEmail(e.target.value))} /><br />
            <input value={password} placeholder="Password" className={styles.loginInput} type="password" onChange={e => dispatch(setPassword(e.target.value))} /><br />
            <input className={styles.loginButton} type="submit" value="Login" />
        </form>
    );
}