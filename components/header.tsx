import { TypographyH1 } from "@/components/ui/typography";
import Image from "next/image";

export default function Header() {
  return (
    <header className="my-auto flex justify-center px-4 pt-10 pb-24">
      <div className="relative">
        <TypographyH1>impostor</TypographyH1>
        <Image
          src="/illustrations/right-doubt-stickman.svg"
          alt=""
          width={110}
          height={158}
          className="absolute -top-8 -right-14"
        />
        <Image
          src="/illustrations/middle-happy-stickman.svg"
          alt=""
          width={41}
          height={67}
          className="absolute top-full left-1/2 -translate-x-1/2"
        />
        <Image
          src="/illustrations/left-doubt-stickman.svg"
          alt=""
          width={86}
          height={154}
          className="absolute -top-8 -left-16"
        />
      </div>
    </header>
  );
}
