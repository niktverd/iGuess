import React from 'react';

import type {NextPage} from 'next';

import {Breadcrumbs} from '../../src/components/Breadcrumbs/Breadcrumbs';
import {Field} from '../../src/components/Field/Field';
import {Page} from '../../src/containers/Page/Page';

// import styles from 'styles/Home.module.css';

const breadcrumbs = [
    {
        label: 'Tasks',
        url: '/tasks',
    },
];

const CreateTask: NextPage = () => {
    const [form, setForm] = React.useState({
        title: '',
        description: '',
    });

    const handleCreate = async () => {
        await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({
                title: form.title,
                description: form.description,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event);
        const {name, value} = event.target;
        setForm({...form, [name]: value});
    };

    return (
        <Page>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h1>Create new task</h1>
            <Field
                label="Title"
                field={<input name="title" value={form.title} onChange={handleTextInput} />}
            />
            <Field
                label="Description"
                field={
                    <input name="description" value={form.description} onChange={handleTextInput} />
                }
            />
            <button onClick={handleCreate}>Create</button>
        </Page>
    );
};

export default CreateTask;
