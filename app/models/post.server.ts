import type { Post } from '@prisma/client';

import { prisma } from '../db.server';
import { getPostCacheParsed } from '../redis.server';

export async function getPostsPrisma() {
  return prisma.post.findMany();
}

export async function getPostPrisma(id: string) {
  return prisma.post.findUnique({ where: { id } });
}

export async function createPostPrisma() {}

export async function getPostsRedis() {
  return await getPostCacheParsed();
}

export async function getPostRedis(slug: string) {
  const posts = await getPostCacheParsed();

  return posts.find((p) => p.slug == slug);
}
