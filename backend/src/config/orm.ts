import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const options: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  password: '',
  username: 'root',
  database: 'blog-nest',
  logging: true,
  entities: [path.resolve(__dirname, '..', 'modules', '**', 'entities', '*')],
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
};

module.exports = options;
