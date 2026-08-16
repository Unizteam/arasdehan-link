import { MailIcon } from "@/components/icons";

import { ProfileAvatar } from "@/components/ProfileAvatar";

import { siteConfig } from "@/data/site";

import { hasEmail, mailtoHref } from "@/lib/links";



export function ContactSection() {

  const { contact, links } = siteConfig;

  const email = links.CONTACT_EMAIL;

  const enabled = hasEmail(email);



  return (

    <section

      id="contact"

      aria-labelledby="contact-heading"

      className="scroll-mt-[68px] border-t border-line pt-6 pb-1 sm:scroll-mt-[76px] sm:pt-8 sm:pb-2"

    >

      <h2

        id="contact-heading"

        className="mb-3.5 text-[1.22rem] leading-[1.5] font-semibold text-foreground sm:mb-4 sm:text-[1.55rem]"

      >

        {contact.heading}

      </h2>



      <article className="overflow-hidden rounded-[18px] bg-surface ring-1 ring-line shadow-[0_18px_44px_-26px_rgba(0,0,0,0.9)]">

        <div

          aria-hidden="true"

          className="h-20 bg-gradient-to-b from-surface-2 to-surface sm:h-24"

        />



        <div className="-mt-10 px-4 pb-7 text-center sm:-mt-12 sm:px-8 sm:pb-9">

          <ProfileAvatar variant="contact" className="mx-auto mb-4" />



          <h3 className="text-[1.15rem] leading-[1.5] font-semibold text-foreground sm:text-[1.5rem]">

            {contact.title}

          </h3>

          <p className="mx-auto mt-2.5 max-w-lg text-[13.5px] leading-[1.85] text-muted sm:text-[14.5px]">

            {contact.message}

          </p>



          {enabled ? (

            <a

              href={mailtoHref(email)}

              aria-label={`${contact.ctaHint}: ${email}`}

              className="mt-6 inline-flex min-h-12 w-full max-w-[22rem] items-center justify-center gap-2.5 rounded-full bg-foreground px-6 text-[14px] font-semibold text-[#171716] transition hover:brightness-105 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:w-auto"

            >

              <MailIcon className="h-[18px] w-[18px]" />

              <span dir="ltr" className="ltr-token">

                {email}

              </span>

            </a>

          ) : null}

        </div>

      </article>

    </section>

  );

}

