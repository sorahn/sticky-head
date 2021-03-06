import PropTypes from "prop-types"
import React from "react"

/**
 * This is the basic replacement for a TH component.
 * If you want to use your own custom react component, instead of a raw
 * TH component, you need to make sure it calls 'props.updateCellWidth',
 * and sets its own width off of 'props.width'
 *
 * This component will report it's width up the chain when the component mounts,
 * and when the content changes.
 */
export default class BasicTH extends React.Component {
  th = undefined

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
    const { updateCellWidth, width, ...rest } = this.props

    return (
      <th ref={el => (this.th = el)} width={width} {...rest}>
        {this.props.children}
      </th>
    )
  }

  static propTypes = {
    children: PropTypes.node,
    updateCellWidth: PropTypes.func.isRequired,
  }
}
