import { TypeCheckerFn, IsType } from '.'

const isSingleLineText: TypeCheckerFn = records => {
    for (const record of records) {
        if (
            typeof record.jsonValue !== 'string' ||
            /\n/.test(record.jsonValue) ||
            record.jsonValue !== record.stringValue
        ) {
            return IsType.No
        }
    }
    // we can't be certain that the value is actually single line text at this point,
    // but we are expecting that this type checker fn will be one of the last ones used
    return IsType.Yes
}

export default isSingleLineText
