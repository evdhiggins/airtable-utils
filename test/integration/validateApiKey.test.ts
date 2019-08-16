import * as dotenv from 'dotenv'
dotenv.config({ path: '.test.env' })
import validateApiKey from '../../src/validateApiKey'

// tslint:disable-next-line:no-unnecessary-type-assertion
const validApiKey = process.env.API_KEY as string
const invalidApiKey = 'keyabcdefghijklmn'

describe('validateApiKey', () => {
    test('Return `true` when api key is valid', async done => {
        const result = await validateApiKey(validApiKey)
        expect(result).toBe(true)
        done()
    })

    test('Return `false` when api key is not valid', async done => {
        const result = await validateApiKey(invalidApiKey)
        expect(result).toBe(false)
        done()
    })
})
