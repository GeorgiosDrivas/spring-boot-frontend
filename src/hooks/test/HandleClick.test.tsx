import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandleClick } from '../useHandleClick';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('useHandleClick', () => {
    it('should navigate to the correct destination', () => {
        const mockNavigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

        const { result } = renderHook(() => HandleClick());

        act(() => {
            const handleClick = result.current;
            handleClick('test-destination');
        });

        expect(mockNavigate).toHaveBeenCalledWith('/test-destination');
    });
});