// __mocks__/crypto.js
const crypto = jest.createMockFromModule('crypto');

crypto.randomUUID = () => '123e4567-e89b-12d3-a456-426614174000';

module.exports = crypto;
