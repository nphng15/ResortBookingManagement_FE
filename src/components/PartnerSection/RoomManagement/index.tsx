import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, CubeIcon, TagIcon } from '@heroicons/react/24/outline';
import {
  getRoomTypes,
  getOffers,
  getResortServices,
  createRoomType,
  updateRoomType,
  deleteRoomType,
  createOffer,
  updateOffer,
  deleteOffer,
  type RoomType,
  type Offer,
  type ResortService,
  type CreateRoomTypeRequest,
  type UpdateRoomTypeRequest,
  type CreateOfferRequest,
  type UpdateOfferRequest,
} from '../../../services/roomManagementService';
import { getPartnerResorts, type PartnerResort } from '../../../services/partnerService';
import Modal from '../components/Modal';
import ActionButton from '../components/ActionButton';
import RoomTypeForm from './RoomTypeForm';
import OfferForm from './OfferForm';

type TabType = 'room-types' | 'offers';

export default function RoomManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('room-types');
  const [resort, setResort] = useState<PartnerResort | null>(null);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [services, setServices] = useState<ResortService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showRoomTypeModal, setShowRoomTypeModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null>(null);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [deletingItem, setDeletingItem] = useState<{ type: 'room-type' | 'offer'; id: number; name: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const resorts = await getPartnerResorts();
      if (resorts.length > 0) {
        setResort(resorts[0]);
        const [roomTypesData, offersData, servicesData] = await Promise.all([
          getRoomTypes(resorts[0].id),
          getOffers(),
          getResortServices(resorts[0].id),
        ]);
        setRoomTypes(roomTypesData);
        setOffers(offersData);
        setServices(servicesData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  const handleCreateRoomType = async (data: Omit<CreateRoomTypeRequest, 'resort_id'>) => {
    try {
      setSubmitting(true);
      await createRoomType({ ...data, resort_id: resort!.id });
      await loadData();
      setShowRoomTypeModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateRoomType = async (data: UpdateRoomTypeRequest) => {
    if (!editingRoomType) return;
    try {
      setSubmitting(true);
      await updateRoomType(editingRoomType.id, data);
      await loadData();
      setShowRoomTypeModal(false);
      setEditingRoomType(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateOffer = async (data: CreateOfferRequest) => {
    try {
      setSubmitting(true);
      await createOffer(data);
      await loadData();
      setShowOfferModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateOffer = async (data: UpdateOfferRequest) => {
    if (!editingOffer) return;
    try {
      setSubmitting(true);
      await updateOffer(editingOffer.id, data);
      await loadData();
      setShowOfferModal(false);
      setEditingOffer(null);
    } finally {
      setSubmitting(false);
    }
  };


  const handleDelete = async () => {
    if (!deletingItem) return;
    try {
      setSubmitting(true);
      if (deletingItem.type === 'room-type') {
        await deleteRoomType(deletingItem.id);
      } else {
        await deleteOffer(deletingItem.id);
      }
      await loadData();
      setShowDeleteModal(false);
      setDeletingItem(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể xóa');
    } finally {
      setSubmitting(false);
    }
  };

  const getRoomTypeName = (roomTypeId: number) =>
    roomTypes.find((rt) => rt.id === roomTypeId)?.name || 'N/A';

  const openEditRoomType = (roomType: RoomType) => {
    setEditingRoomType(roomType);
    setShowRoomTypeModal(true);
  };

  const openEditOffer = (offer: Offer) => {
    setEditingOffer(offer);
    setShowOfferModal(true);
  };

  const openDeleteConfirm = (type: 'room-type' | 'offer', id: number, name: string) => {
    setDeletingItem({ type, id, name });
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        <p>{error}</p>
        <button onClick={loadData} className="mt-2 text-sm underline cursor-pointer">Thử lại</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý phòng</h2>
          {resort && <p className="text-gray-600 mt-1">{resort.name}</p>}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('room-types')}
            className={`flex items-center gap-2 py-3 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'room-types'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <CubeIcon className="w-5 h-5" />
            Loại phòng ({roomTypes.length})
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`flex items-center gap-2 py-3 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'offers'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <TagIcon className="w-5 h-5" />
            Gói đặt phòng ({offers.length})
          </button>
        </nav>
      </div>

      {/* Room Types Tab */}
      {activeTab === 'room-types' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <ActionButton
              variant="primary"
              onClick={() => { setEditingRoomType(null); setShowRoomTypeModal(true); }}
            >
              <PlusIcon className="w-5 h-5" />
              Thêm loại phòng
            </ActionButton>
          </div>

          {roomTypes.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <CubeIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Chưa có loại phòng nào</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {roomTypes.map((rt) => (
                <div key={rt.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {rt.image_urls && rt.image_urls[0] ? (
                      <img src={rt.image_urls[0]} alt={rt.name} className="w-20 h-20 object-cover rounded-lg" />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <CubeIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{rt.name}</h3>
                      <p className="text-sm text-gray-500">
                        {rt.area}m² • {rt.bed_amount} giường • {rt.people_amount} người
                      </p>
                      <p className="text-emerald-600 font-medium">{formatCurrency(rt.price)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditRoomType(rt)} className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => openDeleteConfirm('room-type', rt.id, rt.name)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}


      {/* Offers Tab */}
      {activeTab === 'offers' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <ActionButton
              variant="primary"
              onClick={() => { setEditingOffer(null); setShowOfferModal(true); }}
              disabled={roomTypes.length === 0}
            >
              <PlusIcon className="w-5 h-5" />
              Thêm gói
            </ActionButton>
          </div>

          {roomTypes.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Vui lòng tạo loại phòng trước khi thêm gói</p>
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <TagIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Chưa có gói đặt phòng nào</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{offer.name}</h3>
                    <p className="text-sm text-gray-500">Loại phòng: {getRoomTypeName(offer.room_type_id)}</p>
                    <p className="text-emerald-600 font-medium">{formatCurrency(offer.cost)}</p>
                    {offer.services && offer.services.length > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        Dịch vụ: {offer.services.map(s => s.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditOffer(offer)} className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => openDeleteConfirm('offer', offer.id, offer.name)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Room Type Modal */}
      <Modal
        isOpen={showRoomTypeModal}
        onClose={() => { setShowRoomTypeModal(false); setEditingRoomType(null); }}
        title={editingRoomType ? 'Chỉnh sửa loại phòng' : 'Thêm loại phòng mới'}
      >
        <RoomTypeForm
          initialData={editingRoomType}
          services={services}
          onSubmit={handleCreateRoomType}
          onUpdateSubmit={handleUpdateRoomType}
          onCancel={() => { setShowRoomTypeModal(false); setEditingRoomType(null); }}
          submitting={submitting}
          isEditing={!!editingRoomType}
        />
      </Modal>

      {/* Offer Modal */}
      <Modal
        isOpen={showOfferModal}
        onClose={() => { setShowOfferModal(false); setEditingOffer(null); }}
        title={editingOffer ? 'Chỉnh sửa gói đặt phòng' : 'Thêm gói đặt phòng mới'}
      >
        <OfferForm
          initialData={editingOffer}
          roomTypes={roomTypes}
          services={services}
          onSubmit={handleCreateOffer}
          onUpdateSubmit={handleUpdateOffer}
          onCancel={() => { setShowOfferModal(false); setEditingOffer(null); }}
          submitting={submitting}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setDeletingItem(null); }}
        title="Xác nhận xóa"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Bạn có chắc muốn xóa <span className="font-semibold">{deletingItem?.name}</span>?
          </p>
          <div className="flex gap-3">
            <ActionButton variant="secondary" onClick={() => { setShowDeleteModal(false); setDeletingItem(null); }} disabled={submitting}>
              Hủy
            </ActionButton>
            <ActionButton variant="danger" onClick={handleDelete} loading={submitting}>
              Xóa
            </ActionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
