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

test('Perform a phin http request to a url that contains the baseId', async done => {
    await makeApiRequest(apiKey, baseId, tableId)
    const requestArg = phinMock.mock.calls[0][0]
    expect(requestArg.url).toMatch(baseId)
    done()
})

test('Perform a phin http request to a url that contains the tableId', async done => {
    await makeApiRequest(apiKey, baseId, tableId)
    const requestArg = phinMock.mock.calls[0][0]
    expect(requestArg.url).toMatch(tableId)
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

test('Include no query params when options.format = "json"', async done => {
    await makeApiRequest(apiKey, baseId, tableId, { format: 'json' })
    const requestArg = phinMock.mock.calls[0][0]
    expect(requestArg.url).not.toMatch('?')
    done()
})

test('Include no query params when options.format is not defined', async done => {
    await makeApiRequest(apiKey, baseId, tableId)
    const requestArg = phinMock.mock.calls[0][0]
    expect(requestArg.url).not.toMatch('?')
    done()
})

test('Pass `cellFormat`, `userLocale`, and `timeZone` query params when options.format = "string"', async done => {
    await makeApiRequest(apiKey, baseId, tableId, { format: 'string' })
    const requestArg = phinMock.mock.calls[0][0]
    expect(requestArg.url).toMatch(`?cellFormat=string&timeZone=America%2FChicago&userLocale=en-us`)
    done()
})
