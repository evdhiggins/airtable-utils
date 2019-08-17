import * as dotenv from 'dotenv'
dotenv.config({ path: '.test.env' })
import verify from '../../src/verifyBaseAndTableId'

// tslint:disable:no-unnecessary-type-assertion
const validApiKey = process.env.API_KEY as string
const validBaseId = process.env.BASE_ID as string
const validTableId = process.env.TABLE_ID as string
// tslint:enable:no-unnecessary-type-assertion
const invalidApiKey = 'key'.padEnd(17, '0')
const invalidBaseId = 'app'.padEnd(17, '0')
const invalidTableId = 'tbl'.padEnd(17, '0')

test('Return `true` when all credentials are valid', async done => {
    const result = await verify(validApiKey, validBaseId, validTableId)
    expect(result).toBe(true)
    done()
})

test('Return `false` when all credentials are not valid', async done => {
    const result = await verify(invalidApiKey, invalidBaseId, invalidTableId)
    expect(result).toBe(false)
    done()
})
