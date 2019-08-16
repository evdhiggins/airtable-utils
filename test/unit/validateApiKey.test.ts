import validateApiKey from '../../src/validateApiKey'

// valid in format, not actuality
const validApiKey = 'key00000000000000'

test('Return a boolean', () => {
    expect(typeof validateApiKey('')).toBe('boolean')
})

describe('Always return `false` on non-string input', () => {
    const validate = (arg: any) => validateApiKey((arg as unknown) as any)

    test('boolean', () => {
        expect(validate(true)).toBe(false)
    })
    test('number', () => {
        expect(validate(234)).toBe(false)
    })
    test('undefined', () => {
        expect(validate(undefined)).toBe(false)
    })
    test('null', () => {
        expect(validate(null)).toBe(false)
    })
    test('object', () => {
        expect(validate({ key: 'value' })).toBe(false)
    })
    test('function', () => {
        expect(validate(() => validApiKey)).toBe(false)
    })
})

describe('Return false when the argument is a string that...', () => {
    test('Is less than 17 characters in length', () => {
        const shortApiKey = validApiKey.substring(0, 15)
        expect(validateApiKey(shortApiKey)).toBe(false)
    })
    test('Is greater than 17 characters in length', () => {
        const longApiKey = `${validApiKey}0`
        expect(validateApiKey(longApiKey)).toBe(false)
    })
    test('Does not begin with "key" ', () => {
        const invalidApiKey = `kei${validApiKey}`.substring(0, 17)
        expect(validateApiKey(invalidApiKey)).toBe(false)
    })
    test('Contains non-alphanumeric characters', () => {
        const invalidApiKey = `key`.padEnd(17, '$')
        expect(validateApiKey(invalidApiKey)).toBe(false)
    })
})

test('Return `true` when the argument is a valid string', () => {
    expect(validateApiKey(validApiKey)).toBe(true)
})
