import { useState } from 'react';
import { PencilSquareIcon, EyeIcon } from '@heroicons/react/24/outline';
import { StatusBadge, SearchInput, Pagination, Modal, DataTable, ActionButton } from '../components';

interface Partner {
  id: number;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  status: string;
  createdAt: string;
}

const mockPartners: Partner[] = [
  { id: 1, name: 'Nguyễn Minh Tuấn', email: 'resort.abc@email.com', phone: '0901111222', businessName: 'Resort ABC', status: 'ACTIVE', createdAt: '2025-01-10' },
  { id: 2, name: 'Trần Văn Hùng', email: 'villa.ocean@email.com', phone: '0902222333', businessName: 'Villa Ocean View', status: 'ACTIVE', createdAt: '2025-02-15' },
  { id: 3, name: 'Lê Thị Mai', email: 'hotel.sunrise@email.com', phone: '0903333444', businessName: 'Hotel Sunrise', status: 'INACTIVE', createdAt: '2025-03-20' },
  { id: 4, name: 'Phạm Quốc Bảo', email: 'homestay.green@email.com', phone: '0904444555', businessName: 'Homestay Green Valley', status: 'ACTIVE', createdAt: '2025-04-25' },
  { id: 5, name: 'Hoàng Thị Lan', email: 'resort.mountain@email.com', phone: '0905555666', businessName: 'Mountain Resort', status: 'BLOCKED', createdAt: '2025-05-30' },
  { id: 6, name: 'Vũ Đức Anh', email: 'hotel.city@email.com', phone: '0906666777', businessName: 'City Hotel', status: 'ACTIVE', createdAt: '2025-06-15' },
];

export default function PartnerManagement() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', businessName: '', status: '' });

  const pageSize = 5;
  const filtered = mockPartners.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.businessName.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleView = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsViewOpen(true);
  };

  const handleEdit = (partner: Partner) => {
    setSelectedPartner(partner);
    setEditForm({ name: partner.name, email: partner.email, phone: partner.phone, businessName: partner.businessName, status: partner.status });
    setIsEditOpen(true);
  };

  const handleSave = () => {
    console.log('Saving partner:', editForm);
    setIsEditOpen(false);
  };

  const columns = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'businessName', header: 'Tên doanh nghiệp', render: (p: Partner) => <span className="font-medium text-gray-900">{p.businessName}</span> },
    { key: 'name', header: 'Người đại diện' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Số điện thoại' },
    { key: 'status', header: 'Trạng thái', render: (p: Partner) => <StatusBadge status={p.status} /> },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (p: Partner) => (
        <div className="flex items-center gap-2">
          <ActionButton onClick={() => handleView(p)}><EyeIcon className="w-4 h-4" /></ActionButton>
          <ActionButton onClick={() => handleEdit(p)}><PencilSquareIcon className="w-4 h-4" /></ActionButton>
        </div>
      ),
    },
  ];


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý tài khoản đối tác</h1>
      </div>

      <div className="mb-6 max-w-md">
        <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên hoặc tên doanh nghiệp..." />
      </div>

      <DataTable columns={columns} data={paginatedData} keyExtractor={(p) => p.id} />
      
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={pageSize} />
      )}

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Thông tin đối tác">
        {selectedPartner && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-500">Tên doanh nghiệp</p><p className="font-medium">{selectedPartner.businessName}</p></div>
              <div><p className="text-sm text-gray-500">Người đại diện</p><p className="font-medium">{selectedPartner.name}</p></div>
              <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selectedPartner.email}</p></div>
              <div><p className="text-sm text-gray-500">Số điện thoại</p><p className="font-medium">{selectedPartner.phone}</p></div>
              <div><p className="text-sm text-gray-500">Trạng thái</p><StatusBadge status={selectedPartner.status} /></div>
              <div><p className="text-sm text-gray-500">Ngày tạo</p><p className="font-medium">{new Date(selectedPartner.createdAt).toLocaleDateString('vi-VN')}</p></div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Chỉnh sửa đối tác">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên doanh nghiệp</label>
            <input type="text" value={editForm.businessName} onChange={(e) => setEditForm({ ...editForm, businessName: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Người đại diện</label>
            <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input type="tel" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="ACTIVE">Hoạt động</option>
              <option value="INACTIVE">Không hoạt động</option>
              <option value="BLOCKED">Đã khóa</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <ActionButton onClick={() => setIsEditOpen(false)} variant="ghost" size="md">Hủy</ActionButton>
            <ActionButton onClick={handleSave} variant="primary" size="md">Lưu thay đổi</ActionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
