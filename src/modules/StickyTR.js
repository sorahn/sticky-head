import PropTypes from "prop-types"
import React from "react"

import BasicTH from "./BasicTH"

export default class StickyTR extends React.Component {
  renderChildren = (child, index) => {
    const width = this.props.widths[index]

    if (child.type === "th") {
      return <BasicTH width={width} {...child.props} />
    }

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
