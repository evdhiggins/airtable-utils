import { TypeCheckerFn, IsType } from '.'

const isLinkToOtherRecords: TypeCheckerFn = records => {
    if (records.length < 1) {
        return IsType.No
    }
    let hasMultipleLink = false
    for (const record of records) {
        if (!Array.isArray(record.jsonValue) || record.jsonValue.length === 0) {
            return IsType.No
        }
        for (const value of record.jsonValue) {
            if (typeof value !== 'string' || !/^rec[a-zA-Z0-9]{14}$/.test(value)) {
                return IsType.No
            }
        }
        if (record.jsonValue.length > 1) {
            hasMultipleLink = true
        }
    }
    return hasMultipleLink ? IsType.Yes : IsType.No
}

export default isLinkToOtherRecords
