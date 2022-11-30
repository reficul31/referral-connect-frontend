import React from 'react';
import { Link, useResolvedPath } from 'react-router-dom';

import styles from './Tabs.module.css';

export function Tabs({tabs}) {
    const currentPath = useResolvedPath();
    const path = currentPath.pathname.split("/").pop();
    const currentTab = tabs.find(tab => tab.path === path);

    return (
        <div className={styles.tabsContainer}>
            {
                tabs.map(tab => {
                    if (currentTab !== undefined && tab.key <= currentTab.key) {
                        return (<div
                            key={tab.key} 
                            className={styles.currentTab} 
                            style={{width: `${100 / tabs.length}%`, cursor: 'pointer'}}
                            >
                                <Link to={'/register/'+tab.path}>{tab.value}</Link>
                            </div>);
                    }
                    return (<div
                            key={tab.key} 
                            className={styles.tab} 
                            style={{width: `${100 / tabs.length}%`}}
                            >
                                {tab.value}
                            </div>);
                })
            }
        </div>
    );
}