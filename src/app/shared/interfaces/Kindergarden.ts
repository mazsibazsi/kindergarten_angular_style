export interface Kindergarden {
    id: number;
    name: string;
    address: string;
    betreiber: string;
    description: string;
    typ: Typ,
    image: string;
  }

  export enum Typ {
      privat = 1,
      oeffentlich = 2,
  }