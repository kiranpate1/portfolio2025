import type { ReactNode } from "react";

const Projects = [
  {
    title: "Dropbox",
    project: "Dropbox Brand Site",
    src: "/images/dropbox.png",
    color: "#0061FE",
    link: "https://brand.dropbox.com/",
    description:
      "Brand site for Dropbox with playful widgets and interactive sandboxes sprinkled throughout. As the lead developer, I created and guided most of the site, architected core components, and implemented many of the interactive experiences.",
  },
  {
    title: "Toronto Tech Week",
    project: "Toronto Tech Week 2025",
    src: "/images/fuckthisshit.png",
    color: "#D3CDB7",
    link: "https://toronto-tech-week.webflow.io/",
    description:
      "Marketing site for Toronto Tech Week 2025. I was the sole developer who built the site from the ground up, implementing a custom CMS and creating interactive features like a dynamic schedule, animated transitions, and responsive design.",
  },
  {
    title: "Superpower",
    project: "Superpower Site",
    src: "/images/superpower.png",
    color: "#FC5F2B",
    link: "https://superpower-theta.vercel.app/",
    description:
      "Marketing landing page for Superpower, a digital health clinic. I was the lead designer and developer who directed production of the site and created its most memorable interactions, including onboarding animations, interactive clinician profiles, and responsive, accessible UI.",
  },
  {
    title: "Codepen",
    project: "Codepen Profile",
    src: "/images/codepen.png",
    color: "linear-gradient(to right, #C4D2D8, #58A0E8, #AF8092, #524343)",
    link: "https://codepen.io/kiranpate1",
    description:
      "A home for all my interactive experiments. Within each pen, I explore new ideas, techniques, and technologies as I continue to learn and grow as a developer.",
  },
  {
    title: "Death Row Records",
    project: "Death Row Records Website",
    src: "/images/deathrow.webp",
    color: "#FF2200",
    link: "",
    description:
      "Revamped the iconic Death Row Records website, blending nostalgic design with modern web technologies. I led the development, creating interactive elements, smooth animations, and a responsive layout that honors the brand's legacy while engaging today's audience.",
  },
  {
    title: "My Artwork",
    project: "My Art Instagram",
    src: "/images/art.png",
    color: "#A94EB9",
    link: "https://www.instagram.com/artsbykiran/",
    description:
      "A curated collection of art and design pieces from my Instagram.",
  },
];
export default Projects;

export const projectIcons: Record<string, ReactNode> = {
  Dropbox: (
    <svg
      width="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.84982 6.59961L5.69995 8.62461L8.84982 10.6496L12.0002 8.62461L15.1501 10.6496L18.3 8.62461L15.1501 6.59961L12.0002 8.62461L8.84982 6.59961Z"
        fill="var(--shade-300)"
      />
      <path
        d="M8.84982 14.6996L5.69995 12.6746L8.84982 10.6496L12.0002 12.6746L8.84982 14.6996Z"
        fill="var(--shade-300)"
      />
      <path
        d="M12.0002 12.6746L15.1501 10.6496L18.3 12.6746L15.1501 14.6996L12.0002 12.6746Z"
        fill="var(--shade-300)"
      />
      <path
        d="M12.0002 17.3996L8.84982 15.3746L12.0002 13.3496L15.1501 15.3746L12.0002 17.3996Z"
        fill="var(--shade-300)"
      />
    </svg>
  ),
  TTW: (
    <svg
      width="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5557 17.5898L10.3582 24"
        stroke="var(--shade-300)"
        strokeWidth="0.6"
      />
      <path
        d="M12.0957 24V17.5898H13.6115L13.809 24"
        stroke="var(--shade-300)"
        strokeWidth="0.6"
      />
      <path
        d="M7.49377 14.5074C7.41989 14.4409 7.46692 14.3184 7.56632 14.3184H16.4322C16.5316 14.3184 16.5786 14.4409 16.5047 14.5074L14.7901 16.0506H9.20841L7.49377 14.5074Z"
        stroke="var(--shade-300)"
        strokeWidth="0.6"
      />
      <rect
        x="8.58301"
        y="9.16992"
        width="6.83276"
        height="2.30966"
        stroke="var(--shade-300)"
        strokeWidth="0.6"
      />
      <rect
        x="7.76514"
        y="16.0498"
        width="8.61312"
        height="1.49166"
        rx="0.745829"
        stroke="var(--shade-300)"
        strokeWidth="0.6"
      />
      <rect
        x="7.4281"
        y="11.4785"
        width="9.14242"
        height="2.83896"
        stroke="var(--shade-300)"
        strokeWidth="0.6"
      />
      <path
        d="M13.112 0L13.347 9.16943H10.8448L11.0799 0"
        stroke="var(--shade-300)"
        strokeWidth="0.6"
      />
    </svg>
  ),
  Superpower: (
    <svg
      width="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.1153 9.75604C15.6468 5.35709 8.17704 6.11991 8.17704 9.79418C8.17704 13.5066 13.6971 12.1971 13.6971 14.0533C13.6971 15.5154 10.5826 15.5916 10.266 13.8626C10.2154 13.621 10.1015 13.5066 9.89889 13.5066H8.03777C7.80988 13.5066 7.68327 13.621 7.69594 13.888C8.1264 18.2997 16.3052 18.198 16.3052 14.0533C16.3052 10.3154 10.6965 11.7775 10.6965 9.79418C10.6965 8.5228 13.2666 8.12868 13.5578 9.85775C13.6085 10.0866 13.7097 10.1883 13.925 10.1883H15.7861C16.0013 10.1883 16.1279 10.0485 16.1153 9.75604Z"
        fill="var(--shade-300)"
      />
    </svg>
  ),
  Codepen: (
    <svg
      width="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 10.7865L10.1795 12.0001L12 13.2138L13.8205 12.0001L12 10.7865ZM15.0375 11.1888L16.858 9.9751L12.675 7.18668V9.61398L15.0375 11.1888ZM17.4 11.236L16.2545 12.0001L17.4 12.7642V11.236ZM15.0375 12.8115L12.675 14.3862V16.8135L16.858 14.0251L15.0375 12.8115ZM11.325 9.61398V7.18668L7.14203 9.9751L8.9625 11.1888L11.325 9.61398ZM7.14203 14.0251L11.325 16.8135V14.3862L8.9625 12.8115L7.14203 14.0251ZM7.74548 12.0001L6.6 11.236V12.7642L7.74548 12.0001ZM5.25 9.9751C5.24998 9.864 5.27739 9.75462 5.32979 9.65665C5.38219 9.55868 5.45796 9.47516 5.55037 9.4135L11.6254 5.3635C11.7363 5.28949 11.8667 5.25 12 5.25C12.1333 5.25 12.2637 5.28949 12.3746 5.3635L18.4496 9.4135C18.542 9.47516 18.6178 9.55868 18.6702 9.65665C18.7226 9.75462 18.75 9.864 18.75 9.9751V14.0251C18.75 14.1362 18.7226 14.2456 18.6702 14.3436C18.6178 14.4415 18.542 14.525 18.4496 14.5867L12.3746 18.6367C12.2637 18.7107 12.1333 18.7502 12 18.7502C11.8667 18.7502 11.7363 18.7107 11.6254 18.6367L5.55037 14.5867C5.45796 14.525 5.38219 14.4415 5.32979 14.3436C5.27739 14.2456 5.24998 14.1362 5.25 14.0251V9.9751Z"
        fill="var(--shade-300)"
      />
    </svg>
  ),
  DDR: (
    <svg
      width="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="8" width="8" height="8" rx="4" fill="var(--shade-300)" />
    </svg>
  ),
  Art: (
    <svg
      width="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.48 6H14.52C16.44 6 18 7.56 18 9.48V14.52C18 15.443 17.6334 16.3281 16.9807 16.9807C16.3281 17.6334 15.443 18 14.52 18H9.48C7.56 18 6 16.44 6 14.52V9.48C6 8.55705 6.36664 7.6719 7.01927 7.01927C7.6719 6.36664 8.55705 6 9.48 6ZM9.36 7.2C8.78713 7.2 8.23773 7.42757 7.83265 7.83265C7.42757 8.23773 7.2 8.78713 7.2 9.36V14.64C7.2 15.834 8.166 16.8 9.36 16.8H14.64C15.2129 16.8 15.7623 16.5724 16.1674 16.1674C16.5724 15.7623 16.8 15.2129 16.8 14.64V9.36C16.8 8.166 15.834 7.2 14.64 7.2H9.36ZM15.15 8.1C15.3489 8.1 15.5397 8.17902 15.6803 8.31967C15.821 8.46032 15.9 8.65109 15.9 8.85C15.9 9.04891 15.821 9.23968 15.6803 9.38033C15.5397 9.52098 15.3489 9.6 15.15 9.6C14.9511 9.6 14.7603 9.52098 14.6197 9.38033C14.479 9.23968 14.4 9.04891 14.4 8.85C14.4 8.65109 14.479 8.46032 14.6197 8.31967C14.7603 8.17902 14.9511 8.1 15.15 8.1ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9ZM12 10.2C11.5226 10.2 11.0648 10.3896 10.7272 10.7272C10.3896 11.0648 10.2 11.5226 10.2 12C10.2 12.4774 10.3896 12.9352 10.7272 13.2728C11.0648 13.6104 11.5226 13.8 12 13.8C12.4774 13.8 12.9352 13.6104 13.2728 13.2728C13.6104 12.9352 13.8 12.4774 13.8 12C13.8 11.5226 13.6104 11.0648 13.2728 10.7272C12.9352 10.3896 12.4774 10.2 12 10.2Z"
        fill="var(--shade-300)"
      />
    </svg>
  ),
};
