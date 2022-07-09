import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { EditingPropTypes } from '../SectionMemory';
import ButtonMemoryEdit from '../ButtonMemoryEdit';
import ButtonMemoryDelete from '../ButtonMemoryDelete';
import ButtonMemoryIn from '../ButtonMemoryIn';
import ButtonMemoryOut from '../ButtonMemoryOut';

export default React.memo((props: EditingPropTypes) => {
  const { memory: { inEditing } } = useSelector((state: RootState) => state);
  return (
    <div>
      {props.editing && <ButtonMemoryIn />}
      {props.editing && !inEditing && <ButtonMemoryOut />}
      {props.editing && !inEditing && <ButtonMemoryDelete />}
      <ButtonMemoryEdit {...props} />
    </div>
  );
});
