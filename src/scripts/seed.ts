import knex from 'knex';
import { properties, tenantsProfiles, users } from './data';

const DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/postgres';

const generateClient = () => {
  return knex({
    client: 'pg',
    connection: DATABASE_URL,
  });
};
const generateProperties = async () => {
  try {
    const client = generateClient();
    await client('Properties').insert(properties);
    await client('Users').insert(users);
    await client('TenantsProfile').insert(tenantsProfiles);
    console.log('Seeds inserted');
  } catch (err) {
    console.log({ err });
  }
};
generateProperties();
