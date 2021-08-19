import { eventControl } from './eventTest'
eventControl.wang.emit('s', 1)
eventControl.wang.on((val) => console.log('on wang:', val))
eventControl.miao.on((val) => {})
// eventControl.miao.on((val: any) => console.log('on: val:', val))

// eventControl.miao.emit(233)
// eventControl.wang.emit(333)
// eventControl.miao.emit(444)