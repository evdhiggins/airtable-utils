import { isSingleLineText, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: 'Single line text',
            stringValue: 'Single line text',
        },
        {
            jsonValue: 'Single line text',
            stringValue: 'Single line text',
        },
        {
            jsonValue: 'Single line text',
            stringValue: 'Single line text',
        },
    ]
})

test("Return 'IsType.Yes' when all jsonValues === stringValues, all values are strings, and there are no newline characters", () => {
    expect(isSingleLineText(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when any values are not a string", () => {
    test('Array', () => {
        records = validRecords.concat([
            { stringValue: ['Single line text'], jsonValue: ['Single line text'] },
        ])
        expect(isSingleLineText(records)).toBe(IsType.No)
    })
    test('Number', () => {
        records = validRecords.concat([{ stringValue: 5, jsonValue: 5 }])
        expect(isSingleLineText(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isSingleLineText(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isSingleLineText(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isSingleLineText(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isSingleLineText(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => [], jsonValue: () => [] }])
        expect(isSingleLineText(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when a value contains a newline character", () => {
    records = validRecords.concat([
        { stringValue: 'Single line\ntext', jsonValue: 'Single line\ntext' },
    ])
    expect(isSingleLineText(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when a jsonValue !== stringValue ", () => {
    records = validRecords.concat([
        { stringValue: 'Single line text', jsonValue: 'single line text' },
    ])
    expect(isSingleLineText(records)).toBe(IsType.No)
})
