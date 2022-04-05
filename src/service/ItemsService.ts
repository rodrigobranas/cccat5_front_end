import Item from "@/domain/entity/Item";
import HttpClient from "@/infra/HttpClient";

export default class ItemsService {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	async getItems(): Promise<Item[]> {
		const itemsData = await this.httpClient.get(`${this.baseUrl}/items`);
		return itemsData;
	}
}
