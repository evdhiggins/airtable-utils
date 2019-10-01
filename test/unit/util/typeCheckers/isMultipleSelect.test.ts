import { isMultipleSelect, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: ['Option 1', 'Option 2'],
            stringValue: 'Option 1, Option 2',
        },
        {
            jsonValue: ['Option 1', 'Option 2'],
            stringValue: 'Option 1, Option 2',
        },
        {
            jsonValue: ['Option 1', 'Option 2'],
            stringValue: 'Option 1, Option 2',
        },
        {
            jsonValue: ['Option 2', 'Option 3'],
            stringValue: 'Option 2, Option 3',
        },
        {
            jsonValue: ['Option 2', 'Option 3'],
            stringValue: 'Option 2, Option 3',
        },
        {
            jsonValue: ['Option 2', 'Option 3'],
            stringValue: 'Option 2, Option 3',
        },
    ]
})

test(`Return 'IsType.Yes' when all jsonValues are arrays of string that match stringValues`, () => {
    expect(isMultipleSelect(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when any values are not an array", () => {
    test('String', () => {
        records = validRecords.concat([{ stringValue: 'text', jsonValue: 'text' }])
        expect(isMultipleSelect(records)).toBe(IsType.No)
    })
    test('Number', () => {
        records = validRecords.concat([{ stringValue: 5, jsonValue: 5 }])
        expect(isMultipleSelect(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isMultipleSelect(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isMultipleSelect(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isMultipleSelect(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isMultipleSelect(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => [], jsonValue: () => [] }])
        expect(isMultipleSelect(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when a jsonValue array contains an element that isn't a string", () => {
    records = validRecords.concat([{ jsonValue: ['Option 1', 2], stringValue: 'Option 1, 2' }])
    expect(isMultipleSelect(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when a jsonValue does not match stringValue ", () => {
    records = validRecords.concat([
        { jsonValue: ['Option 4', 'Option 5'], stringValue: 'Option 5, Option 4' },
    ])
    expect(isMultipleSelect(records)).toBe(IsType.No)
})
