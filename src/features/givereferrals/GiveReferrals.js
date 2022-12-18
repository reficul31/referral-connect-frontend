import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './GiveReferrals.module.css';
import { queryAsync, selectReferrals } from './giveReferralsSlice';

export function GiveReferrals() {
    const dispatch = useDispatch();
    const referrals = useSelector(selectReferrals);

    useEffect(() => {
        dispatch(queryAsync());
    }, [dispatch]);

    const handleAccept = (e, referral) => {
        e.preventDefault();

        console.log(referral);
    }

    const handleDecline = (e, referral) => {
        e.preventDefault();

        console.log(referral);
    }

    return (
        <div className={styles.giveReferralsContainer}>
            <h1>Give Referrals</h1>
            <table className={styles.giveReferralsTable}>
                <thead>
                    <tr className={styles.giveReferralsTableRow} style={{backgroundColor: '#D9D9D9', height: '40px'}}>
                        <th style={{width:'30%'}}>Profile</th>
                        <th style={{width:'20%'}}>Link</th>
                        <th style={{width:'20%'}}>Score</th>
                        <th style={{width:'30%'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        referrals.map((referral, idx) => (
                            <tr key={idx} className={styles.giveReferralsTableRow}>
                                <td style={{width:'30%'}}>
                                    <p><a href={referral.resume}>{referral.name}</a></p>
                                    <p style={{color: 'grey'}}>{referral.role}</p>
                                </td>
                                <td style={{width:'20%'}}><a href={referral.link}>Link</a></td>
                                <td style={{width:'20%'}}>{referral.score}</td>
                                <td style={{width:'15%', color: 'green', cursor: 'pointer'}} onClick={e => handleAccept(e, referral)}>Refer</td>
                                <td style={{width:'15%', color: 'red', cursor: 'pointer'}} onClick={e => handleDecline(e, referral)}>Decline</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}