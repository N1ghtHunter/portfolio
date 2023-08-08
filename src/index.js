import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";


const projectContainer = document.querySelector("#projects-container");

initScrollReveal(targetElements, defaultProps);
initTiltEffect();

(async () => {
  try {
    const getProjects = async () => {
      const response = await fetch("https://mazin-portfolio-backend.azurewebsites.net/api/projects");
      const data = await response.json();
      console.log(data);
      return data;
    }

    const projects = await getProjects();
    const createProject = (project) => {
      const projectElement = document.createElement("div");
      projectElement.classList.add("row");

      const projectText = document.createElement("div");
      projectText.classList.add("col-lg-4", "col-sm-12");
      projectText.innerHTML = `
               <div class="project-wrapper__text load-hidden">
               <h3 class="project-wrapper__text-title">${project.title}</h3>
               <div>
               <p class="mb-4">
               ${project.description}
               </p>
               </div>
               <a rel="noreferrer" target="_blank" class="cta-btn cta-btn--hero" href="${project.live_demo}">
               See Live
               </a>
               <a rel="noreferrer" target="_blank" class="cta-btn text-color-main" href="${project.source_code}">
               Source Code
               </a>
               </div>
               `;

      const projectImage = document.createElement("div");
      projectImage.classList.add("col-lg-8", "col-sm-12");
      projectImage.innerHTML = `
               <div class="project-wrapper__image load-hidden">
               <a rel="noreferrer" href="${project.link}" target="_blank">
               <div data-tilt data-tilt-max="4" data-tilt-glare="true" data-tilt-max-glare="0.5" class="thumbnail rounded js-tilt">
               <img alt="Project Image" class="img-fluid" src="http://localhost:3008${project.image_path}"
                style=" aspect-ratio: 16/9;"
               />
               </div>
               </a>
               </div>
               `;

      projectElement.appendChild(projectText);
      projectElement.appendChild(projectImage);

      return projectElement;
    }

    projects.forEach(project => {
      projectContainer.appendChild(createProject(project));
    }
    );
  } catch (error) {
    console.log(error);
  }

  initScrollReveal(targetElements, defaultProps);
  initTiltEffect();
})();



