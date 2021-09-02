import { mergeSchemas } from 'apollo-server';
import { schemas } from './schemas.graphql';
import { resolvers } from './resolvers.graphql';

export const schema = mergeSchemas({ schemas, resolvers });
