import { createConnection } from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService) => {
      const uri = configService.get<string>(
        'MONGO_URI',
        'mongodb://root:example@localhost:27017/admin',
      );
      return await createConnection(uri);
    },
    inject: [ConfigService],
  },
];
