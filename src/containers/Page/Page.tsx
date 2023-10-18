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
                            <Link href="/guess">Demo</Link>
                        </li>
                        <li className={styles['nav-item']}>
                            <Link href="/protected/guess">Projects</Link>
                        </li>
                        <li className={styles['nav-item']}>Donate</li>
                        <li className={styles['nav-item']}>Payments</li>
                        <li className={styles['nav-item']}>
                            <Link href="/api/auth/signin">Sign In</Link>
                        </li>
                    </ul>
                </div>
            )}
            <div className={styles.content}>{children}</div>
        </div>
    );
};
