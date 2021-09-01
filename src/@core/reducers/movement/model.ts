export enum Status {
  Pending = 'Pending',
  Success = 'Success',
  Failed = 'Failed',
}

export type Movement = {
  movementId: number;
  originUserId: number | null;
  destinationUserId: number | null;
  destinationAddress: string;
  btcAmount: number;
  date: Date;
  status: Status;
} 

// export const Movements: Movement[] = [
//   {
//     mail: 'nicolas.scard@gmail.com',
//     password: 'Secreta123',
//     btcBalance: 5,
//     btcAddress: 'asdAD234sdfAFDFsddf234sdf24SFa23ht',
//     userId: 0
//   },
//   {
//     mail: 'juan.gomez@gmail.com',
//     password: 'Secreta123',
//     btcBalance: 3,
//     btcAddress: 'gdfgGDFOM563456DFGsdgokm456GSD34gh',
//     userId: 1
//   },
// ];


// bad: sdfsdfsdfsdfsfgdfgdfhfhfghfhhfghfg