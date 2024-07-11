import { useEffect } from 'react';
import { clientApi } from '../api/client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { storeData } from '../userSlice';

export const useDisplayUser = ({ linkUrl}: {linkUrl: string}) => {
    const dispatch = useDispatch();
    const id = useSelector((state: RootState) => state.userSlice.id);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await clientApi.get(`${linkUrl}/${id}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch user data');
                }
                dispatch(storeData(response.data));
            } catch (error: any) {
                console.error('Error fetching user data:', error.message);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id, linkUrl, dispatch]);
};