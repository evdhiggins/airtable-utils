export const validate = (prefix: string, credential: string) => {
    const regexp = new RegExp(`^${prefix}[a-zA-Z0-9]{14}$`)
    // tslint:disable-next-line:strict-type-predicates
    return typeof credential === 'string' && regexp.test(credential)
}

/**
 * Check to see if an Airtable API key is a string with valid structure
 */
export const validateApiKey = (apiKey: string) => validate('key', apiKey)

/**
 * Validate an Airtable base id structure
 */
export const validateBaseId = (baseId: string) => validate('app', baseId)

/**
 * Validate an Airtable table id structure
 */
export const validateTableId = (tableId: string) => validate('tbl', tableId)

/**
 * Validate an Airtable table id structure
 */
export const validateViewId = (viewId: string) => validate('viw', viewId)
