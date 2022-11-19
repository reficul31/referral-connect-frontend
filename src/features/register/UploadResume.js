import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone'

import logo from './upload.png'
import styles from './UploadResume.module.css';
import { selectResume, setResume } from './registerSlice';

export function UploadResume({nextTab}) {
    const dispatch = useDispatch();
    const resume = useSelector(selectResume);
    const [file, setFile] = useState(resume);

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length === 0) {
            return;
        }

        setFile(acceptedFiles[0]);
    }, []);
    
    const {getRootProps, getInputProps } = useDropzone({onDrop, multiple: false, accept: {
        'application/*': ['.pdf']
    }});

    const handleNext = (e) => {
        e.preventDefault();
        dispatch(setResume(file));
        nextTab();
    }
    
    const clearResume = (e) => {
        e.preventDefault();
        dispatch(setResume(null));
        setFile(null);
    }

    return (
        <div className={styles.uploadContainer}>
            <div className={styles.uploadTitle}>
                <p>Resume</p>
            </div>
            {file === null ? 
            (<div className={styles.upload} {...getRootProps()}>
                <input {...getInputProps()} />
                <img src={logo} alt="Upload Icon" />
                <div className={styles.uploadText}>
                    <p>Drag and drop your resume here, or browse from device</p>
                    <p style={{fontSize: 'small'}}>Accepted filetypes: PDF</p>
                </div>
            </div>): 
            (<div className={styles.preview}>
                <embed className={styles.uploadPreview} src={URL.createObjectURL(file)} alt="Uploaded" />
            </div>)}
            <div className={styles.uploadResumeFooter}>
                <span className={styles.uploadResumeButtonContainer}>
                    <button className={styles.uploadResumeClearButton} onClick={clearResume}>CLEAR</button>
                    <button className={styles.uploadResumeNextButton} onClick={handleNext}>NEXT</button>
                </span>
            </div>
        </div>
    );
}