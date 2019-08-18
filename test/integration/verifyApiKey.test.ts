import * as dotenv from 'dotenv'
dotenv.config({ path: '.test.env' })
import verifyApiKey from '../../src/verifyApiKey'

// tslint:disable-next-line:no-unnecessary-type-assertion
const existentApiKey = process.env.API_KEY as string
const nonexistentApiKey = 'key0000000000000'

describe('verifyApiKey', () => {
    test("Return `true` when api key exists in Airtable's systems", async done => {
        const result = await verifyApiKey(existentApiKey)
        expect(result).toBe(true)
        done()
    })

    test("Return `false` when api key doesn't exist in Airtable's systems", async done => {
        const result = await verifyApiKey(nonexistentApiKey)
        expect(result).toBe(false)
        done()
    })
})
