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

    fade(element, options = { timeout: 100 }) {
      const timeout = options?.timeout ?? 100;
      
      if (element.style.display === 'none' || element.classList.contains('hidden')) {
        element.style.display = '';
        element.style.transition = `all ${timeout}ms ease-in-out`;
        element.style.opacity = '0';
        setTimeout(() => element.style.opacity = '1', 0);
      } else {
        element.style.opacity = '0';
        setTimeout(() => element.style.display = 'none', timeout + 100);
      }
    },
  };

  function Provider(name) {
    this.name = name;

    /**
     * Get data from data in config by key. If key is null, get data from data in config by name.
     *
     * @param {string} key
     * @param {string} defaultValue
     * @returns {any}
     */
    this.getData = function (key = null, defaultValue = null) {
      return getKey(_config.data, key || this.name, defaultValue);
    };

    /**
     * Get element by name.
     */
    this.getElement = function () {
      return document.getElementById(this.name);
    };

    /**
     * Get date in format Month day, year
     * 
     * @param {number} year
     * @param {number} month
     * @param {number} day
     * @returns {string}
     */
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

    /**
     * Run effect
     *
     * @param {string} effect
     * @param {any[]} args
     * @returns {boolean}
     */
    this.effect = function (effect, args) {
      return _effects?.[camelCase(effect)]?.(...args);
    }

    /**
     * Run effect with default data and element.
     *
     * @param {string} effect
     * @param {any[]} args
     * @returns {boolean}
     */
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

  function camelCase(str) {
    return str
      .replace(/[\s\-_\.]+/g, ' ')
      .replace(/[a-zA-Z0-9]+[\S\-_]*/g, match => match.charAt(0).toUpperCase() + match.substring(1).toLowerCase())
      .replace(/\s/g, '')
      .replace(/^(.)/, (_, p1) => p1.toLowerCase());
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
        _config.render[section] = provider => provider.handleEffect(handler, { timeout: 100 });
      } else {
        _config.render[section] = handler;
      }

      return this;
    },

    start() {
      const preload = document.getElementById('preload');
      setTimeout(function () {
        if (preload) {
          preload.style.opacity = '0';
        }

        for (const section in _config.render) {
          if (renderable(section)) {
            _config.render[section](new Provider(section));
          }
        }
      }, 1000);

      if (preload) {
        setTimeout(function () {
          preload.remove();
        }, 1600);
      }

    },
  };
});
