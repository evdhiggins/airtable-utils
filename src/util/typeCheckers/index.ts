export enum IsType {
    Yes = 'Yes',
    No = 'No',
    Maybe = 'Maybe',
}

export enum Types {
    LinkToAnotherRecord,
    LinkToAnotherRecordArray,
    SingleLineText,
    LongText,
    Attachment,
    Checkbox,
    SingleSelect,
    MultipleSelect,
    Collaborator,
    CollaboratorArray,
    Date,
    DateTime,
    Time,
    Duration,
    PhoneNumber,
    Email,
    URL,
    Number,
    Currency,
    Percent,
    Rating,
    Barcode,
}

export type RecordValuePair = {
    jsonValue: any
    stringValue: any
}

export type TypeCheckerFn = (records: RecordValuePair[]) => IsType

export { default as isLinkToAnotherRecord } from './isLinkToAnotherRecord'
export { default as isLinkToOtherRecords } from './isLinkToOtherRecords'
export { default as isMultiLineText } from './isMultiLineText'
export { default as isSingleLineText } from './isSingleLineText'
export { default as isAttachment } from './isAttachment'
export { default as isCheckbox } from './isCheckbox'
