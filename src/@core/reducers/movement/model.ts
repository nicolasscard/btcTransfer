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
