import { Package, Stack } from './types'

const isInvalid = (pack: Package) => {
  return pack.width < 1 || pack.height < 1 || pack.length < 1 || pack.mass < 1;
};

const getVolume = (pack: Package) => {
  if (isInvalid(pack)) throw 'Cannot get volume of invalid package';
  return pack.width * pack.height * pack.length;
};

const isHeavy = (pack: Package) => {
  if (isInvalid(pack)) throw 'Cannot get heaviness of invalid package';
  return pack.mass >= 20;
};

const isBulky = (pack: Package) => {
  if (isInvalid(pack)) throw 'Cannot get bulkiness of invalid package';
  const vol = getVolume(pack);
  return vol >= 1000000 || pack.width >= 150 || pack.height >= 150 || pack.length >= 150;
};

const sort = (pack: Package): Stack => {
  if (isInvalid(pack)) throw 'Package cannot be sorted due to invalid dimensions';

  // - **STANDARD**: standard packages (those that are not bulky or heavy) can be handled normally.
  //   **SPECIAL**: packages that are either heavy or bulky can't be handled automatically.
  //   **REJECTED**: packages that are **both** heavy and bulky are rejected.

  if (!isBulky(pack) && !isHeavy(pack)) return 'STANDARD';
  if (isBulky(pack) && isHeavy(pack)) return 'REJECTED';
  return 'SPECIAL'; // if we get here, it's gotta be either bulky or heavy, but not both
};

export { getVolume, isHeavy, isBulky, sort };
