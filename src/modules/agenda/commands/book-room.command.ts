export class BookRoomCommand {
  constructor(
    public readonly customer: string,
    public readonly roomId: string,
    public readonly date: Date,
  ) {}
}