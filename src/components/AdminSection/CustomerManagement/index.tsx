import { useState, useEffect } from 'react';
import { EyeIcon, NoSymbolIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { StatusBadge, SearchInput, Pagination, Modal, DataTable, ActionButton } from '../components';
import { fetchAccounts, fetchAccountDetail, banAccount, unbanAccount } from '../../../services/adminService';
import type { AccountListItem, AccountDetail } from '../../../services/adminService';

export default function CustomerManagement() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [customers, setCustomers] = useState<AccountListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedCustomer, setSelectedCustomer] = useState<AccountDetail | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [banTarget, setBanTarget] = useState<AccountListItem | null>(null);
  const [banReason, setBanReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const pageSize = 10;

  const loadCustomers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAccounts({
        account_type: 'CUSTOMER',
        status: statusFilter as 'ACTIVE' | 'BANNED' | undefined,
        search: search || undefined,
        page,
        page_size: pageSize,
      });
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải danh sách');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [page, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      loadCustomers();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleView = async (customer: AccountListItem) => {
    try {
      const detail = await fetchAccountDetail(customer.account_id);
      setSelectedCustomer(detail);
      setIsViewOpen(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Không thể tải thông tin');
    }
  };

  const openBanModal = (customer: AccountListItem) => {
    setBanTarget(customer);
    setBanReason('');
    setIsBanModalOpen(true);
  };

  const handleBan = async () => {
    if (!banTarget) return;
    setActionLoading(true);
    try {
      await banAccount({ account_id: banTarget.account_id, reason: banReason || undefined });
      setIsBanModalOpen(false);
      loadCustomers();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Thao tác thất bại');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnban = async (customer: AccountListItem) => {
    if (!confirm(`Bạn có chắc muốn bỏ cấm tài khoản "${customer.name}"?`)) return;
    setActionLoading(true);
    try {
      await unbanAccount({ account_id: customer.account_id });
      loadCustomers();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Thao tác thất bại');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    { key: 'account_id', header: 'ID', className: 'w-16' },
    { key: 'name', header: 'Họ tên', render: (c: AccountListItem) => <span className="font-medium text-gray-900">{c.name || '-'}</span> },
    { key: 'username', header: 'Username' },
    { key: 'phone_number', header: 'Số điện thoại', render: (c: AccountListItem) => c.phone_number || '-' },
    { key: 'status', header: 'Trạng thái', render: (c: AccountListItem) => <StatusBadge status={c.status} /> },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (c: AccountListItem) => (
        <div className="flex items-center gap-2">
          <ActionButton onClick={() => handleView(c)}>
            <EyeIcon className="w-4 h-4" />
          </ActionButton>
          {c.status === 'BANNED' ? (
            <ActionButton onClick={() => handleUnban(c)} variant="success" disabled={actionLoading}>
              <CheckCircleIcon className="w-4 h-4" />
            </ActionButton>
          ) : (
            <ActionButton onClick={() => openBanModal(c)} variant="danger" disabled={actionLoading}>
              <NoSymbolIcon className="w-4 h-4" />
            </ActionButton>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý tài khoản khách hàng</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="max-w-md flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên hoặc username..." />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="ACTIVE">Hoạt động</option>
          <option value="BANNED">Bị cấm</option>
        </select>
      </div>

      {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-8 text-gray-500">Đang tải...</div>
      ) : (
        <>
          <DataTable columns={columns} data={customers} keyExtractor={(c) => c.account_id} />
          {customers.length > pageSize && (
            <Pagination currentPage={page} totalPages={Math.ceil(customers.length / pageSize)} onPageChange={setPage} totalItems={customers.length} pageSize={pageSize} />
          )}
        </>
      )}

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Thông tin khách hàng">
        {selectedCustomer && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-500">Username</p><p className="font-medium">{selectedCustomer.username}</p></div>
              <div><p className="text-sm text-gray-500">Trạng thái</p><StatusBadge status={selectedCustomer.status} /></div>
              {selectedCustomer.customer && (
                <>
                  <div><p className="text-sm text-gray-500">Họ tên</p><p className="font-medium">{selectedCustomer.customer.fullname || '-'}</p></div>
                  <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selectedCustomer.customer.email || '-'}</p></div>
                  <div><p className="text-sm text-gray-500">Số điện thoại</p><p className="font-medium">{selectedCustomer.customer.phone_number || '-'}</p></div>
                  <div><p className="text-sm text-gray-500">CCCD/CMND</p><p className="font-medium">{selectedCustomer.customer.id_number || '-'}</p></div>
                </>
              )}
              <div><p className="text-sm text-gray-500">Ngày tạo</p><p className="font-medium">{new Date(selectedCustomer.created_at).toLocaleDateString('vi-VN')}</p></div>
            </div>
          </div>
        )}
      </Modal>

      {/* Ban Modal */}
      <Modal isOpen={isBanModalOpen} onClose={() => setIsBanModalOpen(false)} title="Cấm tài khoản">
        <div className="space-y-4">
          <p className="text-gray-600">Bạn có chắc muốn cấm tài khoản <strong>{banTarget?.name || banTarget?.username}</strong>?</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lý do (tùy chọn)</label>
            <textarea
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Nhập lý do cấm tài khoản..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <ActionButton onClick={() => setIsBanModalOpen(false)} variant="ghost" size="md">Hủy</ActionButton>
            <ActionButton onClick={handleBan} variant="danger" size="md" disabled={actionLoading}>
              {actionLoading ? 'Đang xử lý...' : 'Cấm tài khoản'}
            </ActionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
