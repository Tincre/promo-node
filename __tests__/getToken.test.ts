import { getToken } from '../src/.';
import { generateAccessToken } from '../src/.';
jest.setTimeout(40000);

describe('getToken', () => {
  const clientSecret = '57hMbxBuIsWAMiT4k0XZ0JmQV5M0BrpR6E4nN9vbEoWvNy5S'; // never do this in your client side js but this is safe due to it being a testing application alone
  const appId = 'ygzRl6CiiUivwsNn3UjntatUDP4k';
  const clientId = 'm4MohkXSo2xMVWYXj6NecyS5uEeJ';
  const hostName = 'http://localhost:3000';
  let accessTokenSigned: string = generateAccessToken(
    hostName,
    clientId,
    appId,
    clientSecret
  );

  it('returns a string using the default api route', async () => {
    let resultToken: string = await getToken(accessTokenSigned);
    expect(typeof resultToken).toBe('string');
  });
  it('returns a string using a default api route', async () => {
    let resultToken: string = await getToken(
      accessTokenSigned,
      'https://feature.promo.api.tincre.dev'
    );
    expect(typeof resultToken).toBe('string');
  });
});
