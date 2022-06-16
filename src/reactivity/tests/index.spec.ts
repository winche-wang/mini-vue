import { expect, it } from 'vitest'
import { add } from '../index'

it('init', () => { 
  const r = add(1, 2)
  expect(r).toBe(3)
})