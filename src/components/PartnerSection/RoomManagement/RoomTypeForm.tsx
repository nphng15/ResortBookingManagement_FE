import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { RoomType, ResortService, CreateRoomTypeRequest, UpdateRoomTypeRequest } from '../../../services/roomManagementService';
import ActionButton from '../components/ActionButton';

interface RoomTypeFormProps {
  initialData?: RoomType | null;
  services: ResortService[];
  onSubmit: (data: Omit<CreateRoomTypeRequest, 'resort_id'>) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
  isEditing?: boolean;
}

export default function RoomTypeForm({ initialData, services, onSubmit, onCancel, submitting, isEditing: isEditingProp }: RoomTypeFormProps) {
  const isEditing = isEditingProp ?? !!initialData;

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    area: initialData?.area || 0,
    bed_amount: initialData?.bed_amount || 1,
    people_amount: initialData?.people_amount || 2,
    price: initialData?.price || 0,
  });

  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.image_urls || []);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [offerData, setOfferData] = useState({ name: '', cost: 0, service_ids: [] as number[] });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  const handleOfferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setOfferData((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  const toggleService = (serviceId: number) => {
    setOfferData((prev) => ({
      ...prev,
      service_ids: prev.service_ids.includes(serviceId)
        ? prev.service_ids.filter((id) => id !== serviceId)
        : [...prev.service_ids, serviceId],
    }));
  };

  const addImageUrl = () => {
    if (newImageUrl.trim() && !imageUrls.includes(newImageUrl.trim())) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const removeImageUrl = (url: string) => setImageUrls(imageUrls.filter((u) => u !== url));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) return setError('Vui lòng nhập tên loại phòng');
    if (formData.price <= 0) return setError('Giá phòng phải lớn hơn 0');
    if (!isEditing && !offerData.name.trim()) return setError('Vui lòng nhập tên gói đặt phòng');
    if (!isEditing && offerData.cost <= 0) return setError('Giá gói phải lớn hơn 0');

    try {
      if (isEditing) {
        await onSubmit(formData as UpdateRoomTypeRequest);
      } else {
        await onSubmit({ ...formData, image_urls: imageUrls, offer: offerData } as Omit<CreateRoomTypeRequest, 'resort_id'>);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Thông tin loại phòng</h4>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên loại phòng *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="VD: Deluxe Room" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích (m²)</label>
            <input type="number" name="area" value={formData.area} onChange={handleChange} min="0" step="0.1" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VND) *</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="10000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số giường</label>
            <input type="number" name="bed_amount" value={formData.bed_amount} onChange={handleChange} min="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sức chứa (người)</label>
            <input type="number" name="people_amount" value={formData.people_amount} onChange={handleChange} min="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
        </div>
      </div>


      {/* Image URLs - only for create */}
      {!isEditing && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Ảnh phòng</h4>
          <div className="flex gap-2">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Nhập URL ảnh"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
            <button type="button" onClick={addImageUrl} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 cursor-pointer">
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
          {imageUrls.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img src={url} alt={`Preview ${idx + 1}`} className="w-16 h-16 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImageUrl(url)}
                    className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Offer - only for create */}
      {!isEditing && (
        <div className="space-y-4 border-t pt-4">
          <h4 className="font-medium text-gray-900">Gói đặt phòng mặc định *</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên gói *</label>
              <input type="text" name="name" value={offerData.name} onChange={handleOfferChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="VD: Gói cơ bản" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá gói (VND) *</label>
              <input type="number" name="cost" value={offerData.cost} onChange={handleOfferChange} min="0" step="10000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dịch vụ đi kèm</label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {services.length === 0 ? (
                <p className="text-gray-500 text-sm col-span-2">Chưa có dịch vụ nào</p>
              ) : (
                services.map((service) => (
                  <label key={service.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={offerData.service_ids.includes(service.id)}
                      onChange={() => toggleService(service.id)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700">{service.name}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4 border-t">
        <ActionButton type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Hủy
        </ActionButton>
        <ActionButton type="submit" variant="primary" loading={submitting}>
          {isEditing ? 'Cập nhật' : 'Tạo loại phòng'}
        </ActionButton>
      </div>
    </form>
  );
}
