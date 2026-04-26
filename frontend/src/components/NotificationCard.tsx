import type { Notification } from '../types';

interface NotificationCardProps {
    notification: Notification;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
    const getPriorityColor = (priority: string) => {
        const colors = {
            'low': 'border-l-gray-400 bg-gray-50',
            'normal': 'border-l-blue-400 bg-blue-50',
            'high': 'border-l-yellow-400 bg-yellow-50',
            'urgent': 'border-l-red-400 bg-red-50',
        };
        return colors[priority as keyof typeof colors] || 'border-l-gray-400 bg-gray-50';
    };

    const getPriorityIcon = (priority: string) => {
        const icons = {
            'low': 'ℹ️',
            'normal': '📢',
            'high': '⚠️',
            'urgent': '🚨',
        };
        return icons[priority as keyof typeof icons] || 'ℹ️';
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);

        if (diff < 1) return 'Ahora';
        if (diff < 60) return `Hace ${diff} min`;
        if (diff < 1440) return `Hace ${Math.floor(diff / 60)} hrs`;
        return date.toLocaleDateString('es-CO');
    };

    return (
        <div className={`border-l-4 p-4 rounded-r-lg ${getPriorityColor(notification.priority)}`}>
            <div className="flex items-start space-x-3">
                <span className="text-2xl">{getPriorityIcon(notification.priority)}</span>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">{notification.flight_number}</span>
                        <span className="text-xs text-gray-500">{formatTime(notification.created_at)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.airline}</p>
                </div>
            </div>
        </div>
    );
};

export default NotificationCard;