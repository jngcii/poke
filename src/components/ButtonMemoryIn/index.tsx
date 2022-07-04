import React from 'react';
import './style.scss';

export default React.memo(() => {
  const onClickInButton = () => {
    console.log('on click memory in button.');
  };

  return (
    <div className="component-button-memory-in-wrapper">
      <button type="button" onClick={onClickInButton}>
        IN
      </button>
    </div>
  );
});
