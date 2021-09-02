import { createConnection } from 'typeorm';
import { Message } from '../entities/message/message.model';

export const connection = createConnection({
    type: 'sqlite',
    database: `${__dirname}/db.sqlite`,
    entities: [Message],
    synchronize: true,
    logging: 'all',
});
