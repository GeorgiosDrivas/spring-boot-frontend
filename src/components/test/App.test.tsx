import { clearTokenOnWindowClose } from "../../App";

describe('useHandleClick', () => {
    beforeAll(() => {
        window.localStorage.clear();
    });

    clearTokenOnWindowClose();

    it('should delete local-storage token when app closes', () => {
        expect(window.localStorage.length).toBe(0);
    });
});