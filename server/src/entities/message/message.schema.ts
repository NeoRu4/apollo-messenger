import { gql } from 'apollo-server';

export const messageSchema = gql`
    type Query {
        messages: [Message]
    }

    type Mutation {
        message(message: MessageInput): Message
    }

    type Subscription {
        messageAdded: Message
    }

    type Message {
        id: ID!
        text: String!
    }

    input MessageInput {
        id: ID
        text: String!
    }
`;
