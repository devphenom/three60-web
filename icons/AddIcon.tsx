import * as React from 'react';

function AddIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-icon="github"
      {...props}
    >
      <path
        d="M12.5864 22C18.1093 22 22.5864 17.5228 22.5864 12C22.5864 6.47715 18.1093 2 12.5864 2C7.06358 2 2.58643 6.47715 2.58643 12C2.58643 17.5228 7.06358 22 12.5864 22Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5864 8V16"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.58643 12H16.5864"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default AddIcon;
