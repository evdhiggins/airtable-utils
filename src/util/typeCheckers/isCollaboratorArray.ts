import { TypeCheckerFn, IsType } from '.'

const isCollaboratorArray: TypeCheckerFn = records => {
    if (records.length < 1) {
        return IsType.No
    }
    for (const record of records) {
        if (!Array.isArray(record.jsonValue)) {
            return IsType.No
        }
        for (const el of record.jsonValue) {
            if (
                !el ||
                typeof el !== 'object' ||
                typeof el.id !== 'string' ||
                !/^usr[a-zA-Z0-9]{14}$/.test(el.id) ||
                typeof el.email !== 'string' ||
                typeof el.name !== 'string'
            ) {
                return IsType.No
            }
        }
    }
    return IsType.Yes
}

export default isCollaboratorArray
