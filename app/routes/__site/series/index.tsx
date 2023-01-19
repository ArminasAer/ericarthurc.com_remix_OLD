import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSeriesesRedis } from '~/models/post.server';

export async function loader() {
  const series = await getSeriesesRedis();

  return json({ series });
}

export default function SeriesPage() {
  const { series } = useLoaderData<typeof loader>();

  return (
    <div>
      {series.map((s) => (
        <div key={s}>
          <p>{s}</p>
        </div>
      ))}
    </div>
  );
}
