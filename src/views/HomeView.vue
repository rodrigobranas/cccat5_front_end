<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Order from '@/domain/entity/Order';
import Item from '@/domain/entity/Item';
import FormatterService from '@/service/FormatterService';

const { serviceFactory } = defineProps(["serviceFactory"]);

const items: Item[] = reactive([]);
const itemsIndex: { [idItem: number]: Item } = reactive({});
const coupon = ref("");
const order: Order = reactive(new Order());
const formatMoney = FormatterService.formatMoney;

const placeOrder = async function (order: Order) {
	const ordersService = serviceFactory.createOrdersService();
	const output = await ordersService.placeOrder(order);
	order.setCode(output.code);
};

const validateCoupon = async function (code: string) {
	const couponsService = serviceFactory.createCouponsService();
	const coupon = await couponsService.validateCoupon(code);
	if (!coupon.isExpired) {
		order.addCoupon(coupon);
	}
};

onMounted(async () => {
	const itemsService = serviceFactory.createItemsService();
	const itemsData = await itemsService.getItems();
	for (const itemData of itemsData) {
		items.push(itemData);
		itemsIndex[itemData.idItem] = itemData;
	}
});
</script>

<template>
	<div class="row">
		<div class="col-md-7 main">
			<div class="row">
				<div class="col-md-4" v-for="item in items">
					<div class="card card-default text-center">
						<span>{{ item.description }}</span>
						<span>{{ item.formattedPrice }}</span>
						<br/>
						<button class="btn btn-info" @click="order.addItem(item)">Buy</button>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-5 order">
			<h5>Order</h5>
			<hr/>
			<div v-for="orderItem in order.orderItems">
				<div class="row">
					<div class="col-md-2">
						{{ orderItem.quantity}} 
					</div>
					<div class="col-md-5">
						{{ itemsIndex[orderItem.idItem].description }}
					</div>
					<div class="col-md-3">
						{{ formatMoney(orderItem.getPrice()) }}
					</div>
					<div class="col-md-2">
						<span class="fa fa-minus" @click="order.deleteItem(orderItem)"></span>
					</div>
				</div>
			</div>
			<hr/>
			<h5>{{ formatMoney(order.getTotal()) }}</h5>
			<br/>
			<div class="form-group">
				<label>CPF</label>
				<input type="text" class="form-control" v-model="order.cpf"/>
			</div>
			<div class="form-group">
				<label>Coupon</label>
				<input type="text" class="form-control" v-model="coupon" @blur="validateCoupon(coupon)"/>
			</div>
			<br/>
			<button class="btn btn-info btn-lg" @click="placeOrder(order)">Place Order</button>
			{{ order }}
		</div>
	</div>
</template>

<style>
.main {
	padding: 20px;
}

.order {
	padding: 20px;
	background-color: #DDD;
	min-height: 100vh;
}

.card {
	padding: 20px;
}
</style>