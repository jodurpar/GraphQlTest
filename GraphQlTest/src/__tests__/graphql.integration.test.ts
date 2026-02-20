import 'reflect-metadata';
import { createYoga } from 'graphql-yoga';
import { builder } from '../graphql/builder';
import { container } from '../core/container';
import { TYPES } from '../core/types';

describe('GraphQL Schema Integration', () => {
  let mockDbRepo: any;

  beforeAll(() => {
    // Mock del repositorio
    mockDbRepo = {
      getAll: jest.fn().mockResolvedValue(['db1', 'db2']),
      getByName: jest.fn().mockResolvedValue('db1'),
    };

    container.registerInstance(TYPES.DatabaseRepository, mockDbRepo);
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
    if (result.errors) {
      console.error('GraphQL Errors:', JSON.stringify(result.errors, null, 2));
    }

    expect(response.status).toBe(200);
    expect(result.data).not.toBeNull();
    expect(result.data.allDatabases).toHaveLength(2);
    expect(result.data.allDatabases[0].name).toBe('db1');
  });
});
