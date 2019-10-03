import { isNumber, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: 10,
            stringValue: 10,
        },
        {
            jsonValue: 28,
            stringValue: 28,
        },
        {
            jsonValue: 23456,
            stringValue: 23456,
        },
    ]
})

test("Return 'IsType.Yes' when all jsonValues are numbers that === stringValues", () => {
    expect(isNumber(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when any jsonValues are not a number", () => {
    test('Array', () => {
        records = validRecords.concat([{ stringValue: ['5'], jsonValue: ['5'] }])
        expect(isNumber(records)).toBe(IsType.No)
    })
    test('String', () => {
        records = validRecords.concat([{ stringValue: '5', jsonValue: '5' }])
        expect(isNumber(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isNumber(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isNumber(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isNumber(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isNumber(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => [], jsonValue: () => [] }])
        expect(isNumber(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when a jsonValue doesn't equal a stringValue", () => {
    records = validRecords.concat([{ stringValue: '1234', jsonValue: 1235 }])
    expect(isNumber(records)).toBe(IsType.No)
})
