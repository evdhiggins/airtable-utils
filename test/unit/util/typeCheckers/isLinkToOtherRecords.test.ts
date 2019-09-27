import { isLinkToOtherRecords, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

const mockRecordId = 'rec'.padEnd(17, '0')

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: [mockRecordId, mockRecordId],
            stringValue: `${mockRecordId}, ${mockRecordId}`,
        },
        {
            jsonValue: [mockRecordId, mockRecordId],
            stringValue: `${mockRecordId}, ${mockRecordId}`,
        },
        {
            jsonValue: [mockRecordId, mockRecordId],
            stringValue: `${mockRecordId}, ${mockRecordId}`,
        },
    ]
})

test("Return 'IsType.Yes' when all jsonValue values are arrays containing multiple recordId strings", () => {
    expect(isLinkToOtherRecords(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when json values are not an array", () => {
    test('String', () => {
        records = validRecords.concat([{ stringValue: 'string', jsonValue: 'string' }])
        expect(isLinkToOtherRecords(records)).toBe(IsType.No)
    })
    test('Number', () => {
        records = validRecords.concat([{ stringValue: 5, jsonValue: 5 }])
        expect(isLinkToOtherRecords(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isLinkToOtherRecords(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isLinkToOtherRecords(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isLinkToOtherRecords(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isLinkToOtherRecords(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => [], jsonValue: () => [] }])
        expect(isLinkToOtherRecords(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when value is an empty array", () => {
    expect(isLinkToOtherRecords([])).toBe(IsType.No)
})

test("Return 'IsType.No' when jsonValue array contains less than 2 items", () => {
    records = [
        {
            stringValue: mockRecordId,
            jsonValue: [mockRecordId],
        },
    ]
    expect(isLinkToOtherRecords(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when jsonRecord array contains a string that isn't a record id", () => {
    records = validRecords.concat([
        {
            stringValue: `Not a record ID. ${mockRecordId}`,
            jsonValue: [mockRecordId, 'Not a record ID'],
        },
    ])
    expect(isLinkToOtherRecords(records)).toBe(IsType.No)
})
