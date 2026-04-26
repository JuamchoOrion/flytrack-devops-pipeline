export interface Flight {
    id: number;
    flight_number: string;
    airline: string;
    origin: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
    status: 'scheduled' | 'delayed' | 'boarding' | 'departed' | 'arrived' | 'cancelled' | 'on-time';
    gate: string | null;
    created_at: string;
    updated_at: string;
}

export interface Notification {
    id: number;
    flight_id: number;
    flight_number: string;
    airline: string;
    origin: string;
    destination: string;
    type: string;
    message: string;
    priority: 'low' | 'normal' | 'high' | 'urgent';
    created_at: string;
}

export interface BaggageReport {
    id: number;
    passenger_name: string;
    passenger_id: string;
    flight_number: string;
    issue_type: 'lost' | 'damaged' | 'delayed' | 'other';
    description: string;
    contact: string;
    status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
    created_at: string;
    updated_at: string;
}

export interface DashboardStats {
    flights: {
        total: number;
        delayed: number;
        boarding: number;
        onTime: number;
        cancelled: number;
    };
    notifications: {
        recent: Notification[];
        total: number;
    };
    baggage: {
        pending: number;
        resolved: number;
        recent: BaggageReport[];
    };
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    count?: number;
    errors?: Array<{ field: string; message: string }>;
}