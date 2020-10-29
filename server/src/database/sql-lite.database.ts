import { createConnection } from "typeorm";
import { Message } from "../entities/message/message.model";
import { User } from "../entities/user/user.model";

export const connection = createConnection({
  type: "sqlite",
  database: __dirname + "/db.sqlite",
  entities: [Message, User],
  synchronize: true,
  logging: "all",
});
