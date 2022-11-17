import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Login.module.css';
import { queryAsync, selectEmail, selectPassword, setEmail, setPassword } from './loginSlice';

export function Login() {
    const dispatch = useDispatch();
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);

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