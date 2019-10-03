import { TypeCheckerFn, IsType } from '.'

const isNumber: TypeCheckerFn = records => {
    if (records.length < 1) {
        return IsType.No
    }
    for (const record of records) {
        if (typeof record.jsonValue !== 'number' || record.jsonValue !== +record.stringValue) {
            return IsType.No
        }
    }
    return IsType.Yes
}

export default isNumber
