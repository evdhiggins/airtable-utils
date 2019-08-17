import * as dotenv from 'dotenv'
dotenv.config({ path: '.test.env' })
import verify from '../../src/verifyTableName'

// tslint:disable:no-unnecessary-type-assertion
const validApiKey = process.env.API_KEY as string
const validBaseId = process.env.BASE_ID as string
const validTableName = process.env.TABLE_NAME as string
// tslint:enable:no-unnecessary-type-assertion
const invalidApiKey = 'key'.padEnd(17, '0')
const invalidBaseId = 'app'.padEnd(17, '0')
const invalidTableName = "Table name that totally doesn't exist"

test('Return `true` when all arguments are valid', async done => {
    const result = await verify(validApiKey, validBaseId, validTableName)
    expect(result).toBe(true)
    done()
})

test('Return `false` when any or all arguments are invalid', async done => {
    const result = await verify(invalidApiKey, invalidBaseId, invalidTableName)
    expect(result).toBe(false)
    done()
})
