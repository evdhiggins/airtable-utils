import { isRating, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: 1,
            stringValue: '1',
        },
        {
            jsonValue: 2,
            stringValue: '2',
        },
        {
            jsonValue: 3,
            stringValue: '3',
        },
        {
            jsonValue: 4,
            stringValue: '4',
        },
        {
            jsonValue: 5,
            stringValue: '5',
        },
    ]
})

test("Return 'IsType.Yes' when all jsonValues are numbers that === converted stringValues, and all values are an integer 1 - 5", () => {
    expect(isRating(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when any jsonValues are not a number", () => {
    test('Array', () => {
        records = validRecords.concat([{ stringValue: ['5'], jsonValue: [5] }])
        expect(isRating(records)).toBe(IsType.No)
    })
    test('String', () => {
        records = validRecords.concat([{ stringValue: '5', jsonValue: '5' }])
        expect(isRating(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isRating(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isRating(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isRating(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isRating(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => '5', jsonValue: () => 5 }])
        expect(isRating(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when a jsonValue doesn't equal a converted stringValue", () => {
    records = validRecords.concat([{ stringValue: '5', jsonValue: 4 }])
    expect(isRating(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when a stringValue cannot be coerced into a valid number", () => {
    records = validRecords.concat([{ stringValue: '$5', jsonValue: 5 }])
    expect(isRating(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when an value is greater than 5", () => {
    records = validRecords.concat([{ stringValue: '6', jsonValue: 6 }])
    expect(isRating(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when an value is less than 1", () => {
    records = validRecords.concat([{ stringValue: '0', jsonValue: 0 }])
    expect(isRating(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when an value not an integer", () => {
    records = validRecords.concat([{ stringValue: '2.5', jsonValue: 2.5 }])
    expect(isRating(records)).toBe(IsType.No)
})
