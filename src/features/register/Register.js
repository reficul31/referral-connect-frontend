import React from 'react';

import { PersonalInfo } from './PersonalInfo';
import { UploadResume } from './UploadResume';
import styles from './Register.module.css';

export function Register({currentTabKey, changeTab}) {
    if (currentTabKey === 1) {
        return (<PersonalInfo nextTab={() => changeTab(2)} />);
    } else if (currentTabKey === 2) {
        return (<UploadResume nextTab={() => changeTab(3)} />);
    }
    
    return <p>Not Implemented</p>
}