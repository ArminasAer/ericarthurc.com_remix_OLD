import { verifyAuthCookie } from '~/admin.server';
import { ActionArgs, LoaderArgs, redirect } from '@remix-run/node';
import { getPostsPrisma } from '~/models/post.server';
import { Form, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { safeRedirect } from '~/utils';

export async function loader({ request }: LoaderArgs) {
  if (!(await verifyAuthCookie(request))) {
    return redirect('/admin/login');
  }
  return json({ posts: await getPostsPrisma() });
}

export async function action({ request }: ActionArgs) {
  let formData = await request.formData();
  let { _action, ...values } = Object.fromEntries(formData);

  switch (_action) {
    case 'update':
      console.log('UPDATE');
      return redirect(safeRedirect(`/admin/update/${values.id}`));

    case 'delete':
      console.log('DELETE');
      return null;
  }

  // return null;
}

export default function AdminPage() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>Id: {post.id}</p>
            <p>slug: {post.slug}</p>
            <p>Title: {post.title}</p>
            <p>Series:{post.series}</p>
            <p>Date: {post.date}</p>
            <br />
            <Form method="post">
              <input type="hidden" name="id" value={post.id} />
              <button type="submit" name="_action" value="update">
                Update
              </button>
            </Form>
            <Form method="post">
              <input type="hidden" name="id" value={post.id} />
              <button type="submit" name="_action" value="delete">
                Delete
              </button>
            </Form>
          </div>
        ))}
      </div>
    </main>
  );
}
