import React, { useState } from 'react';

import { Register } from '../../features/register/Register';
import { Tabs } from '../../features/tabs/Tabs';

import background from './background.jpg';
import background_shape from './background_shape.png';
import styles from './RegisterPage.module.css';

export function RegisterPage() {
    const [currentTab, setCurrentTab] = useState(1);
    const tabs = [
        {key: 1, value: "Personal Information"}, 
        {key: 2, value: "Resume"}, 
        {key: 3, value: "Experience"}, 
        {key: 4, value: "Education"}
    ];

    return (
        <div className={styles.registerContainer} style={{ backgroundImage: `url(${background})` }}>
            <div className={styles.registerContainerInternal} style={{ backgroundImage: `url(${background_shape})` }}>
                <div className={styles.registerContainerStaging}>
                    <Tabs style={{margin: '0 auto'}} tabs={tabs} onChange={setCurrentTab} currentTabKey={currentTab} />
                    <Register currentTabKey={currentTab} changeTab={setCurrentTab} />
                </div>
            </div>
        </div>
    );
}