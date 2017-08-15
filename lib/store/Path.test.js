/* eslint-disable max-statements */

import * as d from './Path'

test('_changeTo', () => {
  const pp = d.split('a/b/c')
  expect(d._changeTo(pp, '')).toEqual(['a', 'b', 'c'])
  expect(d._changeTo(pp, '.')).toEqual(['a', 'b', 'c'])
  expect(d._changeTo(pp, '..')).toEqual(['a', 'b'])
  expect(d._changeTo(pp, 'q')).toEqual(['a', 'b', 'c', 'q'])
})

test('changeTo', () => {
  expect(d.changeTo('')).toBe('default:')
  expect(d.changeTo('default:')).toBe('default:')
  expect(d.changeTo('test:')).toBe('test:')
  expect(d.changeTo('test:/')).toBe('test:')
  expect(d.changeTo('test:', '.')).toBe('test:')
  expect(d.changeTo('test:/', '.')).toBe('test:')
  expect(d.changeTo('test:', '..')).toBe('test:')
  expect(d.changeTo('test:/', '..')).toBe('test:')
  expect(d.changeTo('test:a', '..')).toBe('test:')
  expect(d.changeTo('test:/a', '..')).toBe('test:')
  expect(d.changeTo('a/b/c/d')).toBe('default:a/b/c/d')
  expect(d.changeTo('a/b/../d')).toBe('default:a/d')
  expect(d.changeTo('a/b', 'c/d')).toBe('default:a/b/c/d')
  expect(d.changeTo('a/b', '../c/d')).toBe('default:a/c/d')
  expect(d.changeTo('a/b', 'c', 'd')).toBe('default:a/b/c/d')
  expect(d.changeTo('a/b', '/c', 'd')).toBe('default:a/b/c/d')
  expect(d.changeTo('a', 'b', 'c', 'd')).toBe('default:a/b/c/d')
  expect(d.changeTo('a', 'b', '', 'c', 'd')).toBe('default:a/b/c/d')
})

test('changeToJail', () => {
  expect(d.changeToJail('')).toEqual(['default:', ''])
  expect(d.changeToJail('default:')).toEqual(['default:', ''])
  expect(d.changeToJail('test:')).toEqual(['test:', ''])
  expect(d.changeToJail('test:/')).toEqual(['test:', ''])
  expect(d.changeToJail('test:', '.')).toEqual(['test:', ''])
  expect(d.changeToJail('test:/', '.')).toEqual(['test:', ''])
  expect(d.changeToJail('test:', '..')).toEqual(['test:', ''])
  expect(d.changeToJail('test:/', '..')).toEqual(['test:', ''])
  expect(d.changeToJail('test:a', '..')).toEqual(['test:a', ''])
  expect(d.changeToJail('test:/a', '..')).toEqual(['test:a', ''])
  expect(d.changeToJail('a/b/c/d')).toEqual(['default:a/b/c/d', ''])
  expect(d.changeToJail('a/b/../d')).toEqual(['default:a/d', ''])
  expect(d.changeToJail('a/b', 'c/d')).toEqual(['default:a/b', 'c/d'])
  expect(d.changeToJail('a/b', '../c/d')).toEqual(['default:a/b', 'c/d'])
  expect(d.changeToJail('a/b', 'c', 'd')).toEqual(['default:a/b', 'c/d'])
  expect(d.changeToJail('a/b', '/c', 'd')).toEqual(['default:a/b', 'c/d'])
  expect(d.changeToJail('a', 'b', 'c', 'd')).toEqual(['default:a', 'b/c/d'])
  expect(d.changeToJail('a', 'b', '', 'c', 'd')).toEqual(['default:a', 'b/c/d'])
  expect(d.changeToJail('a', 'b', '..', 'c', 'd')).toEqual(['default:a', 'c/d'])
})

test('join', () => {
  expect(d.join('a', '/b', 'c/')).toBe('a/b/c')
  expect(d.join('//foo//', '//bar//')).toBe('foo/bar')
  expect(d.join('foo:', 'bar')).toBe('foo:bar')
  expect(d.join('foo:', '/bar')).toBe('foo:bar')
  expect(d.join('a', '', 'b')).toBe('a/b')
  expect(d.join('foo:hello', 'bar')).toBe('foo:hello/bar')
  expect(d.join('foo:/hello', 'bar')).toBe('foo:hello/bar')
})

test('joinRepo', () => {
  expect(d.joinRepo('hello', 'world')).toBe('hello:world')
  expect(d.joinRepo('hello:', 'world')).toBe('hello:world')
  expect(d.joinRepo('hello', '/world')).toBe('hello:world')
  expect(d.joinRepo('hello:', '/world')).toBe('hello:world')
})

test('sanitize', () => {
  expect(d.sanitize(undefined)).toBe('')
  expect(d.sanitize('')).toBe('')
  expect(d.sanitize('/a')).toBe('a')
  expect(d.sanitize('//a')).toBe('a')
  expect(d.sanitize('a/')).toBe('a')
  expect(d.sanitize('a//')).toBe('a')
  expect(d.sanitize('a/b')).toBe('a/b')
  expect(d.sanitize('a//b')).toBe('a/b')
  expect(d.sanitize('//a//b//')).toBe('a/b')
  expect(d.sanitize('a:/b')).toBe('a:b')
})

test('split', () => {
  expect(d.split('a:x/y')).toEqual(['a:x', 'y'])
  expect(d.split('a:/x/y')).toEqual(['a:x', 'y'])
  expect(d.split('a//b')).toEqual(['a', 'b'])
})

test('splitRepo', () => {
  expect(d.splitRepo('')).toEqual(['default', ''])
  expect(d.splitRepo('x/y')).toEqual(['default', 'x/y'])
  expect(d.splitRepo('a')).toEqual(['default', 'a'])
  expect(d.splitRepo('a:')).toEqual(['a', ''])
  expect(d.splitRepo('a:x/y')).toEqual(['a', 'x/y'])
  expect(d.splitRepo('a:/x/y')).toEqual(['a', '/x/y'])
})
