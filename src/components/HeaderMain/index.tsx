import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleMemory } from '../../redux/slices/defaultSlice';
import './style.scss';

export default React.memo(() => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleMemory());
  };

  return (
    <header className="component-main-header-wrapper">
      <div className="component-main-header-title">
        <h2>POKE</h2>
      </div>

      <div className="component-main-header-menu" />

      <div className="component-main-header-memory-toggle">
        <button
          className="component-main-header-memory-toggle-button"
          type="button"
          onClick={toggle}
        >
          MEMORY
        </button>
      </div>
    </header>
  );
});
