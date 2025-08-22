import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  // Możesz też zostawić: twMerge(clsx(inputs)) — obie wersje działają.
  return twMerge(clsx(...inputs));
}

export const getDeviconClassName = (techName: string): string => {
  // Usuwa kropki, trymuje i zamienia na małe litery
  const normalizedTechName = techName.replace(/\./g, "").trim().toLowerCase();

  // Mapowanie wyjątków/nietypowych nazw na klasy devicon
  const map: Record<string, string> = {
    javascript: "devicon-javascript-plain colored",
    typescript: "devicon-typescript-plain colored",
    react: "devicon-react-original colored",
    nextjs: "devicon-nextjs-plain",
    node: "devicon-nodejs-plain colored",
    nodejs: "devicon-nodejs-plain colored",
    tailwind: "devicon-tailwindcss-plain colored",
    tailwindcss: "devicon-tailwindcss-plain colored",
    redux: "devicon-redux-original colored",
    postgres: "devicon-postgresql-plain colored",
    postgresql: "devicon-postgresql-plain colored",
    mysql: "devicon-mysql-plain colored",
    docker: "devicon-docker-plain colored",
    kubernetes: "devicon-kubernetes-plain colored",
    aws: "devicon-amazonwebservices-original colored",
    html: "devicon-html5-plain colored",
    css: "devicon-css3-plain colored",
    sass: "devicon-sass-original colored",
    git: "devicon-git-plain colored",
    github: "devicon-github-original",
  };

  // Domyślnie spróbuj zbudować klasę wg konwencji devicon
  return map[normalizedTechName]
    ? `${map[normalizedTechName]}`
    : "devicon-devicon-plain";
};
