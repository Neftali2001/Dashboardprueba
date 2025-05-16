import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
  'flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-primaryGreen active:hover:bg-primaryGreen/90 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
  className
)}
style={{ backgroundColor: '#005a53' }}

    >
      {children}
    </button>
  );
}
