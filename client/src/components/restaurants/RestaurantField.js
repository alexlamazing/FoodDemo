import React from 'react';

export default ({ input, label, placeholder, meta }) => {
  return (
    <div>
      <label className="black-text" style={{ fontSize: '16px' }}>{label}</label>
      <input {...input} placeholder={placeholder} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {meta.touched && meta.error}
      </div>
    </div>
  );
};
