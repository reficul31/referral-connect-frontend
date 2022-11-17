import React from 'react';
import { NavLink } from 'react-router-dom';

import { Login } from '../../features/login/Login'

import styles from './LoginPage.module.css';
import background from './background.jpg';

export function LoginPage() {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginDiv}>
                <div className={styles.registerNavigation}>
                    <div className={styles.registerNavigationRight}>
                        <p className={styles.registerText}>Don't have an account?</p>
                        <div className={styles.registerButton}><NavLink to="/register">REGISTER</NavLink></div>
                    </div>
                </div>
                <div className={styles.loginContentDiv}>
                    <div className={styles.loginContentDivCenter}>
                        <h1>Hello! Welcome back.</h1>
                        <h3>Login with the credentials you created at the time of registration.</h3>
                        <Login />
                    </div>
                </div>
            </div>
            <div className={styles.gradientDiv} style={{ backgroundImage: `url(${background})` }}>
                <div className={styles.gradientInfoDiv}>
                    <div className={styles.gradientInfoTitleDiv}>
                        <h1>Referral Connect</h1>
                    </div>
                    <div className={styles.gradientInfoTextDiv}>
                        <p>Get referred by leading industry professionals for top jobs. You refer, we connect!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}