import { TypeCheckerFn, IsType } from '.'

const isLinkToAnotherRecord: TypeCheckerFn = records => {
    if (records.length < 1) {
        return IsType.No
    }
    for (const record of records) {
        if (
            !Array.isArray(record.jsonValue) ||
            record.jsonValue.length !== 1 ||
            typeof record.jsonValue[0] !== 'string' ||
            !/^rec[a-zA-Z0-9]{14}$/.test(record.jsonValue[0])
        ) {
            return IsType.No
        }
    }
    return IsType.Yes
}

export default isLinkToAnotherRecord
