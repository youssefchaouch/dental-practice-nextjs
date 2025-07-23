'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bell, CheckCircle, Clock, X } from 'lucide-react';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  notifications: Notification[];
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  appointmentData?: any;
}

interface AppointmentUpdate {
  id: string;
  status: string;
  actualDate?: string;
  actualTime?: string;
  patientId: string;
  service: string;
  patient?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
  notifications: [],
  clearNotification: () => {},
  clearAllNotifications: () => {},
});

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
  userRole?: 'patient' | 'dentist';
  patientId?: string;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
  userRole = 'patient',
  patientId
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_WS_URL || ''
      : 'http://localhost:3000', {
      transports: ['websocket', 'polling']
    });

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);

      // Join appropriate room based on user role
      if (userRole === 'dentist') {
        socketInstance.emit('join-dentist-room');
      } else if (userRole === 'patient' && patientId) {
        socketInstance.emit('join-patient-room', patientId);
      }
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
    });

    // Listen for new appointment notifications (dentist only)
    socketInstance.on('new-appointment', (appointmentData: any) => {
      if (userRole === 'dentist') {
        addNotification({
          type: 'info',
          title: 'New Appointment Request',
          message: `${appointmentData.patient.firstName} ${appointmentData.patient.lastName} has requested a ${appointmentData.service} appointment.`,
          appointmentData
        });
      }
    });

    // Listen for appointment updates (both roles)
    socketInstance.on('appointment-updated', (appointmentData: AppointmentUpdate) => {
      if (userRole === 'dentist') {
        const statusMessages = {
          APPROVED: 'approved',
          RESCHEDULED: 'rescheduled',
          CANCELLED: 'cancelled',
          COMPLETED: 'completed'
        };

        addNotification({
          type: appointmentData.status === 'APPROVED' ? 'success' : 'info',
          title: 'Appointment Updated',
          message: `Appointment for ${appointmentData.patient?.firstName} ${appointmentData.patient?.lastName} has been ${statusMessages[appointmentData.status as keyof typeof statusMessages] || 'updated'}.`,
          appointmentData
        });
      }
    });

    // Listen for appointment status changes (patient only)
    socketInstance.on('appointment-status-changed', (data: AppointmentUpdate) => {
      if (userRole === 'patient' && data.patientId === patientId) {
        const statusMessages = {
          APPROVED: {
            type: 'success' as const,
            title: 'Appointment Confirmed!',
            message: `Your appointment has been approved for ${data.actualDate ? new Date(data.actualDate).toLocaleDateString() : 'the requested date'} at ${data.actualTime || 'the requested time'}.`
          },
          RESCHEDULED: {
            type: 'warning' as const,
            title: 'Appointment Rescheduled',
            message: `Your appointment has been rescheduled to ${data.actualDate ? new Date(data.actualDate).toLocaleDateString() : 'a new date'} at ${data.actualTime || 'a new time'}.`
          },
          CANCELLED: {
            type: 'error' as const,
            title: 'Appointment Cancelled',
            message: 'Your appointment has been cancelled. Please contact us to reschedule.'
          },
          COMPLETED: {
            type: 'success' as const,
            title: 'Appointment Completed',
            message: 'Your appointment has been completed. Thank you for visiting us!'
          }
        };

        const statusInfo = statusMessages[data.status as keyof typeof statusMessages];
        if (statusInfo) {
          addNotification({
            type: statusInfo.type,
            title: statusInfo.title,
            message: statusInfo.message,
            appointmentData: data
          });
        }
      }
    });

    // Listen for appointment approval (patient only)
    socketInstance.on('appointment-approved', (appointmentData: any) => {
      if (userRole === 'patient' && appointmentData.patientId === patientId) {
        addNotification({
          type: 'success',
          title: 'Appointment Confirmed!',
          message: `Your ${appointmentData.service} appointment has been confirmed.`,
          appointmentData
        });
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [userRole, patientId]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove notification after 8 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 8000);
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'error':
        return <X className="w-6 h-6 text-red-500" />;
      default:
        return <Bell className="w-6 h-6 text-blue-500" />;
    }
  };

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <WebSocketContext.Provider value={{
      socket,
      isConnected,
      notifications,
      clearNotification,
      clearAllNotifications
    }}>
      {children}

      {/* Notification Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.3 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className={`${getNotificationStyles(notification.type)} border rounded-lg p-4 shadow-lg backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {getNotificationIcon(notification.type)}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => clearNotification(notification.id)}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Connection Status Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`fixed bottom-4 left-4 z-40 px-3 py-2 rounded-full text-xs font-medium ${
          isConnected
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}
      >
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </motion.div>
    </WebSocketContext.Provider>
  );
};