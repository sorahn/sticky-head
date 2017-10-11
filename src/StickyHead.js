import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

class TR extends React.Component {
  updateCellWidth = i => width => {
    this.props.updateColumnWidth(width, i);
  };

  render() {
    return (
      <tr>
        {React.Children.map(this.props.children, (child, i) => (
          <TH
            {...child.props}
            width={this.props.widths[i]}
            updateCellWidth={this.updateCellWidth(i)}
          />
        ))}
      </tr>
    );
  }

  static propTypes = {
    updateColumnWidth: PropTypes.func.isRequired,
    widths: PropTypes.array.isRequired,
    children: PropTypes.node,
  };
}

class FixedTR extends React.Component {
  render() {
    return (
      <tr>
        {React.Children.map(this.props.children, (child, i) => (
          <th style={{ width: this.props.widths[i] }} {...child.props} />
        ))}
      </tr>
    );
  }

  static propTypes = {
    widths: PropTypes.array.isRequired,
  };
}

class TH extends React.Component {
  updateWidth() {
    const { width } = this.th.getBoundingClientRect();
    this.props.updateCellWidth(width);
  }

  componentDidMount() {
    this.updateWidth();
  }

  componentDidUpdate() {
    const { width } = this.th.getBoundingClientRect();
    if (width !== this.props.width) {
      this.updateWidth();
    }
  }

  render() {
    const { updateCellWidth, ...childProps } = this.props;

    return (
      <th ref={el => (this.th = el)} {...childProps}>
        {this.props.children}
      </th>
    );
  }

  static propTypes = {
    children: PropTypes.node,
    width: PropTypes.number,
  };
}

class StickyHead extends React.PureComponent {
  state = {
    displayHeader: false,
    headerWidth: 0,
    leftOffset: 0,
    widths: [],
  };

  tableContainer = document.createElement("div");

  updateColumnWidth = (newWidth, index) => {
    this.setState(state => {
      const widths = state.widths;
      widths[index] = newWidth;
      return { widths };
    });
  };

  updateSizes = () => {
    const {
      x: leftOffset,
      width: headerWidth,
      top,
      bottom,
    } = this.thead.parentNode.getBoundingClientRect();
    const displayHeader = top < 0 && bottom > 0;
    this.setState({ leftOffset, headerWidth, displayHeader });
  };

  componentDidMount() {
    this.updateSizes();
    document.body.appendChild(this.tableContainer);
    window.addEventListener("scroll", this.updateSizes, false);
    window.addEventListener("resize", this.updateSizes);
  }

  componentWillUnmount() {
    document.body.removeChild(this.tableContainer);
    window.removeEventListener("scroll", this.updateSizes);
    window.removeEventListener("resize", this.updateSizes);
  }

  render() {
    console.log("render - FixedHeader");
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
            <FixedTR {...child.props} widths={this.state.widths} />
          ))}
        </thead>
      </table>
    ) : null;

    const originalThead = (
      <thead key="thead" ref={el => (this.thead = el)}>
        {React.Children.map(this.props.children, (child, i) => (
          <TR
            {...child.props}
            widths={this.state.widths}
            updateColumnWidth={this.updateColumnWidth}
          />
        ))}
      </thead>
    );

    return [
      originalThead,
      ReactDOM.createPortal(fixedTable, this.tableContainer),
    ];
  }

  static propTypes = {
    children: PropTypes.node,
  };
}

export default StickyHead;
