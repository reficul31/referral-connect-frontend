import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './PersonalInfo.module.css';
import { selectPersonalInfo, setPersonalInfo } from './registerSlice';

export function PersonalInfo({nextTab}) {
    const dispatch = useDispatch();
    const personalInfo = useSelector(selectPersonalInfo);

    const [firstName, setFirstName] = useState(personalInfo.firstName);
    const [lastName, setLastName] = useState(personalInfo.lastName);
    const [email, setEmail] = useState(personalInfo.email);
    const [dob, setDob] = useState(personalInfo.dob);
    const [company, setCompany] = useState(personalInfo.company);
    const [phone, setPhone] = useState(personalInfo.phone);
    const [password, setPassword] = useState(personalInfo.password);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setPersonalInfo({firstName, lastName, email, dob, company, phone, password}));
        nextTab();
    }
    
    const clearAllFields = (e) => {
        e.preventDefault();
        dispatch(setPersonalInfo({
            firstName: '',
            lastName: '',
            email:  '',
            dob: '',
            company: '',
            phone: '',
            password: ''
        }));
        setFirstName('');
        setLastName('');
        setEmail('');
        setDob('');
        setCompany('');
        setPhone('');
        setPassword('');
    }

    return (
        <form className={styles.personalInfoContainer} onSubmit={handleSubmit}>
            <div className={styles.personalInfoTitle}>
                <p>Personal Information</p>
            </div>
            <div className={styles.personalInfoBody}>
                <div className={styles.personalInfoLeftBody}>
                    <span>
                        <p className={styles.personalInfoLabel}>First Name</p>
                        <input className={styles.personalInfoInput} value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
                    </span>
                    <span>
                        <p className={styles.personalInfoLabel}>Last Name</p>
                        <input className={styles.personalInfoInput} value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
                    </span>
                    <span>
                        <p className={styles.personalInfoLabel}>Email</p>
                        <input className={styles.personalInfoInput} value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                    </span>
                    <span>
                        <p className={styles.personalInfoLabel}>Date of Birth</p>
                        <input className={styles.personalInfoInput} value={dob} onChange={(e) => setDob(e.target.value)} type="date" />
                    </span>
                </div>
                <div className={styles.personalInfoRightBody}>
                    <span>
                        <p className={styles.personalInfoLabel}>Company</p>
                        <input className={styles.personalInfoInput} value={company} onChange={(e) => setCompany(e.target.value)} type="text" />
                    </span>
                    <span>
                        <p className={styles.personalInfoLabel}>Phone</p>
                        <input className={styles.personalInfoInput} value={phone} onChange={(e) => setPhone(e.target.value)} type="number" />
                    </span>
                    <span>
                        <p className={styles.personalInfoLabel}>Password</p>
                        <input className={styles.personalInfoInput} value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                    </span>
                    <span>
                        <p className={styles.personalInfoLabel}>Confirm Password</p>
                        <input className={styles.personalInfoInput} defaultValue={''} type="password" />
                    </span>
                </div>
            </div>
            <div className={styles.personalInfoFooter}>
                <span className={styles.personalInfoButtonContainer}>
                    <button className={styles.personalInfoClearButton} onClick={clearAllFields}>CLEAR</button>
                    <input className={styles.personalInfoNextButton} value="NEXT" type="submit" />
                </span>
            </div>
        </form>        
    );
}