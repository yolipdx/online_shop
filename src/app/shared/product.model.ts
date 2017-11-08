export class Product {
  scoreRange: number[] = [];
  _oldPrice: number;

  constructor(private _key: string,
              private _name: string,
              private _price: number,
              private _amount: number,
              private _weight: string,
              private _description: string,
              private _img: string,
              private _kind: string,
              private _score: number,
              private _uploadDate: Date,
              private _soldAmount: number,
              private _recomand: boolean
) {
    this.scoreRange.length = _score;
    const discount = [4/5, 1/2, 2/3, 3/5, 7/9];
    const index = Math.floor(discount.length * Math.random());
    console.log("discount index: " + index);
    this._oldPrice = Math.floor(this._price * discount[index]);

    if (this._oldPrice === 0) this._oldPrice = 1.5;
  }
//
//   好评度
//   上架日期
//   销售排行
//   卖家推荐

  get key(): string {
    return this._key;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get amount(): number {
    return this._amount;
  }

  get weight(): string {
    return this._weight;
  }

  get description(): string {
    return this._description;
  }

  get img(): string {
    return this._img;
  }

  get kind(): string {
    return this._kind;
  }

  get score(): number {
    return this._score;
  }

  get uploadDate(): Date {
    return this._uploadDate;
  }

  get recomand(): boolean {
    return this._recomand;
  }
  get soldAmount(): number {
    return this._soldAmount;
  }

  get oldPrice() {
    return this._oldPrice;
  }
}
