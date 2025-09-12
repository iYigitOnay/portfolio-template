import Image from "next/image";
import { Button } from "@/components/ui/Button";

type Props = {
  title: string; // İhsan Yiğit Önay
  subtitle: string; // Software Engineer
  cta: { label: string; href: string };
  avatarSrc?: string; // /iyo.jpg
};

export function Hero({ title, subtitle, cta, avatarSrc }: Props) {
  return (
    <section id="home" className="bg-[#000080] text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* SOL: metin */}
          <div className="space-y-3 md:space-y-4">
            <span className="heading-eyebrow text-blue-200">Introduction</span>

            {/* Mobilde beyaz, md+ gradyant; ek boşluk verildi */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mt-1 sm:mt-2 md:mt-0 md:gradient-blue-black">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-blue-200 font-semibold">
              {subtitle}
            </p>

            <p className="opacity-90 text-blue-100/90 max-w-prose">
              I’m a quick learner and collaborate closely with clients to create
              efficient, scalable and user-friendly solutions.
            </p>

            <div className="pt-1">
              <Button href={cta.href}>🚀 Go to My Project</Button>
            </div>
          </div>

          {/* SAĞ: yuvarlak foto alanı */}
          <div className="flex justify-center md:justify-end">
            <div className="relative h-44 w-44 md:h-56 md:w-56 rounded-full overflow-hidden ring-2 ring-white/20">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt="Profile"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full grid place-items-center bg-white/10">
                  <span className="text-sm text-blue-100/80">
                    Profile Photo
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
