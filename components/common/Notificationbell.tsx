"use client"
import { IoNotificationsOutline } from 'react-icons/io5';
import { useState } from 'react';
import NotificationList from './NotificationList';

const NotificationBell = ({ userId }: { userId: string }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const handleClick = () => {
    setIsClicked(!isClicked); 
  };
  return (
    <div className="relative">
      <button title="notification(s)" onClick={handleClick} className="p-2 bg-transparent">
        <IoNotificationsOutline className={`w-6 h-6 ${isClicked ? 'text-gray-700' : 'text-red-950'}`} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
            {unreadCount}
          </span>
        )}
      </button>

    {isClicked && (
      <div className="absolute z-50 right-0 top-10 w-96 bg-white shadow-lg p-4 rounded-lg">
        <NotificationList userId={userId} onMarkAsRead={setUnreadCount} setUnreadCount={setUnreadCount} />
      </div>
    )}
  </div>
  );
};

export default NotificationBell;
