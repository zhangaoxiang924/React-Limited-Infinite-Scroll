'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LimitedInfiniteScroll = function (_Comment) {
    _inherits(LimitedInfiniteScroll, _Comment);

    function LimitedInfiniteScroll() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, LimitedInfiniteScroll);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LimitedInfiniteScroll.__proto__ || Object.getPrototypeOf(LimitedInfiniteScroll)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            loading: false
        }, _this._defaultSpinLoader = _react2.default.createElement(
            'div',
            { style: { textAlign: 'center', fontSize: 20, lineHeight: 36, marginTop: 20, marginBottom: 20 } },
            'Loading...'
        ), _this._defaultManualLoader = _react2.default.createElement(
            'div',
            { style: { textAlign: 'center' } },
            _react2.default.createElement(
                'span',
                { style: { fontSize: 20, lineHeight: 36, marginTop: 20, marginBottom: 20, display: 'inline-block', color: '#88899a', border: '1px solid #88899a', borderTopLeftRadius: 3, borderTopRightRadius: 3, borderBottomRightRadius: 3, borderBottomLeftRadius: 3 } },
                'Load More'
            )
        ), _this.calcTop = function (element) {
            if (!element) {
                return 0;
            }
            return element.offsetTop + _this.calcTop(element.offsetParent);
        }, _this.scrollHandler = function () {
            var offset = void 0;
            var el = _this.selfComponent;
            if (_this.props.useWindow) {
                var scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                offset = _this.calcTop(el) + el.offsetHeight - scrollTop - window.innerHeight;
            } else {
                offset = el.scrollHeight - el.parentNode.scrollTop - el.parentNode.clientHeight;
            }

            if (offset < Number(_this.props.threshold)) {
                _this.detachScrollEvent();

                if (typeof _this.props.loadNext === 'function') {
                    _this.props.loadNext(_this.page += 1);
                }
            }
        }, _this.attachScrollEvent = function () {
            if (!_this.props.hasMore) {
                return;
            }

            var scrollEl = _this.props.useWindow ? window : _this.selfComponent.parentNode;
            scrollEl.addEventListener('scroll', _this.scrollHandler, false);
            scrollEl.addEventListener('resize', _this.scrollHandler, false);

            if (_this.props.autoLoad && !_this.autoLoaded) {
                _this.autoLoaded = true;
                _this.scrollHandler();
            }
        }, _this.detachScrollEvent = function () {
            var scrollEl = _this.props.useWindow ? window : _this.selfComponent.parentNode;

            scrollEl.removeEventListener('scroll', _this.scrollHandler, false);
            scrollEl.removeEventListener('resize', _this.scrollHandler, false);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(LimitedInfiniteScroll, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.attachScrollEvent();
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            this.detachScrollEvent();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if ((!this.props.limit || this.page < this.props.limit) && prevState.loading === this.state.loading) {
                this.attachScrollEvent();
                this.setState({
                    loading: false
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.detachScrollEvent();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                limit = _props.limit,
                pageStart = _props.pageStart,
                threshold = _props.threshold,
                hasMore = _props.hasMore,
                autoLoad = _props.autoLoad,
                useWindow = _props.useWindow,
                loadNext = _props.loadNext,
                spinLoader = _props.spinLoader,
                mannualLoader = _props.mannualLoader,
                noMore = _props.noMore,
                children = _props.children,
                props = _objectWithoutProperties(_props, ['limit', 'pageStart', 'threshold', 'hasMore', 'autoLoad', 'useWindow', 'loadNext', 'spinLoader', 'mannualLoader', 'noMore', 'children']);

            mannualLoader.props.onClick = function () {
                loadNext(_this2.page += 1);
                _this2.setState({
                    loading: true
                });
            };

            props.ref = function (node) {
                return _this2.selfComponent = node;
            };

            return _react2.default.createElement(
                'div',
                props,
                children,
                this.state.loading && hasMore && this.page < limit && spinLoader,
                hasMore && limit > 0 && this.page >= limit && mannualLoader,
                !hasMore && noMore
            );
        }
    }]);

    return LimitedInfiniteScroll;
}(Comment);

LimitedInfiniteScroll.propTypes = {
    limit: _react.PropTypes.number,
    pageStart: _react.PropTypes.number,
    threshold: _react.PropTypes.number,
    hasMore: _react.PropTypes.bool,
    autoLoad: _react.PropTypes.bool,
    useWindow: _react.PropTypes.bool,
    loadNext: _react.PropTypes.func.isRequired,
    spinLoader: _react.PropTypes.element,
    mannualLoader: _react.PropTypes.element,
    noMore: _react.PropTypes.element
};
LimitedInfiniteScroll.defaultProps = {
    limit: 5,
    pageStart: 0,
    threshold: 200,
    hasMore: false,
    autoLoad: true,
    useWindow: true,
    spinLoader: undefined._defaultSpinLoader,
    mannualLoader: undefined._defaultManualLoader,
    noMore: null
};
exports.default = LimitedInfiniteScroll;
module.exports = exports['default'];
