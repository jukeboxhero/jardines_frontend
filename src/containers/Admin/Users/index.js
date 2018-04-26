import React, { Component } from 'react';
import { connect } from "react-redux";
import clone from 'clone';
import fakeData from '../../Tables/fakeData';
import { tableinfo } from './configs';
import TableWrapper from './usersTable.style';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper.js';

import {
  EditableCell,
  DeleteCell
} from '../../../components/tables/helperCells';

const dataList = new fakeData(100);

class Users extends Component {
  state = {
    redirectToReferrer: false,
  };

  constructor(props) {
    super(props);
    this.onCellChange = this.onCellChange.bind(this);
    this.onDeleteCell = this.onDeleteCell.bind(this);

    this.state = {
      columns: this.createcolumns(clone(tableinfo.columns)),
      dataList: dataList.getAll()
    };
  }
  createcolumns(columns) {
    const editColumnRender = (text, record, index) => (
      <EditableCell
        index={index}
        columnsKey={columns[0].key}
        value={text[columns[0].key]}
        onChange={this.onCellChange}
      />
    );
    columns[0].render = editColumnRender;
    const deleteColumn = {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => (
        <DeleteCell index={index} onDeleteCell={this.onDeleteCell} />
      )
    };
    columns.push(deleteColumn);
    return columns;
  }
  onCellChange(value, columnsKey, index) {
    const { dataList } = this.state;
    dataList[index][columnsKey] = value;
    this.setState({ dataList });
  }
  onDeleteCell = index => {
    const { dataList } = this.state;
    dataList.splice(index, 1);
    this.setState({ dataList });
  };
  render() {
    const { columns, dataList } = this.state;

    return (
      <LayoutContentWrapper>
        <div className="isoLayoutContent">
          <TableWrapper
            columns={columns}
            dataSource={dataList}
            className="isoEditableTable"
          />
        </div>
      </LayoutContentWrapper>
    );
  }
}

export default connect(state => ({
  ...state.App.toJS()
}))(Users);