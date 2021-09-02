import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { App } from "./components/app";
import * as serviceWorker from "./serviceWorker";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from "@apollo/client";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";

const host = 'localhost:4200';

const httpLink = new HttpLink({
    uri: `http://${host}`,
});

const wsLink = new WebSocketLink({
    uri: `ws://${host}/subs`,
    options: {
        reconnect: true,
    },
});

const splitLink = split(({ query }) => {
    const definition = getMainDefinition(query);
    return (
        definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
    );
},
wsLink,
httpLink
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
