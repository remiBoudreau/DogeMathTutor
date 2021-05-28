const ProblemsStyles = (theme) => {
  return {
    PaperStyle: {
      width: "100%",
      height: "100%",
      borderRadius: "50px",
      marginBottom: "10vh",
    },
    TextFieldStyle: {
      width: "100%",
      marginBottom: "60px",
    },
    ButtonStyle: {
      minWidth: "120px",
      fontWeight: "bold",
      color: "white",
      marginLeft: "0",
      [theme.breakpoints.down(510)]: {
        minWidth: "100px",
        fontSize: "12px",
      },
      [theme.breakpoints.down(400)]: {
        minWidth: "60px",
        fontSize: "10px",
      },
    },
    ButtonDisabledStyle: {
      opacity: "0",
      pointerEvents: "none",
    },
  };
};
export default ProblemsStyles;
