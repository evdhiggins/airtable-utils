export const validate = (prefix: string, credential: string) => {
    const regexp = new RegExp(`^${prefix}[a-zA-Z0-9]{14}$`)
    // tslint:disable-next-line:strict-type-predicates
    return typeof credential === 'string' && regexp.test(credential)
}

/**
 * Validate an Airtable API key
 */
export const apiKeyIsValid = (apiKey: string) => validate('key', apiKey)

/**
 * Validate an Airtable base ID
 */
export const baseIdIsValid = (baseId: string) => validate('app', baseId)

/**
 * Validate an Airtable table ID
 */
export const tableIdIsValid = (tableId: string) => validate('tbl', tableId)

/**
 * Validate an Airtable view ID
 */
export const viewIdIsValid = (viewId: string) => validate('viw', viewId)

/**
 * Validate an Airtable table name
 */
export const tableNameIsValid = (tableName: string) => {
    // tslint:disable-next-line:strict-type-predicates
    return typeof tableName === 'string' && !!tableName
}
