import { TypeCheckerFn, IsType } from '.'

const isPercent: TypeCheckerFn = records => {
    if (records.length < 1) {
        return IsType.No
    }
    for (const record of records) {
        const convertedNumber = +String(record.stringValue).replace(/%/g, '') / 100
        if (
            typeof record.jsonValue !== 'number' ||
            !/%/.test(record.stringValue) ||
            Number.isNaN(convertedNumber) ||
            record.jsonValue !== convertedNumber
        ) {
            return IsType.No
        }
    }
    return IsType.Yes
}

export default isPercent
