'use client';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import NotificationList from './NotificationList';

const NotificationBell = ({ userId }: { userId: string }) => {
	const [isClicked, setIsClicked] = useState(false);
	const [unreadCount, setUnreadCount] = useState<number>(0);

	// useEffect(() => {
  //   const fetchUnreadCount = async () => {
  //     try {
  //       const response = await fetch(`/api/notifications/unread-count?userId=${userId}`);
  //       const { count } = await response.json();
  //       setUnreadCount(count);
  //     } catch (error) {
  //       console.error('Failed to fetch unread notifications count:', error);
  //     }
  //   };

  //   fetchUnreadCount();
  // }, [userId]);

	const handleClick = () => {
		setIsClicked(!isClicked);
		if (!isClicked && unreadCount > 0) {
      markAllAsRead();
    }
	};

	const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications/mark-all-read', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
    }
  };

	return (
		<div className='relative'>
			<button
				title='notification(s)'
				onClick={handleClick}
				className='p-2 bg-transparent dark:bg-gray-400 rounded-full relative'
			>
				<IoNotificationsOutline
					className={`lg:w-6 lg:h-6 w-5 h-5 ${isClicked ? 'text-gray-700' : 'text-red-950'}`}
				/>
				{unreadCount > 0 && (
					<span className='absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1'>
						{unreadCount}
					</span>
				)}
			</button>

			{isClicked && (
				<div className="absolute z-50 right-0 top-10 w-96 bg-white shadow-lg p-4 rounded-lg">
					<NotificationList userId={userId} setUnreadCount={setUnreadCount} />
				</div>
			)}
		</div>
  );
};

export default NotificationBell;
