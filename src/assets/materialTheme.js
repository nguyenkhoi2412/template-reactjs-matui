import { createTheme } from "@material-ui/core/styles";

export const materialTheme = createTheme({
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    backgroundColor: "#fafafa",
    color: "#333",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 400,
  },
  spacing: 8,
  palette: {
    primary: {
      main: "#607d8b",
    },
  },
});
