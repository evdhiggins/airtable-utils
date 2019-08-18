import * as dotenv from 'dotenv'
dotenv.config({ path: '.test.env' })
import verify from '../../src/verifyBaseAndTableId'

// tslint:disable:no-unnecessary-type-assertion
const existentApiKey = process.env.API_KEY as string
const existentBaseId = process.env.BASE_ID as string
const existentTableId = process.env.TABLE_ID as string
// tslint:enable:no-unnecessary-type-assertion
const nonexistentApiKey = 'key'.padEnd(17, '0')
const nonexistentBaseId = 'app'.padEnd(17, '0')
const nonexistentTableId = 'tbl'.padEnd(17, '0')

test("Return `true` when all credentials exist in Airtable's systems", async done => {
    const result = await verify(existentApiKey, existentBaseId, existentTableId)
    expect(result).toBe(true)
    done()
})

test("Return `false` when not all credentials exist in Artable's systems", async done => {
    const result = await verify(nonexistentApiKey, nonexistentBaseId, nonexistentTableId)
    expect(result).toBe(false)
    done()
})
