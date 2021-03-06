import { useCallback, useRef, useReducer } from 'react';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

/**
 * Returns a function that can be called with an object. The return value of the
 * new function is a copy of the object excluding the key passed initially.
 */
function omit(key) {
  return function (object) {
    var toRemove = object[key],
        rest = _objectWithoutProperties(object, [key].map(_toPropertyKey));

    return rest;
  };
}
/**
 * An empty function. It does nothing.
 */

function noop() {}
/**
 * Like `noop`, but passes through the first argument.
 */

function identity(val) {
  return val;
}
/**
 * Cast non-string values to a string, with the exception of functions, symbols,
 * and undefined.
 */

function toString(value) {
  switch (_typeof(value)) {
    case 'function':
    case 'symbol':
    case 'undefined':
      return '';

    default:
      return '' + value;
    // eslint-disable-line prefer-template
  }
}
function isFunction(value) {
  return typeof value === 'function';
}

var objectToString = function objectToString(value) {
  return Object.prototype.toString.call(value);
};
/**
 * Determines if a value is an empty collection (object, array, string, map, set)
 * @note this returns false for anything else.
 */


function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (Array.isArray(value) || typeof value === 'string') {
    return !value.length;
  }

  if (objectToString(value) === '[object Map]' || objectToString(value) === '[object Set]') {
    return !value.size;
  }

  if (objectToString(value) === '[object Object]') {
    return !Object.keys(value).length;
  }

  return false;
}

var defaultInputOptions = {
  onChange: identity,
  onBlur: noop,
  validate: null,
  validateOnBlur: false,
  touchOnChange: false
};
function parseInputArgs(args) {
  var name;
  var ownValue;
  var options;

  if (typeof args[0] === 'string' || typeof args[0] === 'number') {
    var _args = _slicedToArray(args, 2);

    name = _args[0];
    ownValue = _args[1];
  } else {
    var _args2 = _slicedToArray(args, 1);

    var _args2$ = _args2[0];
    name = _args2$.name;
    ownValue = _args2$.value;
    options = _objectWithoutProperties(_args2$, ["name", "value"]);
  }

  return _objectSpread({
    name: name,
    ownValue: ownValue
  }, defaultInputOptions, options);
}

var defaultCreateId = function defaultCreateId(name, value) {
  return ['__ufs', name, value].filter(Boolean).join('__');
};

function useInputId(implementation) {
  var getId = useCallback(function (name, ownValue) {
    var createId;

    if (!implementation) {
      createId = noop;
    } else if (isFunction(implementation)) {
      createId = implementation;
    } else {
      createId = defaultCreateId;
    }

    var value = toString(ownValue);
    return value ? createId(name, value) : createId(name);
  }, [implementation]);
  var getIdProp = useCallback(function (prop, name, value) {
    var id = getId(name, value);
    return id === undefined ? {} : _defineProperty({}, prop, id);
  }, [getId]);
  return {
    getIdProp: getIdProp
  };
}

function useCache() {
  var cache = useRef(new Map());

  var has = function has(key) {
    return cache.current.has(key);
  };

  var get = function get(key) {
    return cache.current.get(key);
  };

  var set = function set(key, value) {
    return cache.current.set(key, value);
  };

  return {
    set: set,
    has: has,
    get: get
  };
}

function stateReducer(state, newState) {
  return isFunction(newState) ? newState(state) : _objectSpread({}, state, newState);
}

function useState(_ref) {
  var initialState = _ref.initialState,
      onClear = _ref.onClear;
  var state = useRef();

  var _useReducer = useReducer(stateReducer, initialState || {}),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      values = _useReducer2[0],
      setValues = _useReducer2[1];

  var _useReducer3 = useReducer(stateReducer, {}),
      _useReducer4 = _slicedToArray(_useReducer3, 2),
      touched = _useReducer4[0],
      setTouched = _useReducer4[1];

  var _useReducer5 = useReducer(stateReducer, {}),
      _useReducer6 = _slicedToArray(_useReducer5, 2),
      validity = _useReducer6[0],
      setValidity = _useReducer6[1];

  var _useReducer7 = useReducer(stateReducer, {}),
      _useReducer8 = _slicedToArray(_useReducer7, 2),
      errors = _useReducer8[0],
      setError = _useReducer8[1];

  state.current = {
    values: values,
    touched: touched,
    validity: validity,
    errors: errors
  };

  function _setField(name, value, inputValidity, inputTouched, inputError) {
    setValues(_defineProperty({}, name, value));
    setTouched(_defineProperty({}, name, inputTouched));
    setValidity(_defineProperty({}, name, inputValidity));
    setError(_defineProperty({}, name, inputError));
  }

  var clearField = function clearField(name) {
    return _setField(name);
  };

  return {
    /**
     * @type {{ values, touched, validity, errors }}
     */
    get current() {
      return state.current;
    },

    setValues: setValues,
    setTouched: setTouched,
    setValidity: setValidity,
    setError: setError,
    controls: {
      clearField: clearField,
      clear: function clear() {
        Object.keys(state.current.values).forEach(clearField);
        onClear();
      },
      setField: function setField(name, value) {
        _setField(name, value, true, true);
      }
    }
  };
}

var CHECKBOX = 'checkbox';
var COLOR = 'color';
var DATE = 'date';
var EMAIL = 'email';
var MONTH = 'month';
var NUMBER = 'number';
var PASSWORD = 'password';
var RADIO = 'radio';
var RANGE = 'range';
var RAW = 'raw';
var SEARCH = 'search';
var SELECT = 'select';
var SELECT_MULTIPLE = 'selectMultiple';
var TEL = 'tel';
var TEXT = 'text';
var TEXTAREA = 'textarea';
var TIME = 'time';
var URL = 'url';
var WEEK = 'week';
var LABEL = 'label';
var TYPES = [CHECKBOX, COLOR, DATE, EMAIL, MONTH, NUMBER, PASSWORD, RADIO, RANGE, RAW, SEARCH, SELECT, SELECT_MULTIPLE, TEL, TEXT, TEXTAREA, TIME, URL, WEEK];
var CONSOLE_TAG = '[useFormState]';

var defaultFromOptions = {
  onChange: noop,
  onBlur: noop,
  onTouched: noop,
  onClear: noop,
  withIds: false
};
function useFormState(initialState, options) {
  var formOptions = _objectSpread({}, defaultFromOptions, options);

  var formState = useState(_objectSpread({
    initialState: initialState
  }, formOptions));

  var _useInputId = useInputId(formOptions.withIds),
      getIdProp = _useInputId.getIdProp;

  var _useCache = useCache(),
      setDirty = _useCache.set;

  var devWarnings = useCache();

  function warn(key, type, message) {
    /* istanbul ignore else */
    if (!devWarnings.has("".concat(type, ":").concat(key))) {
      devWarnings.set("".concat(type, ":").concat(key), true); // eslint-disable-next-line no-console

      console.warn(CONSOLE_TAG, message);
    }
  }

  var createPropsGetter = function createPropsGetter(type) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _parseInputArgs = parseInputArgs(args),
          name = _parseInputArgs.name,
          ownValue = _parseInputArgs.ownValue,
          inputOptions = _objectWithoutProperties(_parseInputArgs, ["name", "ownValue"]);

      var hasOwnValue = !!toString(ownValue);
      var isCheckbox = type === CHECKBOX;
      var isRadio = type === RADIO;
      var isSelectMultiple = type === SELECT_MULTIPLE;
      var isRaw = type === RAW;
      var hasValueInState = formState.current.values[name] !== undefined; // This is used to cache input props that shouldn't change across
      // re-renders.  Note that for `raw` values, `toString(ownValue)`
      // will return '[object Object]'.  This means we can't have multiple
      // raw inputs with the same name and different values, but this is
      // probably fine.

      var key = "".concat(type, ".").concat(name, ".").concat(toString(ownValue));

      function setInitialValue() {
        /* istanbul ignore else */
        if (process.env.NODE_ENV === 'development') {
          if (isRaw && formState.current.values[name] === undefined) {
            warn(key, 'missingInitialValue', "The initial value for input \"".concat(name, "\" is missing. Custom inputs ") + 'controlled with raw() are expected to have an initial value ' + 'provided to useFormState(). To prevent React from treating ' + 'this input as uncontrolled, an empty string will be used instead.');
          }
        }

        var value = '';

        if (isCheckbox) {
          /**
           * If a checkbox has a user-defined value, its value the form state
           * value will be an array. Otherwise it will be considered a toggle.
           */
          value = hasOwnValue ? [] : false;
        }

        if (isSelectMultiple) {
          value = [];
        }

        formState.setValues(_defineProperty({}, name, value));
      }

      function getNextCheckboxValue(e) {
        var _e$target = e.target,
            value = _e$target.value,
            checked = _e$target.checked;

        if (!hasOwnValue) {
          return checked;
        }

        var checkedValues = new Set(formState.current.values[name]);

        if (checked) {
          checkedValues.add(value);
        } else {
          checkedValues["delete"](value);
        }

        return Array.from(checkedValues);
      }

      function getNextSelectMultipleValue(e) {
        return Array.from(e.target.options).reduce(function (values, option) {
          return option.selected ? [].concat(_toConsumableArray(values), [option.value]) : values;
        }, []);
      }

      function validate(e) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : isRaw ? e : e.target.value;
        var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : formState.current.values;
        var error;
        var isValid = true;
        /* istanbul ignore else */

        if (isFunction(inputOptions.validate)) {
          var result = inputOptions.validate(value, values, e);

          if (result !== true && result != null) {
            isValid = false;
            error = result !== false ? result : '';
          }
        } else if (!isRaw) {
          isValid = e.target.validity.valid;
          error = e.target.validationMessage;
        } else if (process.env.NODE_ENV === 'development') {
          warn(key, 'missingValidate', "You used a raw input type for \"".concat(name, "\" without providing a ") + 'custom validate method. As a result, validation of this input ' + 'will be set to "true" automatically. If you need to validate ' + 'this input, provide a custom validation option.');
        }

        formState.setValidity(_defineProperty({}, name, isValid));
        formState.setError(isEmpty(error) ? omit(name) : _defineProperty({}, name, error));
      }

      function touch(e) {
        if (!formState.current.touched[name]) {
          formState.setTouched(_defineProperty({}, name, true));
          formOptions.onTouched(e);
        }
      }

      var inputProps = _objectSpread({
        name: name,

        get type() {
          if (type !== SELECT && type !== SELECT_MULTIPLE && type !== TEXTAREA) {
            return type;
          }
        },

        get multiple() {
          if (type === SELECT_MULTIPLE) {
            return true;
          }
        },

        get checked() {
          var values = formState.current.values;

          if (isRadio) {
            return values[name] === toString(ownValue);
          }

          if (isCheckbox) {
            if (!hasOwnValue) {
              return values[name] || false;
            }
            /**
             * @todo Handle the case where two checkbox inputs share the same
             * name, but one has a value, the other doesn't (throws currently).
             * <input {...input.checkbox('option1')} />
             * <input {...input.checkbox('option1', 'value_of_option1')} />
             */


            return hasValueInState ? values[name].includes(toString(ownValue)) : false;
          }
        },

        get value() {
          // auto populating initial state values on first render
          if (!hasValueInState) {
            setInitialValue();
          } // auto populating default values of touched


          if (formState.current.touched[name] == null) {
            formState.setTouched(_defineProperty({}, name, false));
          }
          /**
           * Since checkbox and radio inputs have their own user-defined values,
           * and since checkbox inputs can be either an array or a boolean,
           * returning the value of input from the current form state is illogical
           */


          if (isCheckbox || isRadio) {
            return toString(ownValue);
          }

          return hasValueInState ? formState.current.values[name] : '';
        },

        onChange: function onChange(e) {
          setDirty(name, true);
          var value;

          if (isRaw) {
            value = inputOptions.onChange(e);

            if (value === undefined) {
              // setting value to its current state if onChange does not return
              // value to prevent React from complaining about the input switching
              // from controlled to uncontrolled
              value = formState.current.values[name];
              /* istanbul ignore else */

              if (process.env.NODE_ENV === 'development') {
                warn(key, 'onChangeUndefined', "You used a raw input type for \"".concat(name, "\" with an onChange() ") + 'option without returning a value. The onChange callback ' + 'of raw inputs, when provided, is used to determine the ' + 'custom value that will be stored in the form state. ' + 'Therefore, a value must be returned from the onChange callback.');
              }
            }
          } else {
            if (isCheckbox) {
              value = getNextCheckboxValue(e);
            } else if (isSelectMultiple) {
              value = getNextSelectMultipleValue(e);
            } else {
              value = e.target.value;
            }

            inputOptions.onChange(e);
          } // Mark raw fields as touched on change, since we might not get an
          // `onBlur` event from them.


          if (inputOptions.touchOnChange) {
            touch(e);
          }

          var partialNewState = _defineProperty({}, name, value);

          var newValues = _objectSpread({}, formState.current.values, partialNewState);

          formOptions.onChange(e, formState.current.values, newValues);

          if (!inputOptions.validateOnBlur) {
            validate(e, value, newValues);
          }

          formState.setValues(partialNewState);
        },
        onBlur: function onBlur(e) {
          touch(e);
          inputOptions.onBlur(e);
          formOptions.onBlur(e);
          if (inputOptions.validateOnBlur) validate(e);
        }
      }, getIdProp('id', name, ownValue));

      return isRaw ? {
        onChange: inputProps.onChange,
        onBlur: inputProps.onBlur,
        value: inputProps.value
      } : inputProps;
    };
  };

  var inputPropsCreators = TYPES.reduce(function (methods, type) {
    return _objectSpread({}, methods, _defineProperty({}, type, createPropsGetter(type)));
  }, {});
  return [_objectSpread({}, formState.current, formState.controls), _objectSpread({}, inputPropsCreators, _defineProperty({}, LABEL, function (name, ownValue) {
    return getIdProp('htmlFor', name, ownValue);
  }))];
}

export { useFormState };
