const CalculatorMuiStyles = (theme) => {
  return {
    PaperStyle: {
      flexGrow: 1,
      position: "absolute",
      overflow: "hidden",
      borderRadius: "50px",
      zIndex: 5,
      [theme.breakpoints.up("md")]: {
        width: "100%",
        height: "100%",
        borderRadius: "50px",
      },
      [theme.breakpoints.between("xs", "md")]: {
        width: "320px",
        height: "460px",
      },
    },
    MuiButton: {
      [theme.breakpoints.up("md")]: {
        height: "40px",
        width: "40px",
        minWidth: "40px",
        boxShadow: "none",
        borderRadius: "15px",
        fontSize: "18px",
      },
      [theme.breakpoints.down("md")]: {
        height: "40px",
        width: "40px",
        minWidth: "40px",
        boxShadow: "none",
        borderRadius: "10px",
        fontSize: "14px",
      },
      fontWeight: "bold",
      backgroundColor: "#fa991c",
    },
    FaintBg: {
      backgroundColor: "#fdd39b",
    },
    WhiteBg: {
      backgroundColor: "white",
    },
    WhiteText: {
      color: "white",
    },
    Equals: {
      width: "100px",
      minWidth: "100px",
    },
    Delete: {
      fontSize: "14px",
      height: "20px",
    },
  };
};

export default CalculatorMuiStyles;
