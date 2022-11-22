import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import { GetReferrals } from '../../features/getreferrals/GetReferrals';
import { GiveReferrals } from '../../features/givereferrals/GiveReferrals';
import { MyReferrals } from '../../features/myreferrals/MyReferrals';

import background from './background.jpg';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardNavigation} style={{ backgroundImage: `url(${background})` }}>
                <div className={styles.dashboardNavigationContent}>
                    <div>
                        <h1>Referral Connect</h1>
                    </div>
                    <div className={styles.dashboardNavigationContentLinks}>
                        <p><Link to="/myreferrals">My Referrals</Link></p>
                        <p><Link to="/getreferrals">Get Referrals</Link></p>
                        <p><Link to="/givereferrals">Give Referrals</Link></p>
                    </div>
                </div>
            </div>
            <div className={styles.dashboardContent}>
                <div className={styles.dashboardLogoutNavigation}>
                    <span>LOGOUT</span>
                </div>
                <div className={styles.dashboardStaging}>
                    <Routes>
                        <Route index element={<MyReferrals />} />
                        <Route path="/myreferrals" element={<MyReferrals />} />
                        <Route path="/getreferrals" element={<GetReferrals />} />
                        <Route path="/givereferrals" element={<GiveReferrals />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}