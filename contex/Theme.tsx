"use client";

import React from "react";

import {
  ThemeProvider as NextThemesProvider,
  // eslint-disable-next-line import/named
  ThemeProviderProps,
} from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
export default ThemeProvider;
