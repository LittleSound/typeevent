# TypeEvent

### 一个类型化的事件系统

- 直接使用事件对象的键值对，而不是字符串去索引事件。

- 编写 emit 和 on 方法参数时根据事件不同获取准确的参数类型校验和自动补全。



## 开始使用

### 创建事件处理器

```typescript
// event.js
import { EventControl } from './EventControl'

// 在这里枚举需要会出现的事件，以及它们传递哪些参数
interface Events extends EventControl {
    // 发送完成
    sent: [txHash: string]
    // 上传中
    uploading: [progress: number]
    // 点击事件
    clickon: [mousePosition: { x: number, y: number }]
}
// 创建事件处理器，记得传入刚刚创建的 Events 类型
export default EventControl<Events>()
```

### 收发事件

```typescript
import Events from './events'

Events.sent.on(txHash => {
    console.log(txHash.toLocaleUpperCase())
})

Events.sent.emit('0xe60cc11b8de')
// 打印: "0XE60CC11B8DE"

```



## 事件方法列表

### `on`

监听事件，事件发送时触发会调函数

#### 类型定义：

```typescript
on(callback: (...args: EventArgs) => any): void
```



### `once`

只执行一次的事件监听，执行过一次后就会被移除

#### 类型定义：

```typescript
once(callback: (...args: EventArgs) => any): void
```



### `emit`

发送事件，传入事件所需的参数

```typescript
emit(...args: EventArgs): void
```



### `offAll`

移除该事件所有的监听

#### 类型定义：

```typescript
offAll(): void
```



### `off`

移除该事件指定的监听，传入调用事件时相同的方法

#### 类型定义：

```typescript
off(callback: (...args: T) => any): void
```

