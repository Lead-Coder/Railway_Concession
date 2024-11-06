import { useState,useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { LogoIcon } from "./Icons";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "dashboard",
    label: "Concessions",
  },
  {
    href: "history",
    label: "History",
  },
  {
    href: "#about-us",
    label: "About Us",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              <LogoIcon />
              RailSathi
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    RailSathi
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <Profile/>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <Profile/>

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import axios from 'axios';

const Profile: React.FC = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleShow = () => setShow(true);

  useEffect(() => {
      if (show) {
          const fetchName = async () => {
              const token = localStorage.getItem('token');
              if (!token) {
                  console.error('No token found');
                  return;
              }

              try {
                  const response = await axios.get('http://localhost:3000/api/officer/dashboard', {
                      headers: {
                          'authorization': token,
                      },
                  });
                  setName(response.data.name);
              } catch (error) {
                  console.error(error);
              }
          };

          fetchName();
      }
  }, [show]);

  const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
  };

  return (
      <>
      <Popover>
          <PopoverTrigger>
              <Button onClick={handleShow}>
                  Profile
              </Button>
          </PopoverTrigger>
          <PopoverContent>
              <Card>
                  <CardHeader>
                      <CardTitle>Welcome</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <h5>{name}</h5>
                      <Button onClick={handleLogout} className="mt-4">
                          Logout
                      </Button>
                  </CardContent>
              </Card>
          </PopoverContent>
      </Popover>
      </>
  );
};