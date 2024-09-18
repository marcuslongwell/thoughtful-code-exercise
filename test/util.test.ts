import exp from 'constants';
import { Package } from '../src/types';
import { getVolume, isBulky, isHeavy, sort } from '../src/util';



const zeroWidthPack: Package = {
  width: 0,
  height: 5,
  length: 5,
  mass: 5
};

const zeroHeightPack: Package = {
  width: 5,
  height: 0,
  length: 5,
  mass: 5
};

const zeroLengthPack: Package = {
  width: 5,
  height: 5,
  length: 0,
  mass: 5
};

const negativeLengthPack: Package = {
  width: 5,
  height: 5,
  length: -5,
  mass: 5
};

const zeroMassPack: Package = {
  width: 5,
  height: 5,
  length: 5,
  mass: 0
};

const negativeMassPack: Package = {
  width: 5,
  height: 5,
  length: 5,
  mass: -5
};

const invalidPacks = [
  zeroWidthPack,
  zeroHeightPack,
  zeroLengthPack,
  negativeLengthPack,
  zeroMassPack,
  negativeMassPack
];




const standardPack: Package = {
  width: 5,
  height: 5,
  length: 5,
  mass: 5
};

const nearlyHeavyPack: Package = {
  width: 5,
  height: 5,
  length: 5,
  mass: 19
};

const barelyHeavyPack: Package = {
  width: 5,
  height: 5,
  length: 5,
  mass: 20
};

const veryHeavyPack: Package = {
  width: 5,
  height: 5,
  length: 5,
  mass: 50
};

const nearlyBulkyPack: Package = {
  width: 101,
  height: 100,
  length: 99,
  mass: 5
};

const barelyBulkyPack: Package = {
  width: 100,
  height: 100,
  length: 100,
  mass: 5
};

const veryBulkyPack: Package = {
  width: 200,
  height: 200,
  length: 150,
  mass: 5
};

const barelyHeavyAndBulkyPack: Package = {
  width: 100,
  height: 100,
  length: 100,
  mass: 20
};

const veryHeavyAndBulkyPack: Package = {
  width: 200,
  height: 200,
  length: 150,
  mass: 50
};



describe('util', () => {
  it('is sane', () => {
    expect(1).toBe(1);
  });

  it('throws errors for invalid packages when checking volume', () => {
    const volumeInvalidError = 'Cannot get volume of invalid package';
    invalidPacks.forEach(pack => expect(() => getVolume(pack)).toThrow(volumeInvalidError));
  });

  it('throws errors for invalid packages when checking heaviness', () => {
    const heavinessInvalidError = 'Cannot get heaviness of invalid package';
    invalidPacks.forEach(pack => expect(() => isHeavy(pack)).toThrow(heavinessInvalidError));
  });

  it('throws errors for invalid packages when checking bulkiness', () => {
    const bulkinessInvalidError = 'Cannot get bulkiness of invalid package';
    invalidPacks.forEach(pack => expect(() => isBulky(pack)).toThrow(bulkinessInvalidError));
  });

  it('throws errors for invalid packages when sorting', () => {
    const sortInvalidError = 'Package cannot be sorted due to invalid dimensions';
    invalidPacks.forEach(pack => expect(() => sort(pack)).toThrow(sortInvalidError));
  });

  it('calculates volume correctly', () => {
    expect(getVolume(standardPack)).toBe(125);
    expect(getVolume(nearlyHeavyPack)).toBe(125);
    expect(getVolume(barelyHeavyPack)).toBe(125);
    expect(getVolume(veryHeavyPack)).toBe(125);
    expect(getVolume(nearlyBulkyPack)).toBe(999900);
    expect(getVolume(barelyBulkyPack)).toBe(1000000);
    expect(getVolume(veryBulkyPack)).toBe(6000000);
    expect(getVolume(barelyHeavyAndBulkyPack)).toBe(1000000);
    expect(getVolume(veryHeavyAndBulkyPack)).toBe(6000000);
    
  });

  it('calculates heaviness correctly', () => {
    expect(isHeavy(standardPack)).toBe(false);
    expect(isHeavy(nearlyHeavyPack)).toBe(false);
    expect(isHeavy(barelyHeavyPack)).toBe(true);
    expect(isHeavy(veryHeavyPack)).toBe(true);
    expect(isHeavy(nearlyBulkyPack)).toBe(false);
    expect(isHeavy(barelyBulkyPack)).toBe(false);
    expect(isHeavy(veryBulkyPack)).toBe(false);
    expect(isHeavy(barelyHeavyAndBulkyPack)).toBe(true);
    expect(isHeavy(veryHeavyAndBulkyPack)).toBe(true);
  });

  it('calculates bulkiness correctly', () => {
    expect(isBulky(standardPack)).toBe(false);
    expect(isBulky(nearlyHeavyPack)).toBe(false);
    expect(isBulky(barelyHeavyPack)).toBe(false);
    expect(isBulky(veryHeavyPack)).toBe(false);
    expect(isBulky(nearlyBulkyPack)).toBe(false);
    expect(isBulky(barelyBulkyPack)).toBe(true);
    expect(isBulky(veryBulkyPack)).toBe(true);
    expect(isBulky(barelyHeavyAndBulkyPack)).toBe(true);
    expect(isBulky(veryHeavyAndBulkyPack)).toBe(true);
  });

  it('sorts correctly', () => {
    expect(sort(standardPack)).toBe('STANDARD'); // neither heavy nor bulky
    expect(sort(nearlyHeavyPack)).toBe('STANDARD'); // neither heavy nor bulky
    expect(sort(barelyHeavyPack)).toBe('SPECIAL'); // heavy, but not bulky
    expect(sort(veryHeavyPack)).toBe('SPECIAL'); // heavy but not bulky
    expect(sort(nearlyBulkyPack)).toBe('STANDARD'); // neither heavy nor bulky
    expect(sort(barelyBulkyPack)).toBe('SPECIAL'); // bukly, but not heavy
    expect(sort(veryBulkyPack)).toBe('SPECIAL'); // bukly, but not heavy
    expect(sort(barelyHeavyAndBulkyPack)).toBe('REJECTED'); // bulky and heavy
    expect(sort(veryHeavyAndBulkyPack)).toBe('REJECTED'); // bukly and heavy
  });
});
