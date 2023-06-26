import * as React from 'react';
import _ from 'lodash';
import './style.css';
import { styled } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
function classNames(...args: any[]) {
  return args.filter(Boolean).join(' ');
}

const CustomSpan = styled('span')(() => {
  return `
        display: flex !important;
        word-break: break-all;
        align-items: center;
        justify-content: space-between;
        .rohs-icon {
          margin: 0 4px;
          display: inline-block;
          .rohs-image {
            height: 16px;
            width: 16px;
          }
        }
        .border_icon {
          align-items: center;
          justify-content: center;
          height: 26px;
          width: 26px;
          font-size: 8px;
          row-gap: unset;
          display: inline-flex;
        }
        .custom-part {
          position: relative;
          span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 999;
          }
        }
    `;
});

const PIDCode = (props: any) => {
  let {
    id,
    value,
    isCopy,
    isMfg,
    mfgValue,
    rohsIcon,
    rohsStatus,
    isFormated,
    isFromTraveler,
    isSearchDigiKey,
    redirectionDisable,
    isSearchFindchip,
    isHideCopyPidCode,
    supplierName,
    isGoodPart,
    restrictUsePermanently,
    restrictUseWithPermission,
    restrictPackagingUsePermanently,
    restrictPackagingUseWithPermission,
    restrictUseInBOMPermanently,
    isAssembly,
    isShowInRed,
    isCustomPart,
    custPartNumber,
    copyOptionsBeforeLabel,
    copyOptionsAfterLabel,
    hasSubAssembly,
  } = props;

  const copyAheadArray = _.orderBy(copyOptionsBeforeLabel, 'displayOrder');
  const copyAfterArray = _.orderBy(copyOptionsAfterLabel, 'displayOrder');
  const defaultSupplier = {
    DIGIKEY: 'DIGIKEY',
    ARROW: 'ARROW',
    AVNET: 'AVNET',
    MOUSER: 'MOUSER',
    NEWARK: 'NEWARK',
    TTI: 'TTI',
    HEILIND: 'HEILIND',
  };

  if (isSearchDigiKey !== false) {
    isSearchDigiKey = supplierName ? false : true;
  }

  const copyClass: boolean =
    (isGoodPart && isGoodPart === 2) ||
    restrictUsePermanently ||
    restrictPackagingUsePermanently ||
    restrictUseWithPermission ||
    restrictPackagingUseWithPermission ||
    restrictUseInBOMPermanently;

  return (
    <CustomSpan>
      <div className="flex items-center">
        <div>
          <Tooltip title={value}>
            <a
              className={classNames(
                redirectionDisable && 'disable-link',
                isShowInRed && 'cm-assy-red',
                !isShowInRed && 'text-decoration'
              )}
              onClick={() => {}}
            >
              {isFormated ? (
                <b className={copyClass ? 'text-line-through' : ''}>{value}</b>
              ) : (
                <div></div>
              )}
              {!isFormated ? (
                <span className={copyClass ? 'text-line-through' : ''}>
                  {value}
                </span>
              ) : (
                <div></div>
              )}
            </a>
          </Tooltip>
          {value && rohsStatus ? (
            <span className="rohs-icon">
              <Tooltip title={rohsStatus}>
                <img className="rohs-image" src={rohsIcon}></img>
              </Tooltip>
            </span>
          ) : (
            <div></div>
          )}
          {hasSubAssembly ? (
            <span>
              <Tooltip title="Sub Assembly">
                <i className="border_icon sub-assembly"></i>
              </Tooltip>
            </span>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <div>
          {(!isCustomPart && id > 0 && isSearchDigiKey && !isAssembly) ||
          (supplierName &&
            defaultSupplier.DIGIKEY === supplierName &&
            value) ? (
            <Tooltip title="Search on Digikey">
              <span
                className="supplier-icon digikey-icon"
                onClick={() => {}}
              ></span>
            </Tooltip>
          ) : (
            <div></div>
          )}
          {!isCustomPart &&
          id > 0 &&
          supplierName &&
          defaultSupplier.ARROW === supplierName &&
          value ? (
            <Tooltip title="Search on Arrow">
              <span
                className="supplier-icon arrow-icon"
                onClick={() => {}}
              ></span>
            </Tooltip>
          ) : (
            <div></div>
          )}
          {!isCustomPart &&
          id > 0 &&
          supplierName &&
          defaultSupplier.AVNET === supplierName &&
          value ? (
            <Tooltip title="Search on Avnet">
              <span
                className="supplier-icon avnet-icon"
                onClick={() => {}}
              ></span>
            </Tooltip>
          ) : (
            <div></div>
          )}
          {!isCustomPart &&
          id > 0 &&
          supplierName &&
          defaultSupplier.MOUSER === supplierName &&
          value ? (
            <Tooltip title="Search on Mouser">
              <span
                className="supplier-icon mouser-icon"
                onClick={() => {}}
              ></span>
            </Tooltip>
          ) : (
            <div></div>
          )}
          {!isCustomPart &&
          id > 0 &&
          supplierName &&
          defaultSupplier.NEWARK === supplierName &&
          value ? (
            <Tooltip title="Search on Newark">
              <span
                className="supplier-icon newark-icon"
                onClick={() => {}}
              ></span>
            </Tooltip>
          ) : (
            <div></div>
          )}
          {!isCustomPart &&
          id > 0 &&
          supplierName &&
          defaultSupplier.TTI === supplierName &&
          value ? (
            <Tooltip title="Search on TTI">
              <span
                className="supplier-icon tti-icon"
                onClick={() => {}}
              ></span>
            </Tooltip>
          ) : (
            <div></div>
          )}
          {!isCustomPart &&
          id > 0 &&
          isSearchFindchip &&
          !isAssembly &&
          value ? (
            <Tooltip title="Search on FindChip">
              <span
                className="supplier-icon findchip-icon"
                onClick={() => {}}
              ></span>
            </Tooltip>
          ) : (
            <div></div>
          )}
          {!isCustomPart && id > 0 && isSearchFindchip && !isAssembly ? (
            <Tooltip title="Search on Google">
              <span
                className="supplier-icon google-icon"
                onClick={() => {}}
              ></span>
            </Tooltip>
          ) : (
            <div></div>
          )}
          {!isCustomPart &&
          id > 0 &&
          supplierName &&
          defaultSupplier.HEILIND === supplierName &&
          value ? (
            <Tooltip title="Search on Heilind">
              <span
                className="supplier-icon heilind-icon"
                onClick={() => {}}
              ></span>
            </Tooltip>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </CustomSpan>
  );
};

export default PIDCode;
