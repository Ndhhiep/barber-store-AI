/**
 * Service quản lý các API liên quan đến lịch hẹn
 */
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:5000'; // Use variable from .env file

// Helper function to get auth headers
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Lấy danh sách lịch hẹn của người dùng hiện tại
 * @returns {Promise<Object>} - Danh sách lịch hẹn
 */
export const getMyBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/bookings/my-bookings`, {
      headers: getAuthHeader()
    });
    return response;
  } catch (error) {
    console.error('Get my bookings error:', error);
    throw error;
  }
};

/**
 * Tạo lịch hẹn mới
 * @param {Object} bookingData - Dữ liệu lịch hẹn
 * @returns {Promise<Object>} - Lịch hẹn đã tạo
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/api/bookings`, bookingData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Hủy lịch hẹn
 * @param {string} id - ID của lịch hẹn
 * @returns {Promise<Object>} - Kết quả hủy lịch hẹn
 */
export const cancelBooking = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/api/bookings/${id}/cancel`, {}, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Lấy thông tin chi tiết lịch hẹn theo ID
 * @param {string} id - ID của lịch hẹn
 * @returns {Promise<Object>} - Chi tiết lịch hẹn
 */
export const getBookingById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/bookings/${id}`, {
      headers: getAuthHeader()
    });
    return response;
  } catch (error) {
    console.error(`Get booking ${id} error:`, error);
    throw error;
  }
};

/**
 * Lấy danh sách các khung giờ có sẵn cho ngày được chọn
 * @param {string} date - Ngày muốn đặt lịch (định dạng YYYY-MM-DD)
 * @param {string} barberId - ID của barber (tùy chọn)
 * @returns {Promise<Object>} - Danh sách khung giờ có sẵn
 */
export const getAvailableTimeSlots = async (date, barberId = null) => {
  try {
    let endpoint = `${API_URL}/api/bookings/available-slots?date=${date}`;
    if (barberId) {
      endpoint += `&barberId=${barberId}`;
    }
    const response = await axios.get(endpoint, {
      headers: getAuthHeader()
    });
    return response;
  } catch (error) {
    console.error('Get available time slots error:', error);
    throw error;
  }
};

const bookingService = {
  getMyBookings,
  createBooking,
  cancelBooking,
  getBookingById,
  getAvailableTimeSlots
};

export default bookingService;