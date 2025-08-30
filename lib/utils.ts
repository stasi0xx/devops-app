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

export const getTimeStamp = (date: Date): string => {
  // Utworzenie formatera dla języka polskiego
  const rtf = new Intl.RelativeTimeFormat("pl-PL", { numeric: "auto" });

  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Sprawdzamy interwały od największego do najmniejszego
  const years = Math.floor(seconds / 31536000);
  if (years > 0) {
    return rtf.format(-years, "year");
  }

  const months = Math.floor(seconds / 2592000);
  if (months > 0) {
    return rtf.format(-months, "month");
  }

  const days = Math.floor(seconds / 86400);
  if (days > 0) {
    return rtf.format(-days, "day");
  }

  const hours = Math.floor(seconds / 3600);
  if (hours > 0) {
    return rtf.format(-hours, "hour");
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes > 0) {
    return rtf.format(-minutes, "minute");
  }

  // Dla sekund zwracamy krótszy format, jak w przykładzie
  if (seconds < 10) {
    return "przed chwilą";
  }
  return `${seconds} sekund temu`; // Można też użyć rtf.format(-seconds, 'second')
};
