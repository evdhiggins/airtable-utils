import { TypeCheckerFn, IsType } from '.'

const isSingleLineText: TypeCheckerFn = records => {
    if (records.length < 1) {
        return IsType.No
    }
    for (const record of records) {
        if (!Array.isArray(record.jsonValue)) {
            return IsType.No
        }
        for (const obj of record.jsonValue) {
            if (
                typeof obj !== 'object' ||
                typeof obj.id !== 'string' ||
                !/^att[a-zA-Z0-9]{14}$/.test(obj.id) ||
                typeof obj.url !== 'string'
            ) {
                return IsType.No
            }
        }
    }
    return IsType.Yes
}

export default isSingleLineText
