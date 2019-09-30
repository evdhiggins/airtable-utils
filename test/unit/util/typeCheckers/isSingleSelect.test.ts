import { isSingleSelect, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: 'Option 1',
            stringValue: 'Option 1',
        },
        {
            jsonValue: 'Option 1',
            stringValue: 'Option 1',
        },
        {
            jsonValue: 'Option 1',
            stringValue: 'Option 1',
        },
        {
            jsonValue: 'Option 2',
            stringValue: 'Option 2',
        },
        {
            jsonValue: 'Option 2',
            stringValue: 'Option 2',
        },
        {
            jsonValue: 'Option 2',
            stringValue: 'Option 2',
        },
    ]
})

test(`Return 'IsType.Yes' when all jsonValues === stringValues, all values are strings,
there are more than 5 records, and the number of unique records is less than 50% of the
total number of records`, () => {
    expect(isSingleSelect(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when any values are not a string", () => {
    test('Array', () => {
        records = validRecords.concat([
            { stringValue: ['Single line text'], jsonValue: ['Single line text'] },
        ])
        expect(isSingleSelect(records)).toBe(IsType.No)
    })
    test('Number', () => {
        records = validRecords.concat([{ stringValue: 5, jsonValue: 5 }])
        expect(isSingleSelect(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isSingleSelect(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isSingleSelect(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isSingleSelect(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isSingleSelect(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => [], jsonValue: () => [] }])
        expect(isSingleSelect(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when there are less than 6 records", () => {
    records = validRecords.slice(0, 4)
    expect(isSingleSelect(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when a jsonValue !== stringValue ", () => {
    records = validRecords.concat([{ stringValue: 'Record A', jsonValue: 'Record a' }])
    expect(isSingleSelect(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when the number of unique values is greater than 50% of the total number of values", () => {
    records = validRecords.map((record, i) => {
        return {
            jsonValue: record.jsonValue + i,
            stringValue: record.stringValue + i,
        }
    })
    expect(isSingleSelect(records)).toBe(IsType.No)
})
