import path from 'path'
import {keyBy, identity, matchesProperty} from 'lodash'

const isModuleDefinition = matchesProperty(['callee', 'name'], 'define')
function getName({
  opts: {cwd = process.cwd(), transform = identity},
  file: {opts: {filename}}
  }) {
  const raw = path.relative(cwd, filename).replace(/\.js$/, '')
  return transform(raw)
}

export default function ({types: t}) {
  return {
    visitor: {
      CallExpression(nodePath, state) {
        if (isModuleDefinition(nodePath.node)) {
          const {
            Literal: moduleName,
            ArrayExpression: moduleRequirements,
            FunctionExpression: moduleCallback,
            ObjectExpression: moduleObjectDefinition
            } = keyBy(nodePath.node.arguments, 'type')
          nodePath.node.arguments = [
            moduleName || t.stringLiteral(getName(state)),
            moduleRequirements || t.arrayExpression([]),
            moduleCallback || moduleObjectDefinition
          ]
        }
      }
    }
  }
}