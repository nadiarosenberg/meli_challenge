import fs from 'fs';
import {
  getStoreById
} from '../../lib/services/store.service';
import { mockedStore } from '../mocks/store.mock';

jest.mock('fs');
const mockedFs = fs as unknown as {
  readFileSync: jest.Mock;
};

describe('getStoreById', () => {
  beforeEach(() => {
    mockedFs.readFileSync.mockReset();
    mockedFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockedStore));
  });
  it('should return the store if id matches', () => {
    const result = getStoreById('123');
    expect(result).toEqual(mockedStore);
  });
  it('should return null if id does not match', () => {
    const result = getStoreById('345');
    expect(result).toBeNull();
  });
});


