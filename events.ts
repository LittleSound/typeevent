/**
 * 创建一个事件处理器
 * 通过创建一个继承自 EventControl 的接口，来枚举需要用到的事件和与之对应的参数列表
 */

import { EventControl } from './EventControl'

interface Events extends EventControl {
    // 猫猫叫
    miao: [number]
    // 狗狗叫
    wang: [string, number]
    // 更新了
    updated: []
    // 点击了
    clicked: [ob: { x: number, y: number }]
}

export default EventControl<Events>()
