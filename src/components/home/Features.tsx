import { Zap, Shield, Truck, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Tải xuống tức thì',
    description: 'Nhận sản phẩm digital ngay sau khi thanh toán'
  },
  {
    icon: Shield,
    title: 'Thanh toán an toàn',
    description: 'Bảo mật với PayPal, MoMo và nhiều hình thức khác'
  },
  {
    icon: Truck,
    title: 'Giao hàng nhanh',
    description: 'Miễn phí vận chuyển cho đơn hàng từ 500K'
  },
  {
    icon: CreditCard,
    title: 'Hoàn tiền 30 ngày',
    description: 'Đảm bảo hoàn tiền nếu không hài lòng'
  }
];

const Features = () => {
  return (
    <section className="border-y border-border bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
