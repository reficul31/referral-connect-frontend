import React from 'react';

import styles from './Tabs.module.css';

export function Tabs({tabs, onChange, currentTabKey}) {
    return (
        <div className={styles.tabsContainer}>
            {
                tabs.map(tab => {
                    if (tab.key <= currentTabKey) {
                        return (<div
                            key={tab.key} 
                            className={styles.currentTab} 
                            style={{width: `${100 / tabs.length}%`, cursor: 'pointer'}}
                            onClick={e => onChange(tab.key)}
                            >
                                {tab.value}
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