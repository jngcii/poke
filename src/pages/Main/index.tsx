import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPost } from '../../redux/slices/postSlice';
import { getAllItem } from '../../redux/slices/itemSlice';
import MainHeader from '../../components/MainHeader';
import SectionHome from '../../components/SectionHome';

export default React.memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getAllItem());
  }, []);

  return (
    <div>
      <MainHeader />
      <SectionHome />
    </div>
  );
});
