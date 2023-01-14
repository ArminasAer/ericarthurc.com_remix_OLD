import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import hljs from 'highlight.js';
import { marked } from 'marked';
import invariant from 'tiny-invariant';

import { getPostRedis } from '~/models/post.server';

export async function loader({ params }: LoaderArgs) {
  invariant(params.slug, `params.slug is required`);

  const post = await getPostRedis(params.slug);
  invariant(post, `post not found: ${params.slug}`);

  marked.setOptions({
    highlight: (code, lang) => hljs.highlight(lang, code).value,
  });

  const html = marked(post.markdown);

  const code = `
  \`\`\`typescript
    const variable = 'hello';

    console.log("hi");

    function getProfile(id: string): {
      name: string; address: string, photo: string
    } {
      return {
        name: 'ben', address: "ben's house", photo: "/ben.png"
      };
    }
  \`\`\`
`;

  const tester = marked(code);

  return json({ post, html, tester });
}

export default function BlogPost() {
  const { post, html, tester } = useLoaderData<typeof loader>();

  return (
    <div className="blog-container">
      <div
        className="markdown-container"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="tag-container">
        {post.categories.map((category) => (
          <span className="tag" key={category}>
            `{category}`{' '}
          </span>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: tester }}></div>
    </div>
  );
}
