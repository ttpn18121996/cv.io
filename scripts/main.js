MyCv.setup({
  data,
  render: {
    summary: {
      effect: 'auto_type',
      options: { timeout: 10 },
    },
    technicalSkillItem: {
      handle({ skillGroup, skill }) {
        const li = document.createElement('li');
        li.innerText = skill;
        document.getElementById(skillGroup).appendChild(li);
      },
    },
  },
})
  .render('fullName', 'auto_type')
  .render('projectItem', function ({ project, parentElement, effects }) {
    const projectElement = document.createElement('div');
    projectElement.classList.add('my-4');
    const name = document.createElement('h3');
    name.classList.add('text-lg', 'text-sky-600', 'font-semibold');
    effects.autoType(project.name, name, { timeout: 50 });

    const ul = document.createElement('ul');
    ul.classList.add('pl-8', 'list-disc');

    const description = document.createElement('li');
    effects.autoType(`Description: ${project.description}`, description, { timeout: 10 });
    ul.appendChild(description);

    if (project?.responsibilities) {
      const responsibilities = document.createElement('li');
      effects.autoType(`Responsibilities: ${project.responsibilities}`, responsibilities, { timeout: 10 });
      ul.appendChild(responsibilities);
    }

    if (project?.dedications) {
      const dedications = document.createElement('li');
      dedications.innerText = `Dedications: ${project.dedications}`;
      ul.appendChild(dedications);
    }

    if (project?.links && project.links.length) {
      const dedications = document.createElement('li');
      dedications.innerHTML = `Links: ${project.links.map(l => `<a href="${l.url}" class="text-blue-700 hover:text-blue-500">${l.label}</a>`).join(', ')}`;
      ul.appendChild(dedications);
    }

    projectElement.appendChild(name);
    projectElement.appendChild(ul);

    parentElement.append(projectElement);
  })
  .start();
