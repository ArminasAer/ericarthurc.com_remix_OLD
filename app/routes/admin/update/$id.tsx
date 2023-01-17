import { json, LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { getPostPrisma } from '~/models/post.server';

export async function loader({ params }: LoaderArgs) {
  invariant(params.id, `params.id is required`);

  const post = await getPostPrisma(params.id);
  invariant(post, `post not found: ${params.id}`);

  return json({ post });
}

export default function AdminPostUpdate() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div>
      <p>{post.id}</p>
      <p>{post.slug}</p>
      <p>{post.title}</p>
    </div>
  );
}
