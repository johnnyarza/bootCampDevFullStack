const Utils = {
  formatFloatToCurrency: function (number) {
    return number.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  },
};

export default Utils;
