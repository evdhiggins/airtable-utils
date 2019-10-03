import { isCurrency, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: 10,
            stringValue: '$10.00',
        },
        {
            jsonValue: 28.14,
            stringValue: '$28.14',
        },
        {
            jsonValue: 23456,
            stringValue: '$23456',
        },
    ]
})

test("Return 'IsType.Yes' when all jsonValues are numbers that === converted stringValues, and no string values contain '%'", () => {
    expect(isCurrency(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when any jsonValues are not a number", () => {
    test('Array', () => {
        records = validRecords.concat([{ stringValue: ['$5.00'], jsonValue: [5] }])
        expect(isCurrency(records)).toBe(IsType.No)
    })
    test('String', () => {
        records = validRecords.concat([{ stringValue: '$5.00', jsonValue: '5' }])
        expect(isCurrency(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isCurrency(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isCurrency(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isCurrency(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isCurrency(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => '$5.00', jsonValue: () => 5 }])
        expect(isCurrency(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when a jsonValue doesn't equal a converted stringValue", () => {
    records = validRecords.concat([{ stringValue: '$1234.00', jsonValue: 1235 }])
    expect(isCurrency(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when a stringValue contains '%'", () => {
    records = validRecords.concat([{ stringValue: '1234.00%', jsonValue: 1234 }])
    expect(isCurrency(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when a stringValue doesn't contain a symbol", () => {
    records = validRecords.concat([{ stringValue: '1234.00', jsonValue: 1234 }])
    expect(isCurrency(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when a stringValue cannot be coerced into a valid number", () => {
    records = validRecords.concat([{ stringValue: '$1234.12.23', jsonValue: 1234.1223 }])
    expect(isCurrency(records)).toBe(IsType.No)
})
