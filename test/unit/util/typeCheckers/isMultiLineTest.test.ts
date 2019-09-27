import { isMultiLineText, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: 'Only one line',
            stringValue: 'Only one line',
        },
        {
            jsonValue: 'First line\nSecond Line',
            stringValue: 'First line\nSecond Line',
        },
        {
            jsonValue: 'Also only one line',
            stringValue: 'Also only one line',
        },
    ]
})

test("Return 'IsType.Yes' when all jsonValues === stringValues, all values are strings, and there are newline characters in at least one value", () => {
    expect(isMultiLineText(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when any values are not a string", () => {
    test('Array', () => {
        records = validRecords.concat([
            { stringValue: ['Single line text'], jsonValue: ['Single line text'] },
        ])
        expect(isMultiLineText(records)).toBe(IsType.No)
    })
    test('Number', () => {
        records = validRecords.concat([{ stringValue: 5, jsonValue: 5 }])
        expect(isMultiLineText(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isMultiLineText(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isMultiLineText(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isMultiLineText(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isMultiLineText(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => [], jsonValue: () => [] }])
        expect(isMultiLineText(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when no array values contain a newline character", () => {
    records = [{ stringValue: 'Single line', jsonValue: 'Single line' }]
    expect(isMultiLineText(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when a jsonValue !== stringValue ", () => {
    records = validRecords.concat([{ stringValue: 'Line of text', jsonValue: 'line of text' }])
    expect(isMultiLineText(records)).toBe(IsType.No)
})
