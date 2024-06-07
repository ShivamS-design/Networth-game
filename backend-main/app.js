import { PrismaClient } from '@prisma/client'
import { createClient } from 'redis';

const prisma = new PrismaClient()


const client = createClient(); 

async function createUser(data) {
  if ( !data.sessionId || !data || !data.user_id || !data.counter) {
    return { error: data };
  }
  const user = await prisma.networth.create({
    data,
  });
  return user;
}

async function updateUser(userId, data) {
  const updatedUser = await prisma.networth.update({
    where: { user_id: userId },
    data,
  });
  return updatedUser;
}


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



async function getUser(userId) {
  const user = await prisma.networth.findUnique({
    where: { user_id: userId },
  });
  return user;
}

export { createUser, updateUser, getUsers, getUser };
