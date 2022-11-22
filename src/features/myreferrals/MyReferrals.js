import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './MyReferrals.module.css';
import { queryAsync, selectReferrals } from './myReferralsSlice';

export function MyReferrals() {
    const dispatch = useDispatch();
    const referrals = useSelector(selectReferrals);

    useEffect(() => {
        dispatch(queryAsync());
    }, [dispatch]);

    return (
        <div className={styles.myReferralsContainer}>
            <h1>My Referrals</h1>
            <table className={styles.myReferralsTable}>
                <thead>
                    <tr className={styles.myReferralsTableRow} style={{backgroundColor: '#D9D9D9', height: '40px'}}>
                        <th className={styles.myReferralsTableCompany}>Company and Position</th>
                        <th className={styles.myReferralsTableLink}>Link</th>
                        <th className={styles.myReferralsTableStatus}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        referrals.map((referral, idx) => (
                            <tr key={idx} className={styles.myReferralsTableRow}>
                                <td className={styles.myReferralsTableCompany}>
                                    <p>{referral.company}</p>
                                    <p style={{color: 'grey'}}>{referral.role}</p>
                                </td>
                                <td className={styles.myReferralsTableLink}><a href={referral.link}>Link</a></td>
                                <td className={styles.myReferralsTableStatus}>{referral.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}