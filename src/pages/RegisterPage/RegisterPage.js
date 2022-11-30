import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Education } from '../../features/register/Education';
import { Experience } from '../../features/register/Experience';
import { PersonalInfo } from '../../features/register/PersonalInfo';
import { Tabs } from '../../features/tabs/Tabs';
import { UploadResume } from '../../features/register/UploadResume';

import background from './background.jpg';
import background_shape from './background_shape.png';
import styles from './RegisterPage.module.css';

export function RegisterPage() {
    const navigate = useNavigate();
    const tabs = [
        {key: 1, value: "Personal Information", path: "personalinfo"}, 
        {key: 2, value: "Resume", path: "resume"}, 
        {key: 3, value: "Experience", path: "experience"}, 
        {key: 4, value: "Education", path: "education"}
    ];

    return (
        <div className={styles.registerContainer} style={{ backgroundImage: `url(${background})` }}>
            <div className={styles.registerContainerInternal} style={{ backgroundImage: `url(${background_shape})` }}>
                <div className={styles.registerContainerStaging}>
                    <Tabs style={{margin: '0 auto'}} tabs={tabs} />
                    <Routes>
                        <Route index element={<PersonalInfo nextTab={() => navigate('/register/resume')} />} />
                        <Route path="/personalinfo" element={<PersonalInfo nextTab={() => navigate('/register/resume')}  />} />
                        <Route path="/resume" element={<UploadResume nextTab={() => navigate('/register/experience')}  />} />
                        <Route path="/experience" element={<Experience nextTab={() => navigate('/register/education')}  />} />
                        <Route path="/education" element={<Education  />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}