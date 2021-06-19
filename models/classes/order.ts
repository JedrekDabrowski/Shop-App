import moment from 'moment';
import Product from './product';

class Order {
  constructor(
    public id: string,
    public items: [Product],
    public totalAmount: number,
    public date: Date
  ) {}

  get readableDate() {
    //   return this.date.toLocaleDateString('en-EN', {
    //     yeat: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    //     hour: '2-digit',
    //     minute: '2-digit',
    //   });
    //
    //on Android toLocaleDateString dont work properly
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default Order;
