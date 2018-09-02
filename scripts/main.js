function fetchAndBindProjects() {
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

function getImageFor(image) {
  return `/img/${image}.png`;
}

function getImageSourcesetFor(image, size) {
  return `/img/${image}-${size}.png`;
}

function fetchAndBindPromotionalApps() {
  fetch('/data/apps.json').then(response => {
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
      const apps = document.getElementById('promotional-apps');
      for (const data of json) {

        const appTitle = data['name'];
        const appDescription = data['description'];
        const appImage = data['image'];
        const appLink = data['link'];

        const app = document.createElement('div');
        app.setAttribute('class', 'card');

        const picture = document.createElement('picture');

        const sourceLarge = document.createElement('source');
        const sourceMedium = document.createElement('source');
        const sourceSmall = document.createElement('source');

        sourceLarge.setAttribute('media', '(min-width: 800px)');
        sourceMedium.setAttribute('media', '(min-width: 500px)');
        sourceSmall.setAttribute('media', '(max-width: 499px)');

        sourceLarge.setAttribute('srcset', getImageSourcesetFor(appImage, 'large'));
        sourceMedium.setAttribute('srcset', getImageSourcesetFor(appImage, 'medium'));
        sourceSmall.setAttribute('srcset', getImageSourcesetFor(appImage, 'small'));

        picture.appendChild(sourceLarge);
        picture.appendChild(sourceMedium);
        picture.appendChild(sourceSmall);

        const img = document.createElement('img');
        img.setAttribute('class', 'card-img-top');
        img.setAttribute('src', getImageSourcesetFor(appImage, 'thumbnail'));
        img.setAttribute('Alt', `${appTitle} logo`);

        picture.appendChild(img);

        app.appendChild(picture);

        const body = document.createElement('div');
        body.setAttribute('class', 'card-body');

        const title = document.createElement('h4');
        title.setAttribute('class', 'card-title');
        title.innerHTML = appTitle;

        body.appendChild(title);

        const description = document.createElement('p');
        description.setAttribute('class', 'card-text dahham-promotional-apps-description');
        description.innerHTML = appDescription;

        body.appendChild(description);

        const link = document.createElement('a');
        link.setAttribute('href', appLink);

        const linkButton = document.createElement('button');
        linkButton.setAttribute('class', 'btn btn-large btn-block btn-success');
        linkButton.innerHTML = 'Download';

        link.appendChild(linkButton);

        body.appendChild(link);

        app.appendChild(picture);
        app.appendChild(body);

        apps.appendChild(app);

      }
    }
  });
}

function bindViews() {
  fetchAndBindPromotionalApps();
  fetchAndBindProjects();
}
if (document.readyState === 'loading') {
  self.addEventListener('DOMContentLoaded', bindViews);
} else {
  bindViews();
}