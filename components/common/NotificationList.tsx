import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import DialogWrapper from './Dialog';

type Notification = {
  id: string;
  title: string;
  content: string;
  type: string;	
  isRead: boolean;
  createdAt: string;
};
interface NotificationListProps {
  userId: string;
  onMarkAsRead: (unreadCount: number) => void;
  setUnreadCount: (count: number) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ userId, onMarkAsRead, setUnreadCount }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [allNotificationsModalOpen, setAllNotificationsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) {
        console.error('User ID is undefined or invalid');
        return; // Exit if userId is invalid
      }

      setIsLoading(true);
      setError(null); 
      try {
        const response = await fetch('/api/notification', {
          method: 'GET',
      });
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        
        setNotifications(data.notifications);
        const unread = data.notifications.filter((notification: Notification) => !notification.isRead).length;
        setUnreadCount(unread);
        onMarkAsRead(unread); 
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        setError("Failed to load notifications. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId, onMarkAsRead, setUnreadCount]);

  const markAsRead = async (id: string) => {
    if (!userId) return;
    try {
      const response = await fetch('/api/updateNotification', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to update notification');
      }

      const data = await response.json();
      console.log('Updated notification:', data.updatedNotification);

      setNotifications((prev) => {
        const updatedNotifications = prev.map((notification) =>
          notification.id === id ? { ...notification, isRead: true } : notification
        );
    
        const newUnreadCount = updatedNotifications.filter(notification => !notification.isRead).length;
        setUnreadCount(newUnreadCount);
        onMarkAsRead(newUnreadCount);
        return updatedNotifications;
      });
      
      setTimeout(() => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
      }, 48 * 60 * 60 * 1000);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
    
  const handleViewClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedNotification(null);
  };
  const closeAllNotificationsModal = () => {
    setAllNotificationsModalOpen(false);
  };
  const handleViewAllClick = () => {
    setAllNotificationsModalOpen(true);
  };

  if (isLoading) {
    return <p>Loading notifications...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className='space-y-4 w-96 max-h-96 overflow-y-auto'>
      <h2 className="text-sm font-semibold mb-2">Notifications</h2>
      <ul className="space-y-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li 
            key={notification.id} 
            className="p-2 border-b border-gray-200"
            onClick={() => !notification.isRead && markAsRead(notification.id)}
            >
              <div className='flex justify-between items-center'>
                <div>
                  <strong>{notification.title}</strong>{!notification.isRead && <span className="text-gray-500 ml-2">(New)</span>}
                  <h5>{notification.content}</h5>
                </div>
                <div>
                  <button onClick={() => handleViewClick(notification)} className="bg-blue-500 text-white px-2 py-1 rounded">
                    View
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No new notifications</p>
        )}
      </ul>
     
      <Modal isOpen={modalOpen} onClose={closeModal} notification={selectedNotification} />
      <AllNotificationsModal 
        isOpen={allNotificationsModalOpen} 
        onClose={closeAllNotificationsModal} 
        notifications={notifications} 
      />
    </div>
  );
};
const Modal = ({ isOpen, onClose, notification }: { isOpen: boolean; onClose: () => void; notification?: Notification | null; }) => {
  if (!isOpen || !notification) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className='font-extrabold mb-1 underline'>{notification.type}</h2>
        {/* <p className="font-bold text-lg">Type Of {notification.title}</p> */}
        <p><span className='font-bold'>Details:</span> {notification.content}</p>
        <p><span className='font-bold'>Date of {notification.type} : </span>{format(new Date(notification.createdAt), 'yyyy-MM-dd')}</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

const AllNotificationsModal = ({ isOpen, onClose, notifications }: { isOpen: boolean; onClose: () => void; notifications: Notification[]; }) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogWrapper
     btnTitle="View All Notifications"
     title="All Notifications"
     descr="View your notifications for the last 7 days."
     isBtn={true}
     open={open}
     setOpen={() => setOpen(!open)}
    >
      <ul className="space-y-2 max-h-[50vh] overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <li key={notification.id} className="p-2 border-b border-gray-200">
              <strong>{notification.title}</strong>: {notification.content}
              <p className="text-sm text-gray-500">Date: {format(new Date(notification.createdAt), 'yyyy-MM-dd')}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No notifications available.</p>
        )}
      </ul>
    </DialogWrapper>
  );
};
export default NotificationList;
