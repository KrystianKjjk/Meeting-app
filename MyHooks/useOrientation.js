import { react, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export function useOrientation(verticalOrientation, horizontalOrientation) {
    const [orientation, setOrientation] = useState(Dimensions.get('window').width > Dimensions.get('window').height ? horizontalOrientation : verticalOrientation);

    useEffect(() => {
        const updateLayout = () => {
            setOrientation(Dimensions.get('window').width >= Dimensions.get('window').height ? horizontalOrientation : verticalOrientation);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    }, [horizontalOrientation, verticalOrientation]);

    return {
        orientation
    };
}