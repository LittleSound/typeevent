/**
 * 事件使用的哈希表类型
 */
type eventsType = Map<
    string,
    Array<{
        fn: (...p: any[]) => any
        once: boolean,
    }>
>

// 事件控制器的初始化函数
const initGet = (events: eventsType) => <T extends Array<any>>(target: any, event: string, receiver: any): EventHandler<T> => {
    return {
        /** 监听事件 */
        on(callback: (...P: any[]) => any) {
            let callbacks = events.get(event) || []
            callbacks.push({ fn: callback, once: false })
            events.set(event, callbacks);
        },
        /** 只执行一次的事件监听 */
        once(callback: (...p: any[]) => any) {
            let callbacks = events.get(event) || []
            callbacks.push({ fn: callback, once: true })
            events.set(event, callbacks);
        },
        /** 移除该事件所有的监听 */
        offAll() {
            events.delete(event)
        },
        /** 移除该事件指定的监听 */
        off(callback: (...p: any[]) => any) {
            let callbacks = events.get(event);
            if (!callbacks) return
            events.set(event, callbacks.filter(item => item.fn !== callback))
        },
        /** 触发事件 */
        emit(...args: any[]) {
            let callbacks = events.get(event) || [];
            callbacks.forEach(item => item.fn(...args));
            events.set(event, callbacks.filter(item => !item.once))
        }
    }
}

/**
 * 事件控制，用于创建一个事件控制器
 * 通过创建继承自这个类型的接口来枚举事件列表
 */
export type EventControl = {
    [K in string]: unknown[]
}

/**
 * 事件控制器
 * @returns 新的事件控制器实例
 */
export function EventControl<E extends EventControl>(): EventController<E> {
    const events: eventsType = new Map()
    
    return new Proxy({} as any, { get: initGet(events) })
}

/**
 * 事件控制器
 */
type EventController<E extends EventControl> = {
    [K in keyof E]: EventHandler<E[K]>
}

/**
 * 事件处理器
 */
interface EventHandler<T extends Array<any>> {
    /**
     * 监听事件
     * @param callback 事件发生时运行的回调函数
     */
    on(callback: (...args: T) => any): void

    /**
     * 只执行一次的事件监听，执行过一次后就会被移除
     * @param callback 事件发生时运行的回调函数
     */
    once(callback: (...args: T) => any): void

    /** 移除该事件所有的监听 */
    offAll(): void

    /**
     * 移除该事件指定的监听
     * @param callback 监听事件时使用的同一个回调函数
     */
    off(callback: (...args: T) => any): void
    /**
     * 触发事件
     * @param args 需要传递的参数列表
     */
    emit(...args: T): void
}