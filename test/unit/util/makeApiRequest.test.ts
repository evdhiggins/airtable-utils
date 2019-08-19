import makeApiRequest, { ThrottleBank } from '../../../src/util/makeApiRequest'
import * as throttleFactory from '../../../src/util/throttle'

const phinMock = jest.fn()
const getThrottleSpy = jest.spyOn(ThrottleBank, 'getThrottle')
const throttleFactorySpy = jest.spyOn(throttleFactory, 'default')
jest.mock('phin', () => async (...args: any[]) => phinMock(...args))

// valid in format, not actuality
const apiKey = 'key'.padEnd(17, '0')
const baseId = 'app'.padEnd(17, '0')
const tableId = 'tbl'.padEnd(17, '0')

beforeEach(() => {
    jest.clearAllMocks()
    // tslint:disable-next-line:no-string-literal
    ThrottleBank['throttles'] = {}
})

test('Request api key-based throttle from ThrottleBank', async done => {
    await makeApiRequest(apiKey, baseId, tableId)
    expect(getThrottleSpy).toHaveBeenLastCalledWith(apiKey)
    done()
})

test('Create a new throttle with a 5 calls per 1000 ms limit', async done => {
    await makeApiRequest(apiKey, baseId, tableId)
    expect(throttleFactorySpy).toHaveBeenCalledWith(5, 1000)
    done()
})

test('Create a new throttle 2x if makeApiRequest is called with two different api keys', async done => {
    await makeApiRequest(apiKey, baseId, tableId)
    await makeApiRequest(apiKey + '0', baseId, tableId)
    expect(throttleFactorySpy).toHaveBeenCalledTimes(2)
    done()
})

test('Only create a single throttle if makeApiRequest is called multiple times with the same api key', async done => {
    await makeApiRequest(apiKey, baseId, tableId)
    await makeApiRequest(apiKey, baseId, tableId)
    await makeApiRequest(apiKey, baseId, tableId)
    expect(throttleFactorySpy).toHaveBeenCalledTimes(1)
    done()
})

test('Perform a phin http request to a url constructed from the baseId and tableId', async done => {
    await makeApiRequest(apiKey, baseId, tableId)
    const requestArg = phinMock.mock.calls[0][0]
    expect(requestArg.url).toBe(`https://api.airtable.com/v0/${baseId}/${tableId}`)
    done()
})

test('Call phin with a authorization header containing the api key', async done => {
    await makeApiRequest(apiKey, baseId, tableId)
    const requestArg = phinMock.mock.calls[0][0]
    expect(requestArg).toHaveProperty('headers')
    expect(requestArg.headers).toHaveProperty('Authorization')
    expect(requestArg.headers.Authorization).toBe(`Bearer ${apiKey}`)
    done()
})
