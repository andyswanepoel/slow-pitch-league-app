import { Outlet } from "@tanstack/react-router";
import { Box } from "@chakra-ui/react";
import { Header, Footer } from "@features/navigation";
import { useViewportHeight } from "@contexts/ViewportHeightContext";

export const Layout = () => {
  const { viewportHeight } = useViewportHeight();
  console.log("@@@viewportHeight: ", viewportHeight);
  return (
    <>
      <Header />
      <Box as="main" minHeight={viewportHeight ?? "100vh"} position="relative">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};
