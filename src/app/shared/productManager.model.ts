import {Product} from './product.model';
import {ProductComponent} from "../content-window/mainwindow/product/product.component";

export class ProductManagerModel {
  private readonly PAGE_SIZE: number = 12;
  private MAX_ITEM_COUNT: number = 0;

  private static readonly _instance: ProductManagerModel = new ProductManagerModel();
  private static productManger = new ProductManagerModel();



  private pageIndex: number = 0;
  private _showFrom: number = 0;
  private _showTo: number = 16;
  // private products: Product = [];
  private _products = [];
  private _popularProducts: Product[] = [];


  constructor() {
    this.initProducts();
  }

  private initProducts() {

      const name1 = ['正宗辣条', '牛肉', '鸡翅', '鸭脖'];
      /* create sample data */
      const sampleUrl = [
        'https://www.mrlatiao.com/media/catalog/category/file.jpg',
        'https://www.mrlatiao.com/media/catalog/category/file.jpg',
        'https://www.mrlatiao.com/media/catalog/category/file.jpg',
        'https://www.mrlatiao.com/media/catalog/category/file.jpg',
        'https://www.mrlatiao.com/media/catalog/category/file.jpg',
        'https://www.mrlatiao.com/media/catalog/category/file.jpg',
        'https://www.mrlatiao.com/media/catalog/category/file.jpg',
        'https://www.mrlatiao.com/media/catalog/category/file.jpg',
        'https://www.mrlatiao.com/media/catalog/category/file.jpg',
        'https://www.mrlatiao.com/media/catalog/category/file.jpg'
      ];


    //   好评度
//   上架日期
//   销售排行
//   卖家推荐



      for (let i = 0; i < this.PAGE_SIZE; ++i) {
        const id = i;
        const name = name1[Math.floor(name1.length * Math.random())];
        const price =  Math.floor(100 * Math.random());
        const amount = Math.floor(10000 * Math.random());
        const desc = '超辣，你值得拥有';
        const imgIndex = Math.floor(Math.random() * (sampleUrl.length));
        const img = sampleUrl[imgIndex];
        const kind = '零食';
        const weight = '100g';
        this._products.push(new Product(i.toString(),
                                         name,
                                         price,
                                         amount,
                                         weight,
                                         desc,
                                         img,
                                         kind,
                                         Math.ceil(5 * Math.random()),
                                         new Date(),
                                         Math.floor(100 * Math.random()),
                                         Math.floor(2 * Math.random()) === 1));
      }


      for (let i = 0; i < 10; ++i) {
        this._popularProducts.push(this.products[i]);
      }

      this.MAX_ITEM_COUNT = 100;
  }

  public static getInstance() {
    return ProductManagerModel._instance;
  }


  get showFrom(): number {
    return this._showFrom;
  }

  get showTo(): number {
    return this._showTo;
  }

  get products(): Array<Product> {
    return this._products;
  }



  nextPage() {
    if (this._showFrom + this.PAGE_SIZE < this.MAX_ITEM_COUNT) {
      this._showFrom += this.PAGE_SIZE;
      this._showTo = Math.min(this._showTo + this.PAGE_SIZE, this.MAX_ITEM_COUNT);
    }
  }

  prevPage() {
    if (this._showFrom - this.PAGE_SIZE >= 0) {
      this._showFrom -= this.PAGE_SIZE;
      this._showTo = Math.min(this._showFrom + this.PAGE_SIZE, this.MAX_ITEM_COUNT);
    }
  }

  popularPorduct() {
    return this._popularProducts;
  }

}
