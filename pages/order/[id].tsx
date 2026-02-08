import withLayoutFull from '../../libs/components/layout/LayoutFull';
import OrderDetail from '../../libs/components/order/OrderDetail';
import ScrollReveal from '../../libs/components/common/ScrollReveal';

function OrderDetailPage() {
	return (
		<ScrollReveal>
			<OrderDetail />
		</ScrollReveal>
	);
}

export default withLayoutFull(OrderDetailPage);
