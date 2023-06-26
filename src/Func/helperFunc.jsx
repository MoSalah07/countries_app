export const sortData = (countries) => {
  return countries.sort((a, b) =>
    a.name.common > b.name.common ? 1 : b.name.common > a.name.common ? -1 : 0
  );
};


export const handelNumbers = (num) => {
        return new Intl.NumberFormat(navigator.language).format(num);
}



// export default helperFunc
