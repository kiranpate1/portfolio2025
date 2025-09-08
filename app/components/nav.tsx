import Projects from "./projects";

type props = {
  scrollPos: number;
  padding: number;
};

const Nav = ({ scrollPos, padding }: props) => {
  console.log(scrollPos);
  return (
    <nav
      className="flex flex-col justify-between"
      style={{
        minHeight: `calc(100vh - ${padding * 2}px)`,
        maxHeight: `calc(100vh - ${padding * 2}px)`,
      }}
    >
      <div className="flex flex-col gap-4">
        <a
          href="#about"
          className={`block text-lg font-medium hover:underline ${
            scrollPos < 0.33 ? "text-white" : "text-gray-400"
          }`}
        >
          About
        </a>
        <a
          href="#projects"
          className={`block text-lg font-medium hover:underline ${
            scrollPos >= 0.33 && scrollPos < 0.66
              ? "text-white"
              : "text-gray-400"
          }`}
        >
          Projects
        </a>
        <a
          href="#contact"
          className={`block text-lg font-medium hover:underline ${
            scrollPos >= 0.66 ? "text-white" : "text-gray-400"
          }`}
        >
          Contact
        </a>
      </div>
      <div className="relative flex gap-[3px] items-stretch w-full h-4 p-1 bg-[#222] rounded-2xl">
        {Projects.map((project, index) => (
          <div
            key={index}
            className="flex-1 h-full rounded-xl"
            style={{ backgroundColor: project.color }}
          ></div>
        ))}
        <div
          className="absolute w-[1px] h-full bg-white top-0 bottom-0"
          style={{ left: `${scrollPos * 100}%` }}
        ></div>
      </div>
    </nav>
  );
};

export default Nav;
