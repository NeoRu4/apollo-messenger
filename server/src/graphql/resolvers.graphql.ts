import { IResolvers } from 'apollo-server';
import { messageResolver } from '../entities/message/message.resolver';

export const resolvers: IResolvers[] = [messageResolver];
