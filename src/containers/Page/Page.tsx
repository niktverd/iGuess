import React from 'react';

import type {NextPage} from 'next';
import Link from 'next/link';

import styles from './Page.module.css';

type PageProps = {
    hideNavigation?: boolean;
} & React.PropsWithChildren;

export const Page: NextPage<PageProps> = ({hideNavigation = false, children}: PageProps) => {
    return (
        <div className={styles.container}>
            {!hideNavigation && (
                <div className={styles.navigation}>
                    <ul className={styles['nav-list']}>
                        <li className={styles['nav-item']}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={styles['nav-item']}>
                            <Link href="/">Demo</Link>
                        </li>
                        <li className={styles['nav-item']}>Sign In</li>
                        <li className={styles['nav-item']}>Projects</li>
                        <li className={styles['nav-item']}>Donate</li>
                        <li className={styles['nav-item']}>Payments</li>
                    </ul>
                </div>
            )}
            <div className={styles.content}>{children}</div>
        </div>
    );
};
