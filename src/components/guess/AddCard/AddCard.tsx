import React from 'react';

import {CirclePlus} from '@gravity-ui/icons';
import {uuid} from 'uuidv4';

import {Plan, Product, ProjectData} from '../../../business/types';
import {useSourceData} from '../../../hooks/useSourceData';
import {deepCopy} from '../../../utils/json';

import styles from './AddCard.module.css';

type AddCardProps = {
    type: 'products' | 'plans' | 'project';
    initialValue: Product | Plan | ProjectData;
    placeholder?: string;
    onClick?: () => void;
};

export const AddCard = ({type, initialValue, placeholder, onClick}: AddCardProps) => {
    const {sourceData, setSourceData} = useSourceData();

    const addNewEntitty = () => {
        if (type === 'plans') {
            sourceData[type].push({...initialValue, id: uuid()} as Plan);
        }

        if (type === 'products') {
            sourceData[type].push({...initialValue, id: uuid()} as Product);
        }

        if (type === 'project') {
            sourceData[type] = initialValue as ProjectData;
        }

        setSourceData(deepCopy(sourceData));
    };

    return (
        <div className={styles.container}>
            <button className={styles['button-container']} onClick={onClick || addNewEntitty}>
                <CirclePlus width={54} height={54} />
            </button>
            {placeholder ? <div className={styles.placeholder}>{placeholder}</div> : null}
        </div>
    );
};
