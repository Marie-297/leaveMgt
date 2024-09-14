import { IoNotificationsOutline } from 'react-icons/io5';
import { useState } from 'react';

const NotificationBell = ({ onClick }: { onClick: () => void }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
    onClick(); 
  };
  return (
    <div className="relative">
      <button onClick={handleClick} className="p-2 bg-transparent">
        <IoNotificationsOutline  className={`w-4 h-4 ${isClicked ? 'text-gray-700' : 'text-red-950'}`} />
      </button>
    </div>
  );
};

export default NotificationBell;
