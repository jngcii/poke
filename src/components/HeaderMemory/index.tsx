import React from 'react';
import ButtonMemoryPrev from '../ButtonMemoryPrev';
import ButtonMemoryEdit from '../ButtonMemoryEdit';
import { EditingPropTypes } from '../SectionMemory';

export default React.memo((props: EditingPropTypes) => (
  <div>
    <ButtonMemoryPrev />
    <ButtonMemoryEdit {...props} />
  </div>
));
