const products = [
  {
    image: require("@/assets/img/categories/cat-1.jpg"),
    price: 10000,
    oldPrice: 20000,
    name: "old 1",
    category: ["oranges", "fresh-meat"],
    discount: 0,
  },
  {
    image: require("@/assets/img/categories/cat-2.jpg"),
    price: 10000,
    oldPrice: 20000,
    name: "old 2",
    category: ["oranges", "vegetables"],
    discount: 20,
  },
  {
    image: require("@/assets/img/categories/cat-3.jpg"),
    price: 10000,
    oldPrice: 20000,
    name: "old3 ",
    category: ["oranges", "fastfood"],
    discount: 0,
  },
];

const categories = [
  {
    image: require("@/assets/img/categories/cat-2.jpg"),
    id: 'fastfood',
    src: '#',
    name: "Fastfood",
  },
  {
    image: require("@/assets/img/categories/cat-2.jpg"),
    id: 'dried-fruit',
    src: '#',
    name: "Dried Fruit",
  },
  {
    image: require("@/assets/img/categories/cat-3.jpg"),
    id: 'vegetables',
    src: '#',
    name: "Vegetables",
  },
  {
    image: require("@/assets/img/categories/cat-4.jpg"),
    id: 'fresh-fruit',
    src: '#',
    name: "Fresh Fruit",
  },
  {
    image: require("@/assets/img/categories/cat-5.jpg"),
    id: 'fresh-meat',
    src: '#',
    name: "Fresh Meat",
  },
];

export { products, categories };
