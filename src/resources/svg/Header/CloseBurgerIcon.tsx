import type { FC, SVGProps } from 'react';

const CloseBurgerIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M19.7783 4.2218L4.22197 19.7781'
        stroke='#1D9BF0'
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
      />
      <path
        d='M19.7783 19.7782L4.22197 4.22185'
        stroke='#1D9BF0'
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default CloseBurgerIcon;
