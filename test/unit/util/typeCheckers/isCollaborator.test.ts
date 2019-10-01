import { isCollaborator, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

const id = 'usr'.padEnd(17, '0')
const name = 'Firstname Lastname'
const email = 'firstname@lastname.com'

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: { id, email, name },
            stringValue: name,
        },
        {
            jsonValue: { id, email, name },
            stringValue: name,
        },
        {
            jsonValue: { id, email, name },
            stringValue: name,
        },
    ]
})

test(`Return 'IsType.Yes' when all jsonValues are collaborator objects`, () => {
    expect(isCollaborator(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when any jsonValues are not a plain object", () => {
    test('String', () => {
        records = validRecords.concat([{ stringValue: 'text', jsonValue: 'text' }])
        expect(isCollaborator(records)).toBe(IsType.No)
    })
    test('Number', () => {
        records = validRecords.concat([{ stringValue: 5, jsonValue: 5 }])
        expect(isCollaborator(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isCollaborator(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isCollaborator(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isCollaborator(records)).toBe(IsType.No)
    })
    test('array of collaborator objects', () => {
        records = validRecords.concat([{ stringValue: [{ id, name, email }], jsonValue: name }])
        expect(isCollaborator(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => [], jsonValue: () => [] }])
        expect(isCollaborator(records)).toBe(IsType.No)
    })
})

describe("Return 'IsType.No' when a jsonValue object...", () => {
    test("Is missing an 'id' field", () => {
        records = validRecords.concat([{ jsonValue: { name, email }, stringValue: name }])
        expect(isCollaborator(records)).toBe(IsType.No)
    })
    test("Has an invalid 'id' field", () => {
        records = validRecords.concat([
            { jsonValue: { id: 'usr id', name, email }, stringValue: name },
        ])
        expect(isCollaborator(records)).toBe(IsType.No)
    })

    test("Is missing an 'email' field", () => {
        records = validRecords.concat([{ jsonValue: { id, name }, stringValue: name }])
        expect(isCollaborator(records)).toBe(IsType.No)
    })

    test("Is missing a 'name' field", () => {
        records = validRecords.concat([{ jsonValue: { id, email }, stringValue: email }])
        expect(isCollaborator(records)).toBe(IsType.No)
    })
})
