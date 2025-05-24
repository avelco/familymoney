
import { Head, usePage, router } from "@inertiajs/react"; // Link removed, router added
import { type SharedData } from "@/types";

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;

  useEffect(() => {
    // Ensure the auth object is available before accessing its properties.
    // usePage().props should provide the auth state as resolved by the server.
    if (auth) {
      if (auth.user) {
        // User is logged in, redirect to the dashboard
        router.replace(route("dashboard"));
      } else {
        // User is not logged in, redirect to the login page
        router.replace(route("login"));
      }
    }
    // If `auth` were to be initially undefined (e.g., during a very early loading phase,
    // though uncommon for usePage().props), this effect would re-run when `auth` updates.
  }, [auth]); // Re-run the effect if the auth object changes

  // Render a minimal UI while the redirection is in progress.
  // This prevents the original welcome page content from flashing.
  return (
    <>
      <Head title="Welcome">
        {/* Font preconnect/stylesheet links can be kept or removed if this page is purely for redirection */}
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a]">
        <p className="text-lg dark:text-[#EDEDEC]">Redirecting...</p>
        {/* You could add a more sophisticated loading spinner component here if desired */}
      </div>
    </>
  );
}
