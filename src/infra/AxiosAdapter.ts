import type HttpClient from "./HttpClient";
import axios from "axios";

export default class AxiosAdapter implements HttpClient {
	router: any;

	constructor() {
	}

	async get(url: string): Promise<any> {
		const response = await axios({
			url,
			method: "get"
		});
		return response.data;
	}

	async post(url: string, data: any): Promise<any> {
		const response = await axios({
			url,
			method: "post",
			data
		});
		return response.data;
	}

	put(url: string, data: any): Promise<any> {
		throw new Error("Method not implemented.");
	}

	delete(url: string): Promise<any> {
		throw new Error("Method not implemented.");
	}
}
