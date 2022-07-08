import { track, trigger } from './effect'

export function reactive(re) {
  return new Proxy(re, {
    get(target, key) {
      const r = Reflect.get(target, key)
      track(target, key)
      return r
    },
    set(targer, key, value) {
      const r = Reflect.set(targer, key, value)
      trigger(targer, key)
      return r
    }
  })
}

