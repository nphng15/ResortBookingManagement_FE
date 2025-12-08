import { useState } from 'react';
import { PencilSquareIcon, EyeIcon } from '@heroicons/react/24/outline';
import { StatusBadge, SearchInput, Pagination, Modal, DataTable, ActionButton } from '../components';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

const mockCustomers: Customer[] = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0901234567', status: 'ACTIVE', createdAt: '2025-01-15' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0912345678', status: 'ACTIVE', createdAt: '2025-02-20' },
  { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', phone: '0923456789', status: 'BLOCKED', createdAt: '2025-03-10' },
  { id: 4, name: 'Phạm Thị D', email: 'phamthid@email.com', phone: '0934567890', status: 'ACTIVE', createdAt: '2025-04-05' },
  { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@email.com', phone: '0945678901', status: 'INACTIVE', createdAt: '2025-05-12' },
  { id: 6, name: 'Vũ Thị F', email: 'vuthif@email.com', phone: '0956789012', status: 'ACTIVE', createdAt: '2025-06-18' },
  { id: 7, name: 'Đặng Văn G', email: 'dangvang@email.com', phone: '0967890123', status: 'ACTIVE', createdAt: '2025-07-22' },
  { id: 8, name: 'Bùi Thị H', email: 'buithih@email.com', phone: '0978901234', status: 'BLOCKED', createdAt: '2025-08-30' },
];

export default function CustomerManagement() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', status: '' });

  const pageSize = 5;
  const filtered = mockCustomers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditForm({ name: customer.name, email: customer.email, phone: customer.phone, status: customer.status });
    setIsEditOpen(true);
  };

  const handleSave = () => {
    console.log('Saving customer:', editForm);
    setIsEditOpen(false);
  };

  const columns = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'name', header: 'Họ tên', render: (c: Customer) => <span className="font-medium text-gray-900">{c.name}</span> },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Số điện thoại' },
    { key: 'status', header: 'Trạng thái', render: (c: Customer) => <StatusBadge status={c.status} /> },
    { key: 'createdAt', header: 'Ngày tạo', render: (c: Customer) => new Date(c.createdAt).toLocaleDateString('vi-VN') },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (c: Customer) => (
        <div className="flex items-center gap-2">
          <ActionButton onClick={() => handleView(c)}><EyeIcon className="w-4 h-4" /></ActionButton>
          <ActionButton onClick={() => handleEdit(c)}><PencilSquareIcon className="w-4 h-4" /></ActionButton>
        </div>
      ),
    },
  ];


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý tài khoản khách hàng</h1>
      </div>

      <div className="mb-6 max-w-md">
        <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên hoặc email..." />
      </div>

      <DataTable columns={columns} data={paginatedData} keyExtractor={(c) => c.id} />
      
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={pageSize} />
      )}

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Thông tin khách hàng">
        {selectedCustomer && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-500">Họ tên</p><p className="font-medium">{selectedCustomer.name}</p></div>
              <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selectedCustomer.email}</p></div>
              <div><p className="text-sm text-gray-500">Số điện thoại</p><p className="font-medium">{selectedCustomer.phone}</p></div>
              <div><p className="text-sm text-gray-500">Trạng thái</p><StatusBadge status={selectedCustomer.status} /></div>
              <div><p className="text-sm text-gray-500">Ngày tạo</p><p className="font-medium">{new Date(selectedCustomer.createdAt).toLocaleDateString('vi-VN')}</p></div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Chỉnh sửa khách hàng">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
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
