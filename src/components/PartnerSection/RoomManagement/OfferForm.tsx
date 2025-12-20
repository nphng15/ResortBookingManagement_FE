import { useState } from 'react';
import type { Offer, RoomType, ResortService, CreateOfferRequest, UpdateOfferRequest } from '../../../services/roomManagementService';
import ActionButton from '../components/ActionButton';

interface OfferFormProps {
  initialData?: Offer | null;
  roomTypes: RoomType[];
  services: ResortService[];
  onSubmit: (data: CreateOfferRequest | UpdateOfferRequest) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
}

export default function OfferForm({ initialData, roomTypes, services, onSubmit, onCancel, submitting }: OfferFormProps) {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    room_type_id: initialData?.room_type_id || (roomTypes[0]?.id || 0),
    name: initialData?.name || '',
    cost: initialData?.cost || 0,
    service_ids: initialData?.service_ids || [],
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const toggleService = (serviceId: number) => {
    setFormData((prev) => ({
      ...prev,
      service_ids: prev.service_ids.includes(serviceId)
        ? prev.service_ids.filter((id) => id !== serviceId)
        : [...prev.service_ids, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) return setError('Vui lòng nhập tên gói');
    if (formData.cost <= 0) return setError('Giá gói phải lớn hơn 0');
    if (!isEditing && !formData.room_type_id) return setError('Vui lòng chọn loại phòng');

    try {
      if (isEditing) {
        await onSubmit({ name: formData.name, cost: formData.cost, service_ids: formData.service_ids });
      } else {
        await onSubmit(formData as CreateOfferRequest);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

      {!isEditing && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loại phòng *</label>
          <select
            name="room_type_id"
            value={formData.room_type_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            {roomTypes.map((rt) => (
              <option key={rt.id} value={rt.id}>{rt.name}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tên gói *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          placeholder="VD: Gói VIP"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VND) *</label>
        <input
          type="number"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          min="0"
          step="10000"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Dịch vụ đi kèm</label>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
          {services.length === 0 ? (
            <p className="text-gray-500 text-sm col-span-2">Chưa có dịch vụ nào</p>
          ) : (
            services.map((service) => (
              <label key={service.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.service_ids.includes(service.id)}
                  onChange={() => toggleService(service.id)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">{service.name}</span>
              </label>
            ))
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <ActionButton type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Hủy
        </ActionButton>
        <ActionButton type="submit" variant="primary" loading={submitting}>
          {isEditing ? 'Cập nhật' : 'Tạo gói'}
        </ActionButton>
      </div>
    </form>
  );
}
