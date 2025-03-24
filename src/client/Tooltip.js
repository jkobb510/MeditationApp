import React, { useState } from 'react';

const Tooltip = ({ iconSrc, children, position = { top: '30px', right: '30px' }, iconSize = 20 }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          ...position,
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          cursor: 'pointer',
        }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <img
          src={iconSrc}
          alt="info"
          style={{
            width: '100%',
            height: '100%',
            filter: 'invert(100%) brightness(100%)',
          }}
        />
      </div>

      {visible && (
        <div
          style={{
            position: 'absolute',
            top: `calc(${position.top} + ${iconSize + 10}px)`,
            right: position.right,
            backgroundColor: '#222',
            color: '#fff',
            padding: '10px 14px',
            fontSize: '14px',
            border: '1px solid #cfcfcf',
            borderRadius: '6px',
            zIndex: 1000,
            maxWidth: '280px',
            lineHeight: '1.6',
            textAlign: 'left',
            whiteSpace: 'normal',
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Tooltip;