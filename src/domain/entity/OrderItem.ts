export default class OrderItem {

	constructor (readonly idItem: number, public quantity: number, public itemPrice: number) {
	}

	getPrice () {
		return this.itemPrice * this.quantity;
	}
}
