import Coupon from "@/domain/entity/Coupon";
import Item from "@/domain/entity/Item";
import Order from "@/domain/entity/Order";

test("Deve criar um pedido e calcular o total", function () {
	const order = new Order();
	order.addItem(new Item(1, "Guitarra", 1000, "R$ 1.000,00"));
	order.addItem(new Item(2, "Amplificador", 5000, "R$ 5.000,00"));
	order.addItem(new Item(3, "Cabo", 30, "R$ 30,00"));
	order.addItem(new Item(3, "Cabo", 30, "R$ 30,00"));
	order.addItem(new Item(3, "Cabo", 30, "R$ 30,00"));
	const total = order.getTotal();
	expect(total).toBe(6090);
});

test("Deve criar um pedido com vários itens duplicados e eles devem ser agrupados", function () {
	const order = new Order();
	order.addItem(new Item(1, "Guitarra", 1000, "R$ 1.000,00"));
	order.addItem(new Item(2, "Amplificador", 5000, "R$ 5.000,00"));
	order.addItem(new Item(3, "Cabo", 30, "R$ 30,00"));
	order.addItem(new Item(3, "Cabo", 30, "R$ 30,00"));
	order.addItem(new Item(3, "Cabo", 30, "R$ 30,00"));
	expect(order.orderItems).toHaveLength(3);
	expect(order.orderItems[2].quantity).toBe(3);
	expect(order.orderItems[2].getPrice()).toBe(90);
});

test("Deve criar um pedido, adicionar itens e apagá-los", function () {
	const order = new Order();
	order.addItem(new Item(1, "Guitarra", 1000, "R$ 1.000,00"));
	order.addItem(new Item(2, "Amplificador", 5000, "R$ 5.000,00"));
	order.addItem(new Item(3, "Cabo", 30, "R$ 30,00"));
	order.addItem(new Item(3, "Cabo", 30, "R$ 30,00"));
	order.addItem(new Item(3, "Cabo", 30, "R$ 30,00"));
	order.deleteItem(order.orderItems[2]);
	const total = order.getTotal();
	expect(total).toBe(6060);
	expect(order.orderItems[2].quantity).toBe(2);
	expect(order.orderItems[2].getPrice()).toBe(60);
});

test("Deve criar um pedido com cupom de desconto e calcular o total", function () {
	const order = new Order();
	order.addItem(new Item(1, "Guitarra", 1000, "R$ 1.000,00"));
	order.addItem(new Item(2, "Amplificador", 5000, "R$ 5.000,00"));
	order.addItem(new Item(3, "Cabo", 30, "R$ 30,00"));
	order.addItem(new Item(3, "Cabo", 30, "R$ 30,00"));
	order.addItem(new Item(3, "Cabo", 30, "R$ 30,00"));
	const coupon = new Coupon("VALE20", 20, false);
	order.addCoupon(coupon);
	const total = order.getTotal();
	expect(total).toBe(4872);
});
