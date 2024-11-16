export type Dictionary = {
  orderMode: {
    registerAllergy: string;
    startOrder: string;
  };
  allergy: {
    registration: string;
    startOrder: string;
    allergen: {
      fish: string;
      egg: string;
      orange: string;
      crab: string;
      beef: string;
      kiwi: string;
      shrimp: string;
      soba: string;
      peanuts: string;
    };
  };
  order: {
    menu: {
      addToCart: string;
      selectQuantity: string;
      yourAllergies: string;
      allergenList: string;
      allergenListDescription: string;
    };
    cart: {
      cart: string;
      confirmOrder: string;
      total: string;
      cartIsEmpty: string;
      thankYouForOrder: string;
    };
  };
};
