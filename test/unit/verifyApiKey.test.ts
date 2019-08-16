import verifyApiKey from '../../src/verifyApiKey'

// valid in format, not actuality
const validApiKey = 'key00000000000000'

let phinReturnValue: any
const phinMock = jest.fn(async (...args: any[]) => phinReturnValue)
jest.mock('phin', () => async (...args: any[]) => phinMock(...args))

beforeEach(() => {
    phinMock.mockClear()
    phinReturnValue = { statusCode: 404 }
})

test('Return a boolean', async done => {
    const result = await verifyApiKey(validApiKey)
    expect(typeof result).toBe('boolean')
    done()
})

test("Return `false` when the http response status isn't 404", async done => {
    phinReturnValue = { statusCode: 401 }
    const result = await verifyApiKey(validApiKey)
    expect(result).toBe(false)
    done()
})

test('Return `true` when the http response status is 404', async done => {
    phinReturnValue = { statusCode: 404 }
    const result = await verifyApiKey(validApiKey)
    expect(result).toBe(true)
    done()
})

describe("Don't perform an API call when the input value..", () => {
    describe('Is not a string', () => {
        const verify = (arg: any) => verifyApiKey((arg as unknown) as string)
        test('boolean', async done => {
            await verify(true)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })
        test('number', async done => {
            await verify(234)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })
        test('undefined', async done => {
            await verify(undefined)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })
        test('null', async done => {
            await verify(null)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })
        test('object', async done => {
            await verify({ key: 'value' })
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })
        test('function', async done => {
            await verify(() => validApiKey)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })
    })
    test('Is less than 17 characters in length', async done => {
        const shortApiKey = validApiKey.substring(0, 15)
        await verifyApiKey(shortApiKey)
        expect(phinMock.mock.calls.length).toBe(0)
        done()
    })
    test('Is greater than 17 characters in length', async done => {
        const longApiKey = `${validApiKey}0`
        await verifyApiKey(longApiKey)
        expect(phinMock.mock.calls.length).toBe(0)
        done()
    })
    test('Does not begin with "key" ', async done => {
        const invalidApiKey = `kei${validApiKey}`.substring(0, 17)
        await verifyApiKey(invalidApiKey)
        expect(phinMock.mock.calls.length).toBe(0)
        done()
    })
    test('Contains non-alphanumeric characters', async done => {
        const invalidApiKey = `key`.padEnd(17, '$')
        await verifyApiKey(invalidApiKey)
        expect(phinMock.mock.calls.length).toBe(0)
        done()
    })
})
