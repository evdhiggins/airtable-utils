import * as phin from 'phin'
import throttleFactory from './throttle'

export class ThrottleBank {
    public static getThrottle(id: string) {
        if (!this.throttles[id]) {
            this.throttles[id] = throttleFactory(5, 1000)
        }
        return this.throttles[id]
    }
    private static throttles: { [id: string]: ReturnType<typeof throttleFactory> } = {}
}

export default (
    apiKey: string,
    baseId: string,
    tableId: string,
    options: Partial<phin.Options & { format: 'string' | 'json' }> = {},
): Promise<phin.JsonResponse> => {
    const throttle = ThrottleBank.getThrottle(apiKey)
    const defaultOptions: Partial<phin.Options> = {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
        parse: 'json',
    }
    const url =
        options.format === 'string'
            ? `https://api.airtable.com/v0/${baseId}/${tableId}?cellFormat=string&timeZone=America%2FChicago&userLocale=en-us`
            : `https://api.airtable.com/v0/${baseId}/${tableId}`
    return (throttle(phin, {
        ...defaultOptions,
        ...options,
        url,
    }) as unknown) as Promise<phin.JsonResponse>
}
