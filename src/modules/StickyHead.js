import PropTypes from "prop-types"
import React from "react"
import ReactDOM from "react-dom"

class TR extends React.PureComponent {
  render() {
    return (
      <tr>
        {React.Children.map(this.props.children, (child, columnIndex) => (
          <TH
            {...child.props}
            updateCellWidth={this.props.updateCellWidth(columnIndex)}
          />
        ))}
      </tr>
    )
  }

  static propTypes = {
    updateCellWidth: PropTypes.func.isRequired,
    children: PropTypes.node,
  }
}

class TH extends React.PureComponent {
  updateWidth() {
    const { width } = this.th.getBoundingClientRect()
    this.props.updateCellWidth(width)
  }

  componentDidMount() {
    this.updateWidth()
  }

  componentDidUpdate() {
    this.updateWidth()
  }

  render() {
    const { updateCellWidth, width, ...childProps } = this.props

    return (
      <th ref={el => (this.th = el)} {...childProps}>
        {this.props.children}
      </th>
    )
  }

  static propTypes = {
    children: PropTypes.node,
    updateCellWidth: PropTypes.func.isRequired,
  }
}

class StickyTR extends React.PureComponent {
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
        {React.Children.map(this.props.children, (child, rowIndex) => (
          <TR
            {...child.props}
            updateCellWidth={this.updateCellWidth(rowIndex)}
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
