import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-foreground">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            Who we are
          </h2>
          <p>
            Platform Engineering Toolkit is a community resource for platform
            engineering knowledge and tooling. This site is operated by Tom
            Slenders, Gielen Rojas-Lopez, and Dr. Andrea Klettke.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            Cookies and tracking
          </h2>
          <p className="mb-3">We use three categories of cookies:</p>
          <div className="space-y-4">
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-1 font-semibold text-foreground">
                Strictly necessary — always active
              </h3>
              <p className="text-sm">
                Session cookies set by NextAuth.js to keep you signed in. These
                are essential for the sign-in feature to function and cannot be
                disabled. They do not track you across other sites and are
                deleted when you sign out or close your browser.
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-1 font-semibold text-foreground">
                Analytics — requires consent
              </h3>
              <p className="text-sm">
                We use Vercel Analytics to understand how visitors use this
                site. Vercel Analytics is privacy-focused: it does not use
                third-party cookies, does not track you across sites, and does
                not sell data. Page view data is aggregated and anonymised.
                These cookies are only set after you accept analytics cookies.
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-1 font-semibold text-foreground">
                YouTube — requires consent
              </h3>
              <p className="text-sm">
                The homepage contains an embedded YouTube video hosted by
                Google. YouTube sets its own cookies when the video is played,
                which may be used to personalise ads and track viewing behaviour
                across Google services. The video will not load until you
                explicitly click &ldquo;Accept YouTube cookies &amp; play&rdquo;.
                You can review Google&apos;s privacy practices at{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  policies.google.com/privacy
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            Your rights (GDPR)
          </h2>
          <p className="mb-3">
            If you are located in the European Economic Area, you have the right
            to access, rectify, or erase personal data we hold about you. To
            exercise these rights, contact us at the address below.
          </p>
          <p>
            You can withdraw your analytics consent at any time by clearing your
            browser&apos;s local storage for this site, which will cause the
            consent banner to reappear on your next visit.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            Data we collect when you sign in
          </h2>
          <p>
            If you sign in with Google, we store your name, email address, and
            profile picture in our database solely to identify your account and
            display your name. We do not share this data with third parties.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            Contact
          </h2>
          <p>
            For privacy-related questions, contact:{" "}
            <a
              href="mailto:platformengineeringtoolkit@gmail.com"
              className="text-primary underline underline-offset-2 hover:text-accent"
            >
              platformengineeringtoolkit@gmail.com
            </a>
          </p>
        </section>

        <p className="text-sm">Last updated: February 2026</p>
      </div>
    </div>
  );
}
