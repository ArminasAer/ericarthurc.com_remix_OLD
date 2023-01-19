import type { Post } from '@prisma/client';

import { prisma } from '../db.server';
import { getPostCacheParsed } from '../redis.server';

function postsSorter(a: Post, b: Post) {
  if (a.date > b.date) {
    return -1;
  } else if (a.date < b.date) {
    return 1;
  } else {
    if (a.title < b.title) {
      return -1;
    } else {
      return 1;
    }
  }
}

// Prisma

export async function getPostsPrisma() {
  const posts = await prisma.post.findMany();
  posts.sort(postsSorter);
  return posts;
}

export async function getPostPrisma(id: string) {
  return prisma.post.findUnique({ where: { id } });
}

export async function createPostPrisma(
  newPost: Pick<
    Post,
    'date' | 'slug' | 'title' | 'series' | 'categories' | 'markdown'
  >
) {}

export async function deletePostPrisma() {}

// Redis

export async function getPostsRedis() {
  const posts = await getPostCacheParsed();
  posts.sort(postsSorter);
  return posts;
}

export async function getPostRedis(slug: string) {
  const posts = await getPostCacheParsed();

  return posts.find((p) => p.slug == slug);
}

export async function getSeriesesRedis() {
  const posts = await getPostCacheParsed();

  const seriesArray: string[] = [];

  posts.map((post) => {
    seriesArray.push(post.series);
  });

  seriesArray.sort();

  return [...new Set(seriesArray)];
}

export async function getSeriesRedis(series: string) {
  const posts = await getPostCacheParsed();

  const seriesArray: string[] = [];

  posts.map((post) => {
    if (post.series === series) {
      seriesArray.push(post.series);
    }
  });

  seriesArray.sort();

  return [...new Set(seriesArray)];
}

export async function getCategoryRedis(category: string) {
  const posts = await getPostCacheParsed();
}
