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
  .render('projectItem', function ({ project, parentElement }) {
    const projectElement = document.createElement('div');
    projectElement.classList.add('my-4');
    const name = document.createElement('h3');
    name.classList.add('text-xl', 'text-sky-600', 'font-semibold');
    name.innerText = project.name;

    const ul = document.createElement('ul');
    ul.classList.add('pl-8', 'list-disc');

    const description = document.createElement('li');
    description.innerText = `Description: ${project.description}`;
    ul.appendChild(description);

    const responsibilities = document.createElement('li');
    responsibilities.innerText = `Responsibilities: ${project.responsibilities}`;
    ul.appendChild(responsibilities);

    if (project?.dedications) {
      const dedications = document.createElement('li');
      dedications.innerText = `Dedications: ${project.dedications}`;
      ul.appendChild(dedications);
    }

    projectElement.appendChild(name);
    projectElement.appendChild(ul);

    parentElement.append(projectElement);
  })
  .start();
