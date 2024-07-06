import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

const firebaseConfig = {
  apiKey: "AIzaSyBLhBH1PS7xEpYQFWveezRR5IImDUiGxXE",
  authDomain: "portfolio-ee62c-632ed.firebaseapp.com",
  projectId: "portfolio-ee62c",
  storageBucket: "portfolio-ee62c.appspot.com",
  messagingSenderId: "825052487674",
  appId: "1:825052487674:web:0d85f5635fe5888c060e43",
  measurementId: "G-PEH4QXEX6K",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const projectsRef = collection(db, "projects");
const projectContainer = document.querySelector("#projects-container");

getDocs(projectsRef)
  .then((querySnapshot) => {
    const projects = [];
    querySnapshot.forEach((doc) => {
      // Get the data from each document
      const project = doc.data();
      projects.push(project);
    });
    projects
      .sort((a, b) => Number(a.index) - Number(b.index))
      .forEach((project) => {
        const projectElement = createProjectElement(project);
        projectContainer.appendChild(projectElement);
      });

    initScrollReveal(targetElements, defaultProps);
    initTiltEffect();
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

function createProjectElement(project) {
  const projectElement = document.createElement("div");
  projectElement.classList.add("row");

  const projectText = document.createElement("div");
  projectText.classList.add("col-lg-4", "col-sm-12");
  projectText.innerHTML = `
                <div class="project-wrapper__text load-hidden">
                <h3 class="project-wrapper__text-title">${project.name}</h3>
                <div>
                <p class="mb-4">
                ${project.description || ""}
                </p>
                </div>
                <a rel="noreferrer" target="_blank" class="cta-btn cta-btn--hero" href="${
                  project.link
                }">
                See Live
                </a>
                <a rel="noreferrer" target="_blank" class="cta-btn text-color-main" href="${
                  project.source_code
                }">
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
                <img alt="Project Image" class="img-fluid" src="${project.image}"
                style="  object-fit: cover; width: 100%; height: 100%;"
                />
              </div>
                </a>
            </div>
               `;

  projectElement.appendChild(projectText);
  projectElement.appendChild(projectImage);

  return projectElement;
}
