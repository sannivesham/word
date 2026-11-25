import { IDBPDatabase } from 'idb';
import { DCWordDocDBSchema } from '@/types/storage';
import { migrateV1 } from './v1';

export interface MigrationStep {
  version: number;
  run: (db: IDBPDatabase<DCWordDocDBSchema>) => void;
}

export const migrations: MigrationStep[] = [
  {
    version: 1,
    run: migrateV1,
  },
];
