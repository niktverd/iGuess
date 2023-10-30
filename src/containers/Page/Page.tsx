import React from 'react';

import type {NextPage} from 'next';
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';

import styles from './Page.module.css';

type PageProps = {
    hideNavigation?: boolean;
    selectedKey?: string;
} & React.PropsWithChildren;

const getItemClass = (className: string, selected: boolean) => {
    if (selected) {
        return `${className} ${styles.selected}`;
    }
    return className;
};

export const Page: NextPage<PageProps> = ({
    hideNavigation = false,
    children,
    selectedKey,
}: PageProps) => {
    const session = useSession();
    return (
        <div className={styles.container}>
            {!hideNavigation && (
                <div className={styles.navigation}>
                    <ul className={styles['nav-list']}>
                        <li className={getItemClass(styles['nav-item'], selectedKey === 'home')}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={getItemClass(styles['nav-item'], selectedKey === 'guess')}>
                            <Link href="/guess">Demo</Link>
                        </li>
                        <li
                            className={getItemClass(styles['nav-item'], selectedKey === 'projects')}
                        >
                            <Link href="/protected/guess">Projects</Link>
                        </li>
                        {/* <li className={getItemClass(styles['nav-item'], selectedKey === 'donate')}>Donate</li> */}
                        {/* <li
                            className={getItemClass(styles['nav-item'], selectedKey === 'payments')}
                        >
                            <Link href="/payments">Payments</Link>
                        </li> */}
                        <li className={getItemClass(styles['nav-item'], selectedKey === '')}>
                            {session.status === 'authenticated' ? (
                                <Link href="/" onClick={() => signOut()}>
                                    Sign out
                                </Link>
                            ) : (
                                <Link href="/api/auth/signin">Sign In</Link>
                            )}
                        </li>
                    </ul>
                </div>
            )}
            <div className={styles.content}>{children}</div>
        </div>
    );
};
