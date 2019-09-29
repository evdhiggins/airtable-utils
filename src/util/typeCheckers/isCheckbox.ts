import { TypeCheckerFn, IsType } from '.'

const isCheckbox: TypeCheckerFn = records => {
    if (records.length < 1) {
        return IsType.No
    }
    for (const record of records) {
        if (
            typeof record.jsonValue !== 'boolean' ||
            record.jsonValue !== true ||
            record.stringValue !== 'checked'
        ) {
            return IsType.No
        }
    }
    return IsType.Yes
}

export default isCheckbox
