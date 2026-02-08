import withLayoutFull from '../../libs/components/layout/LayoutFull';
import Checkout from '../../libs/components/order/Checkout';
import ScrollReveal from '../../libs/components/common/ScrollReveal';

function CheckoutPage() {
	return (
		<ScrollReveal>
			<Checkout />
		</ScrollReveal>
	);
}

export default withLayoutFull(CheckoutPage);
