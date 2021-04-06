import React, {Component}  from 'react';

import axios from 'axios';
let ReactBsTable  = require('react-bootstrap-table');
let BootstrapTable = ReactBsTable.BootstrapTable;
let TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      totalSize: 100,
      page: 0,
      sizePerPage: 10,
    };
    this.fetchCards = this.fetchCards.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
  }

  componentDidMount() {
    this.fetchCards();
  }

  async fetchCards(page = this.state.page, sizePerPage = this.state.sizePerPage) {
    const url='http://jsonplaceholder.typicode.com/posts?_start='+page+'&_limit='+sizePerPage;
    const resp = await  axios.get(url);
    this.setState({ cards: resp.data });
  }

  handlePageChange(page, sizePerPage) {
    const page1 = (page-1)*10;
    this.fetchCards(page1, sizePerPage);
  }

  handleSizePerPageChange(sizePerPage) {
    // When changing the size per page always navigating to the first page
    this.fetchCards(0, sizePerPage);
  }

  render() {
    const options = {
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizePerPageChange,
      page: this.state.page,
      sizePerPage: this.state.sizePerPage,
    };

    return (
       <BootstrapTable
        data={this.state.cards}
        options={options}
        fetchInfo={{dataTotalSize: this.state.totalSize}}
        remote
        pagination
      >
        <TableHeaderColumn dataField="userId" dataAlign="center">userId</TableHeaderColumn>
        <TableHeaderColumn dataField="id" isKey dataAlign="center">Id</TableHeaderColumn>
        <TableHeaderColumn dataField="title" dataAlign="left">Title</TableHeaderColumn>
        <TableHeaderColumn dataField="body" dataAlign="left">Body</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default App;
