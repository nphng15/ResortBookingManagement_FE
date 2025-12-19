import React from 'react';
import styles from './GuestIcon.module.css';

const ICONS: { [key: string]: React.ReactNode } = {
  user: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  baby: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path d="M19 6.3a9 9 0 0 1 1.8 3.9 4.5 4.5 0 0 1 0 3.6 9 9 0 0 1-1.8 3.9" />
      <path d="M3.2 13.8a9 9 0 0 1 0-3.6A9 9 0 0 1 5 6.3" />
      <path d="M7.7 3.2a9 9 0 0 1 3.4-1.3 4.5 4.5 0 0 1 1.8 0 9 9 0 0 1 3.4 1.3" />
      <path d="M16.3 20.8a9 9 0 0 1-3.4 1.3 4.5 4.5 0 0 1-1.8 0 9 9 0 0 1-3.4-1.3" />
    </svg>
  ),
};

interface RoomGuestInfoProps {
  guestCount: number;
  allowsChildren: boolean;
}

function GuestIcon({ guestCount, allowsChildren: _allowsChildren }: RoomGuestInfoProps) {
  return (
    <div className={styles.container}>
      <div className={styles.guestSection}>
        <span className={styles.icon}>{ICONS.user}</span>
        <span className={styles.guestCount}>{guestCount}</span>
      </div>

      {/* {allowsChildren && (
        <div className={styles.childSection}>
          <span className={styles.childIcon}>{ICONS.baby}</span>
        </div>
      )} */}
    </div>
  );
}

export default GuestIcon;
