import { Client, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://appwrite.rbduck.com/v1')
    .setProject('68fb874d002dae6d8403');

const databases = new Databases(client);

export const DATABASE_ID = '68fb8a3f003cc250666b';
export const COLLECTIONS = {
  PROJECTS: '68fb8f75003dfb26b43f',
  PROFESSIONAL_EXPERIENCE: '68fb8a49000b5273c419',
};

export { client, databases };