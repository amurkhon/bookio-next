import withLayoutFull from '../../libs/components/layout/LayoutFull';
import OrderHistory from '../../libs/components/order/OrderHistory';
import ScrollReveal from '../../libs/components/common/ScrollReveal';

function OrdersPage() {
	return (
		<ScrollReveal>
			<OrderHistory />
		</ScrollReveal>
	);
}

export default withLayoutFull(OrdersPage);
