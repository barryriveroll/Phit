import React from "reactn";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const columns = [
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Shares",
    accessor: "shares"
  },
  {
    Header: "Date",
    accessor: "date"
  },
  {
    Header: "Tags",
    accessor: "tags"
  }
];

const subColumns = [
  {
    Header: "Exercise",
    accessor: "exercise"
  },
  {
    Header: "Sets",
    accessor: "sets"
  },
  {
    Header: "Distance",
    accessor: "distance"
  },
  {
    Header: "Time",
    accessor: "time"
  }
];

class SharedTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          firstName: "boob",
          lastName: "sue",
          age: Math.floor(Math.random() * 30),
          visits: Math.floor(Math.random() * 100),
          progress: Math.floor(Math.random() * 100),
          status: "single"
        }
      ]
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          showPagination={false}
          className="-striped -highlight"
          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                <ReactTable
                  data={data}
                  columns={subColumns}
                  defaultPageSize={3}
                  showPagination={false}
                />
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default SharedTable;
