import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../authProvider';

import styles from './GetReferrals.module.css';
import { queryAsync, selectError, selectInfo } from './getReferralsSlice';

export function GetReferrals() {
    const auth = useAuth();
    const dispatch = useDispatch();

    const error = useSelector(selectError);
    const info = useSelector(selectInfo);

    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [requiredQualifications, setRequiredQualifications] = useState('');
    const [preferredQualifications, setPreferredQualifications] = useState('');

    const clearAllFields = (e) => {
        e.preventDefault();
        setCompany('');
        setRole('');
        setLink('');
        setDescription('');
        setRequiredQualifications('');
        setPreferredQualifications('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(queryAsync({secret: auth.user, data: {company, role, link, description, requiredQualifications, preferredQualifications}}))
    }

    return (
        <div className={styles.getReferralsContainer}>
            <h1>Get Referrals</h1>
            <div style={{color: 'red'}}>{error}</div>
            <div style={{color: 'green'}}>{info}</div>
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
                    <textarea className={styles.getReferralsInput} value={description} onChange={e => setDescription(e.target.value)} style={{height: 'auto'}} type="text" rows="3" />
                </span>
                <span>
                    <p className={styles.getReferralsLabel}>Required Qualifications</p>
                    <textarea className={styles.getReferralsInput} value={requiredQualifications} onChange={e => setRequiredQualifications(e.target.value)} style={{height: 'auto'}} type="text" rows="3" />
                </span>
                <span>
                    <p className={styles.getReferralsLabel}>Preferred Qualifications</p>
                    <textarea className={styles.getReferralsInput} value={preferredQualifications} onChange={e => setPreferredQualifications(e.target.value)} style={{height: 'auto'}} type="text" rows="3" />
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