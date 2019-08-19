import throttleFactory, { now as getNow, sleepUntil } from '../../../src/util/throttle'

let NOW = 0

// create mocks
const nowMock = jest.fn(() => NOW)
jest.useFakeTimers()
global.Date.now = nowMock

beforeEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
    NOW = 0
})

describe('now (getNow)', () => {
    test('Call Date.now()', () => {
        getNow()
        expect(nowMock.mock.calls.length).toBe(1)
    })
    test('Return the current timestamp from Date.now', () => {
        const value1 = 0
        NOW = value1
        const result1 = getNow()

        const value2 = 150000
        NOW = value2
        const result2 = getNow()

        expect(result1).toBe(value1)
        expect(result2).toBe(value2)
    })
})

describe('sleepUntil', () => {
    describe('If the current timestamp is less than the target timestamp', () => {
        test('Call setTimeout', () => {
            // tslint:disable-next-line:no-floating-promises
            sleepUntil(NOW + 1000)
            expect(setTimeout).toHaveBeenCalledTimes(1)
        })
        test('Call setTimeout for a duration equal to the target duration - NOW', () => {
            NOW = 0
            const targetTimestamp = 1234
            // tslint:disable-next-line:no-floating-promises
            sleepUntil(NOW + targetTimestamp)
            expect(setTimeout).toBeCalledWith(expect.any(Function), targetTimestamp)
        })
    })
    describe('If the currenct timestamp is greater than the target timestamp', () => {
        test(`Don't call setTimeout`, async done => {
            const targetTimestamp = 1000
            NOW = 2000
            await sleepUntil(targetTimestamp)
            expect(setTimeout).not.toHaveBeenCalled()
            done()
        })
    })
    describe('If the currenct timestamp is equal to the target timestamp', () => {
        test(`Don't call setTimeout`, async done => {
            const targetTimestamp = 1000
            NOW = 1000
            await sleepUntil(targetTimestamp)
            expect(setTimeout).not.toHaveBeenCalled()
            done()
        })
    })
})

describe('throttleFactory', () => {
    test('Return a function', () => {
        const result = throttleFactory()
        expect(typeof result).toBe('function')
    })
})

describe('throttle', () => {
    const throttledFn = jest.fn()

    test('Call the passed throttled function', async done => {
        const throttle = throttleFactory()
        await throttle(throttledFn)
        expect(throttledFn).toHaveBeenCalled()
        done()
    })

    test('Call the passed throttled function with all received arguments', async done => {
        const throttle = throttleFactory()
        const arg1 = 'arg1'
        const arg2 = 2
        await throttle(throttledFn, arg1, arg2)
        expect(throttledFn).toHaveBeenCalledWith(arg1, arg2)
        done()
    })

    describe('When a throttle is created with a duration of 5 seconds and 3 calls per duration', () => {
        let throttle: ReturnType<typeof throttleFactory>
        beforeEach(() => {
            throttle = throttleFactory(3, 5000)
        })
        describe('When called 3x', () => {
            test('Call the throttled fn each time', async done => {
                await throttle(throttledFn)
                expect(throttledFn).toHaveBeenCalledTimes(1)
                await throttle(throttledFn)
                expect(throttledFn).toHaveBeenCalledTimes(2)
                await throttle(throttledFn)
                expect(throttledFn).toHaveBeenCalledTimes(3)
                done()
            })
            test("Don't call setTimeout", async done => {
                await throttle(throttledFn)
                await throttle(throttledFn)
                await throttle(throttledFn)
                expect(setTimeout).not.toHaveBeenCalled()
                done()
            })
        })
        describe('When called 4 times at the same time', () => {
            test('Only call the throttled fn the fourth time after 5 seconds have passed', async done => {
                const proms = [throttle(throttledFn), throttle(throttledFn), throttle(throttledFn), throttle(throttledFn)]
                expect(throttledFn).toHaveBeenCalledTimes(3)
                jest.advanceTimersByTime(5000)
                NOW += 5000
                await Promise.all(proms)
                expect(throttledFn).toHaveBeenCalledTimes(4)
                done()
            })
            test('call setTimeout once', async done => {
                const proms = [throttle(throttledFn), throttle(throttledFn), throttle(throttledFn), throttle(throttledFn)]
                jest.advanceTimersByTime(5000)
                NOW += 5000
                await Promise.all(proms)
                expect(setTimeout).toHaveBeenCalledTimes(1)
                done()
            })
        })
        describe('When called 9 times without ever exceeding the rate limit', () => {
            test('Call throttled function 9 times', async done => {
                await Promise.all([throttle(throttledFn), throttle(throttledFn), throttle(throttledFn)])
                jest.advanceTimersByTime(5000)
                NOW += 5000
                await Promise.all([throttle(throttledFn), throttle(throttledFn), throttle(throttledFn)])
                jest.advanceTimersByTime(5000)
                NOW += 5000
                await Promise.all([throttle(throttledFn), throttle(throttledFn), throttle(throttledFn)])
                jest.advanceTimersByTime(5000)
                NOW += 5000
                expect(throttledFn).toHaveBeenCalledTimes(9)
                done()
            })
            test('Never call setTimout', async done => {
                await Promise.all([throttle(throttledFn), throttle(throttledFn), throttle(throttledFn)])
                jest.advanceTimersByTime(5000)
                NOW += 5000
                await Promise.all([throttle(throttledFn), throttle(throttledFn), throttle(throttledFn)])
                jest.advanceTimersByTime(5000)
                NOW += 5000
                await Promise.all([throttle(throttledFn), throttle(throttledFn), throttle(throttledFn)])
                jest.advanceTimersByTime(5000)
                NOW += 5000
                expect(setTimeout).not.toHaveBeenCalled()
                done()
            })
        })
    })
})
