import hljs from 'highlight.js';
import { marked } from 'marked';
import invariant from 'tiny-invariant';
import { getPostRedis } from '~/models/post.server';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export async function loader({ params }: LoaderArgs) {
  invariant(params.slug, `params.slug is required`);

  const post = await getPostRedis(params.slug);
  invariant(post, `post not found: ${params.slug}`);

  marked.setOptions({
    highlight: (code, options) => hljs.highlight(options, code).value,
  });

  post.markdown = marked(post.markdown);

  return json({ post });
}

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="blog-container">
      <div
        className="markdown-container"
        dangerouslySetInnerHTML={{ __html: post.markdown }}
      />
      <div className="tag-container">
        {post.categories.map((category) => (
          <span className="tag" key={category}>
            `{category}`{' '}
          </span>
        ))}
      </div>
    </div>
  );
}
