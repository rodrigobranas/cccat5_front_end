import Order from "@/domain/entity/Order";
import HttpClient from "@/infra/HttpClient";

export default class OrdersService {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	async placeOrder (order: Order) {
		const output = await this.httpClient.post(`${this.baseUrl}/orders`, order);
		return output;
	}
}
