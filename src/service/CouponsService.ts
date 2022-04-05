import type Coupon from "@/domain/entity/Coupon";
import HttpClient from "@/infra/HttpClient";

export default class CouponsService {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	async validateCoupon (code: string): Promise<Coupon> {
		const output = await this.httpClient.post(`${this.baseUrl}/validateCoupon`, { code });
		return output;
	}
}
