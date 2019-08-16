import validateApiKey from '../../src/validateApiKey'

const requestSuccess = {
    statusCode: 404,
    body: {
        error: {
            type: 'MODEL_ID_NOT_FOUND',
        },
    },
}

const requestFailure = {
    statusCode: 401,
    body: {
        error: {
            type: 'UNAUTHORIZED',
        },
    },
}

// valid in format, not actuality
const validApiKey = 'keyabcdefghijklmn'

let phinReturnValue: any
const phinMock = jest.fn(async (...args: any[]) => phinReturnValue)

jest.mock('phin', () => async (...args: any[]) => phinMock(...args))

beforeEach(() => {
    phinMock.mockClear()
    phinReturnValue = requestSuccess
})

describe('basics', () => {
    test('Return a boolean', async done => {
        const result = await validateApiKey(validApiKey)
        expect(typeof result).toBe('boolean')
        done()
    })

    test('Return `true` when the api key is the proper format and the request response indicates a success', async done => {
        phinReturnValue = requestSuccess
        const result = await validateApiKey(validApiKey)
        expect(result).toBe(true)
        done()
    })

    test('Return `false` when the request response indicates a failure', async done => {
        phinReturnValue = requestFailure
        const result = await validateApiKey(validApiKey)
        expect(result).toBe(false)
        done()
    })

    test('Always return `false` on invalid input', async done => {
        const fn = (arg: any) => validateApiKey((arg as unknown) as string)
        await expect(fn(123)).resolves.toBe(false)
        await expect(fn(null)).resolves.toBe(false)
        await expect(fn(undefined)).resolves.toBe(false)
        await expect(fn({ key: 'value' })).resolves.toBe(false)
        await expect(
            fn(() => {
                throw new Error('')
            }),
        ).resolves.toBe(false)
        done()
    })

    test('Never perform an API call when input is invalid', async done => {
        const fn = (arg: any) => validateApiKey((arg as unknown) as string)

        await fn(123)
        await fn(null)
        await fn(undefined)
        await fn({ key: 'value' })
        await fn(() => {
            throw new Error('')
        })

        expect(phinMock.mock.calls.length).toBe(0)

        done()
    })

    describe('When called with a string input that is less than 17 characters in length', () => {
        const shortApiKey = validApiKey.substring(0, 15)
        it("Doesn't perform an API call", async done => {
            await validateApiKey(shortApiKey)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })

        it('Returns false', async done => {
            const result = await validateApiKey(shortApiKey)
            expect(result).toBe(false)
            done()
        })
    })

    describe('When called with a string input that is greater than 17 characters in length', () => {
        const longApiKey = validApiKey + 'a'
        it("Doesn't perform an API call", async done => {
            await validateApiKey(longApiKey)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })

        it('Returns false', async done => {
            const result = await validateApiKey(longApiKey)
            expect(result).toBe(false)
            done()
        })
    })

    describe('When called with a string input that is 17 characters long but doesn\'t start with "key"', () => {
        const invalidApiKey = 'kei' + validApiKey.substring(3)
        it("Doesn't perform an API call", async done => {
            await validateApiKey(invalidApiKey)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })

        it('Returns false', async done => {
            const result = await validateApiKey(invalidApiKey)
            expect(result).toBe(false)
            done()
        })
    })

    describe('When called with a string input that is 17 characters long and starts with "key" but contains non alphanumeric characters', () => {
        const invalidApiKey = 'keyabdefghijklm$'
        it("Doesn't perform an API call", async done => {
            await validateApiKey(invalidApiKey)
            expect(phinMock.mock.calls.length).toBe(0)
            done()
        })

        it('Returns false', async done => {
            const result = await validateApiKey(invalidApiKey)
            expect(result).toBe(false)
            done()
        })
    })
})
