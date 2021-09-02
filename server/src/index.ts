import { ApolloServer } from 'apollo-server';
import { connection } from './database/sql-lite.database';
import { schema } from './graphql';

connection.then().catch(error => {
    console.error(error);
});

const server = new ApolloServer({
    schema,
    subscriptions: {
        path: '/subs',
        onConnect: () => {
            console.log('Client connected');
        },
        onDisconnect: () => {
            console.log('Client disconnected');
        },
    },
});

server.listen({ port: 4200 }).then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
