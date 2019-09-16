import makeApiRequest from './util/makeApiRequest'
import { apiKeyIsValid } from './validators'

/**
 * Check to see if an Airtable API key exists in Airtable's systems
 */
export default async (apiKey: string): Promise<boolean> => {
    if (!apiKeyIsValid(apiKey)) {
        return false
    }
    try {
        const response = await makeApiRequest(apiKey, 'app00000000000000', 'tbl00000000000000')
        if (response.statusCode === 404) {
            return true
        }
    } catch (err) {
        // do nothing on http error
    }
    return false
}
