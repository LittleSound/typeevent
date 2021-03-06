/**
 * 事件控制系统
 * by Rizumu
 */

/**
 * 通过创建继承自这个类型的接口来枚举事件列表
 */
export type EventControl = {
    [K in string]: unknown[]
}

/**
 * 事件控制器
 */
type EventController<E extends EventControl> = {
    readonly [K in keyof E]: EventHandler<E[K]>
}

/**
 * 件处理器接口定义
 */
export interface EventHandler<T extends Array<any>> {
    /**
     * 事件回调列表
     */
    __callbacks: Array<{
        fn: (...p: any[]) => any
        once: boolean,
    }>

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

/**
 * 事件处理器
 */
const handler: EventHandler<any> = {
    __callbacks: [],
    /** 监听事件 */
    on(callback: (...P: any[]) => any) {
        this.__callbacks.push({ fn: callback, once: false })
    },
    /** 只执行一次的事件监听 */
    once(callback: (...p: any[]) => any) {
        this.__callbacks.push({ fn: callback, once: true })
    },
    /** 移除该事件所有的监听 */
    offAll() {
        this.__callbacks = []
    },
    /** 移除该事件指定的监听 */
    off(callback: (...p: any[]) => any) {
        this.__callbacks = this.__callbacks.filter(item => item.fn !== callback)
    },
    /** 触发事件 */
    emit(...args: any[]) {
        this.__callbacks.forEach(item => item.fn(...args));
        this.__callbacks = this.__callbacks.filter(item => !item.once)
    }
}

/**
 * 获取指定事件的处理器
 */
const getHandler = <T extends Array<any>>
    (target: any, event: string): EventHandler<T> => {
    if (!(event in target)) {
        target[event] = Object.create(handler)
        target[event].__callbacks = []
    }
    return target[event]
}

/**
 * 创建一个事件控制器
 * @returns 新的事件控制器实例
 */
export function EventControl<E extends EventControl>(): EventController<E> {
    return new Proxy({} as any, {
        get: getHandler,
        set: () => false,
        deleteProperty: () => false,
    })
}