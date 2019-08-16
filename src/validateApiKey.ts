/**
 * Check to see if an Airtable API key is a string with valid structure
 */
export default (apiKey: string): boolean => {
    // tslint:disable-next-line:strict-type-predicates
    return typeof apiKey === 'string' && /^key[a-zA-Z0-9]{14}$/.test(apiKey)
}
