import { type SchemaTypeDefinition } from 'sanity'
import wheel from './schemaTypes/wheel'
import competency from './schemaTypes/competency'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [wheel, competency]
}
