import * as dotenv from 'dotenv'
dotenv.config({ path: '.test.env' })
import verifyApiKey from '../../src/verifyApiKey'

// tslint:disable-next-line:no-unnecessary-type-assertion
const validApiKey = process.env.API_KEY as string
const invalidApiKey = 'key0000000000000'

describe('verifyApiKey', () => {
    test('Return `true` when api key is valid', async done => {
        const result = await verifyApiKey(validApiKey)
        expect(result).toBe(true)
        done()
    })

    test('Return `false` when api key is not valid', async done => {
        const result = await verifyApiKey(invalidApiKey)
        expect(result).toBe(false)
        done()
    })
})
