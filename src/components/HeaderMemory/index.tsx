import React from 'react';
import ButtonMemoryEdit from '../ButtonMemoryEdit';
import { EditingPropTypes } from '../SectionMemory';

export default React.memo((props: EditingPropTypes) => (
  <div>
    <ButtonMemoryEdit {...props} />
  </div>
));
