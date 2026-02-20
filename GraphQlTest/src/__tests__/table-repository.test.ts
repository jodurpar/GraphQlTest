import 'reflect-metadata';
import { TableRepository } from '../repositories/table-repository';
import { IDatabaseService } from '../core/types';

describe('TableRepository', () => {
    let repository: TableRepository;
    let mockDbService: jest.Mocked<IDatabaseService>;

    beforeEach(() => {
        mockDbService = {
            connect: jest.fn(),
            query: jest.fn(),
            execute: jest.fn(),
        };
        repository = new TableRepository(mockDbService);
    });

    describe('getTablesByDatabase', () => {
        it('should return a list of table names with sanitized database prefix', async () => {
            mockDbService.query.mockResolvedValue([{ name: 'Users' }, { name: 'Orders' }]);

            const result = await repository.getTablesByDatabase('MyData]base');

            expect(result).toEqual(['Users', 'Orders']);
            // Verificamos que se haya escapado el corchete de cierre para evitar inyección
            expect(mockDbService.query).toHaveBeenCalledWith(
                expect.stringContaining('[MyData]]base].sys.tables')
            );
        });
    });
});
