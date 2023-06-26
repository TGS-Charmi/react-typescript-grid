import * as React from 'react';

export default (props) => {
  const [ascSort, setAscSort] = React.useState('inactive');
  const [descSort, setDescSort] = React.useState('inactive');
  const [noSort, setNoSort] = React.useState('inactive');
  const refButton = React.useRef(null);

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current);
  };

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? 'active' : 'inactive');
    setDescSort(props.column.isSortDescending() ? 'active' : 'inactive');
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending()
        ? 'active'
        : 'inactive'
    );
  };

  const onSortRequested = (order, event) => {
    props.setSort(order, event.shiftKey);
  };

  React.useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
  }, []);

  let menu = null;
  if (props.enableMenu) {
    menu = (
      <div
        ref={refButton}
        className="customHeaderMenuButton"
        onClick={() => onMenuClicked()}
      >
        <i className={`fa ${props.menuIcon}`}></i>
      </div>
    );
  }

  let sort = null;
  if (props.enableSorting) {
    sort = (
      <div style={{ display: 'inline-block' }}>
        <div
          onClick={(event) => onSortRequested('asc', event)}
          onTouchEnd={(event) => onSortRequested('asc', event)}
          className={`customSortDownLabel ${ascSort}`}
        >
          <i className="fa fa-long-arrow-alt-down"></i>
        </div>
        <div
          onClick={(event) => onSortRequested('desc', event)}
          onTouchEnd={(event) => onSortRequested('desc', event)}
          className={`customSortUpLabel ${descSort}`}
        >
          <i className="fa fa-long-arrow-alt-up"></i>
        </div>
        <div
          onClick={(event) => onSortRequested('', event)}
          onTouchEnd={(event) => onSortRequested('', event)}
          className={`customSortRemoveLabel ${noSort}`}
        >
          <i className="fa fa-times"></i>
        </div>
      </div>
    );
  }

  return (
    <div>
      {menu}
      <div className="customHeaderLabel">{props.displayName}</div>
      {sort}
    </div>
  );
};
