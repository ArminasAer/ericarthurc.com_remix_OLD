import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/node';
import {
  authCookie,
  verifyAuthCookie,
  createAuthCookie,
  verifyLoginCredentials,
} from '~/admin.server';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import * as React from 'react';

export async function loader({ request }: LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const parsedCookie: { token: string } | null = await authCookie.parse(
    cookieHeader
  );

  if (parsedCookie) {
    if (await verifyAuthCookie(parsedCookie)) {
      return redirect('/admin');
    }
  }

  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const password = formData.get('password');
  const pin = formData.get('pin');

  if (typeof password !== 'string' || password.length === 0) {
    return json(
      { errors: { password: 'Password is required', pin: null } },
      { status: 400 }
    );
  }

  if (typeof pin !== 'string' || pin.length === 0) {
    return json(
      { errors: { password: null, pin: 'Password is required' } },
      { status: 400 }
    );
  }

  if (verifyLoginCredentials(password, pin)) {
    console.log('here');

    return createAuthCookie(password, pin);
  }

  return json({ status: 400 });
}

export default function AdminLoginPage() {
  const actionData = useActionData<typeof action>();

  return (
    <div>
      <h3>Get loggin!</h3>
      <Form method="post">
        <input id="password" name="password" type="password" />
        <input id="pin" name="pin" type="password" />
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
