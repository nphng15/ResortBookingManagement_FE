import { useState, useEffect, useCallback } from 'react';
import { CheckIcon, XMarkIcon, EyeIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { StatusBadge, SearchInput, Pagination, Modal, DataTable, ActionButton } from '../components';
import { fetchWithdrawRequests, updateWithdrawStatus } from '../../../services/adminService';
import type { WithdrawRequest, WithdrawFilters } from '../../../services/adminService';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const formatDateTime = (dateStr: string | null) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('vi-VN');
};

export default function WithdrawRequests() {
  const [data, setData] = useState<WithdrawRequest[]>([]);
  const [filteredData, setFilteredData] = useState<WithdrawRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<WithdrawFilters>({
    page: 1,
    pageSize: 10,
    search: '',
    status: 'ALL',
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState<WithdrawRequest | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'APPROVE' | 'REJECT'>('APPROVE');
  const [isProcessing, setIsProcessing] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchWithdrawRequests(filters);
      setData(response.data);
      setTotal(response.total);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đã xảy ra lỗi';
      setError(message);
      console.error('Failed to fetch withdraw requests:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Client-side search filter (since API doesn't support search by name)
  useEffect(() => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      setFilteredData(data.filter((w) => w.partner_name.toLowerCase().includes(searchLower)));
    } else {
      setFilteredData(data);
    }
  }, [data, filters.search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const handleStatusFilter = (status: string) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };

  const handleDateFilter = (field: 'startDate' | 'endDate', value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value || undefined, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleView = (request: WithdrawRequest) => {
    setSelectedRequest(request);
    setIsViewOpen(true);
  };

  const handleAction = (request: WithdrawRequest, action: 'APPROVE' | 'REJECT') => {
    setSelectedRequest(request);
    setConfirmAction(action);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedRequest) return;

    setIsProcessing(true);
    try {
      await updateWithdrawStatus(selectedRequest.id, confirmAction);
      setIsConfirmOpen(false);
      loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đã xảy ra lỗi';
      setError(message);
      console.error('Failed to update withdraw request:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      pageSize: 10,
      search: '',
      status: 'ALL',
    });
  };

  const totalPages = Math.ceil(total / filters.pageSize);
  const displayData = filters.search ? filteredData : data;

  const columns = [
    { key: 'id', header: 'ID', className: 'w-16' },
    {
      key: 'partner_name',
      header: 'Đối tác',
      render: (r: WithdrawRequest) => (
        <div>
          <span className="font-medium text-gray-900">{r.partner_name}</span>
          <span className="block text-xs text-gray-500">ID: {r.partner_id}</span>
        </div>
      ),
    },
    {
      key: 'transaction_amount',
      header: 'Số tiền',
      render: (r: WithdrawRequest) => <span className="font-semibold text-blue-600">{formatCurrency(r.transaction_amount)}</span>,
    },
    { key: 'status', header: 'Trạng thái', render: (r: WithdrawRequest) => <StatusBadge status={r.status} /> },
    { key: 'created_at', header: 'Ngày tạo', render: (r: WithdrawRequest) => formatDateTime(r.created_at) },
    { key: 'finished_at', header: 'Ngày xử lý', render: (r: WithdrawRequest) => formatDateTime(r.finished_at) },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (r: WithdrawRequest) => (
        <div className="flex items-center gap-2">
          <ActionButton onClick={() => handleView(r)}>
            <EyeIcon className="w-4 h-4" />
          </ActionButton>
          {r.status === 'PENDING' && (
            <>
              <ActionButton onClick={() => handleAction(r, 'APPROVE')} variant="success">
                <CheckIcon className="w-4 h-4" />
              </ActionButton>
              <ActionButton onClick={() => handleAction(r, 'REJECT')} variant="danger">
                <XMarkIcon className="w-4 h-4" />
              </ActionButton>
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
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FunnelIcon className="w-4 h-4" />
          Bộ lọc nâng cao
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Đóng
          </button>
        </div>
      )}

      {/* Basic filters */}
      <div className="flex items-center gap-4 mb-4">
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

      {/* Advanced filters */}
      {showAdvancedFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-end gap-4 flex-wrap">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
              <input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) => handleDateFilter('startDate', e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
              <input
                type="date"
                value={filters.endDate || ''}
                onChange={(e) => handleDateFilter('endDate', e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button onClick={clearFilters} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
              Xóa bộ lọc
            </button>
          </div>
        </div>
      )}

      <DataTable columns={columns} data={displayData} keyExtractor={(r) => r.id} isLoading={isLoading} emptyMessage="Không có yêu cầu rút tiền nào" />

      {totalPages > 1 && !filters.search && (
        <Pagination currentPage={filters.page} totalPages={totalPages} onPageChange={handlePageChange} totalItems={total} pageSize={filters.pageSize} />
      )}

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Chi tiết yêu cầu rút tiền" size="md">
        {selectedRequest && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">ID yêu cầu</p>
                <p className="font-medium">#{selectedRequest.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID đối tác</p>
                <p className="font-medium">#{selectedRequest.partner_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tên đối tác</p>
                <p className="font-medium">{selectedRequest.partner_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Số tiền</p>
                <p className="font-semibold text-blue-600">{formatCurrency(selectedRequest.transaction_amount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Trạng thái</p>
                <StatusBadge status={selectedRequest.status} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ngày tạo</p>
                <p className="font-medium">{formatDateTime(selectedRequest.created_at)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Ngày xử lý</p>
                <p className="font-medium">{formatDateTime(selectedRequest.finished_at)}</p>
              </div>
            </div>
            {selectedRequest.status === 'PENDING' && (
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <ActionButton
                  onClick={() => {
                    setIsViewOpen(false);
                    handleAction(selectedRequest, 'REJECT');
                  }}
                  variant="danger"
                  size="md"
                >
                  Từ chối
                </ActionButton>
                <ActionButton
                  onClick={() => {
                    setIsViewOpen(false);
                    handleAction(selectedRequest, 'APPROVE');
                  }}
                  variant="success"
                  size="md"
                >
                  Duyệt rút tiền
                </ActionButton>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Confirm Modal */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title={confirmAction === 'APPROVE' ? 'Xác nhận duyệt rút tiền' : 'Xác nhận từ chối'}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Bạn có chắc chắn muốn {confirmAction === 'APPROVE' ? 'duyệt' : 'từ chối'} yêu cầu rút tiền của{' '}
            <span className="font-medium text-gray-900">{selectedRequest?.partner_name}</span>?
          </p>
          {selectedRequest && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Số tiền yêu cầu</p>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(selectedRequest.transaction_amount)}</p>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <ActionButton onClick={() => setIsConfirmOpen(false)} variant="ghost" size="md" disabled={isProcessing}>
              Hủy
            </ActionButton>
            <ActionButton
              onClick={handleConfirm}
              variant={confirmAction === 'APPROVE' ? 'success' : 'danger'}
              size="md"
              disabled={isProcessing}
            >
              {isProcessing ? 'Đang xử lý...' : confirmAction === 'APPROVE' ? 'Duyệt' : 'Từ chối'}
            </ActionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
