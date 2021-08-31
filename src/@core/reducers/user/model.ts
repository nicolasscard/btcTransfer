

export type UserData = {
  mail: string;
  password: string;
  btcBalance: number;
  btcAddress: string;
  userId: number;
} 

export let users: UserData[] = [
  {
    mail: 'nicolas.scard@gmail.com',
    password: 'Secreta123',
    btcBalance: 5,
    btcAddress: 'asdAD234sdfAFDFsddf234sdf24SFa23ht',
    userId: 0
  },
  {
    mail: 'juan.gomez@gmail.com',
    password: 'Secreta123',
    btcBalance: 3,
    btcAddress: 'gdfgGDFOM563456DFGsdgokm456GSD34gh',
    userId: 1
  },
];


