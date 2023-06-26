import * as React from 'react';
import { render } from 'react-dom';
import ' ./style.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AGGrid from './aggrid.tsx';
import DataGrid from './datagrid.tsx';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const App = () => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Grid Demo" {...a11yProps(0)} />
          <Tab label="React AG Grid" {...a11yProps(1)} />
          <Tab label="React Data Grid" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          Select the tab based on which grid you want to check. To check
          document check below link:
          <div>
            1.
            <a
              className="text-decoration link-text"
              target="_blank"
              href="https://ag-grid.com/react-data-grid/getting-started/"
            >
              React AG Grid
            </a>
          </div>
          <div>
            2.
            <a
              className="text-decoration link-text"
              target="_blank"
              href="https://reactdatagrid.io/docs/getting-started"
            >
              React Data Grid
            </a>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AGGrid />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DataGrid />
      </TabPanel>
    </Box>
  );
};

render(<App />, document.getElementById('root'));
