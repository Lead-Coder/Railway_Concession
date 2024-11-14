import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import back from "../assets/train.jpg"

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({onGetStarted}) => {
  return (
    <div className="relative h-full w-screen">
      <div className="absolute w-full h-full bg-gray-800 -z-10 justify-self-start">
        <svg fill="#00f5ab" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="211px" height="211px" viewBox="0 0 220.68 220.68" xmlSpace="preserve" stroke="#00f5ab" strokeWidth="0.00220682"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon points="92.695,38.924 164.113,110.341 92.695,181.758 120.979,210.043 220.682,110.341 120.979,10.639 "></polygon> <polygon points="28.284,210.043 127.986,110.341 28.284,10.639 0,38.924 71.417,110.341 0,181.758 "></polygon> </g> </g></svg>
      </div>
      <section className="container grid lg:grid-cols-2 place-items-center py-20 px-10 md:py-32 gap-10">
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="text-white inline">
              Welcome to
            </h1>{" "}
            <h2 className="block">
              <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                Rail
              </span>{" "}
              <span className="inline bg-gradient-to-r from-[#ff6cc9] via-[#c34bff] to-[#cd61fb] text-transparent bg-clip-text">
                Sathi
              </span>{" "}
            </h2>
          </main>
          <p className="text-xl text-gray-200 text-muted-foreground md:w-10/12 mx-auto lg:mx-0 dark:text-gray-300">
            Build your React landing page effortlessly with the required sections
            to your project.
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button className="w-full md:w-1/3" onClick={onGetStarted}>Get Started</Button>
            <a
              rel="noreferrer noopener"
              href="https://github.com/Lead-Coder/Railway_Concession/"
              target="_blank"
              className={`w-full md:w-1/3 ${buttonVariants({
                variant: "outline",
              })}`}
            >
              Github Repository
              <GitHubLogoIcon className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
        {/* Hero cards sections */}
        <div className="z-10">
          <HeroCards />
          <div className="absolute hidden lg:flex lg:w-1/2 h-full -z-10 top-0 right-0 justify-self-start">
            <img alt="bg" src={back} className="w-[98%] h-full"/>
          </div>
        </div>
        {/* Shadow effect */}
        <div className="shadow"></div>
      </section>
    </div>
  );
};
