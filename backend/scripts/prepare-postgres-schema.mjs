import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const schemaPath = fileURLToPath(new URL('../prisma/schema.prisma', import.meta.url));
const productionSchemaPath = fileURLToPath(new URL('../prisma/schema.postgres.prisma', import.meta.url));
const sqliteSchema = readFileSync(schemaPath, 'utf8');
const postgresSchema = sqliteSchema.replace('provider = "sqlite"', 'provider = "postgresql"');

if (postgresSchema === sqliteSchema) {
  throw new Error('The SQLite datasource provider was not found in prisma/schema.prisma.');
}

writeFileSync(productionSchemaPath, postgresSchema);
console.log('Prepared PostgreSQL Prisma schema for deployment.');
