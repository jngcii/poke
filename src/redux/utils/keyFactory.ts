const KIND = 62;
const DICTIONARY = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

type KeyFactory = {
  init: () => string,
  build: (before?: string, after?: string) => string,
  first: (pivot: string) => string,
  last: (pivot: string) => string,
  compare: (before: string, after: string) => number
}

function createKeyFactory(hashSize: number): KeyFactory {
  if (hashSize < 4) throw Error('hashSize must be at least 4.');

  const init = (): string => {
    let initialKey = 'M';

    for (let i = 0; i < hashSize - 1; i += 1) {
      initialKey += '0';
    }

    return initialKey;
  };

  const build = (before?: string, after?: string): string => {
    if (!before && !after) return init();
    if (!before) return first(after);
    if (!after) return last(before);

    const beforeHashInteger = convertToInteger(before);
    const afterHashInteger = convertToInteger(after);
    const resultHashInteger = Math.floor((beforeHashInteger + afterHashInteger) / 2);

    if (
      resultHashInteger === beforeHashInteger
      || resultHashInteger === afterHashInteger
    ) {
      throw new Error('must be rearranged.');
    }

    return convertToHash(resultHashInteger);
  };

  const first = (pivot: string): string => {
    if (pivot.length !== hashSize) {
      throw new Error(`hash's length must be ${hashSize}. but got ${pivot.length}.`);
    }

    const prefixHash = pivot.slice(0, 2);
    const postfixHash = pivot.slice(2, hashSize);
    return getPreviousDoubleHash(prefixHash) + postfixHash;
  };

  const last = (pivot: string): string => {
    if (pivot.length !== hashSize) {
      throw new Error(`hash's length must be ${hashSize}. but got ${pivot.length}.`);
    }

    const prefixHash = pivot.slice(0, 2);
    const postfixHash = pivot.slice(2, hashSize);
    return getNextDoubleHash(prefixHash) + postfixHash;
  };

  const compare = (before: string, after: string): number => {
    const beforeInteger = convertToInteger(before);
    const afterInteger = convertToInteger(after);
    return beforeInteger - afterInteger;
  };

  /**
   * CAUTION : private function
   * DO NOT EXPORT!!!
   */
  const convertToInteger = (hash: string): number => {
    if (hash.length !== hashSize) {
      throw new Error(`hash's length must be ${hashSize}. but got ${hash.length}.`);
    }

    let multiplyCount = hashSize;
    let result = 0;

    for (let i = 0; i < hashSize; i += 1) {
      const singleHash = hash.charAt(i);
      let singleResult = convertToSingleInteger(singleHash);

      multiplyCount -= 1;
      let currentCount = multiplyCount;

      while (currentCount > 0) {
        singleResult *= KIND;
        currentCount -= 1;
      }

      result += singleResult;
    }

    return result;
  };

  /**
   * CAUTION : private function
   * DO NOT EXPORT!!!
   */
  const convertToHash = (integer: number): string => {
    let target = integer;
    let result = '';

    let multiplyCount = hashSize;

    while (multiplyCount > 0) {
      multiplyCount -= 1;
      let currentCount = multiplyCount;

      let op = 1;

      while (currentCount > 0) {
        op *= KIND;
        currentCount -= 1;
      }

      const divvy = Math.floor(target / op);
      target %= op;

      const hash = convertToSingleHash(divvy);

      result += hash;
    }

    if (result.length !== hashSize) throw new Error(`hash's length must be ${hashSize}. but got ${result.length}.`);

    return result;
  };

  /**
   * CAUTION : private function
   * DO NOT EXPORT!!!
   */
  const convertToSingleInteger = (hash: string): number => {
    const index = DICTIONARY.indexOf(hash);
    if (index === -1) throw new Error(`Invalid hash. ${hash} must be in ${DICTIONARY}.`);
    return index;
  };

  /**
   * CAUTION : private function
   * DO NOT EXPORT!!!
   */
  const convertToSingleHash = (integer: number): string => {
    try {
      return DICTIONARY.charAt(integer);
    } catch (e) {
      throw new Error(`Too big integer. ${integer} must be between 0 and ${KIND - 1}.`);
    }
  };

  /**
   * CAUTION : private function
   * DO NOT EXPORT!!!
   */
  const getPreviousDoubleHash = (hash: string): string => {
    if (hash.length !== 2) throw new Error(`hash's length must be 2. but got ${hash.length}.`);
    if (hash === '00') throw new Error('no more hash can be created.');

    const firstHash = hash.charAt(0);
    const secondHash = hash.charAt(1);
    const firstHashIndex = DICTIONARY.indexOf(firstHash);
    const secondHashIndex = DICTIONARY.indexOf(secondHash);

    if (secondHashIndex >= 31) {
      return firstHash + DICTIONARY.charAt(secondHashIndex - 31);
    }
    if (firstHashIndex < 1) throw new Error('no more hash can be created.');
    return `${DICTIONARY.charAt(firstHashIndex - 1)}z`;
  };

  /**
   * CAUTION : private function
   * DO NOT EXPORT!!!
   */
  const getNextDoubleHash = (hash: string): string => {
    if (hash.length !== 2) throw new Error(`hash's length must be 2. but got ${hash.length}.`);
    if (hash === 'zz') throw new Error('no more hash can be created.');

    const firstHash = hash.charAt(0);
    const secondHash = hash.charAt(1);
    const firstHashIndex = DICTIONARY.indexOf(firstHash);
    const secondHashIndex = DICTIONARY.indexOf(secondHash);

    if (secondHashIndex < KIND - 31) {
      return firstHash + DICTIONARY.charAt(secondHashIndex + 30);
    }
    if (firstHashIndex >= KIND - 1) throw new Error('no more hash can be created.');
    return `${DICTIONARY.charAt(firstHashIndex + 1)}0`;
  };

  return {
    init,
    build,
    first,
    last,
    compare,
  };
}

export const key8Factory = createKeyFactory(8);
export default createKeyFactory;
