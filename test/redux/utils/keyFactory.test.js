import createKeyFactory from '../../../src/redux/utils/keyFactory';

describe('새로운 key 생성 테스트', () => {

  const keyFactory = createKeyFactory(8);

  test('init 테스트', () => {
    expect(keyFactory.init()).toEqual('M0000000');
  });

  test('예외 테스트', () => {
    expect(() => createKeyFactory(3)).toThrow('hashSize must be at least 4.');
    expect(() => keyFactory.build('', 'aaaa')).toThrow('hash\'s length must be 8. but got 4.');
  });

  test('build 테스트 1', () => {
    const beforeKey = '';
    const afterKey = 'aaaaaaaa';

    expect(keyFactory.build(beforeKey, afterKey)).toEqual('a5aaaaaa');
  });

  test('build 테스트 2', () => {
    const beforeKey = '024Djj2A';
    const afterKey = 'd1eJkM39';

    expect(keyFactory.build(beforeKey, afterKey)).toEqual('JWrGk2Xe');
  });

  test('build 테스트 3', () => {
    const beforeKey = 'AAAAAAAA';
    const afterKey = 'AAAAAAAC';

    expect(keyFactory.build(beforeKey, afterKey)).toEqual('AAAAAAAB');
  });

  test('build 테스트 4', () => {
    const beforeKey = 'aaaaaaab';
    const afterKey = 'aaaaaaaa';

    expect(() => keyFactory.build(beforeKey, afterKey)).toThrow('must be rearranged.');
  });

  test('first 테스트 1', () => {
    const pivot = keyFactory.init();

    expect(keyFactory.first(pivot)).toEqual('Lz000000');
  });

  test('first 테스트 2', () => {
    let pivot = '00000000';
    expect(() => keyFactory.first(pivot)).toThrow('no more hash can be created.');

    pivot = '00000001';
    expect(() => keyFactory.first(pivot)).toThrow('no more hash can be created.');

    pivot = '01000000';
    expect(() => keyFactory.first(pivot)).toThrow('no more hash can be created.');

    pivot = '0W000000';
    expect(keyFactory.first(pivot)).toEqual('01000000');

    pivot = 'dW000000';
    expect(keyFactory.first(pivot)).toEqual('d1000000');

    pivot = 'n2000000';
    expect(keyFactory.first(pivot)).toEqual('mz000000');
  });

  test('last 테스트 1', () => {
    const pivot = keyFactory.init();

    expect(keyFactory.last(pivot)).toEqual('MU000000');
  });

  test('last 테스트 2', () => {
    let pivot = 'zz000000';
    expect(() => keyFactory.last(pivot)).toThrow('no more hash can be created.');

    pivot = 'zzabcdef';
    expect(() => keyFactory.last(pivot)).toThrow('no more hash can be created.');

    pivot = 'zx000000';
    expect(() => keyFactory.last(pivot)).toThrow('no more hash can be created.');

    pivot = 'zP000000';
    expect(keyFactory.last(pivot)).toEqual('zt000000');

    pivot = 'aP000000';
    expect(keyFactory.last(pivot)).toEqual('at000000');

    pivot = 'mu000000';
    expect(keyFactory.last(pivot)).toEqual('n0000000');
  });

  test('first 가능 횟수 테스트', () => {
    let count = 0;
    let pivot = keyFactory.init();

    while (true) {
      try {
        pivot = keyFactory.first(pivot);
        count += 1;
      } catch (e) { break; }
    }

    // 23번을 맨 앞으로 보낸 후에는 재정렬해야합니다.
    expect(count).toBe(44);
  });

  test('last 테스트 가능 횟수 테스트', () => {
    let count = 0;
    let pivot = keyFactory.init();

    while (true) {
      try {
        pivot = keyFactory.last(pivot);
        count += 1;
      } catch (e) { break; }
    }

    // 23번을 맨 앞으로 보낸 후에는 재정렬해야합니다.
    expect(count).toBe(119);
  });

  test('build 가능 횟수 테스트 1', () => {
    let count = 0;
    const after = keyFactory.init();
    let pivot = keyFactory.first(after);

    while (true) {
      try {
        pivot = keyFactory.build(pivot, after);
        count += 1;
      } catch (e) { break; }
    }

    // 23번을 맨 앞으로 보낸 후에는 재정렬해야합니다.
    expect(count).toBe(36);
  });

  test('build 가능 횟수 테스트 2', () => {
    let count = 0;
    const before = keyFactory.init();
    let pivot = keyFactory.last(before);

    while (true) {
      try {
        pivot = keyFactory.build(before, pivot);
        count += 1;
      } catch (e) { break; }
    }

    // 23번을 맨 앞으로 보낸 후에는 재정렬해야합니다.
    expect(count).toBe(40);
  });

  test('compare 테스트', () => {
    expect(keyFactory.compare('aaaaaaab', 'aaaaaaaa')).toBe(true)
    expect(keyFactory.compare('aaaaaaaa', 'aaaaaaab')).toBe(false)
    expect(keyFactory.compare('aaaaaaaa', 'aaaaaaaa')).toBe(false)
  })

});
