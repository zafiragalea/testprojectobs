import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
    }}
  >
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#f01a89"
      ariaLabel="three-dots-loading"
      visible={true}
    />
  </div>
);

export default Loading;
