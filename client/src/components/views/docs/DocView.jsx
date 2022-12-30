import React from 'react';
import useQuery from '../../../utils/useQuery';
const DocView = () => {
    const query = useQuery();
    const fileURL = query.get('file') || '';
    return <div>{fileURL}</div>;
};

export default DocView;
