import { isAttachment, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: [
                {
                    id: 'att'.padEnd(17, '0'),
                    url:
                        'https://dl.airtable.com/.attachments/172837baf9338d94cfe9s2a2b2fd/7er344f7/config.json',
                    filename: 'config.json',
                    size: 515,
                    type: 'application/json',
                },
            ],
            stringValue:
                'config.json (https://dl.airtable.com/.attachments/172837baf9338d94cfe9s2a2b2fd/7er344f7/config.json)',
        },
    ]
})

test("Return 'IsType.Yes' when all jsonValues are arrays which contain only attachment objects", () => {
    expect(isAttachment(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when any values are not an array", () => {
    test('string', () => {
        records = validRecords.concat([{ stringValue: 'Text', jsonValue: 'Text' }])
        expect(isAttachment(records)).toBe(IsType.No)
    })
    test('Number', () => {
        records = validRecords.concat([{ stringValue: 5, jsonValue: 5 }])
        expect(isAttachment(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isAttachment(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isAttachment(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isAttachment(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isAttachment(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => [], jsonValue: () => [] }])
        expect(isAttachment(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when any attachment object doesn't contain an id", () => {
    records = validRecords.concat([
        {
            jsonValue: [
                {
                    url:
                        'https://dl.airtable.com/.attachments/172837baf9338d94cfe9s2a2b2fd/7er344f7/config.json',
                    filename: 'config.json',
                    size: 515,
                    type: 'application/json',
                },
            ],
            stringValue:
                'config.json (https://dl.airtable.com/.attachments/172837baf9338d94cfe9s2a2b2fd/7er344f7/config.json)',
        },
    ])
    expect(isAttachment(records)).toBe(IsType.No)
})
test("Return 'IsType.No' when any attachment object doesn't contain a url", () => {
    records = validRecords.concat([
        {
            jsonValue: [
                {
                    id: 'att00000000000000',
                    filename: 'config.json',
                    size: 515,
                    type: 'application/json',
                },
            ],
            stringValue:
                'config.json (https://dl.airtable.com/.attachments/172837baf9338d94cfe9s2a2b2fd/7er344f7/config.json)',
        },
    ])
    expect(isAttachment(records)).toBe(IsType.No)
})

test("Return 'IsType.No' when any attachment object id doesn't match the expected format", () => {
    records = validRecords.concat([
        {
            jsonValue: [
                {
                    id: 'an id',
                    url:
                        'https://dl.airtable.com/.attachments/172837baf9338d94cfe9s2a2b2fd/7er344f7/config.json',
                    filename: 'config.json',
                    size: 515,
                    type: 'application/json',
                },
            ],
            stringValue:
                'config.json (https://dl.airtable.com/.attachments/172837baf9338d94cfe9s2a2b2fd/7er344f7/config.json)',
        },
    ])
    expect(isAttachment(records)).toBe(IsType.No)
})
