import  setTargetSize from '../src/utilities/device';

describe('devices handles screen and device interface',()=>{
    it('returns the correct height and width',()=>{
        let screenRatio = {x:21,y:9}
        const {width,height} = setTargetSize(screenRatio);
        expect(width).toBe(1024);
        expect(height).toBe(438.85714285714283)
    });
});