import React from 'react';

import {CirclePlus} from '@gravity-ui/icons';
import {uuid} from 'uuidv4';

import {Plan, Product, Project} from '../../../business/types';
import {useSourceData} from '../../../hooks/useSourceData';
import {deepCopy} from '../../../utils/json';

import styles from './AddCard.module.css';

type AddCardProps = {
    type: 'products' | 'plans' | 'project';
    initialValue: Product | Plan | Project;
};

export const AddCard = ({type, initialValue}: AddCardProps) => {
    const {sourceData, setSourceData} = useSourceData();

    const addNewEntitty = () => {
        if (type === 'plans') {
            sourceData[type].push({...initialValue, id: uuid()} as Plan);
        }

        if (type === 'products') {
            sourceData[type].push({...initialValue, id: uuid()} as Product);
        }

        if (type === 'project') {
            sourceData[type] = initialValue as Project;
        }

        setSourceData(deepCopy(sourceData));
    };

    return (
        <div className={styles.container}>
            <button className={styles['button-container']} onClick={() => addNewEntitty()}>
                <CirclePlus width={54} height={54} />
            </button>
        </div>
    );
};
