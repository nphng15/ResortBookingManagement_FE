import { useState, useEffect, useCallback } from 'react';
import { CalendarDaysIcon, CurrencyDollarIcon, ClipboardDocumentListIcon, WalletIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { StatCard, Modal, ActionButton, WithdrawalChart } from '../components';
import { getPartnerStatistics, requestWithdrawal, type PartnerStatistics, type WithdrawalItem } from '../../../services/partnerService';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const formatDateTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('vi-VN');
};

// Convert API withdrawal format to chart format
const mapWithdrawalsForChart = (withdrawals: WithdrawalItem[]) => {
  return withdrawals.map((w) => ({
    id: w.id,
    amount: w.amount,
    date: w.time,
    status: w.status,
  }));
};

export default function RevenueManagement() {
  const [stats, setStats] = useState<PartnerStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPartnerStatistics();
      setStats(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể tải dữ liệu';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount.replace(/[^0-9]/g, ''));
    if (isNaN(amount) || amount <= 0) {
      setMessage({ type: 'error', text: 'Vui lòng nhập số tiền hợp lệ' });
      return;
    }
    if (amount < 1000000) {
      setMessage({ type: 'error', text: 'Số tiền rút tối thiểu là 1.000.000 VND' });
      return;
    }

    setIsProcessing(true);
    setMessage(null);
    try {
      await requestWithdrawal(amount);
      setMessage({
        type: 'success',
        text: 'Yêu cầu rút tiền đã được gửi thành công! Vui lòng chờ Admin duyệt.',
      });
      setWithdrawAmount('');
      setTimeout(() => {
        setIsWithdrawOpen(false);
        setMessage(null);
        loadData();
      }, 2500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsProcessing(false);
    }
  };


  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue) {
      setWithdrawAmount(new Intl.NumberFormat('vi-VN').format(parseInt(numericValue)));
    } else {
      setWithdrawAmount('');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 mb-4">{error}</p>
        <button onClick={loadData} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer">
          Thử lại
        </button>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý doanh thu</h1>
        <button
          onClick={() => setIsWithdrawOpen(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors cursor-pointer flex items-center gap-2"
        >
          <WalletIcon className="w-5 h-5" />
          Yêu cầu rút tiền
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Đặt phòng hôm nay" value={stats.new_bookings_today} icon={CalendarDaysIcon} color="blue" />
        <StatCard title="Doanh thu tháng này" value={formatCurrency(stats.monthly_revenue)} icon={CurrencyDollarIcon} color="green" />
        <StatCard title="Tổng đặt phòng" value={stats.total_bookings} icon={ClipboardDocumentListIcon} color="purple" />
        <StatCard title="Số dư hiện tại" value={formatCurrency(stats.current_balance)} icon={WalletIcon} color="orange" />
      </div>

      {/* Withdrawal Chart */}
      <div className="mb-8">
        <WithdrawalChart withdrawals={mapWithdrawalsForChart(stats.balance_movements.withdrawals)} />
      </div>

      {/* Balance Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenues */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <ArrowUpIcon className="w-5 h-5 text-emerald-600" />
            <h2 className="font-semibold text-gray-900">Doanh thu gần đây</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
            {stats.balance_movements.revenues.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">Chưa có doanh thu</div>
            ) : (
              stats.balance_movements.revenues.map((item) => (
                <div key={item.invoice_id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Booking #{item.booking_detail_id}</p>
                    <p className="text-xs text-gray-500">{formatDateTime(item.time)}</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600">+{formatCurrency(item.amount)}</span>
                </div>
              ))
            )}
          </div>
        </div>


        {/* Withdrawals */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <ArrowDownIcon className="w-5 h-5 text-orange-600" />
            <h2 className="font-semibold text-gray-900">Lịch sử rút tiền</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
            {stats.balance_movements.withdrawals.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">Chưa có lịch sử rút tiền</div>
            ) : (
              stats.balance_movements.withdrawals.map((item) => (
                <div key={item.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Rút tiền #{item.id}</p>
                    <p className="text-xs text-gray-500">{formatDateTime(item.time)}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-orange-600">
                      -{formatCurrency(item.amount)}
                    </span>
                    <p
                      className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
                        item.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-700'
                            : item.status === 'REJECTED'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.status === 'APPROVED'
                        ? '✓ Đã duyệt'
                        : item.status === 'PENDING'
                          ? '⏳ Chờ duyệt'
                          : item.status === 'REJECTED'
                            ? '✗ Từ chối'
                            : 'Không xác định'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      <Modal isOpen={isWithdrawOpen} onClose={() => { setIsWithdrawOpen(false); setMessage(null); }} title="Yêu cầu rút tiền">
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Số dư khả dụng</p>
            <p className="text-2xl font-bold text-emerald-600">{formatCurrency(stats.current_balance)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số tiền muốn rút (VND)</label>
            <input
              type="text"
              value={withdrawAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="Nhập số tiền..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-xs text-gray-500 mt-1">Số tiền rút tối thiểu: 1.000.000 VND</p>
          </div>
          {message && (
            <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
              {message.text}
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <ActionButton onClick={() => { setIsWithdrawOpen(false); setMessage(null); }} variant="ghost" size="md">Hủy</ActionButton>
            <ActionButton onClick={handleWithdraw} variant="primary" size="md" disabled={isProcessing || !withdrawAmount}>
              {isProcessing ? 'Đang xử lý...' : 'Gửi yêu cầu'}
            </ActionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
