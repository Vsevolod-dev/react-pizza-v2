import React from 'react';
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>NotFound</h1>
        </div>
    );
};

export default NotFoundBlock;
