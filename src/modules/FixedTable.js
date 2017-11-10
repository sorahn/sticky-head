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
    const tableStyle = {
      background: this.props.background,
      left: this.props.left,
      position: "fixed",
      top: this.props.top,
      width: this.props.width,
    }

    return ReactDOM.createPortal(
      <table style={tableStyle} className={this.props.originalTableClass}>
        <thead>
          {React.Children.map(this.props.rows, (child, rowIndex) => (
            <StickyTR {...child.props} widths={this.props.widths[rowIndex]} />
          ))}
        </thead>
      </table>,
      this.tableContainer
    )
  }

  static defaultProps = {
    background: "white",
    top: 0,
  }

  static propTypes = {
    background: PropTypes.string,
    left: PropTypes.number,
    originalTableClass: PropTypes.string,
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.number,
    widths: PropTypes.array.isRequired,
  }
}
