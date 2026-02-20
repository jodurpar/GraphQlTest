import 'reflect-metadata';
import { DatabaseRepository } from '../repositories/database-repository';
import { IDatabaseService } from '../core/types';

describe('DatabaseRepository', () => {
    let repository: DatabaseRepository;
    let mockDbService: jest.Mocked<IDatabaseService>;

    beforeEach(() => {
        mockDbService = {
            connect: jest.fn(),
            query: jest.fn(),
            execute: jest.fn(),
        };
        repository = new DatabaseRepository(mockDbService);
    });

    describe('getAll', () => {
        it('should return a list of database names', async () => {
            mockDbService.query.mockResolvedValue([{ name: 'master' }, { name: 'tempdb' }]);

            const result = await repository.getAll();

            expect(result).toEqual(['master', 'tempdb']);
            expect(mockDbService.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT name FROM sys.databases')
            );
        });

        it('should handle empty results', async () => {
            mockDbService.query.mockResolvedValue([]);

            const result = await repository.getAll();

            expect(result).toEqual([]);
        });
    });

    describe('getByName', () => {
        it('should return the database name if found', async () => {
            mockDbService.query.mockResolvedValue([{ name: 'master' }]);

            const result = await repository.getByName('master');

            expect(result).toBe('master');
        });

        it('should return null if database not found', async () => {
            mockDbService.query.mockResolvedValue([]);

            const result = await repository.getByName('unknown');

            expect(result).toBeNull();
        });
    });
});
