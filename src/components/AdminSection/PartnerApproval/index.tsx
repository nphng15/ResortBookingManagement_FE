import { useState } from 'react';
import { CheckIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';
import { StatusBadge, SearchInput, Pagination, Modal, DataTable, ActionButton } from '../components';

interface PartnerRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  address: string;
  status: string;
  createdAt: string;
}

const mockRequests: PartnerRequest[] = [
  { id: 1, name: 'Nguyễn Văn Phú', email: 'resort.paradise@email.com', phone: '0911222333', businessName: 'Paradise Resort', businessType: 'Resort', address: 'Đà Nẵng', status: 'PENDING', createdAt: '2025-11-01' },
  { id: 2, name: 'Trần Thị Hoa', email: 'villa.sunset@email.com', phone: '0922333444', businessName: 'Sunset Villa', businessType: 'Villa', address: 'Nha Trang', status: 'PENDING', createdAt: '2025-11-05' },
  { id: 3, name: 'Lê Minh Đức', email: 'hotel.royal@email.com', phone: '0933444555', businessName: 'Royal Hotel', businessType: 'Hotel', address: 'Hà Nội', status: 'APPROVED', createdAt: '2025-10-20' },
  { id: 4, name: 'Phạm Thị Ngọc', email: 'homestay.cozy@email.com', phone: '0944555666', businessName: 'Cozy Homestay', businessType: 'Homestay', address: 'Đà Lạt', status: 'REJECTED', createdAt: '2025-10-15' },
  { id: 5, name: 'Hoàng Văn Tùng', email: 'resort.beach@email.com', phone: '0955666777', businessName: 'Beach Resort', businessType: 'Resort', address: 'Phú Quốc', status: 'PENDING', createdAt: '2025-11-08' },
  { id: 6, name: 'Vũ Thị Hương', email: 'hotel.garden@email.com', phone: '0966777888', businessName: 'Garden Hotel', businessType: 'Hotel', address: 'Hội An', status: 'PENDING', createdAt: '2025-11-10' },
];

export default function PartnerApproval() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedRequest, setSelectedRequest] = useState<PartnerRequest | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'approve' | 'reject'>('approve');

  const pageSize = 5;
  const filtered = mockRequests.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.businessName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleView = (request: PartnerRequest) => {
    setSelectedRequest(request);
    setIsViewOpen(true);
  };

  const handleAction = (request: PartnerRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setConfirmAction(action);
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    console.log(`${confirmAction} partner:`, selectedRequest?.id);
    setIsConfirmOpen(false);
  };

  const columns = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'businessName', header: 'Tên doanh nghiệp', render: (r: PartnerRequest) => <span className="font-medium text-gray-900">{r.businessName}</span> },
    { key: 'businessType', header: 'Loại hình' },
    { key: 'name', header: 'Người đại diện' },
    { key: 'address', header: 'Địa chỉ' },
    { key: 'status', header: 'Trạng thái', render: (r: PartnerRequest) => <StatusBadge status={r.status} /> },
    { key: 'createdAt', header: 'Ngày gửi', render: (r: PartnerRequest) => new Date(r.createdAt).toLocaleDateString('vi-VN') },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (r: PartnerRequest) => (
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
        <h1 className="text-2xl font-bold text-gray-900">Phê duyệt đối tác</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="max-w-md flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên hoặc tên doanh nghiệp..." />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="PENDING">Chờ duyệt</option>
          <option value="APPROVED">Đã duyệt</option>
          <option value="REJECTED">Từ chối</option>
        </select>
      </div>

      <DataTable columns={columns} data={paginatedData} keyExtractor={(r) => r.id} />
      
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={pageSize} />
      )}

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Chi tiết yêu cầu đăng ký" size="lg">
        {selectedRequest && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-500">Tên doanh nghiệp</p><p className="font-medium">{selectedRequest.businessName}</p></div>
              <div><p className="text-sm text-gray-500">Loại hình</p><p className="font-medium">{selectedRequest.businessType}</p></div>
              <div><p className="text-sm text-gray-500">Người đại diện</p><p className="font-medium">{selectedRequest.name}</p></div>
              <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selectedRequest.email}</p></div>
              <div><p className="text-sm text-gray-500">Số điện thoại</p><p className="font-medium">{selectedRequest.phone}</p></div>
              <div><p className="text-sm text-gray-500">Địa chỉ</p><p className="font-medium">{selectedRequest.address}</p></div>
              <div><p className="text-sm text-gray-500">Trạng thái</p><StatusBadge status={selectedRequest.status} /></div>
              <div><p className="text-sm text-gray-500">Ngày gửi</p><p className="font-medium">{new Date(selectedRequest.createdAt).toLocaleDateString('vi-VN')}</p></div>
            </div>
            {selectedRequest.status === 'PENDING' && (
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <ActionButton onClick={() => { setIsViewOpen(false); handleAction(selectedRequest, 'reject'); }} variant="danger" size="md">Từ chối</ActionButton>
                <ActionButton onClick={() => { setIsViewOpen(false); handleAction(selectedRequest, 'approve'); }} variant="success" size="md">Phê duyệt</ActionButton>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Confirm Modal */}
      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} title={confirmAction === 'approve' ? 'Xác nhận phê duyệt' : 'Xác nhận từ chối'} size="sm">
        <div className="space-y-4">
          <p className="text-gray-600">
            Bạn có chắc chắn muốn {confirmAction === 'approve' ? 'phê duyệt' : 'từ chối'} yêu cầu của <span className="font-medium text-gray-900">{selectedRequest?.businessName}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <ActionButton onClick={() => setIsConfirmOpen(false)} variant="ghost" size="md">Hủy</ActionButton>
            <ActionButton onClick={handleConfirm} variant={confirmAction === 'approve' ? 'success' : 'danger'} size="md">
              {confirmAction === 'approve' ? 'Phê duyệt' : 'Từ chối'}
            </ActionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
