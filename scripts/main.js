MyCv.setup({ data })
  .render('fullName', provider => {
    document.title = provider.getData('fullName', '');
    provider.handleEffect('auto_type', { timeout: 100 });
  })
  .render('information', provider => {
    const gender = provider.getData('information.gender', 'Male');

    let year = provider.getData('information.dateOfBirth.year', new Date().getFullYear());
    let month = provider.getData('information.dateOfBirth.month', new Date().getMonth() + 1);
    let day = provider.getData('information.dateOfBirth.day', new Date().getDate());
    const dobForHuman = provider.getDobFormat(year, month, day);

    const genderElement = document.getElementById('gender');
    const dobElement = document.getElementById('dateOfBirth');
    genderElement && (genderElement.innerText = `Gender: ${gender}`);
    dobElement && (dobElement.innerHTML = `Date of birth: ${dobForHuman}`);
  })
  .render('contact', provider => {
    const data = provider.getData();

    if (!data) {
      return;
    }

    for (const contact in data) {
      const element = document.getElementById(contact);

      if (!element) {
        continue;
      }

      element.innerText = data[contact]['label'];
      element.setAttribute('href', data[contact]['link']);
    }
  })
  .render('summary', provider => provider.handleEffect('auto_type', { timeout: 10 }))
  .render('technicalSkills', provider => {
    const data = provider.getData();

    if (!data) {
      return;
    }

    for (const skillGroup in data) {
      for (const skill of data[skillGroup]) {
        const li = document.createElement('li');
        li.innerText = skill;
        document.getElementById(skillGroup).appendChild(li);
      }
    }
  })
  .render('experiences', provider => {
    const data = provider.getData();

    if (!data) {
      return;
    }

    for (const experience of data) {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${experience.name}</strong> (${experience.from} - ${experience.to || 'Present'})`;
      document.getElementById('experiences').appendChild(li);
    }
  })
  .render('projects', provider => {
    const data = provider.getData();

    if (!data) {
      return;
    }

    const parentElement = provider.getElement();

    for (const project of data) {
      const projectElement = document.createElement('div');
      projectElement.classList.add('my-4');
      const name = document.createElement('h3');
      name.classList.add('text-lg', 'text-sky-600', 'font-semibold');
      provider.effect('auto_type', [project.name, name, { timeout: 50 }]);

      const ul = document.createElement('ul');
      ul.classList.add('pl-8', 'list-disc');

      const description = document.createElement('li');
      provider.effect('auto_type', [`Description: ${project.description}`, description, { timeout: 50 }]);
      ul.appendChild(description);

      if (project?.technologies && project.technologies.length) {
        const technologies = document.createElement('li');
        provider.effect('auto_type', [`Technologies: ${project.technologies.join(', ')}`, technologies, { timeout: 50 }]);
        ul.appendChild(technologies);
      }

      if (project?.teamSize) {
        const teamSize = document.createElement('li');
        teamSize.innerText = `Team size: ${project.teamSize}`;
        ul.appendChild(teamSize);
      }

      if (project?.responsibilities) {
        const responsibilities = document.createElement('li');
        provider.effect('auto_type', [`Responsibilities: ${project.responsibilities}`, responsibilities, { timeout: 50 }]);
        ul.appendChild(responsibilities);
      }

      if (project?.dedications) {
        const dedications = document.createElement('li');
        dedications.innerText = `Dedications: ${project.dedications}`;
        ul.appendChild(dedications);
      }

      if (project?.links && project.links.length) {
        const dedications = document.createElement('li');
        dedications.innerHTML = `Links: ${project.links
          .map(l => `<a href="${l.url}" class="text-blue-700 hover:text-blue-500">${l.label}</a>`)
          .join(', ')}`;
        ul.appendChild(dedications);
      }

      projectElement.appendChild(name);
      projectElement.appendChild(ul);

      parentElement.append(projectElement);
    }
  })
  .start();
