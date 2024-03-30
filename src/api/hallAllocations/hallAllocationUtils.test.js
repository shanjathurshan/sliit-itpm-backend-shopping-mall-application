const { checkExistingAllocationUtil, createAllocationUtil, updateAllocationUtil, deleteAllocationUtil } = require('./hallAllocationUtils');
const HallAllocation = require('./hallAllocationModel');

// mock HallAllocation model
jest.mock('./hallAllocationModel', () => ({
    findOne: jest.fn(),
}));

describe('checkExistingAllocationUtil', () => {
    it('should call HallAllocation.findOne with correct parameters', async () => {
        const day = 'Monday';
        const startTime = '10:00';
        const endTime = '12:00';
        const hall = 'Hall1';

        await checkExistingAllocationUtil(day, startTime, endTime, hall);

        expect(HallAllocation.findOne).toHaveBeenCalledWith({
            hall,
            day,
            $or: [
                {
                    $and: [
                        { startTime: { $lt: startTime } },
                        { endTime: { $gt: startTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $lt: endTime } },
                        { endTime: { $gt: endTime } }
                    ]
                }
            ]
        });
    });
});

describe('createAllocationUtil', () => {
    it('should create a new hall allocation', async () => {
        const day = 'Sunday';
        const startTime = '10:00';
        const endTime = '12:00';
        const allocatedBy = '66001809e920a40c0838f4bb';
        const hall = '6600341ccf3818a63c6f3815';

        HallAllocation.findOne.mockResolvedValue(null);

        const newAllocation = await createAllocationUtil(day, startTime, endTime, allocatedBy, hall);

        expect(newAllocation).toMatchObject({
            hall,
            day,
            startTime,
            endTime,
            allocatedBy,
        });
    });
});
