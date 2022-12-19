import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Login.module.css';
import { queryAsync, selectEmail, selectError, selectPassword, selectSecret, setEmail, setPassword, setSecret } from './loginSlice';
import { useAuth } from '../../authProvider';

export function Login() {
    const auth = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const error = useSelector(selectError);
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const secret = useSelector(selectSecret);

    if (secret !== '') {
        auth && auth.login(secret);
        dispatch(setSecret(''));
        navigate("/");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(queryAsync({email, password}));
    }

    return (
        <React.Fragment>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <input value={email} placeholder="Email Address" className={styles.loginInput} type="text" onChange={e => dispatch(setEmail(e.target.value))} /><br />
                <input value={password} placeholder="Password" className={styles.loginInput} type="password" onChange={e => dispatch(setPassword(e.target.value))} /><br />
                <input className={styles.loginButton} type="submit" value="Login" />
            </form>
            <div style={{color:"red"}}>{error}</div>
        </React.Fragment>
    );
}