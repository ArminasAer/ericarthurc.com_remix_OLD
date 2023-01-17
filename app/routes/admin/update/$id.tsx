import { json, LoaderArgs, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { authCookie, verifyAuthCookie } from '~/admin.server';
import { getPostPrisma } from '~/models/post.server';

export async function loader({ params, request }: LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie: { token: string } | null = await authCookie.parse(cookieHeader);

  if (cookie) {
    if (await verifyAuthCookie(cookie)) {
      invariant(params.id, `params.id is required`);

      const post = await getPostPrisma(params.id);
      invariant(post, `post not found: ${params.id}`);

      return json({ post });
    }

    return redirect('/admin/login');
  }

  return redirect('/admin/login');
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
