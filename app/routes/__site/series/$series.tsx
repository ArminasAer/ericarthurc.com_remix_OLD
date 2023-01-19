import { json, LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { getSeriesRedis } from '~/models/post.server';

export async function loader({ params }: LoaderArgs) {
  invariant(params.series, `params.series is required`);

  const series = await getSeriesRedis(params.series);
  invariant(series, `series not found: ${params.series}`);

  return json({ series });
}

export default function SeriesMetaPage() {
  const { series } = useLoaderData<typeof loader>();
}
