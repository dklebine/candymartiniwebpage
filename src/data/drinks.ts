export interface Drink {
  id: number;
  name: string;
  leftText: {
    title: string;
    content: string;
  };
  rightText: {
    title: string;
    content: string;
  };
  color: string;
  image: string;
  videoUrl: string;
  category: string;
  description: string;
  ingredients: string[];
  rating: number;
}

export const drinks: Drink[] = [
  {
    id: 1,
    name: "THEE GUMMY BEAR",
    leftText: {
      title: "",
      content: "DEEP EDDY PEACH VODKA, SOUR APPLE PUCKER LIQUOR, SWEET & SOUR MIX, PLUS SPRITE."
    },
    rightText: {
      title: "TOPPED WITH GUMMY BEARS",
      content: "RIMMED WITH ORANGE PUCKER POWDER"
    },
    color: "from-pink-400 to-purple-400",
    image: "/gummy-bear-martini.png",
    videoUrl: "/gummy-bear-video.mp4",
    category: "Candy Martini",
    description: "A playful, fruity explosion of peach, apple, and watermelon flavors, topped with a mountain of gummy bears and a tangy orange rim.",
    ingredients: ["Deep Eddy Peach Vodka", "Sour Apple Pucker Liquor", "Sweet and Sour Mix", "Sprite", "Gummy bears", "Orange Pucker Powder (rimmed)"],
    rating: 5
  },
  {
    id: 2,
    name: "Sinful City",
    leftText: {
      title: "Ingredients",
      content: "Chocolate Vodka, Crème De Coco Liquor, Butterscotch Schnapps, Almond Milk, Chocolate Syrup, Milk chocolate pretzels, Yogurt graham crackers, Milk chocolate malt balls, Vanilla frosting, Crushed Oreos (rimmed)"
    },
    rightText: {
      title: "Description",
      content: "A decadent dessert martini loaded with chocolate, butterscotch, and crunchy treats. It's a sweet tooth's dream come true!"
    },
    color: "from-brown-400 to-yellow-400",
    image: "/martini-splash.png",
    videoUrl: "",
    category: "Candy Martini",
    description: "A decadent dessert martini loaded with chocolate, butterscotch, and crunchy treats.",
    ingredients: ["Chocolate Vodka", "Crème De Coco Liquor", "Butterscotch Schnapps", "Almond Milk", "Chocolate Syrup", "Milk chocolate pretzels", "Yogurt graham crackers", "Milk chocolate malt balls", "Vanilla frosting", "Crushed Oreos (rimmed)"],
    rating: 5
  },
  {
    id: 3,
    name: "High Roller Margarita",
    leftText: {
      title: "Ingredients",
      content: "Lunazul Tequila, Triple Sec, Strawberry Monin, Lime Juice, Sour Mix, Sprite, Strawberry bears, Black sugar crystals (rimmed)"
    },
    rightText: {
      title: "Description",
      content: "A Vegas twist on the classic margarita, bursting with strawberry flavor and a sweet black sugar rim."
    },
    color: "from-red-400 to-black-400",
    image: "/creamy-cocktail.png",
    videoUrl: "",
    category: "Candy Martini",
    description: "A Vegas twist on the classic margarita, bursting with strawberry flavor and a sweet black sugar rim.",
    ingredients: ["Lunazul Tequila", "Triple Sec", "Strawberry Monin", "Lime Juice", "Sour Mix", "Sprite", "Strawberry bears", "Black sugar crystals (rimmed)"],
    rating: 5
  },
  {
    id: 4,
    name: "A Million Fish in the Sea",
    leftText: {
      title: "Ingredients",
      content: "Smirnoff Red, White, and Berry Vodka, Peach Schnapps, Watermelon Liquor, Blue Curacao, Pineapple Juice, Sprite, Gummy fish and sharks, Blue raspberry Pucker Powder (rimmed)"
    },
    rightText: {
      title: "Description",
      content: "A vibrant, ocean-inspired martini with a splash of blue and a school of gummy fish and sharks swimming in every sip!"
    },
    color: "from-blue-400 to-pink-400",
    image: "/sprinkle-martini.png",
    videoUrl: "",
    category: "Candy Martini",
    description: "A vibrant, ocean-inspired martini with a splash of blue and a school of gummy fish and sharks swimming in every sip!",
    ingredients: ["Smirnoff Red, White, and Berry Vodka", "Peach Schnapps", "Watermelon Liquor", "Blue Curacao", "Pineapple Juice", "Sprite", "Gummy fish and sharks", "Blue raspberry Pucker Powder (rimmed)"],
    rating: 5
  },
  {
    id: 5,
    name: "Vegas Showgirl",
    leftText: {
      title: "Ingredients",
      content: "El Jimador Tequila, Triple Sec, Lime Juice, Sweet and Sour Mix, Cotton candy"
    },
    rightText: {
      title: "Description",
      content: "A show-stopping martini topped with a fluffy mound of cotton candy—Vegas in a glass!"
    },
    color: "from-pink-300 to-white-400",
    image: "",
    videoUrl: "",
    category: "Candy Martini",
    description: "A show-stopping martini topped with a fluffy mound of cotton candy—Vegas in a glass!",
    ingredients: ["El Jimador Tequila", "Triple Sec", "Lime Juice", "Sweet and Sour Mix", "Cotton candy"],
    rating: 5
  },
  {
    id: 6,
    name: "Sour Bear",
    leftText: {
      title: "Ingredients",
      content: "Smirnoff Apple Vodka, Sour Apple Pucker Liquor, Sweet and Sour Mix, Sprite, Sour gummy bears, Green apple Pucker Powder (rimmed)"
    },
    rightText: {
      title: "Description",
      content: "A tart and tangy treat with a punch of apple and a pile of sour gummy bears. Pucker up!"
    },
    color: "from-green-400 to-yellow-400",
    image: "",
    videoUrl: "",
    category: "Candy Martini",
    description: "A tart and tangy treat with a punch of apple and a pile of sour gummy bears. Pucker up!",
    ingredients: ["Smirnoff Apple Vodka", "Sour Apple Pucker Liquor", "Sweet and Sour Mix", "Sprite", "Sour gummy bears", "Green apple Pucker Powder (rimmed)"],
    rating: 5
  },
  {
    id: 7,
    name: "The Big Bang Theory",
    leftText: {
      title: "Ingredients",
      content: "Evan Williams Whiskey (Vodka/Tequila - Substitutable), Grape Liquor, Strawberry Schnapps, Blackberry Monin, Frosting, Rainbow neon-colored mini candies, Graham crackers, Neon-colored mini candies (side shot)"
    },
    rightText: {
      title: "Description",
      content: "A cosmic concoction of whiskey, fruit, and a galaxy of rainbow candies. Served with a side shot of pure fun!"
    },
    color: "from-purple-400 to-yellow-400",
    image: "",
    videoUrl: "",
    category: "Candy Martini",
    description: "A cosmic concoction of whiskey, fruit, and a galaxy of rainbow candies. Served with a side shot of pure fun!",
    ingredients: ["Evan Williams Whiskey (Vodka/Tequila - Substitutable)", "Grape Liquor", "Strawberry Schnapps", "Blackberry Monin", "Frosting", "Rainbow neon-colored mini candies", "Graham crackers", "Neon-colored mini candies (side shot)"],
    rating: 5
  },
  {
    id: 8,
    name: "Sugar Hero",
    leftText: {
      title: "Ingredients",
      content: "Admiral Nelson's Coconut Rum, Blue Curacao, Pineapple Juice, Club Soda, Sour worms, Blue raspberry Pucker Powder (rimmed)"
    },
    rightText: {
      title: "Description",
      content: "A heroic blend of coconut, pineapple, and blue curacao, topped with sour worms for a super sweet finish!"
    },
    color: "from-blue-400 to-yellow-400",
    image: "",
    videoUrl: "",
    category: "Candy Martini",
    description: "A heroic blend of coconut, pineapple, and blue curacao, topped with sour worms for a super sweet finish!",
    ingredients: ["Admiral Nelson's Coconut Rum", "Blue Curacao", "Pineapple Juice", "Club Soda", "Sour worms", "Blue raspberry Pucker Powder (rimmed)"],
    rating: 5
  },
  {
    id: 9,
    name: "Watermelon Sugar",
    leftText: {
      title: "Ingredients",
      content: "Smirnoff Watermelon Vodka, Watermelon Schnapps, Triple Sec, Sprite, Pink Lemonade, Watermelon gummies, Watermelon Pucker Powder (rimmed)"
    },
    rightText: {
      title: "Description",
      content: "A juicy, refreshing martini bursting with watermelon flavor and topped with sweet gummies. Summer in a glass!"
    },
    color: "from-red-400 to-green-400",
    image: "",
    videoUrl: "",
    category: "Candy Martini",
    description: "A juicy, refreshing martini bursting with watermelon flavor and topped with sweet gummies. Summer in a glass!",
    ingredients: ["Smirnoff Watermelon Vodka", "Watermelon Schnapps", "Triple Sec", "Sprite", "Pink Lemonade", "Watermelon gummies", "Watermelon Pucker Powder (rimmed)"],
    rating: 5
  },
  {
    id: 10,
    name: "Las Vegas Bombsicle",
    leftText: {
      title: "Ingredients",
      content: "Smirnoff Red, White, and Blue Island Punch Liquor, Blue Curacao, Sour Mix, Sprite, Gummy popsicles, Red, white, and blue Pucker Powder (rimmed)"
    },
    rightText: {
      title: "Description",
      content: "A patriotic, candy-packed martini with a blast of color and flavor in every sip!"
    },
    color: "from-blue-400 to-red-400",
    image: "",
    videoUrl: "",
    category: "Candy Martini",
    description: "A patriotic, candy-packed martini with a blast of color and flavor in every sip!",
    ingredients: ["Smirnoff Red, White, and Blue Island Punch Liquor", "Blue Curacao", "Sour Mix", "Sprite", "Gummy popsicles", "Red, white, and blue Pucker Powder (rimmed)"],
    rating: 5
  }
];