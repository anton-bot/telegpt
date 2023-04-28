import { sleep } from './sleep';

describe('sleep()', () => {
  it('should wait for the specified amount of time', async () => {
    const start = Date.now();
    await sleep(100);
    expect(Date.now() - start).toBeGreaterThanOrEqual(100);
  });
});
