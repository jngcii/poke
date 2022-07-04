import React from 'react';
import ButtonMemoryEdit from '../ButtonMemoryEdit';
import { EditingPropTypes } from '../SectionMemory';
import ButtonMemoryDelete from '../ButtonMemoryDelete';
import ButtonMemoryIn from '../ButtonMemoryIn';
import ButtonMemoryOut from '../ButtonMemoryOut';

export default React.memo((props: EditingPropTypes) => (
  <div>
    {props.editing && <ButtonMemoryDelete />}
    {props.editing && <ButtonMemoryIn />}
    {props.editing && <ButtonMemoryOut />}
    <ButtonMemoryEdit {...props} />
  </div>
));
