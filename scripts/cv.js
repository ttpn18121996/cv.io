'use strict';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MyCv = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  let _config = {
    render: {},
    data: {},
  };
  const _effects = {
    autoType(text, element, options = { cursor: '|', timeout: 100 }) {
      let i = 0;
      const cursor = options?.cursor ?? '|';
      let result = cursor;
      const timeout = options?.timeout ?? 100;
      let interval;

      if (!text) {
        return;
      }

      interval = setInterval(function () {
        result = result.replace(new RegExp('\\' + cursor + '$'), '') + text[i] + cursor;

        if (element.innerText.length > text.length) {
          clearInterval(interval);
          element.innerText = element.innerText.replace(new RegExp('\\' + cursor + '$'), '');
          return;
        }

        element.innerText = result;
        i++;
      }, timeout);
    },
  };

  function Provider(name) {
    this.name = name;

    this.getData = function (key = null, defaultValue = null) {
      return getKey(_config.data, key || this.name, defaultValue);
    };

    this.getElement = function () {
      return document.getElementById(this.name);
    };

    this.getDobFormat = function (year, month, day) {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      month = months[month - 1];

      const daySuffix = () => {
        if (day >= 11 && day <= 13) return 'th';

        switch (day % 10) {
          case 1:
            return 'st';
          case 2:
            return 'nd';
          case 3:
            return 'rd';
          default:
            return 'th';
        }
      };

      return `${month} ${day}<sup>${daySuffix()}</sup>, ${year}`;
    };

    this.call = function (section) {
      if (renderable(section)) {
        _config.render[section](new Provider(section));
        delete _config.render[section];
      }
    };

    this.effect = function (effect, args) {
      switch (effect) {
        case 'auto_type':
          _effects.autoType(...args);
          return true;
      }
    }

    this.handleEffect = function (effect, options) {
      const element = this.getElement();

      if (!effect && !element) {
        return;
      }

      this.effect(effect, [this.getData(), element, options]);
    }
  }

  function getKey(obj, keys, defaultValue = null) {
    let result = obj;
    keys.split('.').forEach((key) => {
      result = result?.[key];
    });
    return result ?? defaultValue;
  }

  function renderable(section) {
    const handle = _config.render?.[section];

    return handle && typeof handle === 'function';
  }

  return {
    setup(options) {
      _config = { ..._config, ...options };

      return this;
    },
    setData(data) {
      _config.data = { ..._config.data, ...data };

      return this;
    },
    render(section, handler) {
      if (typeof handler === 'string') {
        _config.render[section] = provider => provider.handleEffect(handler, { timeout: 10 });
      } else {
        _config.render[section] = handler;
      }

      return this;
    },

    start() {
      setTimeout(function () {
        document.getElementById('preload').style.opacity = '0';
        for (const section in _config.render) {
          if (renderable(section)) {
            _config.render[section](new Provider(section));
          }
        }
      }, 1000);

      setTimeout(function () {
        document.getElementById('preload').remove();
      }, 1600);
    },
  };
});
