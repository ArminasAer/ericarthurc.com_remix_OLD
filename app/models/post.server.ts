import { prisma } from '../db.server';
import type { Post } from '@prisma/client';

import { getPostCacheParsed } from '../redis';

export async function getPostsPrisma() {
  return prisma.post.findMany();
}

export async function getPostPrisma(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function createPostPrisma() {}

export async function getPostsRedis() {
  return await getPostCacheParsed();
}

export async function getPostRedis(slug: string) {
  const posts = await getPostCacheParsed();

  return posts.find((p) => p.slug == slug);
}
