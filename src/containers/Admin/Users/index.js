import React, { Component } from 'react';
import { connect } from "react-redux";
import clone from 'clone';
import fakeData from '../../Tables/fakeData';
import { tableinfo } from './configs';
import TableWrapper from './usersTable.style';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper.js';
import { fetchUsers } from "../../../redux/users/actions";

import {
  EditCell,
  DeleteCell
} from '../../../components/tables/helperCells';

function formatData(data) {
  let output = [];

  data.forEach((user) => {
    output.push(
    {
      "id": user['id'],
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/dvdwinden/128.jpg",
      "firstName": user.attributes['first-name'],
      "lastName": user.attributes['last-name'],
      "mobile": "(023) 302-3161",
      "home": "(136) 403-0476",
      "city": "new orleans",
      "street": "108 yorkshire dr",
      "role": "administrator"
    });
  });
  return output;
}

class Users extends Component {
  state = {
    redirectToReferrer: false,
  };

  constructor(props) {
    super(props);
    this.onEditCell = this.onEditCell.bind(this);
    this.onDeleteCell = this.onDeleteCell.bind(this);
    this.state = {
      columns: this.createcolumns(clone(tableinfo.columns)),
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  createcolumns(columns) {
    const actionsColumn = {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record, index) => (
        <div index={index} key="actions" className="actions">
          <EditCell onEditCell={this.onEditCell} />
          <DeleteCell onDeleteCell={this.onDeleteCell} />
        </div>
      )
    };
    columns.push(actionsColumn);
    return columns;
  }
  onEditCell = index => {
    const { dataList } = this.state;
    dataList.splice(index, 1);
    this.setState({ dataList });
  };
  onDeleteCell = index => {
    const { dataList } = this.state;
    dataList.splice(index, 1);
    this.setState({ dataList });
  };
  render() {
    const { columns, error, loading, users } = this.state;

    let dataList = formatData(this.props.users);

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
  users: state.Users.items,
  loading: state.Users.loading,
  error: state.Users.error,
  ...state.App.toJS()
}))(Users);