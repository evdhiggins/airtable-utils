import makeApiRequest from './util/makeApiRequest'
import { apiKeyIsValid, baseIdIsValid, tableIdIsValid } from './validators'

/**
 * Check to see if an Airtable API key, baseId, and tableId exist in Airtable
 */
export default async (apiKey: string, baseId: string, tableId: string): Promise<boolean> => {
    if (!apiKeyIsValid(apiKey) || !baseIdIsValid(baseId) || !tableIdIsValid(tableId)) {
        return false
    }
    try {
        const response = await makeApiRequest(apiKey, baseId, tableId)
        if (response.statusCode === 200) {
            return true
        }
    } catch (err) {
        // do nothing on http error
    }
    return false
}
