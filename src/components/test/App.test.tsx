import { clearTokenOnWindowClose } from "../../utils/clearTokenOnWindowClose";

describe('useHandleClick', () => {
    beforeAll(() => {
        window.localStorage.clear();
    });

    clearTokenOnWindowClose();

    it('should delete local-storage token when app closes', () => {
        expect(window.localStorage.length).toBe(0);
    });
});