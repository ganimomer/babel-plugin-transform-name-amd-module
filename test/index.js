import path from 'path'
import fs from 'fs'
import {transformFileSync} from 'babel-core'
import  {expect} from 'chai'
import plugin from './../src'

const fixturesPath = path.resolve(__dirname, 'fixtures')
const getExpectedCode = name => fs.readFileSync(path.resolve(fixturesPath, name, 'expected.js'), 'utf8').trim()
const getInputCode = name => path.resolve(fixturesPath, name, 'input.js')
const test = (name, options) => {
  const expectedCode = getExpectedCode(name)
  const transformedCode = transformFileSync(getInputCode(name), {
    babelrc: false,
    plugins: [[plugin, options]]
  }).code
  expect(transformedCode).to.equal(expectedCode)
}

describe('babel-plugin-transform-name-amd-module', () => {
  it('should add filename to objectExpression', () => test('objectExpression', {cwd: fixturesPath}))
  it('should add filename to function with deps', () => test('withDeps', {cwd: fixturesPath}))
  it('should use transform function if given', () => test('withTransform', {cwd: fixturesPath, transform: s => s.toUpperCase()}))
  it('should use process.cwd as default if no cwd is given', () => test('defaultCwd'))
  it('should not replace module name if it exists', () => test('moduleNameExists'))
})