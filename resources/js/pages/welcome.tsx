
import { Head} from "@inertiajs/react";
export default function Welcome() {

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
