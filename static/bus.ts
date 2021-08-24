import { EventEmitter } from 'eventemitter3'

const emitter = new EventEmitter()
export default {
  $on: (...args) => emitter.on.apply(emitter, args),
  $once: (...args) => emitter.once.apply(emitter, args),
  $off: (...args) => emitter.off.apply(emitter, args),
  $emit: (...args) => emitter.emit.apply(emitter, args),
}
