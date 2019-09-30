import { TypeCheckerFn, IsType } from '.'

const isSingleSelect: TypeCheckerFn = records => {
    if (records.length < 1) {
        return IsType.No
    }
    const values: string[] = []
    for (const record of records) {
        if (typeof record.jsonValue !== 'string' || record.jsonValue !== record.stringValue) {
            return IsType.No
        }
        values.push(record.jsonValue)
    }
    const uniqueValues = values.reduce(
        (acc, v) => {
            if (!acc.includes(v)) {
                acc.push(v)
            }
            return acc
        },
        [] as string[],
    )
    // if more than 50% of the values are identical with other values, assume that it is a single select
    return uniqueValues.length / values.length < 0.5 && values.length > 5 ? IsType.Yes : IsType.No
}

export default isSingleSelect
