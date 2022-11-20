import React from 'react';

import { Education } from './Education';
import { Experience } from './Experience';
import { PersonalInfo } from './PersonalInfo';
import { UploadResume } from './UploadResume';

export function Register({currentTabKey, changeTab}) {
    if (currentTabKey === 1) {
        return (<PersonalInfo nextTab={() => changeTab(2)} />);
    } else if (currentTabKey === 2) {
        return (<UploadResume nextTab={() => changeTab(3)} />);
    } else if (currentTabKey === 3) {
        return (<Experience nextTab={() => changeTab(4)} />);
    } else if (currentTabKey === 4) {
        return (<Education />)
    }
    
    return <p>Not Implemented</p>
}