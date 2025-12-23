import { useState, useEffect } from 'react';
import { CheckIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';
import { StatusBadge, SearchInput, Pagination, Modal, DataTable, ActionButton } from '../components';
import { getPendingPartners, approvePartner, type PendingPartner } from '../../../services/authService';

export default function PartnerApproval() {
  const [partners, setPartners] = useState<PendingPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedPartner, setSelectedPartner] = useState<PendingPartner | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'approve' | 'reject'>('approve');
  const [submitting, setSubmitting] = useState(false);

  const pageSize = 10;

  useEffect(() => {
    loadPendingPartners();
  }, []);

  const loadPendingPartners = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPendingPartners();
      setPartners(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const filtered = partners.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.address.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleView = (partner: PendingPartner) => {
    setSelectedPartner(partner);
    setIsViewOpen(true);
  };

  const handleAction = (partner: PendingPartner, action: 'approve' | 'reject') => {
    setSelectedPartner(partner);
    setConfirmAction(action);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedPartner) return;

    try {
      setSubmitting(true);
      await approvePartner({
        account_id: selectedPartner.account_id,
        approved: confirmAction === 'approve',
      });
      setIsConfirmOpen(false);
      setIsViewOpen(false);
      await loadPendingPartners();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Thao tác thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'id', header: 'ID', className: 'w-16' },
    {
      key: 'name',
      header: 'Tên đối tác',
      render: (p: PendingPartner) => <span className="font-medium text-gray-900">{p.name}</span>,
    },
    { key: 'phone_number', header: 'Số điện thoại' },
    { key: 'address', header: 'Địa chỉ' },
    { key: 'bank', header: 'Ngân hàng' },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (p: PendingPartner) => <StatusBadge status={p.account_status} />,
    },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (p: PendingPartner) => (
        <div className="flex items-center gap-2">
          <ActionButton onClick={() => handleView(p)}>
            <EyeIcon className="w-4 h-4" />
          </ActionButton>
          <ActionButton onClick={() => handleAction(p, 'approve')} variant="success">
            <CheckIcon className="w-4 h-4" />
          </ActionButton>
          <ActionButton onClick={() => handleAction(p, 'reject')} variant="danger">
            <XMarkIcon className="w-4 h-4" />
          </ActionButton>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Phê duyệt đối tác</h1>
        <span className="text-sm text-gray-500">{partners.length} yêu cầu chờ duyệt</span>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
          <button onClick={loadPendingPartners} className="ml-2 underline cursor-pointer">
            Thử lại
          </button>
        </div>
      )}

      <div className="mb-6 max-w-md">
        <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên hoặc địa chỉ..." />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {search ? 'Không tìm thấy kết quả phù hợp' : 'Không có yêu cầu nào đang chờ duyệt'}
          </p>
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={paginatedData} keyExtractor={(p) => p.id} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={filtered.length}
              pageSize={pageSize}
            />
          )}
        </>
      )}

      {/* View Modal */}
      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Chi tiết yêu cầu đăng ký"
        size="lg"
      >
        {selectedPartner && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tên đối tác</p>
                <p className="font-medium">{selectedPartner.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Số điện thoại</p>
                <p className="font-medium">{selectedPartner.phone_number}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Địa chỉ</p>
                <p className="font-medium">{selectedPartner.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ngân hàng</p>
                <p className="font-medium">{selectedPartner.bank}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Số tài khoản</p>
                <p className="font-medium">{selectedPartner.banking_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Trạng thái</p>
                <StatusBadge status={selectedPartner.account_status} />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <ActionButton
                onClick={() => {
                  setIsViewOpen(false);
                  handleAction(selectedPartner, 'reject');
                }}
                variant="danger"
                size="md"
              >
                Từ chối
              </ActionButton>
              <ActionButton
                onClick={() => {
                  setIsViewOpen(false);
                  handleAction(selectedPartner, 'approve');
                }}
                variant="success"
                size="md"
              >
                Phê duyệt
              </ActionButton>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirm Modal */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title={confirmAction === 'approve' ? 'Xác nhận phê duyệt' : 'Xác nhận từ chối'}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Bạn có chắc chắn muốn {confirmAction === 'approve' ? 'phê duyệt' : 'từ chối'} yêu cầu của{' '}
            <span className="font-medium text-gray-900">{selectedPartner?.name}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <ActionButton onClick={() => setIsConfirmOpen(false)} variant="ghost" size="md" disabled={submitting}>
              Hủy
            </ActionButton>
            <ActionButton
              onClick={handleConfirm}
              variant={confirmAction === 'approve' ? 'success' : 'danger'}
              size="md"
              loading={submitting}
            >
              {confirmAction === 'approve' ? 'Phê duyệt' : 'Từ chối'}
            </ActionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
