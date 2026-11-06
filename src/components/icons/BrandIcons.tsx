import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

// 1. Google Review Official Local SVG Logo
export function GoogleReviewIcon({ className = "w-6 h-6", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

// 2. Instagram Official Local SVG Logo
export function InstagramIcon({ className = "w-6 h-6", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient id="ig-grad-1" cx="20%" cy="110%" r="130%">
          <stop offset="0%" stopColor="#ffc107" />
          <stop offset="20%" stopColor="#f44336" />
          <stop offset="60%" stopColor="#9c27b0" />
        </radialGradient>
        <radialGradient id="ig-grad-2" cx="0%" cy="100%" r="90%">
          <stop offset="0%" stopColor="#ffca28" />
          <stop offset="50%" stopColor="#f44336" />
          <stop offset="100%" stopColor="#e91e63" />
        </radialGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#ig-grad-1)" />
      <rect width="48" height="48" rx="12" fill="url(#ig-grad-2)" opacity="0.4" />
      <path
        d="M34 10H14C11.8 10 10 11.8 10 14V34C10 36.2 11.8 38 14 38H34C36.2 38 38 36.2 38 34V14C38 11.8 36.2 10 34 10ZM35 34C35 34.55 34.55 35 34 35H14C13.45 35 13 34.55 13 34V14C13 13.45 13.45 13 14 13H34C34.55 13 35 13.45 35 14V34Z"
        fill="white"
      />
      <circle cx="24" cy="24" r="6.5" stroke="white" strokeWidth="2.8" />
      <circle cx="31.5" cy="16.5" r="1.8" fill="white" />
    </svg>
  );
}

// 3. WhatsApp Official Local SVG Logo
export function WhatsAppIcon({ className = "w-6 h-6", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="48" height="48" rx="12" fill="#25D366" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 10C16.27 10 10 16.27 10 24C10 26.68 10.76 29.21 12.07 31.36L10.5 37.5L16.82 35.88C18.9 37.07 21.36 37.77 24 37.77C31.73 37.77 38 31.5 38 23.77C38 16.04 31.73 10 24 10ZM24 35.43C21.67 35.43 19.51 34.78 17.66 33.66L17.22 33.39L13.12 34.44L14.2 30.45L13.9 30C12.67 28.16 12.02 26.01 12.02 23.77C12.02 17.16 17.39 11.79 24 11.79C30.61 11.79 35.98 17.16 35.98 23.77C35.98 30.38 30.61 35.43 24 35.43ZM30.73 27.67C30.36 27.48 28.56 26.6 28.23 26.48C27.9 26.36 27.65 26.3 27.41 26.67C27.17 27.04 26.49 27.84 26.28 28.09C26.08 28.33 25.87 28.36 25.5 28.18C25.13 28 23.94 27.61 22.53 26.35C21.43 25.37 20.69 24.15 20.48 23.78C20.28 23.41 20.46 23.21 20.65 23.03C20.81 22.86 21.02 22.59 21.2 22.38C21.38 22.17 21.45 22.01 21.57 21.77C21.69 21.52 21.63 21.31 21.54 21.12C21.45 20.94 20.71 19.12 20.4 18.39C20.1 17.67 19.8 17.77 19.58 17.76C19.38 17.75 19.14 17.75 18.89 17.75C18.65 17.75 18.25 17.84 17.92 18.21C17.58 18.57 16.66 19.43 16.66 21.19C16.66 22.95 17.95 24.64 18.13 24.89C18.31 25.13 20.65 28.74 24.23 30.29C25.08 30.66 25.75 30.88 26.27 31.05C27.12 31.32 27.9 31.28 28.51 31.19C29.2 31.09 30.63 30.33 30.93 29.49C31.23 28.65 31.23 27.94 31.14 27.79C31.05 27.64 30.82 27.56 30.45 27.37L30.73 27.67Z"
        fill="white"
      />
    </svg>
  );
}

// 4. Facebook Official Local SVG Logo
export function FacebookIcon({ className = "w-6 h-6", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="48" height="48" rx="12" fill="#1877F2" />
      <path
        d="M29.5 25.2L30.5 18.7H24.3V14.5C24.3 12.7 25.2 11 28 11H30.8V5.5C30.8 5.5 28.2 5 25.8 5C20.7 5 17.4 8.1 17.4 13.7V18.7H11.7V25.2H17.4V41H24.3V25.2H29.5Z"
        fill="white"
      />
    </svg>
  );
}

// 5. Website / Globe Official Local SVG Logo
export function WebsiteIcon({ className = "w-6 h-6", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="48" height="48" rx="12" fill="#0EA5E9" />
      <circle cx="24" cy="24" r="14" stroke="white" strokeWidth="2.8" />
      <ellipse cx="24" cy="24" rx="6.5" ry="14" stroke="white" strokeWidth="2.8" />
      <path d="M10 24H38" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

// 6. NFC Contactless Waves Indicator
export function NfcWaveIcon({ className = "w-6 h-6", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6 8.5C7.5 7 9.5 6 12 6s4.5 1 6 2.5" />
      <path d="M3.5 5.5C6 3 9 1.5 12 1.5s6 1.5 8.5 4" />
      <path d="M8.5 11.5C9.5 10.5 10.7 10 12 10s2.5.5 3.5 1.5" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Helper to render local icon according to link type
export function LocalBrandIcon({
  type,
  className = "w-7 h-7",
  size,
}: {
  type: string;
  className?: string;
  size?: number;
}) {
  switch (type) {
    case 'google_review':
      return <GoogleReviewIcon className={className} size={size} />;
    case 'instagram':
      return <InstagramIcon className={className} size={size} />;
    case 'whatsapp':
      return <WhatsAppIcon className={className} size={size} />;
    case 'facebook':
      return <FacebookIcon className={className} size={size} />;
    case 'website':
    default:
      return <WebsiteIcon className={className} size={size} />;
  }
}

