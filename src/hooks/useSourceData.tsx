import {useContext} from 'react';

import {SourceDataContext} from '../contexts/SourceDataContext';

export const useSourceData = () => {
    return useContext(SourceDataContext);
};
