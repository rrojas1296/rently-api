import knex from 'knex';
import { properties, tenantsProfiles, users } from './data';
import dotenv from 'dotenv';
dotenv.config({
  path: '.env.development',
});

const DATABASE_URL = process.env.DATABASE_URL;
const OWNER_ID = 'b116250c-7b58-4b7c-b65f-81d85fd40eb7';

const generateClient = () => {
  return knex({
    client: 'pg',
    connection: DATABASE_URL,
  });
};
const generateProperties = async () => {
  try {
    const client = generateClient();
    await client('Properties').insert(
      properties.map((p) => ({ ...p, ownerId: OWNER_ID })),
    );
    await client('Users').insert(users);
    await client('TenantsProfile').insert(tenantsProfiles);
    console.log('Seeds inserted');
  } catch (err) {
    console.error({ err });
  }
};
generateProperties();
