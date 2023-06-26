import * as React from 'react';
import { render } from 'react-dom';
import {
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
  IGetRowsParams,
  IDatasource,
  SideBarDef,
  RowClassParams,
  IHeaderParams,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import _ from 'lodash';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';
import History from '@mui/icons-material/History';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import HeaderCheckBox from './HeaderCheckBox';
import PIDCode from './PIDCode';
import DataConstant from './dataConstant';
import componentDatasource from './componentData.json';

interface StandardsObj {
  stdClassName: string;
  colorCode: string;
}

const AGGrid = () => {
  const gridRef = React.useRef<AgGridReact>(null);
  const [gridApi, setGridApi] = React.useState<GridReadyEvent>();
  const [isDestroyed, setIsDestroyed] = React.useState<boolean>(false);
  const [pagination, setPagination] = React.useState<boolean>(true);
  const [paginationPageSize, setPaginationPageSize] =
    React.useState<number>(100);
  const partType = DataConstant.PART_TYPE;
  const rohsImagePath = DataConstant.ROHS_BASE_PATH;
  const [defaultColDef, setDefaultColDef] = React.useState<ColDef>({
    sortable: true,
    flex: 1,
    minWidth: 200,
    filter: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    floatingFilter: true,
    enableRowGroup: true,
    enableValue: true,
  });
  const [columnDefs, setColumnDefs] = React.useState<ColDef[]>([
    {
      headerName: ' ',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      floatingFilter: false,
      suppressMenu: true,
      minWidth: 55,
      sortable: false,
      filter: false,
      suppressColumnsToolPanel: true,
      headerComponent: (props: IHeaderParams) => <HeaderCheckBox {...props} />,
    },
    {
      headerName: 'Action',
      sortable: false,
      filter: false,
      minWidth: 120,
      cellRenderer: (props: ICellRendererParams) => (
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
      headerName: '#',
      field: 'rowNum',
      minWidth: 70,
      sortable: false,
      type: 'numericColumn',
      filter: false,
    },
    {
      headerName: 'SystemId',
      field: 'serialNumber',
      minWidth: 150,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Image',
      field: 'imageURL',
      minWidth: 100,
      cellRenderer: (props: ICellRendererParams) =>
        props.value !== null && (
          <div>
            <img src={props.value} width={50} />
          </div>
        ),
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Sample Images',
      field: 'uploadedSamplePicturesCount',
      minWidth: 100,
      sortable: false,
      filter: false,
      cellRenderer: (props: ICellRendererParams) => (
        <Tooltip title="View Sample Images">
          {props.value > 0 ? (
            <a className="text-decoration link-text">{props.value}</a>
          ) : (
            <span>{props.value}</span>
          )}
        </Tooltip>
      ),
    },
    {
      headerName: 'Activity Started From (HH:MM:SS)',
      field: 'activityStartAt',
      minWidth: 200,
      filter: false,
      sortable: false,
      cellRenderer: (props: ICellRendererParams) =>
        props.value != null && <Chip color="warning" label={props.value} />,
    },
    {
      headerName: 'PID',
      field: 'PIDCode',
      minWidth: 325,
      filter: 'agTextColumnFilter',
      cellRenderer: (props: ICellRendererParams) =>
        props.value !== null &&
        props.data && (
          <div>
            <PIDCode
              id={props.data.id}
              value={props.value}
              mfgValue={props.data.mfgPN}
              isCopy={true}
              isSearchFindchip={false}
              isSearchDigiKey={false}
              isGoodPart={props.data.isGoodPart}
              isCustomPart={props.data.isCustom}
              rohsIcon={rohsImagePath + props.data.rohsIcon}
              rohsStatus={props.data.rohsComplientConvertedValue}
              restrictUsePermanently={props.data.restrictUsePermanently}
              restrictUseWithPermission={props.data.restrictUSEwithpermission}
              restrictPackagingUsePermanently={
                props.data.restrictPackagingUsePermanently
              }
              restrictPackagingUseWithPermission={
                props.data.restrictPackagingUseWithpermission
              }
              redirectionDisable={props.data.isDisabledUpdate}
            />
          </div>
        ),
    },
    {
      headerName: 'MFR',
      cellRenderer: (props: ICellRendererParams) =>
        props.value !== null && (
          <a className="text-decoration link-text">{props.value}</a>
        ),
      field: 'mfgCode',
      minWidth: 200,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Cutomer',
      cellRenderer: (props: ICellRendererParams) =>
        props.value !== null &&
        props.data &&
        props.data.isCustOrDisty > 0 && (
          <a className="text-decoration link-text">{props.value}</a>
        ),
      field: 'customerCode',
      minWidth: 200,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'mfrNameText',
      headerName: 'MFR (External)',
      minWidth: 200,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'MPN',
      field: 'mfgPN',
      minWidth: 325,
      filter: 'agTextColumnFilter',
      cellRenderer: (props: ICellRendererParams) =>
        props.value !== null &&
        props.data && (
          <div>
            <PIDCode
              id={props.data.id}
              value={props.data.PIDCode}
              mfgValue={props.value}
              isCopy={true}
              isGoodPart={props.data.isGoodPart}
              isCustomPart={
                partType.OTHER === props.data.partType
                  ? true
                  : props.data.isCustom
              }
              rohsIcon={rohsImagePath + props.data.rohsIcon}
              rohsStatus={props.data.rohsComplientConvertedValue}
              hasSubAssembly={props.data.subAssemblyCount}
              isSearchDigiKey={true}
              isSupplier={false}
              isSearchFindchip={true}
              restrictUsePermanently={props.data.restrictUsePermanently}
              restrictUseWithPermission={props.data.restrictUSEwithpermission}
              restrictPackagingUsePermanently={
                props.data.restrictPackagingUsePermanently
              }
              restrictPackagingUseWithPermission={
                props.data.restrictPackagingUseWithpermission
              }
              redirectionDisable={props.data.isDisabledUpdate}
            />
          </div>
        ),
    },
    {
      headerName: 'Nick Name',
      field: 'nickName',
      minWidth: 150,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Part#',
      field: 'custAssyPN',
      minWidth: 350,
      filter: 'agTextColumnFilter',
      cellRenderer: (props: ICellRendererParams) =>
        props.value !== null &&
        props.data && (
          <div>
            <PIDCode
              id={props.data.id}
              value={props.value}
              mfgValue={props.data.mfgPN}
              isCopy={true}
              isCustomPart={true}
              isHideCopyPidCode={true}
              custPartNumber={props.value}
              rohsIcon={rohsImagePath + props.data.rohsIcon}
              rohsStatus={props.data.rohsComplientConvertedValue}
              isSupplier={false}
              isAssembly={true}
            />
          </div>
        ),
    },
    {
      headerName: 'Revision',
      field: 'rev',
      minWidth: 95,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'partStock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 100,
      cellRenderer: (props: ICellRendererParams) =>
        props.value !== null && (
          <a className="text-decoration link-text">{props.value}</a>
        ),
    },
    {
      headerName: 'Internal Revision',
      field: 'liveVersion',
      minWidth: 110,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Data Sheet Link',
      field: 'dataSheetLink',
      minWidth: 120,
      filter: false,
      sortable: false,
      cellRenderer: (props: ICellRendererParams) =>
        props.value !== null && (
          <a className="text-decoration link-text">Click Here</a>
        ),
    },
    {
      headerName: 'Description',
      field: 'mfgPNDescription',
      minWidth: 350,
      filter: 'agTextColumnFilter',
      headerTooltip: 'Description',
      wrapText: true,
    },
    {
      field: 'detailDescription',
      headerName: 'Detailed Description',
      minWidth: 350,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'specialNote',
      headerName: 'Special Note',
      minWidth: 350,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'purchasingComment',
      headerName: 'Purchasing Comment',
      minWidth: 100,
      filter: false,
      sortable: false,
      cellRenderer: (props: ICellRendererParams) =>
        props.value ? (
          <a className="text-decoration link-text">Click Here</a>
        ) : (
          <div></div>
        ),
    },
    {
      field: 'packagingName',
      headerName: 'Packaging',
      minWidth: 150,
      filter: 'agTextColumnFilter',
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <div
            className={
              props.data.packagingSourceName === 'TBD' ? 'input-color-red' : ''
            }
          >
            {props.value}
          </div>
        ),
    },
    {
      field: 'partStatusValue',
      headerName: `Part Status (Internal)`,
      filter: 'agTextColumnFilter',
      minWidth: 100,
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <div
            className={props.data.partStatus === -1 ? 'input-color-red' : ''}
          >
            {props.value}
          </div>
        ),
    },
    {
      field: 'partStatusText',
      headerName: `Part Status (External)`,
      filter: 'agTextColumnFilter',
      minWidth: 100,
    },
    {
      field: 'functionalCategoryText',
      headerName: `Functional Type (External)`,
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'functionalCategoryName',
      headerName: `Functional Type (Internal)`,
      minWidth: 120,
      filter: 'agTextColumnFilter',
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <div
            className={
              props.data.functionalCategoryID === -1 ? 'input-color-red' : ''
            }
          >
            {props.value}
          </div>
        ),
    },
    {
      field: 'mountingTypeText',
      headerName: `Mounting Type (External)`,
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'mountingTypeName',
      headerName: `Mounting Type (Internal)`,
      minWidth: 120,
      filter: 'agTextColumnFilter',
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <div
            className={
              props.data.mountingTypeID === -1 ? 'input-color-red' : ''
            }
          >
            {props.value}
          </div>
        ),
    },
    {
      field: 'isCustomValue',
      headerName: 'Custom Part',
      minWidth: 120,
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
            filterParams: {
              values: ['Yes', 'No'],
            },
          },
        ],
      },
      menuTabs: ['filterMenuTab'],
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <Chip
            color={props.data.isCustom === 0 ? 'warning' : 'success'}
            label={props.value}
          />
        ),
    },
    {
      field: 'isCPNValue',
      headerName: `CPN Part`,
      minWidth: 100,
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
            filterParams: {
              values: ['Yes', 'No'],
            },
          },
        ],
      },
      menuTabs: ['filterMenuTab'],
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <Chip
            color={props.data.isCPN === 0 ? 'warning' : 'success'}
            label={props.value}
          />
        ),
    },
    {
      field: 'categoryName',
      headerName: 'Part Type',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'epicorType',
      headerName: 'Purchase Type',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'assemblyTypeName',
      headerName: 'Assembly Type',
      filter: 'agTextColumnFilter',
      minWidth: 250,
    },
    {
      field: 'supplier',
      headerName: 'Source',
      filter: 'agTextColumnFilter',
      minWidth: 100,
    },
    {
      field: 'operatingTemp',
      headerName: 'Operating Temperature (°C)',
      filter: 'agTextColumnFilter',
      minWidth: 150,
    },
    {
      field: 'minOperatingTemp',
      headerName: 'Min Operating Temperature (Â°C)',
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      minWidth: 130,
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'maxOperatingTemp',
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      headerName: 'Max Operating Temperature (Â°C)',

      minWidth: 130,
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'connectorTypeText',
      headerName: 'Connector Type (External)',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'connecterTypeName',
      headerName: 'Connector Type (Internal)',
      filter: 'agTextColumnFilter',
      minWidth: 120,
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <div
            className={
              props.data.connecterTypeID === -1 ? 'input-color-red' : ''
            }
          >
            {props.value}
          </div>
        ),
    },
    {
      field: 'noOfPosition',
      headerName: 'Pin Count',
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      minWidth: 120,
    },
    {
      field: 'noOfRows',
      headerName: 'No. of Rows',
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      minWidth: 120,
    },
    {
      field: 'pitch',
      headerName: 'Pitch (Unit in mm)',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'pitchMating',
      headerName: 'Pitch Mating(Unit in mm)',
      filter: 'agTextColumnFilter',
      minWidth: 150,
    },
    {
      field: 'sizeDimension',
      headerName: 'Size/Dimension',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'length',
      headerName: 'Size/Dimension Length',
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      minWidth: 120,
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'width',
      headerName: 'Size/Dimension Width',
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      minWidth: 120,
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'heightText',
      headerName: 'Height - Seated (Max)',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'height',
      headerName: 'Height - Seated (Max) Height',
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      minWidth: 120,
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'tolerance',
      headerName: 'Tolerance',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'voltage',
      headerName: 'Voltage',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'value',
      headerName: 'Value',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'partPackage',
      headerName: `Package/Case(Shape) Type (External)`,
      filter: 'agTextColumnFilter',
      minWidth: 130,
    },
    {
      field: 'packageCaseTypeValue',
      headerName: 'Package/Case(Shape) Type',
      filter: 'agTextColumnFilter',
      minWidth: 130,
    },
    {
      field: 'weight',
      headerName: 'Weight',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'powerRating',
      headerName: 'Power (Watts)',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'feature',
      headerName: 'Feature',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'isEpoxyMount',
      headerName: 'Epoxy Mount',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
            filterParams: {
              values: ['Yes', 'No'],
            },
          },
        ],
      },
      menuTabs: ['filterMenuTab'],
      minWidth: 120,
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <Chip
            color={props.data.isEpoxyMount === 'No' ? 'warning' : 'success'}
            label={props.value}
          />
        ),
    },
    {
      field: 'color',
      headerName: 'Color',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'scrapValuePerBuild',
      headerName: 'Scrap Rate (Per Build)',
      minWidth: 120,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'scrapRatePercentagePerBuild',
      headerName: 'Scrap Rate (Per Build) (%)',
      minWidth: 120,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'plannedValuePerBuild',
      headerName: 'Planned Overrun (Per Build)',
      minWidth: 120,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'plannedOverRunPercentagePerBuild',
      headerName: 'Planned Overrun (Per Build) (%)',
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      minWidth: 120,
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'selfLifeDays',
      headerName: 'Shelf Life Days',
      minWidth: 120,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'shelfListDaysThresholdPercentage',
      headerName: 'Shelf Life Days (%)',
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      minWidth: 120,
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'supplierShortShipmentAcceptance',
      headerName: 'Supplier Short Shipment Acceptance(%)',
      minWidth: 120,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'supplierOverShipmentAcceptance',
      headerName: 'Supplier Overage Shipment Acceptance(%)',
      minWidth: 120,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'maxPriceLimit',
      headerName: 'Max. Price Limit',
      minWidth: 120,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'maxQtyonHand',
      headerName: 'Max. Qty on Hand',
      minWidth: 120,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'saftyStock',
      headerName: 'Min. Qty (Safety Stock)',
      minWidth: 120,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'eau',
      headerName: 'EAU',
      minWidth: 120,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      cellRenderer: (props: ICellRendererParams) => (
        <div className="text-right">{props.value}</div>
      ),
    },
    {
      field: 'businessRisk',
      headerName: 'Business Risk',
      filter: 'agMultiColumnFilter',
      minWidth: 150,
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
            filterParams: {
              values: ['All', 'Critical', 'High', 'Medium', 'Low'],
            },
          },
        ],
      },
      menuTabs: ['filterMenuTab'],
      cellRenderer: (props: ICellRendererParams) =>
        props.value !== null && <span>{props.value}</span>,
    },
    {
      field: 'deviceMarking',
      headerName: 'Device Marking',
      filter: 'agTextColumnFilter',
      minWidth: 100,
    },
    {
      field: 'minimum',
      headerName: 'Min',
      minWidth: 100,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      aggFunc: 'max',
    },
    {
      field: 'mult',
      headerName: 'Mult',
      minWidth: 100,
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      aggFunc: 'max',
    },
    {
      field: 'umidSPQ',
      headerName: 'SPQ',
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      minWidth: 100,
    },
    {
      field: 'unitName',
      headerName: `UOM (Internal)`,
      filter: 'agTextColumnFilter',
      minWidth: 100,
    },
    {
      field: 'uomText',
      headerName: `UOM (External)`,
      filter: 'agTextColumnFilter',
      minWidth: 100,
    },
    {
      field: 'pcbPerArray',
      headerName: 'PCB Per Array',
      filter: 'agTextColumnFilter',
      minWidth: 100,
    },
    {
      field: 'grossWeight',
      headerName: 'Unit Gross Weight',
      filter: 'agTextColumnFilter',
      minWidth: 100,
    },
    {
      field: 'packagingWeight',
      headerName: 'Unit Net Weight',
      filter: 'agTextColumnFilter',
      minWidth: 100,
    },
    {
      field: 'ltbDate',
      headerName: 'LTB Date',
      filter: 'agDateColumnFilter',
      cellRenderer: (props: ICellRendererParams) =>
        props.value != null && props.value.slice(0, 10),
    },
    {
      field: 'eolDate',
      headerName: 'EOL Date',
      filter: 'agDateColumnFilter',
      cellRenderer: (props: ICellRendererParams) =>
        props.value != null && props.value.slice(0, 10),
    },
    {
      field: 'leadTime',
      headerName: 'Std. Lead Time (In week)',
      filter: 'agNumberColumnFilter',
      type: 'numericColumn',
      minWidth: 150,
    },
    {
      field: 'rohsComplientConvertedValue',
      headerName: `RoHS Status (Internal)`,
      filter: 'agTextColumnFilter',
      minWidth: 120,
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <div
            className={props.data.RoHSStatusID === -1 ? 'input-color-red' : ''}
          >
            {props.value}
          </div>
        ),
    },
    {
      field: 'rohsText',
      headerName: `RoHS Status (External)`,
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'mslName',
      headerName: 'MSL',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'isGoodPartValue',
      headerName: 'Correct Part',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
            filterParams: {
              values: ['Correct Part', 'Incorrect Part', 'TBD Part'],
            },
          },
        ],
      },
      menuTabs: ['filterMenuTab'],
      minWidth: 120,
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <Chip
            color={
              props.data.isGoodPartValue === 'Incorrect Part'
                ? 'warning'
                : props.data.isGoodPartValue === 'Correct Part'
                ? 'success'
                : 'error'
            }
            label={props.value}
          />
        ),
    },
    {
      field: 'restrictionSetting',
      headerName: 'Restriction Setting',
      minWidth: 350,
      filter: false,
      sortable: false,
    },
    {
      field: 'certificatelist',
      headerName: 'Standards',
      minWidth: 300,
      filter: false,
      sortable: false,
    },
    {
      field: 'isExportControl',
      headerName: 'Export Controlled',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
            filterParams: {
              values: ['Yes', 'No'],
            },
          },
        ],
      },
      menuTabs: ['filterMenuTab'],
      minWidth: 120,
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <Chip
            color={props.data.isExportControl === 'No' ? 'warning' : 'success'}
            label={props.value}
          />
        ),
    },
    {
      field: 'obsoleteDate',
      headerName: 'Obsolete Date',
      filter: 'agDateColumnFilter',
      cellRenderer: (props: ICellRendererParams) =>
        props.value != null && props.value.slice(0, 10),
    },
    {
      field: 'reversalDate',
      headerName: 'Reversal Date',
      filter: 'agDateColumnFilter',
      cellRenderer: (props: ICellRendererParams) =>
        props.value != null && props.value.slice(0, 10),
    },
    {
      field: 'reversalPart',
      headerName: 'Reversal Part',
      minWidth: 100,
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
            filterParams: {
              values: ['Yes', 'No'],
            },
          },
        ],
      },
      menuTabs: ['filterMenuTab'],
      cellRenderer: (props: ICellRendererParams) => (
        <Chip
          color={props.value === 'No' ? 'warning' : 'success'}
          label={props.value}
        />
      ),
    },
    {
      field: 'updatedAtApiValue',
      headerName: 'Last Cloud API Update Date',
      filter: 'agDateColumnFilter',
      cellRenderer: (props: ICellRendererParams) =>
        props.value != null && props.value.slice(0, 10),
    },
    {
      field: 'frequencyName',
      headerName: 'Charge Frequency',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'isWaterSolubleConvertedValue',
      headerName: 'Water Soluble',
      minWidth: 120,
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
            filterParams: {
              values: ['Yes', 'No'],
            },
          },
        ],
      },
      menuTabs: ['filterMenuTab'],
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <Chip
            color={props.data.isWaterSoluble === 0 ? 'warning' : 'success'}
            label={props.value}
          />
        ),
    },
    {
      field: 'isNoCleanConvertedValue',
      headerName: 'No-Clean',
      minWidth: 120,
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
            filterParams: {
              values: ['Yes', 'No'],
            },
          },
        ],
      },
      menuTabs: ['filterMenuTab'],
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <Chip
            color={props.data.isNoClean === 0 ? 'warning' : 'success'}
            label={props.value}
          />
        ),
    },
    {
      field: 'isHazmatMaterialValue',
      headerName: 'Hazmat Material',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
            filterParams: {
              values: ['Yes', 'No'],
            },
          },
        ],
      },
      menuTabs: ['filterMenuTab'],
      minWidth: 120,
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <Chip
            color={props.data.isHazmatMaterial === 0 ? 'warning' : 'success'}
            label={props.value}
          />
        ),
    },
    {
      field: 'isReceiveBulkConvertedValue',
      headerName: 'Receive as a Bulk item',
      minWidth: 120,
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
            filterParams: {
              values: ['Yes', 'No', 'N/A'],
            },
          },
        ],
      },
      menuTabs: ['filterMenuTab'],
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <Chip
            color={
              props.data.isReceiveBulkConvertedValue === 'Yes'
                ? 'success'
                : props.data.isReceiveBulkConvertedValue === 'N/A'
                ? 'info'
                : 'warning'
            }
            label={props.value}
          />
        ),
    },
    {
      field: 'PurchaseCOA',
      headerName: 'Purchase COA',
      minWidth: 200,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'SalesCOA',
      headerName: 'Sales COA',
      minWidth: 200,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'updatedAtValue',
      headerName: 'Modified Date',
      filter: 'agDateColumnFilter',
    },
    {
      field: 'updatedbyValue',
      minWidth: 145,
      headerName: 'Last Modified By',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'updatedbyRoleValue',
      minWidth: 145,
      headerName: 'Last Modified By Role',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'createdAtValue',
      minWidth: 160,
      headerName: 'Created Date',
      filter: 'agDateColumnFilter',
    },
    {
      field: 'createdbyValue',
      minWidth: 145,
      headerName: 'Created By',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'createdbyRoleValue',
      minWidth: 145,
      headerName: 'Created By Role',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'SystemGeneratedValue',
      headerName: 'System Generated',
      minWidth: 120,
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
            filterParams: {
              values: ['Yes', 'No'],
            },
          },
        ],
      },
      menuTabs: ['filterMenuTab'],
      cellRenderer: (props: ICellRendererParams) =>
        props.data && (
          <Chip
            color={props.data.systemGenerated === 1 ? 'success' : 'warning'}
            label={props.value}
          />
        ),
    },
    {
      headerName: 'Delete',
      resizable: false,
      sortable: false,
      filter: false,
      minWidth: 100,
      cellRenderer: (props: ICellRendererParams) => (
        <div>
          <IconButton
            sx={{ border: '1px solid', borderRadius: '5px', padding: '2px' }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ]);
  console.log(columnDefs.length);
  const autoGroupColumnDef = React.useMemo<ColDef>(() => {
    return {
      minWidth: 200,
    };
  }, []);

  const sideBar = React.useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressPivots: true,
            suppressPivotMode: true,
          },
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        },
      ],
    };
  }, []);

  const getRowStyle = (params: RowClassParams) => {
    const data = { ...params.data };

    if (data && data.serialNumber === 'SPN00003721') {
      return { background: '#ff7979' };
    }

    return undefined;
  };

  const recreateGrid = () => {
    setIsDestroyed(false);
  };

  const destroyGrid = () => {
    setPagination(!pagination);
    setIsDestroyed(true);
    setTimeout(() => recreateGrid(), 0);
  };

  const onChangeLoadSize = (pageSize) => {
    setPaginationPageSize(pageSize);
    setIsDestroyed(true);
    setTimeout(() => recreateGrid(), 0);
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params);
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

  React.useEffect(() => {
    if (gridApi) {
      const datasource: IDatasource = {
        getRows: async (params: IGetRowsParams) => {
          const requestParams = params;
          console.log('Rows requested by grid: ', requestParams);
          const SortColumns: any = [];
          _.map(requestParams.sortModel, (item) => {
            const propertyValues = Object.values(item);
            [propertyValues[0], propertyValues[1]] = [
              propertyValues[1],
              propertyValues[0],
            ];
            SortColumns.push(propertyValues);
          });
          const SearchColumns = Object.entries(
            requestParams.filterModel
          ).reduce((acc: any, curr: any) => {
            const [key, val] = curr;
            const SearchStringArry: string[] = [];
            if (val.filterType === 'multi') {
              _.map(val.filterModels, (item) => {
                if (item) {
                  if (item.filterType === 'text') {
                    SearchStringArry.push(item.filter);
                  } else if (item.filterType === 'set') {
                    if (item.values) {
                      const allValues = item.values.toString();
                      SearchStringArry.push(allValues);
                    }
                  } else if (item.filterType === 'date') {
                    if (item.dateFrom) {
                      const dateVal = item.dateFrom.slice(0, 10);
                      SearchStringArry.push(dateVal);
                    }
                  }
                }
              });
            } else if (val.filterType == 'text') {
              if (val.filter) {
                SearchStringArry.push(val.filter);
              }
            } else if (val.filterType === 'set') {
              if (val.values) {
                const allValues = val.values.toString();
                SearchStringArry.push(allValues);
              }
            } else if (val.filterType === 'date') {
              if (val.dateFrom) {
                const dateVal = val.dateFrom.slice(0, 10);
                SearchStringArry.push(dateVal);
              }
            }

            acc.push({
              ColumnName: key,
              SearchString: SearchStringArry.join(),
            });
            return acc;
          }, []);

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
          let component = datasource.slice(
            requestParams.startRow,
            requestParams.endRow
          );
          const response = {
            success: true,
            rows: component,
            lastRow: Count,
          };
          console.log('Data Rendered');
          if (response.rows && !response.rows.length) {
            gridRef.current?.api.showNoRowsOverlay();
          } else {
            gridRef.current?.api.hideOverlay();
          }
          if (response.success) {
            return params.successCallback(response.rows, response.lastRow);
          } else {
            return params.failCallback();
          }
        },
      };
      gridApi?.api?.setDatasource(datasource);
    }
  }, [gridApi]);

  return !isDestroyed ? (
    <div style={{ height: 800 }}>
      <div style={{ margin: '5px' }}>
        <button style={{ marginRight: '5px' }} onClick={destroyGrid}>
          Active {pagination ? 'Scolling' : 'Pagination'}
        </button>
        <button
          style={{ marginRight: '5px' }}
          onClick={() =>
            onChangeLoadSize(paginationPageSize === 100 ? 500 : 100)
          }
        >
          Load {paginationPageSize === 100 ? '500' : '100'}
        </button>
      </div>
      <div style={{ height: 'calc(100% - 25px)' }} className="ag-theme-alpine">
        <div style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowModelType="infinite"
            onGridReady={onGridReady}
            autoGroupColumnDef={autoGroupColumnDef}
            cacheBlockSize={paginationPageSize}
            rowBuffer={0}
            pagination
            paginationPageSize={paginationPageSize}
            rowSelection={'multiple'}
            rowGroupPanelShow={'always'}
            alwaysMultiSort
            getRowStyle={getRowStyle}
            sideBar={sideBar}
            overlayNoRowsTemplate={
              '<span className="ag-overlay-loading-center">No data found to display.</span>'
            }
            tooltipShowDelay={500}
            enableRangeSelection
            allowContextMenuWithControlKey
            suppressRowClickSelection
            animateRows
            suppressCopyRowsToClipboard
            suppressColumnVirtualisation
            rowDragManaged
            groupIncludeFooter={true}
            groupIncludeTotalFooter={true}
          />
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
};

export default AGGrid;
