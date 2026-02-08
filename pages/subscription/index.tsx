import withLayoutFull from "../../libs/components/layout/LayoutFull";
import CheckoutForm from "../../libs/components/subscription/CheckoutForm";
import ScrollReveal from "../../libs/components/common/ScrollReveal";

function PaymentPage() {
  return (
    <ScrollReveal>
      <CheckoutForm />
    </ScrollReveal>
  );
}

export default withLayoutFull(PaymentPage);
