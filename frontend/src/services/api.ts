import axios from 'axios';
import type { Flight, Notification, BaggageReport, DashboardStats, ApiResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Interceptor para manejo de errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Flights API
export const flightApi = {
    getAll: () => api.get<ApiResponse<Flight[]>>('/flights'),

    getById: (id: number) => api.get<ApiResponse<Flight>>(`/flights/${id}`),

    search: (query: string) =>
        api.get<ApiResponse<Flight[]>>('/flights/search', { params: { query } }),

    create: (data: Partial<Flight>) =>
        api.post<ApiResponse<Flight>>('/flights', data),

    update: (id: number, data: Partial<Flight>) =>
        api.put<ApiResponse<Flight>>(`/flights/${id}`, data),
};

// Notifications API
export const notificationApi = {
    getAll: (limit?: number) =>
        api.get<ApiResponse<Notification[]>>('/notifications', { params: { limit } }),

    getById: (id: number) =>
        api.get<ApiResponse<Notification>>(`/notifications/${id}`),

    create: (data: Partial<Notification>) =>
        api.post<ApiResponse<Notification>>('/notifications', data),
};

// Baggage API
export const baggageApi = {
    getAll: () => api.get<ApiResponse<BaggageReport[]>>('/baggage'),

    getById: (id: number) =>
        api.get<ApiResponse<BaggageReport>>(`/baggage/${id}`),

    create: (data: Partial<BaggageReport>) =>
        api.post<ApiResponse<BaggageReport>>('/baggage', data),

    updateStatus: (id: number, status: string) =>
        api.put<ApiResponse<BaggageReport>>(`/baggage/${id}/status`, { status }),
};

// Dashboard API
export const dashboardApi = {
    getStats: () => api.get<ApiResponse<DashboardStats>>('/dashboard/stats'),
};

export default api;