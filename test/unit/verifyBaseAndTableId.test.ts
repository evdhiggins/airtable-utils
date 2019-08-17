import verify from '../../src/verifyBaseAndTableId'

// valid in format, not actuality
const validApiKey = 'key'.padEnd(17, '0')
const validBaseId = 'app'.padEnd(17, '0')
const validTableId = 'tbl'.padEnd(17, '0')

let phinReturnValue: any
const phinMock = jest.fn(async (...args: any[]) => phinReturnValue)
jest.mock('phin', () => async (...args: any[]) => phinMock(...args))

beforeEach(() => {
    phinMock.mockClear()
    phinReturnValue = { statusCode: 200 }
})

test('Return a boolean', async done => {
    const result = await verify(validApiKey, validBaseId, validTableId)
    expect(typeof result).toBe('boolean')
    done()
})

test("Return `false` when the http response status isn't 200", async done => {
    phinReturnValue = { statusCode: 404 }
    const result = await verify(validApiKey, validBaseId, validTableId)
    expect(result).toBe(false)
    done()
})

test('Return `true` when the http response status is 200', async done => {
    phinReturnValue = { statusCode: 200 }
    const result = await verify(validApiKey, validBaseId, validTableId)
    expect(result).toBe(true)
    done()
})

describe("Don't perform an API call when any of the input values..", () => {
    describe('Are not a string', () => {
        const fn = (arg: any) => {
            return Promise.all([
                verify((arg as unknown) as string, validBaseId, validTableId),
                verify(validApiKey, (arg as unknown) as string, validBaseId),
                verify(validApiKey, validBaseId, (arg as unknown) as string),
            ])
        }
        test('boolean', async done => {
            await fn(true)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })
        test('number', async done => {
            await fn(234)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })
        test('undefined', async done => {
            await fn(undefined)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })
        test('null', async done => {
            await fn(null)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })
        test('object', async done => {
            await fn({ key: 'value' })
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })
        test('function', async done => {
            await fn(() => validApiKey)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })
    })
    test('Are less than 17 characters in length', async done => {
        const short = (credential: string) => credential.substring(0, 15)

        await verify(short(validApiKey), validBaseId, validTableId)
        await verify(validApiKey, short(validBaseId), validTableId)
        await verify(validApiKey, validBaseId, short(validTableId))
        expect(phinMock.mock.calls.length).toBe(0)
        done()
    })
    test('Are greater than 17 characters in length', async done => {
        const long = (credential: string) => credential.padEnd(18, '0')
        await verify(long(validApiKey), validBaseId, validTableId)
        await verify(validApiKey, long(validBaseId), validTableId)
        await verify(validApiKey, validBaseId, long(validTableId))
        expect(phinMock.mock.calls.length).toBe(0)
        done()
    })
    test('Does not begin with proper prefix ', async done => {
        const invalidPrefix = (credential: string) => `inv${credential}`.substring(0, 17)
        await verify(invalidPrefix(validApiKey), validBaseId, validTableId)
        await verify(validApiKey, invalidPrefix(validBaseId), validTableId)
        await verify(validApiKey, validBaseId, invalidPrefix(validTableId))
        expect(phinMock.mock.calls.length).toBe(0)
        done()
    })
    test('Contains non-alphanumeric characters', async done => {
        const invalidate = (credential: string) => credential.substring(0, 14).padEnd(17, '$')
        await verify(invalidate(validApiKey), validBaseId, validTableId)
        await verify(validApiKey, invalidate(validBaseId), validTableId)
        await verify(validApiKey, validBaseId, invalidate(validTableId))
        expect(phinMock.mock.calls.length).toBe(0)
        done()
    })
})
