import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './GetReferrals.module.css';
import { queryAsync } from './getReferralsSlice';

export function GetReferrals() {
    const dispatch = useDispatch();
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');

    const clearAllFields = (e) => {
        e.preventDefault();
        setCompany('');
        setRole('');
        setLink('');
        setDescription('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(queryAsync({company, role, link, description}))
    }

    return (
        <div className={styles.getReferralsContainer}>
            <h1>Get Referrals</h1>
            <form className={styles.getReferralsForm} onSubmit={handleSubmit}>
                <span>
                    <p className={styles.getReferralsLabel}>Company</p>
                    <input className={styles.getReferralsInput} value={company} onChange={e => setCompany(e.target.value)} type="text" />
                </span>
                <span>
                    <p className={styles.getReferralsLabel}>Job Role</p>
                    <input className={styles.getReferralsInput} value={role} onChange={e => setRole(e.target.value)} type="text" />
                </span>
                <span>
                    <p className={styles.getReferralsLabel}>Job Link</p>
                    <input className={styles.getReferralsInput} value={link} onChange={e => setLink(e.target.value)} type="url" />
                </span>
                <span>
                    <p className={styles.getReferralsLabel}>Job Description</p>
                    <textarea className={styles.getReferralsInput} value={description} onChange={e => setDescription(e.target.value)} style={{height: 'auto'}} type="text" rows="12" />
                </span>
                <div className={styles.getReferralsFooter}>
                    <span className={styles.getReferralsButtonContainer}>
                        <button className={styles.getReferralsClearButton} onClick={clearAllFields}>CLEAR</button>
                        <input className={styles.getReferralsNextButton} value="NEXT" type="submit" />
                    </span>
                </div>
            </form>
        </div>
    );
}