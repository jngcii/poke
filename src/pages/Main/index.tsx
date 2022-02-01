import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleMemory } from '../../redux/slices/defaultSlice';
import { getAllPost } from '../../redux/slices/postSlice';
import { getAllItem } from '../../redux/slices/itemSlice';
import { getAllMemory } from '../../redux/slices/memorySlice';
import HeaderMain from '../../components/HeaderMain';
import SectionHome from '../../components/SectionHome';
import SectionMemory from '../../components/SectionMemory';
import './style.scss';

export default React.memo(() => {
  const { isMemoryOpen } = useSelector((state: RootState) => state.default);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getAllItem());
    dispatch(getAllMemory());
    dispatch(toggleMemory());
  }, []);

  return (
    <div className="page-main-wrapper">
      <div className="page-main-left">
        <HeaderMain />
        <SectionHome />
      </div>

      <div className={`page-main-right ${isMemoryOpen && 'page-main-right-open'}`}>
        <SectionMemory />
      </div>
    </div>
  );
});
