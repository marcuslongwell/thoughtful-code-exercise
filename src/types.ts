interface Package {
  width: number; // cm
  height: number; // cm
  length: number; // cm
  mass: number; // kg
}

type Stack = 'STANDARD' // standard packages (those that are not bulky or heavy) can be handled normally
  | 'SPECIAL' // packages that are either heavy or bulky can't be handled automatically
  | 'REJECTED'; // packages that are both heavy and bulky are rejected

export type { Package, Stack };
