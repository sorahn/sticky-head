import PropTypes from "prop-types"
import React from "react"

import BasicTH from "./BasicTH"

export default class OriginalTR extends React.PureComponent {
  renderChildren = (child, index) => {
    const updateCellWidth = this.props.updateCellWidth(index)

    if (child.type === "th") {
      return <BasicTH {...child.props} updateCellWidth={updateCellWidth} />
    }

    return React.cloneElement(child, { updateCellWidth })
  }

  render() {
    return (
      <tr>{React.Children.map(this.props.children, this.renderChildren)}</tr>
    )
  }

  static propTypes = {
    updateCellWidth: PropTypes.func.isRequired,
    children: PropTypes.node,
  }
}
