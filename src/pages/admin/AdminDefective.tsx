import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Search, AlertTriangle } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type Return = Database['public']['Tables']['returns']['Row'];
type ReturnStatus = Database['public']['Enums']['return_status'];

const statusLabels: Record<ReturnStatus, string> = {
  requested: 'Yêu cầu',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
  received: 'Đã nhận hàng',
  refunded: 'Đã hoàn tiền',
};

const statusColors: Record<ReturnStatus, string> = {
  requested: 'bg-yellow-500/10 text-yellow-500',
  approved: 'bg-blue-500/10 text-blue-500',
  rejected: 'bg-red-500/10 text-red-500',
  received: 'bg-purple-500/10 text-purple-500',
  refunded: 'bg-green-500/10 text-green-500',
};

const AdminDefective = () => {
  const [defectiveReturns, setDefectiveReturns] = useState<Return[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const fetchDefectiveReturns = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('returns')
      .select('*')
      .eq('is_defective', true)
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Lỗi', description: error.message, variant: 'destructive' });
    } else {
      setDefectiveReturns(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDefectiveReturns();
  }, []);

  const filteredReturns = defectiveReturns.filter((ret) =>
    ret.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            Báo cáo hàng lỗi
          </h1>
          <p className="text-muted-foreground">
            Danh sách các sản phẩm được báo cáo là hàng lỗi
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo lý do..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredReturns.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Chưa có báo cáo hàng lỗi nào
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn hàng</TableHead>
                    <TableHead>Lý do / Mô tả lỗi</TableHead>
                    <TableHead>Số tiền hoàn</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ghi chú Admin</TableHead>
                    <TableHead>Ngày báo cáo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReturns.map((ret) => (
                    <TableRow key={ret.id}>
                      <TableCell className="font-mono text-sm">
                        {ret.order_id.slice(0, 8)}...
                      </TableCell>
                      <TableCell className="max-w-xs">{ret.reason}</TableCell>
                      <TableCell>
                        {ret.refund_amount ? formatCurrency(Number(ret.refund_amount)) : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${statusColors[ret.status]}`}>
                          {statusLabels[ret.status]}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {ret.admin_notes || 'N/A'}
                      </TableCell>
                      <TableCell>{formatDate(ret.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDefective;
