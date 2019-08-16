import * as phin from 'phin'

/**
 * Check to see if an Airtable API key is valid
 */
export default async (apiKey: string): Promise<boolean> => {
    try {
        if (
            !apiKey ||
            // tslint:disable-next-line:strict-type-predicates
            typeof apiKey !== 'string' ||
            apiKey.length !== 17 ||
            !/^key[a-zA-Z0-9]{14}$/.test(apiKey)
        ) {
            return false
        }
        const response = await phin({
            url: 'https://api.airtable.com/v0/appabcdefghijklmn/tblabcdefghijklmn',
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            parse: 'json',
        })
        if (
            response.statusCode === 404 &&
            response.body &&
            response.body.error &&
            // other 404 error types indicate api key issues
            response.body.error.type === 'MODEL_ID_NOT_FOUND'
        ) {
            return true
        }
        return false
    } catch (err) {
        return false
    }
}
