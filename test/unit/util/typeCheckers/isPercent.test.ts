import { isPercent, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: 0.3,
            stringValue: '30%',
        },
        {
            jsonValue: 1,
            stringValue: '100%',
        },
        {
            jsonValue: 0.01,
            stringValue: '1%',
        },
    ]
})

test("Return 'IsType.Yes' when all jsonValues are numbers that === converted stringValues, all string values contain '%'", () => {
    expect(isPercent(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when any jsonValues are not a number", () => {
    test('Array', () => {
        records = validRecords.concat([{ stringValue: ['50%'], jsonValue: [0.5] }])
        expect(isPercent(records)).toBe(IsType.No)
    })
    test('String', () => {
        records = validRecords.concat([{ stringValue: '50%', jsonValue: '0.5' }])
        expect(isPercent(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isPercent(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isPercent(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isPercent(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isPercent(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => '50%', jsonValue: () => 0.5 }])
        expect(isPercent(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when a jsonValue doesn't equal a converted stringValue", () => {
    records = validRecords.concat([{ stringValue: '50%', jsonValue: 50 }])
    expect(isPercent(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when a stringValue doesn't contain '%'", () => {
    records = validRecords.concat([{ stringValue: '1234.00', jsonValue: 1234 }])
    expect(isPercent(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when a stringValue contains a symbol that isn't '%'", () => {
    records = validRecords.concat([{ stringValue: '$1234.00%', jsonValue: 1234 }])
    expect(isPercent(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when a stringValue cannot be coerced into a valid number", () => {
    records = validRecords.concat([{ stringValue: '1.12.23%', jsonValue: 1.1223 }])
    expect(isPercent(records)).toBe(IsType.No)
})
