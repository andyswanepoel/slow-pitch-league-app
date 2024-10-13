import * as React from "react";

interface IViewportHeightContext {
  viewportHeight: number | null;
  setHeaderHeight: React.Dispatch<React.SetStateAction<number | null>>;
  setFooterHeight: React.Dispatch<React.SetStateAction<number | null>>;
}
export const ViewportHeightContext =
  React.createContext<IViewportHeightContext>({
    viewportHeight: null,
    setHeaderHeight: () => void 0,
    setFooterHeight: () => void 0
  });

export const ViewportHeightProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [headerHeight, setHeaderHeight] = React.useState<number | null>(null);
  const [footerHeight, setFooterHeight] = React.useState<number | null>(null);

  const windowHeight = window.innerHeight;

  const viewportHeight =
    windowHeight - (headerHeight ?? 0) - (footerHeight ?? 0);

  const value = React.useMemo(
    () => ({
      viewportHeight,
      setHeaderHeight,
      setFooterHeight
    }),
    [viewportHeight]
  );

  return (
    <ViewportHeightContext.Provider value={value}>
      {children}
    </ViewportHeightContext.Provider>
  );
};
