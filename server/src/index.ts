import { ApolloServer } from "apollo-server";
import { connection } from "./database/sql-lite.database";
import { schema } from "./graphql";

connection.then().catch();

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
