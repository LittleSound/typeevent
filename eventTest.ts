import { EventControl } from './eventController'

interface MyEventEnum extends EventControl {
    miao: [number]
    wang: [string, number]
}

export const eventControl = EventControl<MyEventEnum>()

