export const validate = (prefix: string, credential: string) => {
    const regexp = new RegExp(`^${prefix}[a-zA-Z0-9]{14}$`)
    // tslint:disable-next-line:strict-type-predicates
    return typeof credential === 'string' && regexp.test(credential)
}

/**
 * Validate an Airtable API key
 */
export const validateApiKey = (apiKey: string) => validate('key', apiKey)

/**
 * Validate an Airtable base ID
 */
export const validateBaseId = (baseId: string) => validate('app', baseId)

/**
 * Validate an Airtable table ID
 */
export const validateTableId = (tableId: string) => validate('tbl', tableId)

/**
 * Validate an Airtable view ID
 */
export const validateViewId = (viewId: string) => validate('viw', viewId)

/**
 * Validate an Airtable table name
 */
export const validateTableName = (tableName: string) => {
    // tslint:disable-next-line:strict-type-predicates
    return typeof tableName === 'string' && !!tableName
}
