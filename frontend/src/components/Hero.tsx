import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({onGetStarted}) => {
  return (
    <div className="relative h-full w-screen">
      <div className="absolute w-1/2 h-full bg-gray-200 -z-10 justify-self-start"></div>
      <section className="container grid lg:grid-cols-2 place-items-center py-20 px-10 md:py-32 gap-10">
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">
              Welcome to
            </h1>{" "}
            <h2 className="block">
              <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                Rail
              </span>{" "}
              <span className="inline bg-gradient-to-r from-[#cd61fb] via-[#c34bff] to-[#ff6cc9] text-transparent bg-clip-text">
                Sathi
              </span>{" "}
            </h2>
          </main>
          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Build your React landing page effortlessly with the required sections
            to your project.
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button className="w-full md:w-1/3" onClick={onGetStarted}>Get Started</Button>
            <a
              rel="noreferrer noopener"
              href="https://github.com/leoMirandaa/shadcn-landing-page.git"
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
        </div>
        {/* Shadow effect */}
        <div className="shadow"></div>
      </section>
    </div>
  );
};