import { TypeCheckerFn, IsType } from '.'

const isMultipleSelect: TypeCheckerFn = records => {
    if (records.length < 1) {
        return IsType.No
    }
    for (const record of records) {
        if (
            !Array.isArray(record.jsonValue) ||
            record.jsonValue.join(', ') !== record.stringValue
        ) {
            return IsType.No
        }
        for (const el of record.jsonValue) {
            if (typeof el !== 'string') {
                return IsType.No
            }
        }
    }
    return IsType.Yes
}

export default isMultipleSelect
