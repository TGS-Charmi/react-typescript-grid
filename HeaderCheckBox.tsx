import * as React from 'react';
import { IHeaderParams } from 'ag-grid-community';
import Checkbox from '@mui/material/Checkbox';

const HeaderCheckBox = (props: IHeaderParams) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    props.api.forEachNode((node: any) =>
      node.setSelected(event.target.checked)
    );
  };

  return (
    <div>
      <Checkbox
        sx={{ padding: '0px' }}
        size="small"
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </div>
  );
};

export default HeaderCheckBox;
