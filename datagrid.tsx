import * as React from 'react';
import _ from 'lodash';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import '@inovua/reactdatagrid-enterprise/index.css';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Edit from '@mui/icons-material/Edit';
import History from '@mui/icons-material/History';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Chip from '@mui/material/Chip';
import DataConstant from './dataConstant';
import PIDCode from './PIDCode';
import componentDatasource from './componentData.json';

const gridStyle = { minHeight: 550, marginTop: 10 };

interface StandardsObj {
  stdClassName: string;
  colorCode: string;
}

const DataGrid = () => {
  const partType = DataConstant.PART_TYPE;
  const rohsImagePath = DataConstant.ROHS_BASE_PATH;
  const [isDestroyed, setIsDestroyed] = React.useState<boolean>(false);
  const [pagination, setPagination] = React.useState<boolean>(true);
  const [defaultLimit, setDefaultLimit] = React.useState<number>(100);

  const [columns, setColumns] = React.useState([
    {
      name: 'action',
      header: 'Action',
      defaultWidth: 130,
      hideFilter: true,
      render: (props: any) => (
        <div>
          <IconButton
            sx={{
              border: '1px solid',
              borderRadius: '5px',
              padding: '2px',
              marginRight: '2px',
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              border: '1px solid',
              borderRadius: '5px',
              padding: '2px',
              marginRight: '2px',
            }}
          >
            <CloudDownloadIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{ border: '1px solid', borderRadius: '5px', padding: '2px' }}
          >
            <History fontSize="small" />
          </IconButton>
        </div>
      ),
    },
    {
      name: 'rowNum',
      header: '#',
      defaultWidth: 90,
      hideFilter: true,
    },
    {
      name: 'serialNumber',
      defaultWidth: 130,
      header: 'SystemId',
      type: 'string',
    },
    {
      name: 'imageURL',
      header: 'Image',
      defaultWidth: 80,
      hideFilter: true,
      render: (row: any) =>
        row.value !== null && (
          <div>
            <img src={row.value} width={50} />
          </div>
        ),
    },
    {
      name: 'uploadedSamplePicturesCount',
      header: 'Sample Images',
      defaultWidth: 100,
      hideFilter: true,
      render: (row: any) => (
        <Tooltip title="View Sample Images">
          {row.value > 0 ? (
            <a className="text-decoration link-text">{row.value}</a>
          ) : (
            <span>{row.value}</span>
          )}
        </Tooltip>
      ),
    },
    {
      name: 'activityStartAt',
      header: 'Activity Started From (HH:MM:SS)',
      defaultWidth: 150,
      hideFilter: true,
      render: (row: any) =>
        row.value != null && <Chip color="warning" label={row.value} />,
    },
    {
      name: 'PIDCode',
      header: 'PID',
      type: 'string',
      defaultWidth: 400,
      render: (row: any) =>
        row.value !== null && (
          <div>
            <PIDCode
              id={row.data.id}
              value={row.value}
              mfgValue={row.data.mfgPN}
              isCopy={true}
              isSearchFindchip={false}
              isSearchDigiKey={false}
              isGoodPart={row.data.isGoodPart}
              isCustomPart={row.data.isCustom}
              rohsIcon={rohsImagePath + row.data.rohsIcon}
              rohsStatus={row.data.rohsComplientConvertedValue}
              restrictUsePermanently={row.data.restrictUsePermanently}
              restrictUseWithPermission={row.data.restrictUSEwithpermission}
              restrictPackagingUsePermanently={
                row.data.restrictPackagingUsePermanently
              }
              restrictPackagingUseWithPermission={
                row.data.restrictPackagingUseWithpermission
              }
              redirectionDisable={row.data.isDisabledUpdate}
            />
          </div>
        ),
    },
    {
      name: 'mfgCode',
      header: 'MFR',
      type: 'string',
      defaultWidth: 200,
      render: (row: any) =>
        row.value !== null && (
          <a className="text-decoration link-text">{row.value}</a>
        ),
    },
    {
      name: 'customerCode',
      header: 'Customer',
      type: 'string',
      defaultWidth: 200,
      render: (row: any) =>
        row.value !== null &&
        row.data.isCustOrDisty > 0 && (
          <a className="text-decoration link-text">{row.value}</a>
        ),
    },
    {
      name: 'mfrNameText',
      header: 'MFR (External)',
      defaultWidth: 200,
      type: 'string',
    },
    {
      name: 'mfgPN',
      header: 'MPN',
      type: 'string',
      defaultWidth: 350,
      render: (row: any) =>
        row.value !== null && (
          <div>
            <PIDCode
              id={row.data.id}
              value={row.data.PIDCode}
              mfgValue={row.value}
              isCopy={true}
              isGoodPart={row.data.isGoodPart}
              isCustomPart={
                partType.OTHER === row.data.partType ? true : row.data.isCustom
              }
              rohsIcon={rohsImagePath + row.data.rohsIcon}
              rohsStatus={row.data.rohsComplientConvertedValue}
              hasSubAssembly={row.data.subAssemblyCount}
              isSearchDigiKey={true}
              isSupplier={false}
              isSearchFindchip={true}
              restrictUsePermanently={row.data.restrictUsePermanently}
              restrictUseWithPermission={row.data.restrictUSEwithpermission}
              restrictPackagingUsePermanently={
                row.data.restrictPackagingUsePermanently
              }
              restrictPackagingUseWithPermission={
                row.data.restrictPackagingUseWithpermission
              }
              redirectionDisable={row.data.isDisabledUpdate}
            />
          </div>
        ),
    },
    {
      name: 'nickName',
      header: 'Nick Name',
      defaultWidth: 150,
      type: 'string',
      render: (row: any) => {
        row.value;
      },
    },
    {
      name: 'custAssyPN',
      header: 'Part#',
      defaultWidth: 350,
      type: 'string',
      render: (row: any) =>
        row.value !== null && (
          <div>
            <PIDCode
              id={row.data.id}
              value={row.value}
              isCopy={true}
              isCustomPart={true}
              isHideCopyPidCode={true}
              custPartNumber={row.value}
              rohsIcon={rohsImagePath + row.data.rohsIcon}
              rohsStatus={row.data.rohsComplientConvertedValue}
              isSupplier={false}
              isAssembly={true}
            />
          </div>
        ),
    },
    {
      name: 'rev',
      header: 'Revision',
      defaultWidth: 95,
      type: 'string',
    },
    {
      name: 'partStock',
      header: 'Stock',
      type: 'number',
      defaultWidth: 100,
      render: (row: any) =>
        row.value !== null && (
          <a className="text-decoration link-text">{row.value}</a>
        ),
    },

    {
      name: 'liveVersion',
      header: 'Internal Revision',
      defaultWidth: 110,
      type: 'string',
      render: (row: any) =>
        row.value ? (
          <div
            onClick={() => {
              alert('Bom History Popup');
            }}
          >
            <a className="text-decoration link-text">{row.value}</a>
          </div>
        ) : (
          <div>{row.value}</div>
        ),
    },
    {
      name: 'dataSheetLink',
      header: 'Data Sheet Link',
      defaultWidth: 120,
      type: 'string',
      render: (row: any) =>
        row.value ? (
          <a className="text-decoration link-text">Click Here</a>
        ) : (
          <div></div>
        ),
    },
    {
      name: 'mfgPNDescription',
      header: 'Description',
      defaultWidth: 400,
      type: 'string',
    },
    {
      name: 'detailDescription',
      header: 'Detailed Description',
      defaultWidth: 400,
      type: 'string',
    },
    {
      name: 'specialNote',
      header: 'Special Note',
      defaultWidth: 400,
      type: 'string',
    },
    {
      name: 'purchasingComment',
      header: 'Purchasing Comment',
      defaultWidth: 100,
      type: 'string',
      render: (row: any) =>
        row.value ? (
          <a className="text-decoration link-text">Click Here</a>
        ) : (
          <div></div>
        ),
    },
    {
      name: 'packagingName',
      header: 'Packaging',
      type: 'string',
      defaultWidth: 150,
      render: (row: any) => (
        <div
          className={
            row.data.packagingSourceName === DataConstant.PACKAGING.TBD
              ? 'input-color-red'
              : ''
          }
        >
          {row.value}
        </div>
      ),
    },
    {
      name: 'partStatusValue',
      header: `Part Status (Internal)`,
      type: 'string',
      defaultWidth: 100,
      render: (row: any) => (
        <div className={row.data.partStatus === -1 ? 'input-color-red' : ''}>
          {row.value}
        </div>
      ),
    },
    {
      name: 'partStatusText',
      header: `Part Status (External)`,
      defaultWidth: 100,
      type: 'string',
    },
    {
      name: 'functionalCategoryText',
      header: `Functional Type (External)`,
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'functionalCategoryName',
      header: `Functional Type (Internal)`,
      defaultWidth: 120,
      type: 'string',
      render: (row: any) => (
        <div
          className={
            row.data.functionalCategoryID === -1 ? 'input-color-red' : ''
          }
        >
          {row.value}
        </div>
      ),
    },
    {
      name: 'mountingTypeText',
      header: `Mounting Type (External)`,
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'mountingTypeName',
      header: `Mounting Type (Internal)`,
      defaultWidth: 120,
      type: 'string',
      render: (row: any) => (
        <div
          className={row.data.mountingTypeID === -1 ? 'input-color-red' : ''}
        >
          {row.value}
        </div>
      ),
    },
    {
      name: 'isCustomValue',
      header: 'Custom Part',
      defaultWidth: 120,
      filterType: 'select',
      type: 'string',
      filterEditorProps: {
        placeholder: 'All',
        dataSource: DataConstant.GRID_HEADER_DROPDOWN,
      },
      render: (row: any) => (
        <Chip
          className={row.data.isCustom === 0 ? 'chip-warning' : 'chip-success'}
          label={row.value}
          skipFocusWhenDisabled={false}
        />
      ),
    },
    {
      name: 'isCPNValue',
      header: `CPN Part`,
      defaultWidth: 100,
      filterType: 'select',
      type: 'string',
      filterEditorProps: {
        placeholder: 'All',
        dataSource: DataConstant.GRID_HEADER_DROPDOWN,
      },
      render: (row: any) => (
        <Chip
          className={row.data.isCPN === 0 ? 'chip-warning' : 'chip-success'}
          label={row.value}
          skipFocusWhenDisabled={false}
        />
      ),
    },
    {
      name: 'categoryName',
      header: 'Part Type',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'epicorType',
      header: 'Purchase Type',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'assemblyTypeName',
      header: 'Assembly Type',
      defaultWidth: 250,
      type: 'string',
    },
    {
      name: 'supplier',
      header: 'Source',
      type: 'string',
      defaultWidth: 100,
    },
    {
      name: 'operatingTemp',
      header: 'Operating Temperature (°C)',
      type: 'string',
      defaultWidth: 150,
    },
    {
      name: 'minOperatingTemp',
      header: 'Min Operating Temperature (Â°C)',
      type: 'number',
      filterType: 'number',
      defaultWidth: 130,
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'maxOperatingTemp',
      header: 'Max Operating Temperature (Â°C)',
      type: 'number',
      filterType: 'number',
      defaultWidth: 130,
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'connectorTypeText',
      header: 'Connector Type (External)',
      type: 'string',
      defaultWidth: 120,
    },
    {
      name: 'connecterTypeName',
      header: 'Connector Type (Internal)',
      type: 'string',
      defaultWidth: 120,
      render: (row: any) => (
        <div
          className={row.data.connecterTypeID === -1 ? 'input-color-red' : ''}
        >
          {row.value}
        </div>
      ),
    },
    {
      name: 'noOfPosition',
      header: 'Pin Count',
      type: 'number',
      filterType: 'number',
      defaultWidth: 120,
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'noOfRows',
      header: 'No. of Rows',
      type: 'number',
      filterType: 'number',
      defaultWidth: 120,
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'pitch',
      header: 'Pitch (Unit in mm)',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'pitchMating',
      header: 'Pitch Mating(Unit in mm)',
      defaultWidth: 150,
      type: 'string',
    },
    {
      name: 'sizeDimension',
      header: 'Size/Dimension',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'length',
      header: 'Size/Dimension Length',
      type: 'number',
      defaultWidth: 120,
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'width',
      header: 'Size/Dimension Width',
      type: 'number',
      defaultWidth: 120,
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'heightText',
      header: 'Height - Seated (Max)',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'height',
      header: 'Height - Seated (Max) Height',
      type: 'number',
      filterType: 'number',
      defaultWidth: 120,
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'tolerance',
      header: 'Tolerance',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'voltage',
      header: 'Voltage',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'value',
      header: 'Value',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'partPackage',
      header: `Package/Case(Shape) Type (External)`,
      defaultWidth: 130,
      type: 'string',
    },
    {
      name: 'packageCaseTypeValue',
      header: 'Package/Case(Shape) Type',
      defaultWidth: 130,
      type: 'string',
      render: ({ value }: any) => value,
    },
    {
      name: 'weight',
      header: 'Weight',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'powerRating',
      header: 'Power (Watts)',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'feature',
      header: 'Feature',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'isEpoxyMount',
      header: 'Epoxy Mount',
      type: 'string',
      defaultWidth: 120,
      filterType: 'select',
      filterEditorProps: {
        placeholder: 'All',
        dataSource: DataConstant.GRID_HEADER_DROPDOWN,
      },
      render: (row: any) => (
        <Chip
          className={
            row.data.isEpoxyMount === 'No' ? 'chip-warning' : 'chip-success'
          }
          label={row.value}
          skipFocusWhenDisabled={false}
        />
      ),
    },
    {
      name: 'color',
      header: 'Color',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'scrapValuePerBuild',
      header: 'Scrap Rate (Per Build)',
      defaultWidth: 120,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'scrapRatePercentagePerBuild',
      header: 'Scrap Rate (Per Build) (%)',
      defaultWidth: 120,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'plannedValuePerBuild',
      header: 'Planned Overrun (Per Build)',
      defaultWidth: 120,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'plannedOverRunPercentagePerBuild',
      header: 'Planned Overrun (Per Build) (%)',
      defaultWidth: 120,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'selfLifeDays',
      header: 'Shelf Life Days',
      defaultWidth: 120,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'shelfListDaysThresholdPercentage',
      header: 'Shelf Life Days (%)',
      defaultWidth: 120,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'supplierShortShipmentAcceptance',
      header: 'Supplier Short Shipment Acceptance(%)',
      defaultWidth: 120,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'supplierOverShipmentAcceptance',
      header: 'Supplier Overage Shipment Acceptance(%)',
      defaultWidth: 120,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'maxPriceLimit',
      header: 'Max. Price Limit',
      defaultWidth: 120,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'maxQtyonHand',
      header: 'Max. Qty on Hand',
      defaultWidth: 120,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'saftyStock',
      header: 'Min. Qty (Safety Stock)',
      defaultWidth: 120,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'eau',
      header: 'EAU',
      defaultWidth: 120,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'businessRisk',
      header: 'Business Risk',
      defaultWidth: 150,
      filterType: 'select',
      type: 'string',
      filterEditorProps: {
        placeholder: 'All',
        dataSource: DataConstant.BUSSINESS_RISK_GRID_HEADER_DROPDOWN,
      },
      render: (row: any) => row.value !== null && <span>{row.value}</span>,
    },
    {
      name: 'deviceMarking',
      header: 'Device Marking',
      defaultWidth: 100,
      type: 'string',
    },
    {
      name: 'minimum',
      header: 'Min',
      defaultWidth: 100,
      type: 'string',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'mult',
      header: 'Mult',
      defaultWidth: 100,
      type: 'string',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'umidSPQ',
      header: 'SPQ',
      defaultWidth: 100,
      type: 'number',
      filterType: 'number',
      render: (row: any) => <div className="text-right">{row.value}</div>,
    },
    {
      name: 'unitName',
      header: `UOM (Internal)`,
      defaultWidth: 100,
      type: 'string',
      filterType: 'select',
      render: ({ value }: any) => value,
    },
    {
      name: 'uomText',
      header: `UOM (External)`,
      defaultWidth: 100,
      type: 'string',
    },
    {
      name: 'pcbPerArray',
      header: 'PCB Per Array',
      defaultWidth: 100,
      type: 'string',
    },
    {
      name: 'grossWeight',
      header: 'Unit Gross Weight',
      defaultWidth: 100,
      type: 'string',
    },
    {
      name: 'packagingWeight',
      header: 'Unit Net Weight',
      defaultWidth: 100,
      type: 'string',
    },
    {
      name: 'ltbDate',
      header: 'LTB Date',
      dateFormat: 'MM/DD/YYYY',
      type: 'date',
      defaultWidth: 120,
      filterType: 'date',
      filterEditorProps: () => {
        return {
          dateFormat: 'MM/DD/YYYY',
          placeholder: 'MM/DD/YYYY hh:mm a',
        };
      },
      render: ({ value, cellProps: { dateFormat } }: any) =>
        value && value.slice(0, 10),
    },
    {
      name: 'eolDate',
      header: 'EOL Date',
      defaultWidth: 120,
      type: 'date',
      dateFormat: 'MM/DD/YYYY',
      filterType: 'date',
      filterEditorProps: () => {
        return {
          dateFormat: 'MM/DD/YYYY',
          placeholder: 'MM/DD/YYYY hh:mm a',
        };
      },
      render: ({ value, cellProps: { dateFormat } }: any) =>
        value && value.slice(0, 10),
    },
    {
      name: 'leadTime',
      header: 'Std. Lead Time (In week)',
      defaultWidth: 150,
      type: 'number',
      filterType: 'number',
    },
    {
      name: 'rohsComplientConvertedValue',
      header: `RoHS Status (Internal)`,
      defaultWidth: 120,
      render: (row: any) => (
        <div className={row.data.RoHSStatusID === -1 ? 'input-color-red' : ''}>
          {row.value}
        </div>
      ),
    },
    {
      name: 'rohsText',
      header: `RoHS Status (External)`,
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'mslName',
      header: 'MSL',
      type: 'string',
      render: ({ value }: any) => value,
    },
    {
      name: 'isGoodPartValue',
      header: 'Correct Part',
      type: 'string',
      defaultWidth: 120,
      filterType: 'select',
      filterEditorProps: {
        placeholder: 'All',
        dataSource: DataConstant.CORRECT_PART_GRID_HEADER_DROPDOWN,
      },
      render: (row: any) => (
        <Chip
          className={
            row.data.isGoodPartValue === 'Incorrect Part'
              ? 'chip-warning'
              : row.data.isGoodPartValue === 'Correct Part'
              ? 'chip-success'
              : 'chip-danger'
          }
          label={row.value}
          skipFocusWhenDisabled={false}
        />
      ),
    },
    {
      name: 'restrictionSetting',
      header: 'Restriction Setting',
      defaultWidth: 350,
      hideFilter: true,
      render: (row: any) => <div> {row.value} </div>,
    },
    {
      name: 'certificatelist',
      header: 'Standards',
      defaultWidth: 300,
      hideFilter: true,
      render: (row: any) => <div> {row.value} </div>,
    },
    {
      name: 'isExportControl',
      header: 'Export Controlled',
      type: 'string',
      defaultWidth: 120,
      filterType: 'select',
      filterEditorProps: {
        placeholder: 'All',
        dataSource: DataConstant.GRID_HEADER_DROPDOWN,
      },
      render: (row: any) => (
        <Chip
          className={
            row.data.isExportControl === 'No' ? 'chip-warning' : 'chip-success'
          }
          label={row.value}
          skipFocusWhenDisabled={false}
        />
      ),
    },
    {
      name: 'obsoleteDate',
      header: 'Obsolete Date',
      filterType: 'date',
      dateFormat: 'MM/DD/YYYY',
      defaultWidth: 120,
      type: 'date',
      filterEditorProps: () => {
        return {
          dateFormat: 'MM/DD/YYYY',
          placeholder: 'MM/DD/YYYY hh:mm a',
        };
      },
      render: ({ value, cellProps: { dateFormat } }: any) =>
        value && value.slice(0, 10),
    },
    {
      name: 'reversalDate',
      header: 'Reversal Date',
      dateFormat: 'MM/DD/YYYY',
      defaultWidth: 120,
      filterType: 'date',
      type: 'date',
      filterEditorProps: () => {
        return {
          dateFormat: 'MM/DD/YYYY',
          placeholder: 'MM/DD/YYYY hh:mm a',
        };
      },
      render: ({ value, cellProps: { dateFormat } }: any) =>
        value && value.slice(0, 10),
    },
    {
      name: 'reversalPart',
      header: 'Reversal Part',
      defaultWidth: 100,
      type: 'string',
      render: (row: any) => (
        <Chip
          className={row.value === 'No' ? 'chip-warning' : 'chip-success'}
          label={row.value}
          skipFocusWhenDisabled={false}
        />
      ),
    },
    {
      name: 'updatedAtApiValue',
      header: 'Last Cloud API Update Date',
      dateFormat: 'MM/DD/YYYY',
      defaultWidth: 120,
      filterType: 'date',
      type: 'date',
      filterEditorProps: () => {
        return {
          dateFormat: 'MM/DD/YYYY',
          placeholder: 'MM/DD/YYYY hh:mm a',
        };
      },
      render: ({ value, cellProps: { dateFormat } }: any) =>
        value && value.slice(0, 10),
    },
    {
      name: 'frequencyName',
      header: 'Charge Frequency',
      defaultWidth: 120,
      type: 'string',
    },
    {
      name: 'isWaterSolubleConvertedValue',
      header: 'Water Soluble',
      defaultWidth: 120,
      type: 'string',
      filterType: 'select',
      filterEditorProps: {
        placeholder: 'All',
        dataSource: DataConstant.GRID_HEADER_DROPDOWN,
      },
      render: (row: any) => (
        <Chip
          className={
            row.data.isWaterSoluble === 0 ? 'chip-warning' : 'chip-success'
          }
          label={row.value}
          skipFocusWhenDisabled={false}
        />
      ),
    },
    {
      name: 'isNoCleanConvertedValue',
      header: 'No-Clean',
      defaultWidth: 120,
      type: 'string',
      filterType: 'select',
      filterEditorProps: {
        placeholder: 'All',
        dataSource: DataConstant.GRID_HEADER_DROPDOWN,
      },
      render: (row: any) => (
        <Chip
          className={row.data.isNoClean === 0 ? 'chip-warning' : 'chip-success'}
          label={row.value}
          skipFocusWhenDisabled={false}
        />
      ),
    },
    {
      name: 'isHazmatMaterialValue',
      header: 'Hazmat Material',
      defaultWidth: 120,
      type: 'string',
      filterType: 'select',
      filterEditorProps: {
        placeholder: 'All',
        dataSource: DataConstant.GRID_HEADER_DROPDOWN,
      },
      render: (row: any) => (
        <Chip
          className={
            row.data.isHazmatMaterial === 0 ? 'chip-warning' : 'chip-success'
          }
          label={row.value}
          skipFocusWhenDisabled={false}
        />
      ),
    },
    {
      name: 'isReceiveBulkConvertedValue',
      header: 'Receive as a Bulk item',
      defaultWidth: 120,
      type: 'string',
      filterType: 'select',
      filterEditorProps: {
        placeholder: 'All',
        dataSource: DataConstant.GRID_HEADER_DROPDOWN_WITH_NA,
      },
      render: (row: any) => (
        <Chip
          className={
            row.data.isReceiveBulkConvertedValue === 'Yes'
              ? 'chip-success'
              : row.data.isReceiveBulkConvertedValue === 'N/A'
              ? 'chip-info'
              : 'chip-warning'
          }
          label={row.value}
          skipFocusWhenDisabled={false}
        />
      ),
    },
    {
      name: 'PurchaseCOA',
      header: 'Purchase COA',
      defaultWidth: 200,
      type: 'string',
    },
    {
      name: 'SalesCOA',
      header: 'Sales COA',
      defaultWidth: 200,
      type: 'string',
    },
    {
      name: 'updatedAtValue',
      header: 'Modified Date',
      dateFormat: 'MM/DD/YYYY hh:mm a',
      defaultWidth: 120,
      filterType: 'date',
      type: 'date',
      filterEditorProps: () => {
        return {
          dateFormat: 'MM/DD/YYYY',
          placeholder: 'MM/DD/YYYY hh:mm a',
        };
      },
      render: ({ value, cellProps: { dateFormat } }: any) =>
        value && value.slice(0, 10),
    },
    {
      name: 'updatedbyValue',
      defaultWidth: 100,
      header: 'Last Modified By',
      type: 'string',
    },
    {
      name: 'updatedbyRoleValue',
      defaultWidth: 100,
      header: 'Last Modified By Role',
      type: 'string',
    },
    {
      name: 'createdAtValue',
      defaultWidth: 120,
      header: 'Created Date',
      type: 'date',
      dateFormat: 'MM/DD/YYYY hh:mm a',
      filterType: 'date',
      filterEditorProps: () => {
        return {
          dateFormat: 'MM/DD/YYYY',
          placeholder: 'MM/DD/YYYY hh:mm a',
        };
      },
      render: ({ value, cellProps: { dateFormat } }: any) =>
        value && value.slice(0, 10),
    },
    {
      name: 'createdbyValue',
      defaultWidth: 100,
      header: 'Created By',
      type: 'string',
    },
    {
      name: 'createdbyRoleValue',
      defaultWidth: 100,
      header: 'Created By Role',
      type: 'string',
    },
    {
      name: 'SystemGeneratedValue',
      header: 'System Generated',
      defaultWidth: 120,
      type: 'string',
      filterType: 'select',
      filterEditorProps: {
        placeholder: 'All',
        dataSource: DataConstant.GRID_HEADER_DROPDOWN,
      },
      render: (row: any) => (
        <Chip
          className={
            row.data.systemGenerated === 1 ? 'chip-success' : 'chip-warning'
          }
          label={row.value}
          skipFocusWhenDisabled={false}
        />
      ),
    },
  ]);

  const [defaultFilterValue, setDefaultFilterValue] = React.useState(
    columns
      ?.filter((item) => !item.hideFilter)
      .map((item, index) => {
        const filterTypeKey: any = item.filterType;
        const filterType =
          ReactDataGrid.defaultProps.filterTypes[filterTypeKey];
        const filterObj = {
          name: item.name || index.toString(),
          type: item.type || 'string',
          operator:
            ['bool', 'boolean', 'number', 'select'].indexOf(
              item.type || 'string'
            ) !== -1
              ? 'eq'
              : 'contains',
          value: filterType ? filterType.emptyValue : '',
        };
        return filterObj;
      })
  );

  const recreateGrid = () => {
    setIsDestroyed(false);
  };

  const destroyGrid = () => {
    setPagination(!pagination);
    setIsDestroyed(true);
    setTimeout(() => recreateGrid(), 0);
  };

  const onChangeLoadSize = (pageSize) => {
    setDefaultLimit(pageSize);
    setIsDestroyed(true);
    setTimeout(() => recreateGrid(), 0);
  };

  const formatStanradrdsOfGridData = (partList: any[]) => {
    const existsCertiOfPartList = _.filter(
      partList,
      (item) => item.certificatelist
    );
    _.each(existsCertiOfPartList, (itemCerti, index) => {
      const partCertificationDetListWithNewLine: StandardsObj[] = [];
      const classWithColorCode = itemCerti.certificatelist.split('@@@@@@');
      _.each(classWithColorCode, (itemColor) => {
        if (itemColor) {
          const objItem = itemColor.split('######');
          const standardClassObj: StandardsObj = {
            stdClassName: '',
            colorCode: '',
          };
          standardClassObj.stdClassName = objItem[0].trim();
          standardClassObj.colorCode = objItem[1]
            ? objItem[1]
            : 'rgb(25,25,112)';
          partCertificationDetListWithNewLine.push(standardClassObj);
        }
      });
      itemCerti.partCertificationDetListWithNewLine =
        partCertificationDetListWithNewLine;
      itemCerti.certificatelist = _.map(
        partCertificationDetListWithNewLine,
        'stdClassName'
      ).toString();
    });
  };

  const loadData = async (dataOption: any) => {
    try {
      console.log('dataOption', dataOption);
      const SearchColumns = dataOption.filterValue
        ?.filter((item) => item.value)
        ?.map((item) => ({
          ColumnName: item.name,
          SearchString: item.value,
        }));
      const SortColumns = dataOption.sortInfo?.map((item) => [
        item.name,
        item.dir === 1 ? 'ASC' : 'DESC',
      ]);
      let datasource: any = _.clone(componentDatasource);
      formatStanradrdsOfGridData(datasource);
      _.map(datasource, (item, index) => {
        item.rowNum = index + 1;
      });
      if (SortColumns && SortColumns.length > 0) {
        datasource = _.orderBy(
          datasource,
          SortColumns.map((item: any) => item[0]),
          SortColumns.map((item: any) => item[1]?.toLowerCase())
        );
      }

      if (SearchColumns && SearchColumns.length > 0) {
        _.each(SearchColumns, (columns: any) => {
          datasource = _.filter(datasource, (item: any) => {
            return item[columns.ColumnName]
              ?.toLowerCase()
              .includes(columns.SearchString?.toLowerCase());
          });
        });
      }
      const Count = componentDatasource.length;
      let totallimit = dataOption.skip + defaultLimit;
      let component = datasource.slice(dataOption.skip, totallimit);
      return { data: component || [], count: Count };
    } catch (error) {
      console.log(error);
      return { data: [], count: 0 };
    }
  };

  const dataSource = React.useCallback(loadData, []);

  return !isDestroyed ? (
    <div>
      <div style={{ margin: '5px' }}>
        <button style={{ marginRight: '5px' }} onClick={destroyGrid}>
          Active {!pagination ? 'Scolling' : 'Pagination'}
        </button>
        <button
          style={{ marginRight: '5px' }}
          onClick={() => onChangeLoadSize(defaultLimit === 100 ? 500 : 100)}
        >
          Load {defaultLimit === 100 ? '500' : '100'}
        </button>
      </div>
      <ReactDataGrid
        idProperty="id"
        pagination
        livePagination={pagination}
        columns={columns}
        dataSource={dataSource}
        style={gridStyle}
        defaultSortInfo={[]}
        defaultLimit={defaultLimit}
        checkboxColumn={true}
        defaultFilterValue={defaultFilterValue}
        enableFiltering={true}
        enableColumnFilterContextMenu={false}
        showColumnMenuGroupOptions={false}
        defaultGroupBy={undefined}
        showFilteringMenuItems={false}
        rowReorderColumn={false}
        copySpreadsheetCompatibleString={false}
        defaultCellSelection={{}}
        enableClipboard={false}
        columnUserSelect={true}
        nativeScroll={true}
        showColumnMenuFilterOptions={false}
        pageSizes={[25, 50, 100, 200, 500]}
        virtualizeColumns={true}
      />
    </div>
  ) : (
    <div />
  );
};

export default DataGrid;
