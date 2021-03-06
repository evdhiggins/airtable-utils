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
export { default as isSingleSelect } from './isSingleSelect'
export { default as isMultipleSelect } from './isMultipleSelect'
export { default as isCollaborator } from './isCollaborator'
export { default as isCollaboratorArray } from './isCollaboratorArray'
export { default as isNumber } from './isNumber'
export { default as isCurrency } from './isCurrency'
export { default as isPercent } from './isPercent'
export { default as isRating } from './isRating'
