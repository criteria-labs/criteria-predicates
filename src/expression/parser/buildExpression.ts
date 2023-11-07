import { buildPredicate } from '../../predicate/parser/buildPredicate'
import { invariant } from '../../util/invariant'
import { ArrayLiteralExpression } from '../ArrayLiteralExpression'
import { ConditionalExpression } from '../ConditionalExpression'
import { Expression } from '../Expression'
import { IndexExpression } from '../IndexExpression'
import { PropertyExpression } from '../PropertyExpression'
import { ObjectLiteralExpression } from '../ObjectLiteralExpression'
import { SubqueryExpression } from '../SubqueryExpression'
import { TemplateStringExpression } from '../TemplateStringExpression'
import { ValueExpression } from '../ValueExpression'
import { VariableExpression } from '../VariableExpression'
import { ASTKinds, Expression as ExpressionAST, ValueExpression as ValueExpressionAST } from './parse'
import { unescapeString } from '../../util/escaping'

export function buildExpression(ast: ExpressionAST): Expression {
  switch (ast.kind) {
    case ASTKinds.Expression_1: {
      return buildExpression(ast.group)
    }
    case ASTKinds.Expression_2: {
      const base = buildExpression(ast.index.base)
      const index = ast.index.index
      invariant(index === 'FIRST' || index === 'LAST' || index === 'SIZE')
      return new IndexExpression(base, index)
    }
    case ASTKinds.Expression_3: {
      if (ast.property.base) {
        const base = buildExpression(ast.property.base.value)
        const propertyName = ast.property.propertyName.value
        return new PropertyExpression(propertyName, base)
      } else {
        const propertyName = ast.property.propertyName.value
        return new PropertyExpression(propertyName, null)
      }
    }
    case ASTKinds.Expression_4: {
      return buildValueExpression(ast.value)
    }
    case ASTKinds.Expression_5: {
      const test = buildPredicate(ast.conditional.test)
      const trueBranch = buildExpression(ast.conditional.trueBranch)
      const falseBranch = buildExpression(ast.conditional.falseBranch)
      return new ConditionalExpression(test, trueBranch, falseBranch)
    }
    case ASTKinds.Expression_6: {
      const collection = buildExpression(ast.subquery.collection)
      const filter = buildPredicate(ast.subquery.filter)
      const variable = new VariableExpression(ast.subquery.variable.identifier.value)
      return new SubqueryExpression(collection, filter, variable)
    }
  }
}

function buildValueExpression(ast: ValueExpressionAST) {
  if (typeof ast === 'string') {
    switch (ast) {
      case 'NULL':
        return new ValueExpression(null)
      case 'TRUE':
        return new ValueExpression(true)
      case 'FALSE':
        return new ValueExpression(false)
      default:
        invariant(false, `Invalid value ${ast}`)
    }
  }
  switch (ast.kind) {
    case ASTKinds.StringValueExpression: {
      if (ast.remainingSegments.length === 0) {
        return new ValueExpression(ast.firstSegment?.literal ? unescapeString(ast.firstSegment.literal) : '')
      } else {
        let segments: (string | Expression)[] = ast.firstSegment
          ? ast.firstSegment.literal.length > 0
            ? [unescapeString(ast.firstSegment?.literal)]
            : []
          : []
        for (const segment of ast.remainingSegments) {
          const template = buildExpression(segment.templateSegment.template)
          segments.push(template)
          if (segment.literalSegment && segment.literalSegment.literal.length > 0) {
            segments.push(unescapeString(segment.literalSegment.literal))
          }
        }
        return new TemplateStringExpression(segments)
      }
    }
    case ASTKinds.NumericValueExpression_1: {
      return new ValueExpression(parseInt(ast.integer))
    }
    case ASTKinds.NumericValueExpression_2: {
      return new ValueExpression(parseFloat(ast.float))
    }
    case ASTKinds.VariableExpression: {
      return new VariableExpression(ast.identifier.value)
    }
    case ASTKinds.ObjectLiteralExpression: {
      if (ast.properties) {
        const properties: [string, Expression][] = [
          [ast.properties.first.key.value, buildExpression(ast.properties.first.value)]
        ]
        for (const remainingProperty of ast.properties.remaining) {
          properties.push([remainingProperty.property.key.value, buildExpression(remainingProperty.property.value)])
        }
        return new ObjectLiteralExpression(properties)
      } else {
        return new ObjectLiteralExpression([])
      }
    }
    case ASTKinds.ArrayLiteralExpression: {
      if (ast.elements) {
        const first = buildExpression(ast.elements.first)
        const elements: Expression[] = [first]
        for (const remainingElement of ast.elements.remaining) {
          const element = buildExpression(remainingElement.element)
          elements.push(element)
        }
        return new ArrayLiteralExpression(elements)
      } else {
        return new ArrayLiteralExpression([])
      }
    }
  }
}
