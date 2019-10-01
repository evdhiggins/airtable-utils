import { isCollaboratorArray, IsType, RecordValuePair } from '../../../../src/util/typeCheckers'

let records: RecordValuePair[] = []
let validRecords: RecordValuePair[] = []

const id = 'usr'.padEnd(17, '0')
const name = 'Firstname Lastname'
const email = 'firstname@lastname.com'

beforeEach(() => {
    records = []
    validRecords = [
        {
            jsonValue: [{ id, email, name }],
            stringValue: name,
        },
        {
            jsonValue: [{ id, email, name }],
            stringValue: name,
        },
        {
            jsonValue: [{ id, email, name }],
            stringValue: name,
        },
    ]
})

test(`Return 'IsType.Yes' when all jsonValues are arrays of collaborator objects`, () => {
    expect(isCollaboratorArray(validRecords)).toBe(IsType.Yes)
})

describe("Return 'IsType.No', when any values are not an array", () => {
    test('String', () => {
        records = validRecords.concat([{ stringValue: 'text', jsonValue: 'text' }])
        expect(isCollaboratorArray(records)).toBe(IsType.No)
    })
    test('Number', () => {
        records = validRecords.concat([{ stringValue: 5, jsonValue: 5 }])
        expect(isCollaboratorArray(records)).toBe(IsType.No)
    })
    test('undefined', () => {
        records = validRecords.concat([{ stringValue: undefined, jsonValue: undefined }])
        expect(isCollaboratorArray(records)).toBe(IsType.No)
    })
    test('null', () => {
        records = validRecords.concat([{ stringValue: null, jsonValue: null }])
        expect(isCollaboratorArray(records)).toBe(IsType.No)
    })
    test('boolean', () => {
        records = validRecords.concat([{ stringValue: true, jsonValue: true }])
        expect(isCollaboratorArray(records)).toBe(IsType.No)
    })
    test('object', () => {
        records = validRecords.concat([{ stringValue: {}, jsonValue: {} }])
        expect(isCollaboratorArray(records)).toBe(IsType.No)
    })
    test('function', () => {
        records = validRecords.concat([{ stringValue: () => [], jsonValue: () => [] }])
        expect(isCollaboratorArray(records)).toBe(IsType.No)
    })
})

test("Return 'IsType.No' when a jsonValue array contains an element that isn't an object", () => {
    records = validRecords.concat([
        { jsonValue: [{ id, name, email }, name], stringValue: `${name}, ${name}` },
    ])
    expect(isCollaboratorArray(records)).toBe(IsType.No)
})

describe("Return 'IsType.No' when a jsonValue array contains an object that...", () => {
    test("Is missing an 'id' field", () => {
        records = validRecords.concat([{ jsonValue: [{ name, email }], stringValue: name }])
        expect(isCollaboratorArray(records)).toBe(IsType.No)
    })
    test("Has an invalid 'id' field", () => {
        records = validRecords.concat([
            { jsonValue: [{ id: 'usr id', name, email }], stringValue: name },
        ])
        expect(isCollaboratorArray(records)).toBe(IsType.No)
    })

    test("Is missing an 'email' field", () => {
        records = validRecords.concat([{ jsonValue: [{ id, name }], stringValue: name }])
        expect(isCollaboratorArray(records)).toBe(IsType.No)
    })

    test("Is missing a 'name' field", () => {
        records = validRecords.concat([{ jsonValue: [{ id, email }], stringValue: email }])
        expect(isCollaboratorArray(records)).toBe(IsType.No)
    })
})
