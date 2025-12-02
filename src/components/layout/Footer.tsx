import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">D</span>
              </div>
              <span className="text-xl font-bold text-foreground">DigiMart</span>
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              Nền tảng mua sắm hiện đại cho sản phẩm vật lý và digital. Chất lượng cao, giao hàng nhanh.
            </p>
            <div className="flex gap-3">
              <a href="#" className="rounded-lg bg-accent p-2 text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg bg-accent p-2 text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg bg-accent p-2 text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/products?type=digital" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Sản phẩm Digital
                </Link>
              </li>
              <li>
                <Link to="/products?type=physical" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Sản phẩm Vật lý
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Giỏ hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Điều khoản dịch vụ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                support@digimart.vn
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                1900 xxxx xx
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                123 Nguyễn Văn Linh, Q.7, TP.HCM
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 DigiMart. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
