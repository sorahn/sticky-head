import PropTypes from "prop-types"
import React from "react"

export default class StickyTR extends React.Component {
  renderChildren = (child, columnIndex) => {
    const width = this.props.widths[columnIndex]
    return React.cloneElement(child, { width })
  }

  render() {
    return (
      <tr>{React.Children.map(this.props.children, this.renderChildren)}</tr>
    )
  }

  static propTypes = {
    widths: PropTypes.array.isRequired,
  }
}
