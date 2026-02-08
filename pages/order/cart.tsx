import withLayoutFull from '../../libs/components/layout/LayoutFull';
import ShoppingCart from '../../libs/components/order/ShoppingCart';
import ScrollReveal from '../../libs/components/common/ScrollReveal';

function CartPage() {
	return (
		<ScrollReveal>
			<ShoppingCart />
		</ScrollReveal>
	);
}

export default withLayoutFull(CartPage);
