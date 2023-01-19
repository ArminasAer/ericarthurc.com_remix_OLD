import * as jose from 'jose';
import { createCookie, redirect } from '@remix-run/node';

// TODO: this assumes .env will be there and these values will available
const SECRET_BUFFER = Buffer.from(<string>process.env.JWT_SECRET, 'hex');
const ISSUER = <string>process.env.JWT_ISSUER;
const EXP = <string>process.env.JWT_EXP;

interface AUTHPayload {
  password: string;
  pin: string;
}

async function generateEncrpytedJwt(customClaims: AUTHPayload) {
  return new jose.EncryptJWT({ customClaims })
    .setProtectedHeader({
      alg: 'dir',
      enc: 'A256GCM',
    })
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(EXP)
    .encrypt(SECRET_BUFFER);
}

async function decryptJwt(jwt: any) {
  const options = {
    issuer: ISSUER,
    contentEncryptionAlgorithms: ['A256GCM'],
    keyManagementAlgorithms: ['dir'],
  };
  return jose.jwtDecrypt(jwt, SECRET_BUFFER, options);
}

export const authCookie = createCookie('auth', {
  path: '/admin',
  sameSite: 'lax',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 86400,
});

export async function createAuthCookie(password: string, pin: string) {
  const token = await generateEncrpytedJwt({ password, pin });

  return redirect('/admin', {
    headers: {
      'Set-Cookie': await authCookie.serialize(
        {
          token,
        },
        {
          expires: new Date(Date.now() + 86400_000),
        }
      ),
    },
  });
}

export async function verifyAuthCookie(request: Request) {
  const cookieHeader = request.headers.get('Cookie');
  const parsedCookie: { token: string } | null = await authCookie.parse(
    cookieHeader
  );

  if (parsedCookie) {
    const decrypt = await decryptJwt(parsedCookie.token);
    const auth = decrypt.payload.customClaims as AUTHPayload;

    if (
      !(
        auth.password === process.env.ADMIN_PASSWORD &&
        auth.pin === process.env.ADMIN_PIN
      )
    ) {
      return false;
    }
  } else {
    return false;
  }
  return true;
}

export function verifyLoginCredentials(password: string, pin: string) {
  return (
    password === process.env.ADMIN_PASSWORD && pin === process.env.ADMIN_PIN
  );
}
