class ReactiveEffect {
  private _fn: any
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    this._fn()
  }
}

let activeEffect 

export function effect (fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

let targerMap = new Map()
export function track(target, key) {
  let depsMap = targerMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targerMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}

export function trigger(target, key) {
  const depsMap = targerMap.get(target)
  const dep = depsMap.get(key)
  for (let effect of dep) {
    effect.run()
  }
}
