import * as dotenv from 'dotenv'
dotenv.config({ path: '.test.env' })
import verify from '../../src/verifyTableName'

// tslint:disable:no-unnecessary-type-assertion
const existentApiKey = process.env.API_KEY as string
const existentBaseId = process.env.BASE_ID as string
const existentTableName = process.env.TABLE_NAME as string
// tslint:enable:no-unnecessary-type-assertion
const nonexistentApiKey = 'key'.padEnd(17, '0')
const nonexistentBaseId = 'app'.padEnd(17, '0')
const nonexistentTableName = "Table name that totally doesn't exist"

test("Return `true` when all credentials exist in Airtable's systems", async done => {
    const result = await verify(existentApiKey, existentBaseId, existentTableName)
    expect(result).toBe(true)
    done()
})

test("Return `false` when not all credentials exist in Artable's systems", async done => {
    const result = await verify(nonexistentApiKey, nonexistentBaseId, nonexistentTableName)
    expect(result).toBe(false)
    done()
})
