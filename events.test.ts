import Events from './events'

// 发送与接收
it('Send and receive', () => {
    let dummy = 0
    Events.miao.on(val => dummy = val)

    Events.miao.emit(1)
    expect(dummy).toBe(1)
})

// 移除事件监听
it('Delete event on', () => {
    let dummy1 = 0, dummy2 = 0
    const func = (val: number) => dummy1 = val

    Events.miao.on(func)
    Events.miao.on(val => dummy2 = val)

    Events.miao.off(func)

    Events.miao.emit(1)
    expect(dummy1).toBe(0)
    expect(dummy2).toBe(1)
})

// 移除该事件的全部监听
it('Delete all event on', () => {
    let dummy1 = 0, dummy2 = 0
    const func = (val: number) => dummy1 = val

    Events.miao.on(func)
    Events.miao.on(val => dummy2 = val)

    Events.miao.offAll()

    Events.miao.emit(1)
    expect(dummy1).toBe(0)
    expect(dummy2).toBe(0)
})

// 一次性事件监听
it('Event once', () => {
    let dummy = 0

    Events.updated.once(() => dummy++)
    expect(dummy).toBe(0)

    Events.updated.emit()
    expect(dummy).toBe(1)

    Events.updated.emit()
    expect(dummy).toBe(1)
})

// 多事件收发
it('Multiple events', () => {
    let dummy1 = 100
    let dummy2 = '200'
    Events.clicked.on(val => dummy1 = val.x + val.y)
    Events.wang.on((sVal, nVal) => dummy2 = sVal + nVal)

    Events.wang.emit('1', 2)
    expect(dummy1).toBe(100)
    expect(dummy2).toBe('12')

    Events.clicked.emit({ x: 2, y: 3 })
    expect(dummy1).toBe(5)
    expect(dummy2).toBe('12')
})

// 覆盖保护
it('Cover protection', () => {
    let dummy = 0, errObj
    const oldClicked = Events.clicked
    Events.updated.on(() => dummy++)
    try {
        ;(Events.updated as any) = undefined
    } catch (err) {
        errObj = err
    }
    expect(errObj).not.toBe(undefined)

    Events.updated.emit()
    expect(dummy).toBe(1)
})

// 删除保护
it('Delete property protection', () => {
    let dummy = 0, errObj
    const oldClicked = Events.clicked
    Events.updated.on(() => dummy++)
    try {
        delete (Events as any).updated
    } catch (err) {
        errObj = err
    }
    expect(errObj).not.toBe(undefined)

    Events.updated.emit()
    expect(dummy).toBe(1)
})