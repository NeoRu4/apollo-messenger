import { IResolvers } from 'apollo-server';
import { Message } from './message.model';
import pubsub from '../../graphql/pubsub';

export const messageResolver: IResolvers = {
    Query: {
        messages: () => Message.getRepository().find(),
    },
    Mutation: {
        message: (
            parent: any,
            {message}: {
                message: {
                    id: number;
                    text: string;
                };
            },
        ) => {
            const savedMessages = Message.getRepository().save({ ...message });

            savedMessages.then((value: Message) => {
                pubsub.publish('MESSAGE_ADDED', {
                    messageAdded: value,
                });
            });

            return savedMessages;
        },
    },
    Subscription: {
        messageAdded: {
            subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED']),
        },
    },
};
