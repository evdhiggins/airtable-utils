# Airtable-Utils

**This project is in development.**

A collection of Airtable API utility and convenience functions.

## API

### Validation Functions

The validator functions are used to validate the format of ID and name strings. To check for the existance of a base / table / etc use a _verification_ function.

#### `apiKeyIsValid`

Validate the format of the given API key.

```js
apiKeyIsValid('not an api key') // => `false`

apiKeyIsValid('apiKwer42JRwjd2g6') // => `true`
```

#### `baseIdIsValid`

Validate the format of the given base ID.

```js
baseIdIsValid('invalid base Id') // => `false`

baseIdIsValid('appf3KF8Jf84FJjsr') // => `true`
```

#### `tableIdIsValid`

Validate the format of the given table ID.

```js
tableIdIsValid('invalid table Id') // => `false`

tableIdIsValid('tblf45JF8jfhp92IT') // => `true`
```

#### `viewIdIsValid`

Validate the format of the given view ID.

```js
viewIdIsValid('invalid view Id') // => `false`

viewIdIsValid('viw83JPMjkf727Kn0d') // => `true`
```

#### `tableNameIsValid`

Validate the format of the given table name.

```js
tableNameIsValid('') // => `false`

tableNameIsValid('My Table') // => `true`
```

### Verification Functions

The verification functions verify that the given apiKey / table Id / etc _actually exists_ in Airtable's systems. Please not that many of these functions require confirmed presence of other Airtable elements. For example, the existence of a table cannot be confirmed if the base ID does not reference an existing base.

#### `verifyApiKey`

Check to see if the given API key exists in Airtable's systems. Internally, the api key is first validated using `apiKeyIsValid` prior to performing the http request.

```js
await verifyApiKey('key00000000000000') // () => `false`

await verifyApiKey(process.env.API_KEY) // () => `true`
```

#### `verifyBaseAndTableId`

Check to see if the given base Id / table Id pair exist in Airtable's systems. Currently it is not possible to test for the existence of a table or base separately. **If the API key used in the function is not valid the function will still only return `false`**.

Internally, the base id and table id are first validated using `baseIdIsValid` and `tableIdIsValid` prior to performing the http request.

```js
// returns `false` when `baseId` and `tableId` both do not exist
await verifyBaseAndTableId(process.env.API_KEY, 'app00000000000000', 'tbl00000000000000') // () => `false`

// returns `false` when `baseId` exists but `tableId` doesn't exist on base
await verifyBaseAndTableId(process.env.API_KEY, process.env.BASE_ID, 'tbl00000000000000') // () => `false`

// returns `false` when `apiKey` doesn't exist in Airtable's systems, even if `tableId` and `baseId` are valid
await verifyBaseAndTableId('key00000000000000', process.env.BASE_ID, process.env.TABLE_ID) // () => `false`

// returns `true` when `apiKey` is valid, the `baseId` refers to a valid base, and the `tableId` refers to a table within the base
await verifyBaseAndTableId(process.env.API_KEY, process.env.BASE_ID, process.env.TABLE_ID) // () => `false`
```

#### `verifyTableName`

Check to see if the given base Id / table name pair exist in Airtable's systems. Currently it is not possible to test for the existence of a table or base separately. **If the API key used in the function is not valid the function will still only return `false`**.

The only difference between `verifyTableName` and `verifyBaseAndTableId` is that `verifyTableName` validates the table name with `tableNameIsValid` instead of `tableIdIsValid`.

```js
// returns `false` when `baseId` and `tableName` both do not exist
await verifyBaseAndTableId(process.env.API_KEY, 'app00000000000000', 'Invalid name') // () => `false`

// returns `false` when `baseId` exists but `tableName` doesn't exist on base
await verifyBaseAndTableId(process.env.API_KEY, process.env.BASE_ID, 'Invalid name') // () => `false`

// returns `false` when `apiKey` doesn't exist in Airtable's systems, even if `tableName` and `baseId` are valid
await verifyBaseAndTableId('key00000000000000', process.env.BASE_ID, process.env.TABLE_NAME) // () => `false`

// returns `true` when `apiKey` is valid, the `baseId` refers to a valid base, and the `tableName` refers to a table within the base
await verifyBaseAndTableId(process.env.API_KEY, process.env.BASE_ID, process.env.TABLE_NAME) // () => `false`
```

### Table Schema Determination

WIP
