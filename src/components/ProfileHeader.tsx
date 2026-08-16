import { ProfileAvatar } from "@/components/ProfileAvatar";

import { ShareButton } from "@/components/ShareButton";

import { SocialLinks } from "@/components/SocialLinks";

import { siteConfig } from "@/data/site";



export function ProfileHeader({ onExplore }: { onExplore: () => void }) {

  const { profile } = siteConfig;



  return (

    <header className="relative px-1 pt-5 pb-4 text-center sm:pt-8 sm:pb-6">

      <ShareButton className="absolute top-3 left-0 z-10 sm:top-5" />



      <ProfileAvatar variant="header" className="mx-auto mb-3.5 sm:mb-4" />



      <h1

        dir="ltr"

        className="brand px-10 text-[1.45rem] leading-[1.25] font-semibold tracking-tight text-foreground sm:px-4 sm:text-[2rem]"

      >

        {profile.name}

      </h1>

      <p className="mt-2 text-[13.5px] leading-[1.7] text-muted sm:text-[15px]">

        {profile.title}

      </p>

      <p className="mx-auto mt-2 max-w-[34rem] text-[13.5px] leading-[1.85] text-foreground/70 sm:mt-3 sm:text-[15px]">

        {profile.bio}

      </p>



      <button

        type="button"

        onClick={onExplore}

        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[13.5px] font-semibold text-[#171716] transition hover:brightness-105 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:mt-5 sm:text-[14px]"

      >

        {siteConfig.ui.explore}

        <span aria-hidden="true">↓</span>

      </button>



      <div className="mt-4 sm:mt-5">

        <SocialLinks />

      </div>

    </header>

  );

}

