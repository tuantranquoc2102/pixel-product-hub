import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Search, Eye } from 'lucide-react';
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

const AdminReturns = () => {
  const [returns, setReturns] = useState<Return[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReturn, setSelectedReturn] = useState<Return | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [refundAmount, setRefundAmount] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchReturns = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('returns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Lỗi', description: error.message, variant: 'destructive' });
    } else {
      setReturns(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleViewReturn = (ret: Return) => {
    setSelectedReturn(ret);
    setAdminNotes(ret.admin_notes || '');
    setRefundAmount(ret.refund_amount ? Number(ret.refund_amount) : null);
    setIsDialogOpen(true);
  };

  const handleStatusChange = async (returnId: string, newStatus: ReturnStatus) => {
    const { error } = await supabase
      .from('returns')
      .update({ 
        status: newStatus,
        admin_notes: adminNotes,
        refund_amount: refundAmount,
      })
      .eq('id', returnId);

    if (error) {
      toast({ title: 'Lỗi', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Thành công', description: 'Đã cập nhật yêu cầu hoàn trả' });
      fetchReturns();
      setIsDialogOpen(false);
    }
  };

  const filteredReturns = returns.filter((ret) => {
    const matchesSearch = ret.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ret.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-2xl font-bold text-foreground">Quản lý hoàn trả</h1>
          <p className="text-muted-foreground">Xử lý các yêu cầu hoàn trả từ khách hàng</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo lý do..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Lọc trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredReturns.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Chưa có yêu cầu hoàn trả nào
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn hàng</TableHead>
                    <TableHead>Lý do</TableHead>
                    <TableHead>Hàng lỗi</TableHead>
                    <TableHead>Số tiền hoàn</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReturns.map((ret) => (
                    <TableRow key={ret.id}>
                      <TableCell className="font-mono text-sm">
                        {ret.order_id.slice(0, 8)}...
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{ret.reason}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            ret.is_defective
                              ? 'bg-red-500/10 text-red-500'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {ret.is_defective ? 'Có' : 'Không'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {ret.refund_amount ? formatCurrency(Number(ret.refund_amount)) : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${statusColors[ret.status]}`}>
                          {statusLabels[ret.status]}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(ret.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewReturn(ret)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Chi tiết yêu cầu hoàn trả</DialogTitle>
            </DialogHeader>
            {selectedReturn && (
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Lý do</Label>
                  <p className="mt-1">{selectedReturn.reason}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <Label className="text-muted-foreground">Hàng lỗi</Label>
                    <p className="mt-1">{selectedReturn.is_defective ? 'Có' : 'Không'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Trạng thái hiện tại</Label>
                    <p className="mt-1">{statusLabels[selectedReturn.status]}</p>
                  </div>
                </div>
                <div>
                  <Label>Ghi chú Admin</Label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Thêm ghi chú..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Số tiền hoàn trả</Label>
                  <Input
                    type="number"
                    value={refundAmount || ''}
                    onChange={(e) =>
                      setRefundAmount(e.target.value ? Number(e.target.value) : null)
                    }
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label>Cập nhật trạng thái</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <Button
                        key={value}
                        variant={selectedReturn.status === value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleStatusChange(selectedReturn.id, value as ReturnStatus)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminReturns;
