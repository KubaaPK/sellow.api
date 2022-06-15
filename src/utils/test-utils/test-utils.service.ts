import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TestUtilsService {
  constructor(private readonly _dataSource: DataSource) {}

  public async clearDatabase(): Promise<void> {
    await this._dataSource.dropDatabase();
    await this._dataSource.destroy();
  }

  public async reconnect(): Promise<void> {
    if (!this._dataSource.isInitialized) {
      this._dataSource.initialize();
    }
  }

  public async insert<T>(
    entity: { new () },
    data: T[] | Partial<T>[],
  ): Promise<void> {
    const repository = this._dataSource.getRepository(entity);
    await repository.save(data);
  }

  public async query(query: string): Promise<any> {
    return await this._dataSource.query(query);
  }
}
