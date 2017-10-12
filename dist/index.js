"use strict"

function __$styleInject(css, returnValue) {
  if (typeof document === "undefined") {
    return returnValue
  }
  css = css || ""
  var head = document.head || document.getElementsByTagName("head")[0]
  var style = document.createElement("style")
  style.type = "text/css"
  head.appendChild(style)

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
  return returnValue
}

Object.defineProperty(exports, "__esModule", { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex
}

var PropTypes = _interopDefault(require("prop-types"))
var React = _interopDefault(require("react"))
var ReactDOM = _interopDefault(require("react-dom"))

var asyncGenerator = (function() {
  function AwaitValue(value) {
    this.value = value
  }

  function AsyncGenerator(gen) {
    var front, back

    function send(key, arg) {
      return new Promise(function(resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null,
        }

        if (back) {
          back = back.next = request
        } else {
          front = back = request
          resume(key, arg)
        }
      })
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg)
        var value = result.value

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(
            function(arg) {
              resume("next", arg)
            },
            function(arg) {
              resume("throw", arg)
            }
          )
        } else {
          settle(result.done ? "return" : "normal", result.value)
        }
      } catch (err) {
        settle("throw", err)
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true,
          })
          break

        case "throw":
          front.reject(value)
          break

        default:
          front.resolve({
            value: value,
            done: false,
          })
          break
      }

      front = front.next

      if (front) {
        resume(front.key, front.arg)
      } else {
        back = null
      }
    }

    this._invoke = send

    if (typeof gen.return !== "function") {
      this.return = undefined
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
      return this
    }
  }

  AsyncGenerator.prototype.next = function(arg) {
    return this._invoke("next", arg)
  }

  AsyncGenerator.prototype.throw = function(arg) {
    return this._invoke("throw", arg)
  }

  AsyncGenerator.prototype.return = function(arg) {
    return this._invoke("return", arg)
  }

  return {
    wrap: function(fn) {
      return function() {
        return new AsyncGenerator(fn.apply(this, arguments))
      }
    },
    await: function(value) {
      return new AwaitValue(value)
    },
  }
})()

var classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

var createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ("value" in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }

    return target
  }

var inherits = function(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    )
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var objectWithoutProperties = function(obj, keys) {
  var target = {}

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }

  return target
}

var possibleConstructorReturn = function(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }

  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self
}

var toConsumableArray = function(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i]

    return arr2
  } else {
    return Array.from(arr)
  }
}

var TR = (function(_React$PureComponent) {
  inherits(TR, _React$PureComponent)

  function TR() {
    classCallCheck(this, TR)
    return possibleConstructorReturn(
      this,
      (TR.__proto__ || Object.getPrototypeOf(TR)).apply(this, arguments)
    )
  }

  createClass(TR, [
    {
      key: "render",
      value: function render() {
        var _this2 = this

        return React.createElement(
          "tr",
          null,
          React.Children.map(this.props.children, function(child, columnIndex) {
            return React.createElement(
              TH,
              _extends({}, child.props, {
                updateCellWidth: _this2.props.updateCellWidth(columnIndex),
              })
            )
          })
        )
      },
    },
  ])
  return TR
})(React.PureComponent)

TR.propTypes = {
  updateCellWidth: PropTypes.func.isRequired,
  children: PropTypes.node,
}

var TH = (function(_React$PureComponent2) {
  inherits(TH, _React$PureComponent2)

  function TH() {
    classCallCheck(this, TH)
    return possibleConstructorReturn(
      this,
      (TH.__proto__ || Object.getPrototypeOf(TH)).apply(this, arguments)
    )
  }

  createClass(TH, [
    {
      key: "updateWidth",
      value: function updateWidth() {
        var _th$getBoundingClient = this.th.getBoundingClientRect(),
          width = _th$getBoundingClient.width

        this.props.updateCellWidth(width)
      },
    },
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateWidth()
      },
    },
    {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this.updateWidth()
      },
    },
    {
      key: "render",
      value: function render() {
        var _this4 = this

        var _props = this.props,
          updateCellWidth = _props.updateCellWidth,
          width = _props.width,
          childProps = objectWithoutProperties(_props, [
            "updateCellWidth",
            "width",
          ])

        return React.createElement(
          "th",
          _extends(
            {
              ref: function ref(el) {
                return (_this4.th = el)
              },
            },
            childProps
          ),
          this.props.children
        )
      },
    },
  ])
  return TH
})(React.PureComponent)

TH.propTypes = {
  children: PropTypes.node,
  updateCellWidth: PropTypes.func.isRequired,
}

var StickyTR = (function(_React$PureComponent3) {
  inherits(StickyTR, _React$PureComponent3)

  function StickyTR() {
    classCallCheck(this, StickyTR)
    return possibleConstructorReturn(
      this,
      (StickyTR.__proto__ || Object.getPrototypeOf(StickyTR)).apply(
        this,
        arguments
      )
    )
  }

  createClass(StickyTR, [
    {
      key: "render",
      value: function render() {
        var _this6 = this

        return React.createElement(
          "tr",
          null,
          React.Children.map(this.props.children, function(child, rowIndex) {
            return React.createElement(
              "th",
              _extends(
                { style: { width: _this6.props.widths[rowIndex] } },
                child.props
              )
            )
          })
        )
      },
    },
  ])
  return StickyTR
})(React.PureComponent)

StickyTR.propTypes = {
  widths: PropTypes.array.isRequired,
}

var StickyHead = (function(_React$PureComponent4) {
  inherits(StickyHead, _React$PureComponent4)

  function StickyHead() {
    var _ref

    var _temp, _this7, _ret

    classCallCheck(this, StickyHead)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this7 = possibleConstructorReturn(
        this,
        (_ref =
          StickyHead.__proto__ || Object.getPrototypeOf(StickyHead)).call.apply(
          _ref,
          [this].concat(args)
        )
      )),
      _this7)),
      (_this7.state = {
        displayHeader: false,
        headerWidth: 0,
        leftOffset: 0,
        widths: [],
      }),
      (_this7.tableContainer = document.createElement("div")),
      (_this7.updateCellWidth = function(rowIndex) {
        return function(columnIndex) {
          return function(width) {
            _this7.setState(function(state) {
              var widths = state.widths
              widths[rowIndex] = [].concat(
                toConsumableArray(state.widths[rowIndex] || [])
              )
              widths[rowIndex][columnIndex] = width
              return { widths: widths }
            })
          }
        }
      }),
      (_this7.updateSizes = function() {
        var _this7$thead$parentNo = _this7.thead.parentNode.getBoundingClientRect(),
          leftOffset = _this7$thead$parentNo.x,
          headerWidth = _this7$thead$parentNo.width,
          top = _this7$thead$parentNo.top,
          bottom = _this7$thead$parentNo.bottom

        var displayHeader = top < 0 && bottom > 0
        _this7.setState({
          leftOffset: leftOffset,
          headerWidth: headerWidth,
          displayHeader: displayHeader,
        })
      }),
      _temp)),
      possibleConstructorReturn(_this7, _ret)
    )
  }

  createClass(StickyHead, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateSizes()
        document.body.appendChild(this.tableContainer)
        window.addEventListener("scroll", this.updateSizes, false)
        window.addEventListener("resize", this.updateSizes)
      },
    },
    {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        document.body.removeChild(this.tableContainer)
        window.removeEventListener("scroll", this.updateSizes)
        window.removeEventListener("resize", this.updateSizes)
      },
    },
    {
      key: "render",
      value: function render() {
        var _this8 = this

        var fixedTable = this.state.displayHeader
          ? React.createElement(
              "table",
              {
                key: "table",
                style: {
                  position: "fixed",
                  top: 0,
                  left: this.state.leftOffset,
                  width: this.state.headerWidth,
                  background: "white",
                },
                className: this.thead && this.thead.parentNode.className,
              },
              React.createElement(
                "thead",
                null,
                React.Children.map(this.props.children, function(child, i) {
                  return React.createElement(
                    StickyTR,
                    _extends({}, child.props, {
                      widths: _this8.state.widths[i],
                    })
                  )
                })
              )
            )
          : null

        var originalThead = React.createElement(
          "thead",
          _extends(
            {
              key: "thead",
              ref: function ref(el) {
                return (_this8.thead = el)
              },
            },
            this.props
          ),
          React.Children.map(this.props.children, function(child, rowIndex) {
            return React.createElement(
              TR,
              _extends({}, child.props, {
                updateCellWidth: _this8.updateCellWidth(rowIndex),
              })
            )
          })
        )

        return [
          originalThead,
          ReactDOM.createPortal(fixedTable, this.tableContainer),
        ]
      },
    },
  ])
  return StickyHead
})(React.PureComponent)

StickyHead.propTypes = {
  children: PropTypes.node,
}

exports.StickyHead = StickyHead
