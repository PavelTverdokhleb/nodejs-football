/**
 * Environment variables definition.
 * @DB_CONNECTION uri for data base connection;
 * @DB_NAME name of the data base;
 * @SEED_URI uri for seeding data;
 */
export interface IEnvironmentVariables {
    DB_CONNECTION: string;
    DB_NAME: string;
    SEED_URI: string;
}