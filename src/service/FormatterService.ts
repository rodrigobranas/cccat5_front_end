export default class FormatterService {
	static formatMoney (amount: number): string {
		return new Intl.NumberFormat("pt-BR", { currency: "BRL", style: "currency"}).format(amount);
	}
}
