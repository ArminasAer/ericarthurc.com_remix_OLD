import { getPostsRedis } from '~/models/post.server';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

export async function loader() {
  return json({ posts: await getPostsRedis() });
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="main-container">
      <div className="cards-container">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <Link className="card-header" to={`/blog/${post.slug}`}>
              <div className="card-header-info">
                <span className="card-title">{post.title}</span>
                <span className="card-date">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    timeZone: 'America/Los_Angeles',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </Link>
            <span className="card-categories">
              {post.categories.map((category) => (
                <Link
                  className="card-category"
                  to={`/category/${category}`}
                  key={category}
                >
                  <span className="card-category-info">{category}</span>
                </Link>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
