import React from 'react';

export default ({ input, placeholder, meta }) => {
  return (
    <div>
      <input placeholder={placeholder} {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {meta.touched && meta.error}
      </div>
    </div>
  );
};
