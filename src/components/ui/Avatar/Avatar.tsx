import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = 'User Avatar', size = 50 }) => {
  const defaultAvatar = '/images/default-profile.svg';
  return (
    <Image
      src={src || defaultAvatar}
      alt={alt}
      width={size}
      height={size}
      style={{ borderRadius: '50%', objectFit: 'cover' }}
    />
  );
};

export default Avatar;