import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faThumbsUp,
  faThumbsDown,
  faMoneyCheckAlt,
  faSearchDollar,
} from "@fortawesome/free-solid-svg-icons";
export default class App extends Component {
  state = {
    isLoading: false,
    // invoices: [
    //   {
    //     id: "100",
    //     Vendor: "Hankook",
    //     Amount: "$18,000",
    //     Invoice: "1233",
    //     Date: "08/21/2019",
    //   },
    //   {
    //     id: "110",
    //     Vendor: "Hankook",
    //     Amount: "$18,000",
    //     Invoice: "1233",
    //     Date: "08/21/2019",
    //   },
    //   {
    //     id: "120",
    //     Vendor: "Hankook",
    //     Amount: "$18,000",
    //     Invoice: "1233",
    //     Date: "08/21/2019",
    //   },
    // ],
  };
  remove(id) {
    let updatedInvoices = [...this.state.invoices].filter((i) => i.id !== id);
    this.setState({ invoices: updatedInvoices });
  }

  async componentDidMount(){
    const response = await fetch('https://lt6bheppue.execute-api.us-east-2.amazonaws.com/Dev/');
    const body = await response.json();
    this.setState({invoices: body, isLoading:false})
  }
  render() {
    const isLoading = this.state.isLoading;
    const invoices = this.state.invoices;

    if (isLoading) return <div>Loading</div>;
    let invoices_row = invoices.map((invoice) => (
      <tr key={invoice.id}>
        <td>{invoice.Vendor}</td>
        <td>{invoice.Amount}</td>
        <td>{invoice.Invoice}</td>
        <td>{invoice.Date}</td>
        <td>
          <Button
            className="btn btn-lg btn-success"
            onClick={() => this.remove(invoice.id)}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            Ok
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-lg btn-danger"
            onClick={() => this.remove(invoice.id)}
          >
            <FontAwesomeIcon icon={faThumbsDown} /> NOK
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-lg btn-info"
            onClick={() => this.remove(invoice.id)}
          >
            <FontAwesomeIcon icon={faMoneyCheckAlt} /> 50%
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-lg btn-warning"
            onClick={() => this.remove(invoice.id)}
          >
            {" "}
            <FontAwesomeIcon icon={faSearchDollar} />
            ??
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-lg btn-info"
            onClick={() => this.remove(invoice.id)}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            Image
          </Button>
        </td>
      </tr>
    ));
    return (
      <div className="container border border-secondary rounded center">
        <div className="row">
          <div className="col-12">
            <h4>Pending invoices- Test company</h4>
          </div>
        </div>
        <div className="row">
          <div className=".col-xs-12 center text-center">
            <Table dark responsive striped bordered hover>
              <thead>
                <tr>
                  <th scope="row">Vendor</th>
                  <th>Amount</th>
                  <th>Invoice</th>
                  <th>Date</th>
                  <th colSpan="4">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.invoices_row.length === 0 ? (
                  <td colSpan="9">All caugth up</td>
                ) : (
                  invoices_row
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
