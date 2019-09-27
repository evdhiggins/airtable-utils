import { TypeCheckerFn, IsType } from '.'

const isMultiLineText: TypeCheckerFn = records => {
    let containsNewline = false
    for (const record of records) {
        if (typeof record.jsonValue !== 'string' || record.jsonValue !== record.stringValue) {
            return IsType.No
        }
        if (/\n/.test(record.jsonValue)) {
            containsNewline = true
        }
    }
    // multi-line text is the only pure text field that can contain newline characters
    return containsNewline ? IsType.Yes : IsType.No
}

export default isMultiLineText
