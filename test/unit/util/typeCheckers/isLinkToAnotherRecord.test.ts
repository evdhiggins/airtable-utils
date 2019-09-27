import { isLinkToAnotherRecord, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

const mockRecordId = 'rec'.padEnd(17, '0')

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: [mockRecordId],
            stringValue: mockRecordId,
        },
        {
            jsonValue: [mockRecordId],
            stringValue: mockRecordId,
        },
        {
            jsonValue: [mockRecordId],
            stringValue: mockRecordId,
        },
    ]
})

test("Return 'IsType.Yes' when all jsonValue values are arrays containing a single recordId string", () => {
    expect(isLinkToAnotherRecord(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when json values are not an array", () => {
    test('String', () => {
        records = validRecords.concat([{ stringValue: 'string', jsonValue: 'string' }])
        expect(isLinkToAnotherRecord(records)).toBe(IsType.No)
    })
    test('Number', () => {
        records = validRecords.concat([{ stringValue: 5, jsonValue: 5 }])
        expect(isLinkToAnotherRecord(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isLinkToAnotherRecord(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isLinkToAnotherRecord(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isLinkToAnotherRecord(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isLinkToAnotherRecord(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => [], jsonValue: () => [] }])
        expect(isLinkToAnotherRecord(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when value is an empty array", () => {
    expect(isLinkToAnotherRecord([])).toBe(IsType.No)
})

test("Return 'IsType.No' when jsonValue array contains more than 1 item", () => {
    records = validRecords.concat([
        {
            stringValue: `${mockRecordId}, ${mockRecordId}`,
            jsonValue: [mockRecordId, mockRecordId],
        },
    ])
    expect(isLinkToAnotherRecord(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when jsonRecord contains an array with a string that isn't a record id", () => {
    records = validRecords.concat([
        {
            stringValue: `Not a record ID`,
            jsonValue: ['Not a record ID'],
        },
    ])
    expect(isLinkToAnotherRecord(records)).toBe(IsType.No)
})
