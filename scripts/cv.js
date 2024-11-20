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
    autoType(text, element, options = {}) {
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
    const handle = _config.render?.[section]?.handle;

    return handle && typeof handle === 'function';
  }

  function handleEffect(section, element) {
    const effect = _config.render?.[section]?.effect;
    const options = _config.render?.[section]?.options ?? {};

    if (!effect) {
      return false;
    }

    switch (effect) {
      case 'auto_type':
        _effects.autoType(_config.data?.[section], element, options);
        return true;
    }
  }

  function renderName() {
    const fullName = _config.data?.fullName;
    const element = document.getElementById('fullName');

    document.title = fullName;

    if (!fullName || !element) {
      return;
    }

    const effect = handleEffect('fullName', element);

    if (effect) {
      return;
    }

    if (renderable('fullName')) {
      _config.render.fullName.handle({ fullName, effects: { ..._effects } });

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
      _config.render.information.handle({ ...information, effects: { ..._effects } });

      return;
    }

    const genderElement = document.getElementById('gender');
    const dobElement = document.getElementById('dateOfBirth');
    genderElement && (genderElement.innerText = `Gender: ${information?.gender ?? 'Male'}`);
    dobElement && (dobElement.innerHTML = `Date of birth: ${dobForHuman}`);
  }

  function renderSummary() {
    const summary = _config.data?.summary;
    const element = document.getElementById('summary');

    const effect = handleEffect('summary', element);

    if (effect) {
      return;
    }

    if (renderable('summary')) {
      _config.render.summary.handle({ summary, element, effects: { ..._effects } });
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
      _config.render.contact.handle({ ...contact, effects: { ..._effects } });
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
      _config.render.technicalSkills.handle({...technicalSkills, effects: { ..._effects }});
      return;
    }

    for (const skillGroup in technicalSkills) {
      for (const skill of technicalSkills[skillGroup]) {
        if (renderable('technicalSkillItem')) {
          _config.render.technicalSkillItem.handle({ skillGroup, skill, effects: { ..._effects } });
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
        _config.render.projectItem.handle({ project, parentElement, effects: { ..._effects } });
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

  return {
    setup(options) {
      _config = { ..._config, ...options };

      return this;
    },
    setData(data) {
      _config.data = { ..._config.data, ...data };

      return this;
    },
    render(section, handle) {
      if (typeof handle === 'string') {
        _config.render[section] = {
          handle: () => {},
          effect: handle,
          options: {},
        };
      } else if (typeof handle === 'object') {
        _config.render[section] = {
          handle: () => {},
          effect: handle?.effect,
          options: { ...handle },
        };
      } else {
        _config.render[section] = {
          handle,
        };
      }

      return this;
    },
    start() {
      setTimeout(function () {
        document.getElementById('preload').style.opacity = '0';
        renderInformation();
        renderSummary();
        renderContact();
        renderTechnicalSkills();
        renderProjects();
      }, 1000);
    },
  };
});
