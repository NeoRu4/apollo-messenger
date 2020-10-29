import { Message } from "./message.model";

export const messageResolver = {
  Query: {
    messages: () => Message.getRepository().find(),
  },
  Mutation: {
    message: (
      parent: any,
      {
        message,
      }: {
        message: {
          id: number;
          text: string;
          userId: number;
        };
      }
    ) => Message.getRepository().save({ ...message }),
  },
};
