import PropTypes from "prop-types"
import React from "react"
import ReactDOM from "react-dom"

import StickyTR from "./StickyTR"

export default class FixedTable extends React.Component {
  tableContainer = document.createElement("div")

  componentDidMount() {
    document.body.appendChild(this.tableContainer)
  }

  componentWillUnmount() {
    document.body.removeChild(this.tableContainer)
  }

  render() {
    const style = {
      ...this.props.style,
      position: "fixed",
    }

    return ReactDOM.createPortal(
      <table style={style} className={this.props.className}>
        <thead>
          {React.Children.map(this.props.rows, (child, rowIndex) => (
            <StickyTR {...child.props} widths={this.props.widths[rowIndex]} />
          ))}
        </thead>
      </table>,
      this.tableContainer
    )
  }

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    width: PropTypes.number,
    widths: PropTypes.array.isRequired,
  }
}
