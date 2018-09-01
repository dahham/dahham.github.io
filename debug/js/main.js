function fetchAndDisplayProjects() {
  fetch('/data/projects.json').then(response => {
    if (response.ok) {
      return response.json();
    } else {
      console.log('error while getting projects.json');
      console.log(response);
    }
  }).then(json => {
    if (json == undefined) {
      console.log('Error while formatting json');
    } else {
      const projectBody = document.getElementById('project-body');
      for (var i = 0; i < json.length; i++) {
        const data = json[i];
        const project = document.createElement('li');
        project.setAttribute('class', 'list-group-item');

        const numberLabel = document.createElement('span');
        numberLabel.setAttribute('class', 'badge dahham-project-number-label');
        numberLabel.innerHTML = i + 1;
        project.appendChild(numberLabel);

        const header = document.createElement('h4');
        header.setAttribute('class', 'text-center');
        header.innerHTML = data['name'];
        project.appendChild(header);

        const description = document.createElement('p');
        description.innerHTML = data['description'];
        project.appendChild(description);

        const link = document.createElement('a');
        link.setAttribute('class', 'btn btn-info text-center');
        link.setAttribute('href', data['link']);
        link.innerHTML = 'View On Github';
        project.appendChild(link);

        projectBody.appendChild(project);
      }
    }

  });
}

if (document.readyState === 'loading') {
  self.addEventListener('DOMContentLoaded', fetchAndDisplayProjects);
} else {
  fetchAndDisplayProjects();
}