import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import {
  targetElements,
  defaultProps,
  projectElements,
} from "./data/scrollRevealConfig";
import { fetchProjects } from "./fetchData";

initScrollReveal(targetElements, defaultProps);
initTiltEffect();

fetchProjects(() => {
  setTimeout(() => {
    initScrollReveal(projectElements, defaultProps);
    initTiltEffect();
  }, 2000);
});
