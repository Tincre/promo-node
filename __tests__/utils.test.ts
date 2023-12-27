import { generateFilePath } from '../src/utils'; // Adjust the import according to your file structure

describe('generateFilePath', () => {
  // Mocking the crypto module
  jest.mock('crypto');
  it('should generate a correct file path based on the given file and promo ID', () => {
    // Mocking a File object
    const mockFile = new File([''], 'testfile.png', { type: 'image/png' });

    const promoId = 'promo123';
    const expectedFileExtension = `.png`;

    const result = generateFilePath(mockFile, promoId);

    expect(result).toContain(expectedFileExtension);
    expect(result).toContain(promoId);
  });
});
