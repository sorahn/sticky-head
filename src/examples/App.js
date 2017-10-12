import React, { Component } from "react"

import { StickyHead } from "../modules"
import Content from "./content"
import data from "./data"

const mapDataToRow = data => {
  return data.map(row => <tr>{row.map(column => <td>{column}</td>)}</tr>)
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>StickyHead Examples</h1>
            <p>
              StickyHead is designed for tables that grow longer than the
              viewable page. You can seamlessly integrate StickyHead into your
              current tables by simply replacing the `thead` component with
              `StickyHead`
            </p>
          </div>
        </div>

        <h2>Simple Table</h2>
        <div className="row">
          <div className="col-6">
            <h3>Without StickyHead</h3>
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Head 1</th>
                  <th>Head 2</th>
                  <th>Head 3</th>
                  <th>Head 4</th>
                </tr>
              </thead>
              <tbody>{mapDataToRow(data)}</tbody>
            </table>
          </div>
          <div className="col-6">
            <h3>With StickyHead</h3>
            <table className="table table-condensed">
              <StickyHead>
                <tr>
                  <th>Head 1</th>
                  <th>Head 2</th>
                  <th>Head 3</th>
                  <th>Head 4</th>
                </tr>
              </StickyHead>
              <tbody>{mapDataToRow(data)}</tbody>
            </table>
          </div>
        </div>

        <h2>ColSpan + RowSpan Support</h2>
        <div className="row">
          <div className="col-6">
            <h3>Without StickyHead</h3>
            <table className="table table-condensed table-bordered">
              <thead>
                <tr>
                  <th colSpan={2} className="text-center">
                    Head 1
                  </th>
                  <th rowSpan={2}>Head 1.3</th>
                  <th>Head 1.4</th>
                </tr>
                <tr>
                  <th>Head 2.1</th>
                  <th>Head 2.2</th>
                  <th>Head 2.4</th>
                </tr>
              </thead>
              <tbody>{mapDataToRow(data)}</tbody>
            </table>
          </div>
          <div className="col-6">
            <h3>With StickyHead</h3>
            <table className="table table-condensed table-bordered">
              <StickyHead>
                <tr>
                  <th colSpan={2} className="text-center">
                    Head 1
                  </th>
                  <th rowSpan={2}>Head 1.3</th>
                  <th>Head 1.4</th>
                </tr>
                <tr>
                  <th>Head 2.1</th>
                  <th>Head 2.2</th>
                  <th>Head 2.4</th>
                </tr>
              </StickyHead>
              <tbody>{mapDataToRow(data)}</tbody>
            </table>
          </div>
        </div>

        <Content />
      </div>
    )
  }
}

export default App
