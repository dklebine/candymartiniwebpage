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
    name: "Cotton Candy Cosmos",
    leftText: {
      title: "Base Spirits",
      content: "Premium vodka, elderflower liqueur, cotton candy syrup, fresh lime juice"
    },
    rightText: {
      title: "Flavor Profile",
      content: "Sweet, floral, and nostalgic with a cloud-like cotton candy garnish that dissolves on your tongue"
    },
    color: "from-pink-400 to-purple-400",
    image: "https://images.pexels.com/photos/2509781/pexels-photo-2509781.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    category: "Sweet Dreams",
    description: "A whimsical blend of premium vodka and cotton candy magic that dissolves on your tongue",
    ingredients: ["Premium Vodka", "Cotton Candy Syrup", "Elderflower Liqueur", "Fresh Lime"],
    rating: 5
  },
  {
    id: 2,
    name: "Gummy Bear Gimlet",
    leftText: {
      title: "Ingredients",
      content: "Gin, gummy bear simple syrup, fresh lime juice, elderflower cordial"
    },
    rightText: {
      title: "Experience",
      content: "Playful and tangy with actual gummy bears infused into the spirit for 24 hours"
    },
    color: "from-green-400 to-yellow-400",
    image: "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    category: "Playful Spirits",
    description: "Playful gin cocktail infused with gummy bear essence for 24 hours",
    ingredients: ["Premium Gin", "Gummy Bear Syrup", "Fresh Lime", "Elderflower Cordial"],
    rating: 5
  },
  {
    id: 3,
    name: "Chocolate Mint Martini",
    leftText: {
      title: "Premium Blend",
      content: "Dark chocolate vodka, crème de menthe, fresh cream, cocoa powder rim"
    },
    rightText: {
      title: "Indulgence",
      content: "Rich and decadent, like drinking a liquid mint chocolate truffle"
    },
    color: "from-amber-600 to-amber-800",
    image: "https://images.pexels.com/photos/1170599/pexels-photo-1170599.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    category: "Decadent Delights",
    description: "Rich chocolate vodka with refreshing mint undertones, like liquid truffle",
    ingredients: ["Chocolate Vodka", "Crème de Menthe", "Fresh Cream", "Cocoa Powder"],
    rating: 4
  },
  {
    id: 4,
    name: "Rainbow Sherbet Splash",
    leftText: {
      title: "Colorful Mix",
      content: "White rum, orange liqueur, raspberry syrup, pineapple juice, grenadine"
    },
    rightText: {
      title: "Visual Delight",
      content: "Layers of vibrant colors that mirror childhood sherbet memories"
    },
    color: "from-orange-400 to-red-400",
    image: "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    category: "Nostalgic Treats",
    description: "Colorful layers that taste like childhood memories in liquid form",
    ingredients: ["White Rum", "Orange Liqueur", "Raspberry Syrup", "Pineapple Juice"],
    rating: 5
  },
  {
    id: 5,
    name: "Bubblegum Bellini",
    leftText: {
      title: "Sparkling Base",
      content: "Prosecco, bubblegum syrup, peach purée, edible glitter"
    },
    rightText: {
      title: "Effervescence",
      content: "Light, fizzy, and surprisingly sophisticated with a playful bubblegum twist"
    },
    color: "from-pink-300 to-blue-300",
    image: "https://images.pexels.com/photos/1269043/pexels-photo-1269043.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    category: "Sparkling Fun",
    description: "Sparkling prosecco with a playful bubblegum twist and edible glitter",
    ingredients: ["Prosecco", "Bubblegum Syrup", "Peach Purée", "Edible Glitter"],
    rating: 4
  },
  {
    id: 6,
    name: "Caramel Apple Twist",
    leftText: {
      title: "Autumn Inspired",
      content: "Apple brandy, caramel liqueur, fresh apple juice, cinnamon rim"
    },
    rightText: {
      title: "Seasonal Sweet",
      content: "Warm spices meet cool cocktail perfection with candied apple garnish"
    },
    color: "from-yellow-600 to-red-600",
    image: "https://images.pexels.com/photos/1631679/pexels-photo-1631679.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    category: "Seasonal Specials",
    description: "Autumn flavors in a sophisticated cocktail glass with candied apple garnish",
    ingredients: ["Apple Brandy", "Caramel Liqueur", "Apple Juice", "Cinnamon"],
    rating: 5
  },
  {
    id: 7,
    name: "Lollipop Lemon Drop",
    leftText: {
      title: "Citrus Forward",
      content: "Lemon vodka, simple syrup, fresh lemon juice, sugar rim"
    },
    rightText: {
      title: "Classic Reimagined",
      content: "Served with an actual lollipop stirrer that enhances the sweetness"
    },
    color: "from-yellow-300 to-yellow-500",
    image: "https://images.pexels.com/photos/2509781/pexels-photo-2509781.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    category: "Citrus Classics",
    description: "Classic lemon drop reimagined with an actual lollipop stirrer",
    ingredients: ["Lemon Vodka", "Simple Syrup", "Fresh Lemon", "Sugar Rim"],
    rating: 5
  },
  {
    id: 8,
    name: "Rock Candy Negroni",
    leftText: {
      title: "Sophisticated Sweet",
      content: "Gin, sweet vermouth, Campari, rock candy simple syrup"
    },
    rightText: {
      title: "Adult Candy",
      content: "The perfect balance of bitter and sweet with crystallized garnish"
    },
    color: "from-red-500 to-orange-500",
    image: "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    category: "Adult Candy",
    description: "Sophisticated balance of bitter and sweet with crystallized garnish",
    ingredients: ["Premium Gin", "Sweet Vermouth", "Campari", "Rock Candy Syrup"],
    rating: 4
  },
  {
    id: 9,
    name: "Marshmallow Mule",
    leftText: {
      title: "Cozy Comfort",
      content: "Vanilla vodka, ginger beer, marshmallow syrup, lime juice"
    },
    rightText: {
      title: "Campfire Vibes",
      content: "Topped with toasted marshmallows for an interactive drinking experience"
    },
    color: "from-gray-100 to-yellow-200",
    image: "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    category: "Cozy Classics",
    description: "Vanilla vodka with ginger beer and toasted marshmallow garnish",
    ingredients: ["Vanilla Vodka", "Ginger Beer", "Marshmallow Syrup", "Lime Juice"],
    rating: 5
  },
  {
    id: 10,
    name: "Starlight Surprise",
    leftText: {
      title: "Magical Finale",
      content: "Blue curaçao, silver rum, coconut cream, pineapple juice, edible stars"
    },
    rightText: {
      title: "Galaxy in Glass",
      content: "Color-changing cocktail that shifts from blue to purple with temperature"
    },
    color: "from-blue-500 to-purple-500",
    image: "https://images.pexels.com/photos/1269043/pexels-photo-1269043.jpeg?auto=compress&cs=tinysrgb&w=800",
    videoUrl: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    category: "Magical Moments",
    description: "Color-changing cocktail that shifts from blue to purple with temperature",
    ingredients: ["Blue Curaçao", "Silver Rum", "Coconut Cream", "Pineapple Juice", "Edible Stars"],
    rating: 5
  }
];