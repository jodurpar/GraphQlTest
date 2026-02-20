import 'reflect-metadata';
import { container } from 'tsyringe';
import { TYPES } from './types';
import { SqlService } from '../services/sqlservice';
import { ConfigService } from '../services/configservice';
import { DatabaseRepository } from '../repositories/database-repository';
import { TableRepository } from '../repositories/table-repository';

container.register(TYPES.ConfigService, { useClass: ConfigService });
container.register(TYPES.DatabaseService, { useClass: SqlService });
container.register(TYPES.DatabaseRepository, { useClass: DatabaseRepository });
container.register(TYPES.TableRepository, { useClass: TableRepository });

export { container };
