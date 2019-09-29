import { isCheckbox, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: true,
            stringValue: 'checked',
        },
        {
            jsonValue: true,
            stringValue: 'checked',
        },
        {
            jsonValue: true,
            stringValue: 'checked',
        },
    ]
})

test("Return 'IsType.Yes' when all present jsonValues === true and stringValues === 'checked'", () => {
    expect(isCheckbox(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when any values are not boolean", () => {
    test('Array', () => {
        records = validRecords.concat([{ stringValue: ['checked'], jsonValue: [true] }])
        expect(isCheckbox(records)).toBe(IsType.No)
    })
    test('Number', () => {
        records = validRecords.concat([{ stringValue: 5, jsonValue: 5 }])
        expect(isCheckbox(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isCheckbox(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isCheckbox(records)).toBe(IsType.No)
    })
    test('string', () => {
        records = validRecords.concat([{ stringValue: 'text', jsonValue: 'text' }])
        expect(isCheckbox(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isCheckbox(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => [], jsonValue: () => [] }])
        expect(isCheckbox(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when jsonValue is 'false'", () => {
    records = validRecords.concat([{ stringValue: 'checked', jsonValue: false }])
    expect(isCheckbox(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when stringValue is not 'checked'", () => {
    records = validRecords.concat([{ stringValue: 'Checked', jsonValue: true }])
    expect(isCheckbox(records)).toBe(IsType.No)
})
