import { TypeCheckerFn, IsType } from '.'

const isCollaborator: TypeCheckerFn = records => {
    if (records.length < 1) {
        return IsType.No
    }
    for (const record of records) {
        if (
            !record.jsonValue ||
            typeof record.jsonValue !== 'object' ||
            typeof record.jsonValue.id !== 'string' ||
            !/^usr[a-zA-Z0-9]{14}$/.test(record.jsonValue.id) ||
            typeof record.jsonValue.email !== 'string' ||
            typeof record.jsonValue.name !== 'string'
        ) {
            return IsType.No
        }
    }
    return IsType.Yes
}

export default isCollaborator
