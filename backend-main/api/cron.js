import { PrismaClient } from '@prisma/client'
import { createClient } from 'redis';

const prisma = new PrismaClient()

const client = createClient(); 

async function getUsers() {
const cacheKey = 'users';
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const allUsers = await prisma.networth.findMany();
  await redisClient.set(cacheKey, JSON.stringify(allUsers));
  return allUsers;
  
}

export default function handler(req, res) {
 // const freshData = await fetchFreshData();
  
  // await updateCachedData(freshData);
    getUsers()
  res.status(200).end('Cached data revalidated');
}

