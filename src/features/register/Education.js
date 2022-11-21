import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import deleteIcon from './deleteIcon.png';
import editIcon from './editIcon.png';
import styles from './Education.module.css';
import { selectEducation, addEducation, removeEducation, queryAsync } from './registerSlice';

export function Education() {
    const dispatch = useDispatch();
    const education = useSelector(selectEducation);

    const [level, setLevel] = useState('');
    const [college, setCollege] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch(addEducation({level, college, dateFrom, dateTo, description}));
        setLevel('');
        setCollege('');
        setDateFrom('');
        setDateTo('');
        setDescription('');
    }

    const handleRemove = e => dispatch(removeEducation(e));
    const handleEdit = (e) => {
        dispatch(removeEducation(e));
        setLevel(e.level);
        setCollege(e.college);
        setDateFrom(e.dateFrom);
        setDateTo(e.dateTo);
        setDescription(e.description);
    };
    
    const clearAllFields = (e) => {
        e.preventDefault();
        setLevel('');
        setCollege('');
        setDateFrom('');
        setDateTo('');
        setDescription('');
        education.map(e => dispatch(removeEducation(e)));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(queryAsync());
    }

    return (
        <div className={styles.educationContainer}>
            <div className={styles.educationTitle}>
                <p>Education</p>
            </div>
            <div className={styles.educationStaging}>
                <form className={styles.educationLeft} onSubmit={handleAdd}>
                    <span>
                        <p className={styles.educationLabel}>College Name</p>
                        <input className={styles.educationInput} value={college} onChange={(e) => setCollege(e.target.value)} type="text" />                        
                    </span>
                    <span>
                        <p className={styles.educationLabel}>Education Level</p>
                        <input className={styles.educationInput} value={level} onChange={(e) => setLevel(e.target.value)} type="text" />
                    </span>
                    <div className={styles.educationDate}>
                        <span>
                            <p className={styles.educationLabel}>From</p>
                            <input className={styles.educationInput} style={{width: '100%'}} value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} type="date" />
                        </span>
                        <span>
                            <p className={styles.educationLabel}>To</p>
                            <input className={styles.educationInput} style={{width: '100%'}} value={dateTo} onChange={(e) => setDateTo(e.target.value)} type="date" />
                        </span>
                    </div>
                    <span>
                        <p className={styles.educationLabel}>Description</p>
                        <textarea className={styles.educationInput} style={{height: 'auto'}} value={description} onChange={(e) => setDescription(e.target.value)} type="text" rows="4" />
                    </span>
                    <input className={styles.educationSubmit} type="submit" value="Add" />
                </form>
                <div className={styles.educationRight}>
                    {
                        education.map(exp => (
                            <div className={styles.educationAdded}>
                                <div className={styles.educationAddedInfo}>
                                    <p style={{color: '#F5757C'}}>{exp.level}</p>
                                    <p>{exp.college}</p>
                                </div>
                                <div className={styles.educationAddedButtons}>
                                    <div className={styles.educationAddedButtonsEdit} onClick={e => handleEdit(exp)}><img src={editIcon} alt="Edit" /></div>
                                    <div className={styles.educationAddedButtonsDelete} onClick={e => handleRemove(exp)}><img src={deleteIcon} alt="Delete" /></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.educationFooter}>
                <span className={styles.educationButtonContainer}>
                    <button className={styles.educationClearButton} onClick={clearAllFields}>CLEAR</button>
                    <button className={styles.educationNextButton} onClick={handleSubmit}>SUBMIT</button>
                </span>
            </div>
        </div>
    );
}