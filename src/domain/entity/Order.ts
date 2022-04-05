import Coupon from "./Coupon";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
	orderItems: OrderItem[];
	total: number;
	cpf: string;
	code?: string;
	coupon?: Coupon;

	constructor () {
		this.orderItems = [];
		this.total = 0;
		this.cpf = "826.545.432-50";
	}

	addItem (item: Item) {
		const orderItem = this.orderItems.find((orderItem: any) => orderItem.idItem === item.idItem);
		if (orderItem) {
			orderItem.quantity++;
		} else {
			this.orderItems.push(new OrderItem(item.idItem, 1, item.price));
		}
		this.total += item.price;
	}

	deleteItem (orderItem: OrderItem) {
		orderItem.quantity--;
		this.total -= orderItem.itemPrice;
		if (orderItem.quantity === 0) {
			this.orderItems.splice(this.orderItems.indexOf(orderItem), 1);
		}
	}

	setCode (code: string) {
		this.code = code;
	}

	addCoupon (coupon: Coupon) {
		if (!coupon.isExpired) {
			this.coupon = coupon;
		}
	}

	getTotal () {
		let total = this.total;
		if (this.coupon) {
			total -= (this.total * this.coupon.percentage)/100;
		}
		return total;
	}
}
