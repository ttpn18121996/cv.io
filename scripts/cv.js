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

  function getDobFormat(year, month, day) {
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
  }

  function renderable(section) {
    const callback = _config.render?.[section]?.callback;

    return callback && typeof callback === 'function';
  }

  function handleEffect(section, element) {
    const effect = _config.render?.[section]?.effect;
    const options = _config.render?.[section]?.options ?? {};

    if (!effect) {
      return false;
    }

    switch (effect) {
      case 'auto_type':
        autoType(element, options);
        return true;
    }
  }

  function renderName() {
    const fullName = _config.data?.fullName;
    const element = document.getElementById('fullName');

    if (!fullName) {
      return;
    }

    if (renderable('fullName')) {
      handleEffect('fullName', element) || _config.render.fullName.callback(fullName);

      return;
    }

    element.innerText = fullName;
  }

  function renderInformation() {
    const information = _config.data?.information;

    renderName();

    if (!information) {
      return;
    }

    let year = _config.data?.information?.dateOfBirth?.year ?? new Date().getFullYear();
    let month = _config.data?.information?.dateOfBirth?.month ?? new Date().getMonth() + 1;
    let day = _config.data?.information?.dateOfBirth?.day ?? new Date().getDate();
    const dobForHuman = getDobFormat(year, month, day);

    if (renderable('information')) {
      information.dobForHuman = dobForHuman;
      _config.render.information.callback(information);

      return;
    }

    document.getElementById('gender').innerText = `Gender: ${information?.gender ?? 'Male'}`;
    document.getElementById('dateOfBirth').innerHTML = `Date of birth: ${dobForHuman}`;
  }

  function renderSummary() {
    const summary = _config.data?.summary;
    const element = document.getElementById('summary');

    if (renderable('summary')) {
      handleEffect('summary', element) || _config.render.summary.callback({ summary, element });
      return;
    }

    element.innerHTML = _config.data?.summary ?? '';
  }

  function renderContact() {
    const contact = _config.data?.contact;

    if (!contact) {
      return;
    }

    if (renderable('contact')) {
      _config.render.contact.callback(contact);
      return;
    }

    for (const contactKey in contact) {
      const element = document.getElementById(contactKey);
      if (!element) {
        continue;
      }

      element.innerText = contact[contactKey]['label'];
      element.setAttribute('href', contact[contactKey]['link']);
    }
  }

  function renderTechnicalSkills() {
    const technicalSkills = _config.data?.technicalSkills;

    if (!technicalSkills) {
      return;
    }

    if (renderable('technicalSkills')) {
      _config.render.technicalSkills.callback(technicalSkills);
      return;
    }

    for (const skillGroup in technicalSkills) {
      for (const skill of technicalSkills[skillGroup]) {
        if (renderable('technicalSkillItem')) {
          _config.render.technicalSkillItem.callback({ skillGroup, skill });
          continue;
        }

        const div = document.createElement('div');
        div.innerText = skill;
        document.getElementById(skillGroup).appendChild(div);
      }
    }
  }

  function renderProjects() {
    const projects = _config.data?.projects;

    if (!projects) {
      return;
    }

    const parentElement = document.getElementById('projects');

    for (const project of projects) {
      if (renderable('projectItem')) {
        _config.render.projectItem.callback({ project, parentElement });
        continue;
      }

      const projectElement = document.createElement('div');
      const name = document.createElement('h3');
      name.innerText = project.name;

      const description = document.createElement('div');
      description.innerText = `Description: ${project.description}`;

      projectElement.appendChild(name);
      projectElement.appendChild(description);

      parentElement.append(projectElement);
    }
  }

  function autoType(element, options = {}) {
    let i = 0;
    const cursor = options?.cursor ?? '|';
    let result = cursor;
    let timeout = options?.timeout ?? 100;
    let key = options?.key;
    let text = _config.data?.[key];
    let interval;

    if (!key || !text) {
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
  }

  return {
    config(options) {
      _config = { ..._config, ...options };

      return this;
    },
    setData(data) {
      _config.data = { ..._config.data, ...data };

      return this;
    },
    render(section, callback) {
      if (typeof callback === 'string') {
        _config.render[section] = {
          callback: () => {},
          effect: callback,
          options: {
            key: section,
          },
        };
      } else if (typeof callback === 'object') {
        _config.render[section] = {
          callback: () => {},
          effect: callback?.effect,
          options: { key: section, ...callback },
        };
      } else {
        _config.render[section] = {
          callback,
        };
      }

      return this;
    },
    start() {
      renderInformation();
      renderSummary();
      renderContact();
      renderTechnicalSkills();
      renderProjects();
    },
  };
});
