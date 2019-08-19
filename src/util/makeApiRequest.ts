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

export default (apiKey: string, baseId: string, tableId: string, options: Partial<phin.Options> = {}) => {
    const throttle = ThrottleBank.getThrottle(apiKey)
    const defaultOptions: Partial<phin.Options> = {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
        parse: 'json',
    }
    return throttle(phin, {
        ...defaultOptions,
        ...options,
        url: `https://api.airtable.com/v0/${baseId}/${tableId}`,
    })
}
