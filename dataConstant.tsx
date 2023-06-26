const DataConstant = {
  ROHS_BASE_PATH: `https://devapi-fjt.i-nnate.com/uploads/rohs/images/`,
  PART_TYPE: {
    COMPONENT: 2,
    SUB_ASSY: 3,
    OTHER: 4,
  },
  PACKAGING: {
    TAPE_REEL: 'Tape & Reel',
    CUTE_TAPE: 'Cut Tape',
    CUSTOM_REEL: 'Custom Reel',
    BULK: 'Bulk',
    TBD: 'TBD',
  },
  GRID_HEADER_DROPDOWN: [
    { id: null, label: 'All' },
    { id: 'Yes', label: 'Yes' },
    { id: 'No', label: 'No' },
  ],
  GRID_HEADER_DROPDOWN_WITH_NA: [
    { id: null, label: 'All' },
    { id: 'Yes', label: 'Yes' },
    { id: 'N/A', label: 'N/A' },
    { id: 'No', label: 'No' },
  ],
  BUSSINESS_RISK_GRID_HEADER_DROPDOWN: [
    { id: null, label: 'All' },
    { id: 'Critical', label: 'Critical' },
    { id: 'High', label: 'High' },
    { id: 'Medium', label: 'Medium' },
    { id: 'Low', label: 'Low' },
  ],
  CORRECT_PART_GRID_HEADER_DROPDOWN: [
    { id: null, label: 'All' },
    { id: 1, label: 'Correct Part' },
    { id: 2, label: 'Incorrect Part' },
    { id: 3, label: 'TBD Part' },
  ],
};
export default DataConstant;
