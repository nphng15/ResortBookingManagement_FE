import { useState, useEffect, useCallback } from 'react';
import { CheckIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';
import { StatusBadge, SearchInput, Pagination, Modal, DataTable, ActionButton } from '../components';
import { fetchWithdrawRequests, updateWithdrawStatus } from './api';
import type { WithdrawRequest, WithdrawFilters } from './types';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const formatDateTime = (dateStr: string | null) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('vi-VN');
};

export default function WithdrawRequests() {
  const [data, setData] = useState<WithdrawRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<WithdrawFilters>({ page: 1, pageSize: 10, search: '', status: 'ALL' });
  
  const [selectedRequest, setSelectedRequest] = useState<WithdrawRequest | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'approve' | 'reject'>('approve');
  const [isProcessing, setIsProcessing] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchWithdrawRequests(filters);
      setData(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch withdraw requests:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleStatusFilter = (status: string) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleView = (request: WithdrawRequest) => {
    setSelectedRequest(request);
    setIsViewOpen(true);
  };

  const handleAction = (request: WithdrawRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setConfirmAction(action);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedRequest) return;
    
    setIsProcessing(true);
    try {
      await updateWithdrawStatus(selectedRequest.id, confirmAction === 'approve' ? 'APPROVED' : 'REJECTED');
      setIsConfirmOpen(false);
      loadData();
    } catch (error) {
      console.error('Failed to update withdraw status:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const totalPages = Math.ceil(total / filters.pageSize);

  const columns = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'partner_name', header: 'Đối tác', render: (r: WithdrawRequest) => <span className="font-medium text-gray-900">{r.partner_name}</span> },
    { key: 'transaction_amount', header: 'Số tiền', render: (r: WithdrawRequest) => <span className="font-semibold text-blue-600">{formatCurrency(r.transaction_amount)}</span> },
    { key: 'status', header: 'Trạng thái', render: (r: WithdrawRequest) => <StatusBadge status={r.status} /> },
    { key: 'created_at', header: 'Ngày tạo', render: (r: WithdrawRequest) => formatDateTime(r.created_at) },
    { key: 'finished_at', header: 'Ngày xử lý', render: (r: WithdrawRequest) => formatDateTime(r.finished_at) },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (r: WithdrawRequest) => (
        <div className="flex items-center gap-2">
          <ActionButton onClick={() => handleView(r)}><EyeIcon className="w-4 h-4" /></ActionButton>
          {r.status === 'PENDING' && (
            <>
              <ActionButton onClick={() => handleAction(r, 'approve')} variant="success"><CheckIcon className="w-4 h-4" /></ActionButton>
              <ActionButton onClick={() => handleAction(r, 'reject')} variant="danger"><XMarkIcon className="w-4 h-4" /></ActionButton>
            </>
          )}
        </div>
      ),
    },
  ];


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Yêu cầu rút tiền</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="max-w-md flex-1">
          <SearchInput value={filters.search} onChange={handleSearch} placeholder="Tìm theo tên đối tác..." />
        </div>
        <select
          value={filters.status}
          onChange={(e) => handleStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="PENDING">Chờ duyệt</option>
          <option value="APPROVED">Đã duyệt</option>
          <option value="REJECTED">Từ chối</option>
        </select>
      </div>

      <DataTable columns={columns} data={data} keyExtractor={(r) => r.id} isLoading={isLoading} emptyMessage="Không có yêu cầu rút tiền nào" />
      
      {totalPages > 1 && (
        <Pagination currentPage={filters.page} totalPages={totalPages} onPageChange={handlePageChange} totalItems={total} pageSize={filters.pageSize} />
      )}

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Chi tiết yêu cầu rút tiền" size="md">
        {selectedRequest && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-500">ID yêu cầu</p><p className="font-medium">#{selectedRequest.id}</p></div>
              <div><p className="text-sm text-gray-500">ID đối tác</p><p className="font-medium">#{selectedRequest.partner_id}</p></div>
              <div><p className="text-sm text-gray-500">Tên đối tác</p><p className="font-medium">{selectedRequest.partner_name}</p></div>
              <div><p className="text-sm text-gray-500">Số tiền</p><p className="font-semibold text-blue-600">{formatCurrency(selectedRequest.transaction_amount)}</p></div>
              <div><p className="text-sm text-gray-500">Trạng thái</p><StatusBadge status={selectedRequest.status} /></div>
              <div><p className="text-sm text-gray-500">Ngày tạo</p><p className="font-medium">{formatDateTime(selectedRequest.created_at)}</p></div>
              <div className="col-span-2"><p className="text-sm text-gray-500">Ngày xử lý</p><p className="font-medium">{formatDateTime(selectedRequest.finished_at)}</p></div>
            </div>
            {selectedRequest.status === 'PENDING' && (
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <ActionButton onClick={() => { setIsViewOpen(false); handleAction(selectedRequest, 'reject'); }} variant="danger" size="md">Từ chối</ActionButton>
                <ActionButton onClick={() => { setIsViewOpen(false); handleAction(selectedRequest, 'approve'); }} variant="success" size="md">Duyệt rút tiền</ActionButton>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Confirm Modal */}
      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} title={confirmAction === 'approve' ? 'Xác nhận duyệt rút tiền' : 'Xác nhận từ chối'} size="sm">
        <div className="space-y-4">
          <p className="text-gray-600">
            Bạn có chắc chắn muốn {confirmAction === 'approve' ? 'duyệt' : 'từ chối'} yêu cầu rút tiền của <span className="font-medium text-gray-900">{selectedRequest?.partner_name}</span>?
          </p>
          {selectedRequest && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Số tiền yêu cầu</p>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(selectedRequest.transaction_amount)}</p>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <ActionButton onClick={() => setIsConfirmOpen(false)} variant="ghost" size="md" disabled={isProcessing}>Hủy</ActionButton>
            <ActionButton onClick={handleConfirm} variant={confirmAction === 'approve' ? 'success' : 'danger'} size="md" disabled={isProcessing}>
              {isProcessing ? 'Đang xử lý...' : confirmAction === 'approve' ? 'Duyệt' : 'Từ chối'}
            </ActionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
