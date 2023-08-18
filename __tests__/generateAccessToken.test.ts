import { generateAccessToken } from '../src/generateAccessToken';
jest.setTimeout(40000);

describe('generateAccessToken no sub', () => {
  const clientSecret = 'test client secret'; // never do this in your client side js but this is safe due to it being a testing application alone
  const appId = 'test app id';
  const clientId = 'test client id';
  const hostName = 'http://localhost:3000';
  let accessTokenSigned: string = generateAccessToken(
    hostName,
    clientId,
    appId,
    clientSecret
  );

  it('returns a string', async () => {
    expect(typeof accessTokenSigned).toBe('string');
  });
});

describe('generateAccessToken with sub and expiration', () => {
  const clientSecret = 'test client secret'; // never do this in your client side js but this is safe due to it being a testing application alone
  const appId = 'test app id';
  const clientId = 'test client id';
  const hostName = 'http://localhost:3000';
  const sub = 'test@tincre.com';
  const expiration = 123456;
  let accessTokenSigned: string = generateAccessToken(
    hostName,
    clientId,
    appId,
    clientSecret,
    expiration,
    sub
  );

  it('returns a string', async () => {
    expect(typeof accessTokenSigned).toBe('string');
  });
});
