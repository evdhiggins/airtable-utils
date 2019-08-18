import * as phin from 'phin'
import { validateApiKey } from './validators'

/**
 * Check to see if an Airtable API key exists in Airtable's systems
 */
export default async (apiKey: string): Promise<boolean> => {
    if (!validateApiKey(apiKey)) {
        return false
    }
    try {
        const response = await phin({
            url: 'https://api.airtable.com/v0/app00000000000000/tbl00000000000000',
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            parse: 'json',
        })
        if (response.statusCode === 404) {
            return true
        }
    } catch (err) {
        // do nothing on http error
    }
    return false
}
