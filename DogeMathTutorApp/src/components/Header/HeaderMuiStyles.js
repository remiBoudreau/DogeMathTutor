const HeaderStyles = (theme) => {
  return {
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      [theme.breakpoints.down(1280)]: {
        width: "12.5vw",
        minWidth: "unset",
      },
      [theme.breakpoints.down(706)]: {
        fontSize: "0.69em",
      },
    },
  };
};
export default HeaderStyles;
