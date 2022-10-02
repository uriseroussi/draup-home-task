import React, { ButtonHTMLAttributes, useRef, useState } from 'react';

type ripple = { x: number; y: number; show: boolean };

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<ripple[]>([]);

  const ripple = (e: React.MouseEvent) => {
    const btnRect = ref.current!.getBoundingClientRect();
    const x = e.clientX - btnRect.left;
    const y = e.clientY - btnRect.top;
    setRipples((value) => [...value, { x, y, show: true }]);
  };

  const endRippleAnimation = (index: number) => {
    ripples[index].show = false;
  };

  return (
    <button
      ref={ref}
      className={`relative button ${className ? className : ''}`}
      onBlur={() => setRipples([])}
      {...rest}
    >
      {children}
      <span
        className="absolute top-0 left-0 w-full h-full z-50"
        onClick={ripple}
      >
        {ripples.map((val, index) => {
          if (!val.show) return;
          return (
            <span
              key={index}
              className="ripple"
              style={{
                top: `${ripples[index].y}px`,
                left: `${ripples[index].x}px`,
              }}
              onAnimationEnd={() => endRippleAnimation(index)}
            ></span>
          );
        })}
      </span>
    </button>
  );
};

export default Button;
