import PropTypes from "prop-types"
import React from "react"

import StickyTR from "./StickyTR"

export default class FixedTable extends React.Component {
  render() {
    const tableStyle = {
      background: this.props.background,
      left: this.props.left,
      position: "fixed",
      top: this.props.top,
      width: this.props.width,
    }

    return (
      <table style={tableStyle} className={this.props.originalTableClass}>
        <thead>
          {React.Children.map(this.props.rows, (child, rowIndex) => (
            <StickyTR
              {...child.props}
              widths={this.props.widths[rowIndex] || []}
            />
          ))}
        </thead>
      </table>
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
