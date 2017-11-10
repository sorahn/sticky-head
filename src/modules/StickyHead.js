import PropTypes from "prop-types"
import React from "react"

import FixedTable from "./FixedTable"
import OriginalTR from "./OriginalTR"

export default class StickyHead extends React.PureComponent {
  state = {
    displayStickyHead: false,
    headerWidth: 0,
    leftOffset: 0,
    widths: [],
  }

  /**
   * rowIndex = <tr> index
   * columnIndex = <th> index
   * width = width of <th>
   */
  updateCellWidth = rowIndex => columnIndex => width => {
    this.setState(state => {
      const widths = state.widths
      widths[rowIndex] = [...(state.widths[rowIndex] || [])]
      widths[rowIndex][columnIndex] = width
      return { widths }
    })
  }

  // @TODO
  // stop the sticky header at the bottom of the table - 1 row
  updateSizes = () => {
    const {
      x: leftOffset,
      width: headerWidth,
      top,
      bottom,
    } = this.thead.parentNode.getBoundingClientRect()
    const displayStickyHead = top < 0 && bottom > 0
    this.setState({ leftOffset, headerWidth, displayStickyHead })
  }

  componentDidMount() {
    this.updateSizes()
    window.addEventListener("scroll", this.updateSizes, false)
    window.addEventListener("resize", this.updateSizes)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateSizes)
    window.removeEventListener("resize", this.updateSizes)
  }

  render() {
    // pull the classnames from the original table to add to my copy.
    const originalTableClass = this.thead && this.thead.parentNode.className

    const fixedTable = this.state.displayStickyHead && (
      <FixedTable
        key="table"
        left={this.state.leftOffset}
        originalTableClass={originalTableClass}
        rows={this.props.children}
        top={this.props.topOffset}
        width={this.state.headerWidth}
        widths={this.state.widths}
      />
    )

    const originalThead = (
      <thead key="thead" ref={el => (this.thead = el)}>
        {React.Children.map(this.props.children, (child, rowIndex) => (
          <OriginalTR
            {...child.props}
            updateCellWidth={this.updateCellWidth(rowIndex)}
          />
        ))}
      </thead>
    )

    return [originalThead, fixedTable]
  }

  static defaultProps = {
    topOffset: 0,
  }

  static propTypes = {
    topOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node,
    fixedHeaderBackground: PropTypes.string,
  }
}
