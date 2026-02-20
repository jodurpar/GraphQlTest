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

    describe('getTableData', () => {
        it('should generate SQL with * when no field is provided', async () => {
            mockDbService.query.mockResolvedValue([{ id: 1, name: 'Test' }]);

            await repository.getTableData('MyDb', 'MyTable', 10, 0);

            expect(mockDbService.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT * FROM [MyDb].dbo.[MyTable]'),
                expect.any(Object)
            );
        });

        it('should generate SQL with specific field and handle escaping', async () => {
            mockDbService.query.mockResolvedValue([{ email: 'test@example.com' }]);

            await repository.getTableData('MyDb', 'MyTable', 10, 0, 'em]ail');

            expect(mockDbService.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT [em]]ail] FROM [MyDb].dbo.[MyTable]'),
                expect.any(Object)
            );
        });
    });
});
