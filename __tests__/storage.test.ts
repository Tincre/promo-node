import {
  uploadMedia,
  getS3Client,
  getS3PutUrl,
  getS3ReadUrl,
} from '../src/storage';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: jest.fn(),
    PutObjectCommand: jest.fn(),
    GetObjectCommand: jest.fn(),
  };
});
jest.mock('../src/utils', () => {
  return {
    generateFilePath: jest.fn(() => 'pid/mockPath'),
  };
});
jest.mock('@aws-sdk/s3-request-presigner', () => {
  return {
    getSignedUrl: jest.fn(() => Promise.resolve('mockSignedUrl')),
  };
});

describe('uploadMedia', () => {
  it('should upload media and return the upload status and URL', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockImplementation((url, options) => {
      if (url.includes('/api/media')) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({ putUrl: 'mockPutUrl', getUrl: 'mockGetUrl' }),
        });
      }
      return Promise.resolve({ ok: true });
    });

    const mockFile = new File([''], 'testfile.png', { type: 'image/png' });
    const result = await uploadMedia('http://backendRoute', mockFile);

    expect(result).toEqual({ status: true, uploadedUrl: 'mockGetUrl' });
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should throw an error when the fetch to the backend fails', async () => {
    // Mock the fetch function to simulate a failure
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error('Network failure')));

    const mockFile = new File([''], 'testfile.png', { type: 'image/png' });

    await expect(uploadMedia('http://backendRoute', mockFile)).rejects.toThrow(
      'Network failure'
    );

    expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
  });
});

describe('getS3Client', () => {
  it('should create an S3 client with specified region and credentials', () => {
    const mockCredentials = { accessKeyId: 'key', secretAccessKey: 'secret' };
    const client = getS3Client('us-west-2', mockCredentials);

    expect(client).toBeInstanceOf(S3Client);
    // Additional assertions to check if the client was configured correctly
  });
});

describe('getS3PutUrl', () => {
  it('should create a pre-signed PUT URL for S3', async () => {
    const mockClient = new S3Client({ region: 'mock-region' });
    const mockFile = new File([''], 'testfile.png', { type: 'image/png' });

    const result = await getS3PutUrl(
      'my-bucket',
      'promo-id',
      mockFile,
      mockClient
    );

    expect(PutObjectCommand).toHaveBeenCalledWith({
      Key: 'pid/mockPath',
      ContentType: 'image/png',
      Bucket: 'my-bucket',
    });
    expect(getSignedUrl).toHaveBeenCalledWith(
      mockClient,
      expect.any(PutObjectCommand),
      { expiresIn: 600 }
    );
    expect(result).toEqual({
      putUrl: 'mockSignedUrl',
      awsPath: 'pid/mockPath',
    });
  });

  // Additional tests can be added to cover different scenarios
});

describe('getS3ReadUrl', () => {
  it('should create a pre-signed GET URL for S3', async () => {
    const mockClient = new S3Client({ region: 'mock-region' });
    const mockPath = 's3://my-bucket/pid/mockPath';

    const result = await getS3ReadUrl(mockPath, mockClient);

    expect(GetObjectCommand).toHaveBeenCalledWith({
      Key: 'pid/mockPath',
      Bucket: 'my-bucket',
    });
    expect(getSignedUrl).toHaveBeenCalledWith(
      mockClient,
      expect.any(GetObjectCommand),
      { expiresIn: 600 }
    );
    expect(result).toEqual({ getUrl: 'mockSignedUrl' });
  });

  // Additional tests can be added for different scenarios and error handling
});
