"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const {data: session} = useSession(); // Variable indicating whether the user is logged in or not

  const [providers, setProviders] = useState(null); // State variable to store the authentication providers
  const [toggleDropdown, setToggleDropdown] = useState(false); // State variable to toggle the mobile dropdown menu

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;


// The Nav component renders a navigation bar.
// The isUserLoggedIn variable represents whether the user is logged in or not (a placeholder value is used in this code).
// The providers state variable is used to store the authentication providers obtained from getProviders hook.
// The toggleDropdown state variable is used to control the visibility of the mobile dropdown menu.
// The useEffect hook is used to fetch the authentication providers when the component mounts.
// Inside the useEffect hook, the fetchProviders function is defined to fetch the authentication providers and update the providers state.
// The component renders a navigation bar with both desktop and mobile navigation sections.
// The desktop navigation section is displayed when the viewport width is larger than sm breakpoint.
// The mobile navigation section is displayed when the viewport width is smaller than sm breakpoint.
// The desktop navigation section shows different UI elements based on whether the user is logged in or not.
// If the user is logged in, it shows a "Create Post" link, a "Sign out" button, and a link to the user's profile.
// If the user is not logged in, it shows authentication provider buttons to sign in.
// The mobile navigation section also shows different UI elements based on whether the user is logged in or not.
// If the user is logged in, it shows the user's profile image and a dropdown menu.
// Clicking on the profile image toggles the visibility of the dropdown menu.
// The dropdown menu contains links to the user's profile, a "Create Prompt" link, and a "Sign out" button.
// If the user is not logged in, it shows authentication provider buttons to sign in.
// Finally, the Nav component is exported as the default export.