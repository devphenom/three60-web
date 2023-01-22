import * as React from 'react';

export function NoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="13"
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-icon="notes"
      {...props}
    >
      <path
        d="M0 0V12.7656H9.57816L15.3445 7.96843V0H0ZM1.0403 0.865466H14.3041V6.70736H8.06234V11.9002H1.0403V0.865466ZM9.14728 11.9002H9.10264V7.57283H14.3041V7.60996L9.14728 11.9002Z"
        fill="#4673E4"
      />
    </svg>
  );
}
