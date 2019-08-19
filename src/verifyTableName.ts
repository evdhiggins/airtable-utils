import makeApiRequest from './util/makeApiRequest'
import { validateApiKey, validateBaseId, validateTableName } from './validators'

/**
 * Check to see if an Airtable API key, baseId, and tableId exist in Airtable
 */
export default async (apiKey: string, baseId: string, tableName: string): Promise<boolean> => {
    if (!validateApiKey(apiKey) || !validateBaseId(baseId) || !validateTableName(tableName)) {
        return false
    }
    try {
        const encodedName = encodeURIComponent(tableName)
        const response = await makeApiRequest(apiKey, baseId, encodedName)
        if (response.statusCode === 200) {
            return true
        }
    } catch (err) {
        // do nothing on http error
    }
    return false
}
