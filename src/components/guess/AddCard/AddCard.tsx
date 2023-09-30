import React from 'react';

import {CirclePlus} from '@gravity-ui/icons';
import { uuid } from 'uuidv4';


import { Plan } from '../../../business/plan';
import { Product } from '../../../business/product';
import { useSourceData } from '../../../hooks/useSourceData';

import styles from './AddCard.module.css';

type AddCardProps = {
    type: 'products' | 'plans';
    initialValue: Product | Plan;
};

export const AddCard = ({type, initialValue}: AddCardProps) => {
    const { sourceData, setSourceData } = useSourceData();

    const addNewEntitty = () => {
        if (type === "plans") {
            sourceData[type].push({...initialValue, id: uuid()} as Plan);
        }

        if (type === "products") {
            sourceData[type].push({...initialValue, id: uuid()} as Product);
        }

        setSourceData({...sourceData});
    }

    return (
        <div
            className={styles.container}
        >
            <button
                className={styles['button-container']}
                    onClick={() => addNewEntitty()}
            >
                <CirclePlus width={54} height={54}/>
            </button>
        </div>
    );
};
