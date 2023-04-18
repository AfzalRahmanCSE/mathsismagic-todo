const catchAsync=require('./../../utils/catchAsync')

describe('CatchAsync Testing',()=>{
    it('should return a function',async ()=>{
        const result =catchAsync(()=>{})
        expect(typeof result).toBe('function')
    })
    it('should call the original function with the correct arguments', async () => {
        const req = {};
        const res = {};
        const next = jest.fn();
        const originalFunction = jest.fn().mockResolvedValueOnce();
        const wrappedFunction = catchAsync(originalFunction);
        
       await wrappedFunction(req, res, next);
        
    expect(originalFunction).toHaveBeenCalledWith(req, res, next);
});

it('should call the next function with an error if the original function throws an error', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const error = new Error('something went wrong');
    const originalFunction = jest.fn().mockRejectedValueOnce(error);
    const wrappedFunction = catchAsync(originalFunction);
    
    await wrappedFunction(req, res, next);
    
    expect(next).toHaveBeenCalledWith(error);
});





})