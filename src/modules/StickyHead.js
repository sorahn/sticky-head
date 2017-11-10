import PropTypes from "prop-types"
import React from "react"
import ReactDOM from "react-dom"

import BasicTH from "./BasicTH"

class TR extends React.PureComponent {
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

class StickyTR extends React.PureComponent {
  renderChildren = (child, index) => {
    const width = this.props.widths[index]

    if (child.type === "th") {
      return <BasicTH width={width} {...child.props} />
    }

    return React.cloneElement(child, { width })
  }
  render() {
    return (
      <tr>
        {React.Children.map(this.props.children, (child, rowIndex) => (
          <th style={{ width: this.props.widths[rowIndex] }} {...child.props} />
        ))}
      </tr>
    )
  }

  static propTypes = {
    widths: PropTypes.array.isRequired,
  }
}

class StickyHead extends React.PureComponent {
  state = {
    displayHeader: false,
    headerWidth: 0,
    leftOffset: 0,
    widths: [],
  }

  tableContainer = document.createElement("div")

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
    const displayHeader = top < 0 && bottom > 0
    this.setState({ leftOffset, headerWidth, displayHeader })
  }

  componentDidMount() {
    this.updateSizes()
    document.body.appendChild(this.tableContainer)
    window.addEventListener("scroll", this.updateSizes, false)
    window.addEventListener("resize", this.updateSizes)
  }

  componentWillUnmount() {
    document.body.removeChild(this.tableContainer)
    window.removeEventListener("scroll", this.updateSizes)
    window.removeEventListener("resize", this.updateSizes)
  }

  render() {
    const fixedTable = this.state.displayHeader ? (
      <table
        key="table"
        style={{
          position: "fixed",
          top: 0,
          left: this.state.leftOffset,
          width: this.state.headerWidth,
          background: "white",
        }}
        className={this.thead && this.thead.parentNode.className}
      >
        <thead>
          {React.Children.map(this.props.children, (child, i) => (
            <StickyTR {...child.props} widths={this.state.widths[i]} />
          ))}
        </thead>
      </table>
    ) : null

    const originalThead = (
      <thead key="thead" ref={el => (this.thead = el)} {...this.props}>
        {React.Children.map(this.props.children, (child, columnIndex) => (
          <TR
            {...child.props}
            updateCellWidth={this.updateCellWidth(columnIndex)}
          />
        ))}
      </thead>
    )

    return [
      originalThead,
      ReactDOM.createPortal(fixedTable, this.tableContainer),
    ]
  }

  static propTypes = {
    children: PropTypes.node,
  }
}

export default StickyHead
