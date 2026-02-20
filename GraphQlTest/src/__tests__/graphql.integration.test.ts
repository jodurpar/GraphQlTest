import 'reflect-metadata';
import { createYoga } from 'graphql-yoga';
import { builder } from '../graphql/builder';
import { container } from '../core/container';
import { TYPES } from '../core/types';

describe('GraphQL Schema Integration', () => {
  let mockDbRepo: any;

  beforeEach(() => {
    // Mock del repositorio
    mockDbRepo = {
      getAll: jest.fn().mockResolvedValue(['db1', 'db2']),
      getByName: jest.fn().mockResolvedValue('db1'),
    };

    container.register(TYPES.DatabaseRepository, { useValue: mockDbRepo });
  });

  it('should generate a valid schema and execute a query', async () => {
    const resolvedRepo = container.resolve(TYPES.DatabaseRepository);
    expect(resolvedRepo).toBe(mockDbRepo);

    const yoga = createYoga({ schema: builder.toSchema() });
    const query = `
      query {
        allDatabases {
          name
        }
      }
    `;

    const response = await yoga.fetch('http://localhost/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.data).not.toBeNull();
    expect(result.data.allDatabases).toHaveLength(2);
    expect(result.data.allDatabases[0].name).toBe('db1');
  });

  it('should support optional field filtering in rows query', async () => {
    // Mock del repositorio de tablas
    const mockTableRepo = {
      getTableData: jest.fn().mockResolvedValue([{ email: 'test@test.com' }]),
      getTablesByDatabase: jest.fn().mockResolvedValue(['users']),
    };
    container.registerInstance(TYPES.TableRepository, mockTableRepo);

    const yoga = createYoga({ schema: builder.toSchema() });
    const query = `
      query {
        oneDatabase(name: "db1") {
          tables {
            name
            rows(field: "email", limit: 1)
          }
        }
      }
    `;

    const response = await yoga.fetch('http://localhost/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.data).not.toBeNull();
    expect(mockTableRepo.getTableData).toHaveBeenCalledWith('db1', 'users', 1, 0, 'email');
    expect(result.data.oneDatabase.tables[0].rows[0].email).toBe('test@test.com');
  });
});
