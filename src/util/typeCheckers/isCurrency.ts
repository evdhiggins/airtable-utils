import { TypeCheckerFn, IsType } from '.'

const isCurrency: TypeCheckerFn = records => {
    if (records.length < 1) {
        return IsType.No
    }
    for (const record of records) {
        const convertedStringValue = +String(record.stringValue).replace(/[^0-9%.]+/g, '')
        if (
            typeof record.jsonValue !== 'number' ||
            !/[^0-9%.]/.test(record.stringValue) ||
            Number.isNaN(convertedStringValue) ||
            record.jsonValue !== convertedStringValue
        ) {
            return IsType.No
        }
    }
    return IsType.Yes
}

export default isCurrency
