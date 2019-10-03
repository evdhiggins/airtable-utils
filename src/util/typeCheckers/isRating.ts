import { TypeCheckerFn, IsType } from '.'

const isCurrency: TypeCheckerFn = records => {
    if (records.length < 1) {
        return IsType.No
    }
    const validRatings = [1, 2, 3, 4, 5]
    for (const record of records) {
        if (
            typeof record.jsonValue !== 'number' ||
            record.jsonValue !== +record.stringValue ||
            !validRatings.includes(record.jsonValue)
        ) {
            return IsType.No
        }
    }
    return IsType.Yes
}

export default isCurrency
