import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import deleteIcon from './deleteIcon.png';
import editIcon from './editIcon.png';
import styles from './Experience.module.css';
import { selectExperience, addExperience, removeExperience } from './registerSlice';

export function Experience({nextTab}) {
    const dispatch = useDispatch();
    const experience = useSelector(selectExperience);

    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch(addExperience({company, role, dateFrom, dateTo, description}));
        setCompany('');
        setRole('');
        setDateFrom('');
        setDateTo('');
        setDescription('');
    }

    const handleRemove = e => dispatch(removeExperience(e));
    const handleEdit = (e) => {
        dispatch(removeExperience(e));
        setCompany(e.company);
        setRole(e.role);
        setDateFrom(e.dateFrom);
        setDateTo(e.dateTo);
        setDescription(e.description);
    };
    
    const clearAllFields = (e) => {
        e.preventDefault();
        setCompany('');
        setRole('');
        setDateFrom('');
        setDateTo('');
        setDescription('');
        experience.map(e => dispatch(removeExperience(e)));
    }

    const handleNext = (e) => {
        e.preventDefault();
        nextTab();
    }

    return (
        <div className={styles.experienceContainer}>
            <div className={styles.experienceTitle}>
                <p>Experience</p>
            </div>
            <div className={styles.experienceStaging}>
                <form className={styles.experienceLeft} onSubmit={handleAdd}>
                    <span>
                        <p className={styles.experienceLabel}>Company</p>
                        <input className={styles.experienceInput} value={company} onChange={(e) => setCompany(e.target.value)} type="text" />
                    </span>
                    <span>
                        <p className={styles.experienceLabel}>Role Name</p>
                        <input className={styles.experienceInput} value={role} onChange={(e) => setRole(e.target.value)} type="text" />
                    </span>
                    <div className={styles.experienceDate}>
                        <span>
                            <p className={styles.experienceLabel}>From</p>
                            <input className={styles.experienceInput} style={{width: '100%'}} value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} type="date" />
                        </span>
                        <span>
                            <p className={styles.experienceLabel}>To</p>
                            <input className={styles.experienceInput} style={{width: '100%'}} value={dateTo} onChange={(e) => setDateTo(e.target.value)} type="date" />
                        </span>
                    </div>
                    <span>
                        <p className={styles.experienceLabel}>Description</p>
                        <textarea className={styles.experienceInput} style={{height: 'auto'}} value={description} onChange={(e) => setDescription(e.target.value)} type="text" rows="4" />
                    </span>
                    <input className={styles.experienceSubmit} type="submit" value="Add" />
                </form>
                <div className={styles.experienceRight}>
                    {
                        experience.map(exp => (
                            <div className={styles.experienceAdded}>
                                <div className={styles.experienceAddedInfo}>
                                    <p style={{color: '#F5757C'}}>{exp.company}</p>
                                    <p>{exp.role}</p>
                                </div>
                                <div className={styles.experienceAddedButtons}>
                                    <div className={styles.experienceAddedButtonsEdit} onClick={e => handleEdit(exp)}><img src={editIcon} alt="Edit" /></div>
                                    <div className={styles.experienceAddedButtonsDelete} onClick={e => handleRemove(exp)}><img src={deleteIcon} alt="Delete" /></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.experienceFooter}>
                <span className={styles.experienceButtonContainer}>
                    <button className={styles.experienceClearButton} onClick={clearAllFields}>CLEAR</button>
                    <button className={styles.experienceNextButton} onClick={handleNext}>NEXT</button>
                </span>
            </div>
        </div>
    );
}