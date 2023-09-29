import React from 'react';

import type {NextPage} from 'next';
import {useRouter} from 'next/router';

import {Field} from '../../src/components/Field/Field';
import {Page} from '../../src/containers/Page/Page';

// import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    const [form, setForm] = React.useState({
        login: 'craffil',
        password: 'DdVp8t1pSU',
    });

    const [error, setError] = React.useState<string | unknown>(null);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event);
        const {name, value} = event.target;
        setForm({...form, [name]: value});
    };

    const handleLogin = async () => {
        setError(null);
        const response = await fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify({
                login: form.login,
                password: form.password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!data.ok) {
            setError(data);
        }

        router.push('/protected');
    };

    return (
        <Page hideNavigation>
            <React.Fragment>
                <form onSubmit={handleSubmit}>
                    <Field
                        label="login"
                        field={<input name="login" value={form.login} onChange={handleTextInput} />}
                    />
                    <Field
                        label="password"
                        field={
                            <input
                                name="password"
                                value={form.password}
                                onChange={handleTextInput}
                            />
                        }
                    />
                    <button onClick={handleLogin}>Login</button>
                </form>
                {error && <pre>{JSON.stringify(error, null, 5)}</pre>}
            </React.Fragment>
        </Page>
    );
};

export default Home;
