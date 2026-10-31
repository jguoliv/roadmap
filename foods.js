// Menu data from the Crossroads online-ordering menus (Campagna, Caliente, Teton Grill, Chick-fil-A).
// Only fields that differ from the defaults need to be written for each food.
//
// Fields:
//   id, name, vendor, category ("entrees" | "sides" | "drinks" | "sweets"), price
//   sizes: [{ name, price, calories }]   price = the lowest size's price
//   calories: number or null (null = not listed on the menu)
//   isVegetarian: only true where the menu makes it clear
//   vegetarianOption: true when a vegetarian version can be ordered
//   imageName: use another food's image file (default is the id)
//   allergens: left empty on purpose, the menus don't list allergens

function makeFood(item) {
    return {
        imageUrl: `images/foods/${item.imageName || item.id}.jpg`,
        sizes: [],
        description: "",
        calories: null,
        allergens: [],
        isVegetarian: false,
        isSpicy: false,
        ...item,
    };
}

const foods = [
    // ---------- Campagna ----------
    { id: "campagna-steak-sandwich", name: "Grilled Flank Steak Sandwich", vendor: "Campagna", category: "entrees", price: 7.99, calories: 755,
      description: "Grilled garlic and herb flank steak, gruyere cheese, garlic aioli, caramelized onions, roasted sweet peppers, balsamic glaze, and arugula" },
    { id: "campagna-cubano", name: "Cubano", vendor: "Campagna", category: "entrees", price: 5.99, calories: 934,
      description: "Roasted pork, smoked ham, Swiss cheese, citrus aioli, dill pickles, caramelized onion, and arugula" },
    { id: "campagna-turkey-havarti", name: "Turkey Havarti", vendor: "Campagna", category: "entrees", price: 5.99,
      description: "Roasted turkey, creamy Havarti cheese, sliced tomato, zesty pimento spread, fire-roasted peppers, and caramelized onions" },
    { id: "campagna-como", name: "Como", vendor: "Campagna", category: "entrees", price: 5.99,
      description: "Salami, pepperoni, smoked ham, provolone cheese, basil pesto, garlic aioli, pesto rosso, and arugula" },
    { id: "campagna-chicken-sandwich", name: "Pesto Chicken Sandwich", vendor: "Campagna", category: "entrees", price: 5.99, calories: 790,
      description: "Grilled Chicken, Pesto, Citrus Aioli, Swiss Cheese, Sliced Tomato, Caramelized Onions, and Arugula" },
    { id: "campagna-fire-roasted-tomato", name: "Fire Roasted Tomato", vendor: "Campagna", category: "entrees", price: 4.99, calories: 677, isVegetarian: true,
      description: "Fire roasted tomatoes, balsamic glaze, smoked cheddar, red onions, pesto, and spinach" },
    { id: "campagna-fountain-drink", name: "Fountain Drink", vendor: "Campagna", category: "drinks", price: 2.29, isVegetarian: true, imageName: "fountain-drink" },

    // ---------- Caliente ----------
    { id: "caliente-burrito", name: "Burrito", vendor: "Caliente", category: "entrees", price: 8.49, isVegetarian: true, vegetarianOption: true,
      description: "Your choice of freshly grilled meat wrapped in a warm flour tortilla with rice, beans, or fajita veggies. Topped with salsa, sour cream, cheese, or optional guacamole." },
    { id: "caliente-bowl", name: "Bowl", vendor: "Caliente", category: "entrees", price: 8.49, isVegetarian: true, vegetarianOption: true,
      description: "Your choice of freshly grilled meat served in a bowl with rice, beans, or fajita veggies. Topped with salsa, sour cream, cheese, or optional guacamole." },
    { id: "caliente-salad", name: "Salad", vendor: "Caliente", category: "entrees", price: 8.49, isVegetarian: true, vegetarianOption: true,
      description: "Your choice of freshly grilled meat served with a lettuce blend with beans or fajita veggies. Topped with salsa, sour cream, cheese, or optional guacamole." },
    { id: "caliente-fountain-drink", name: "Fountain Drink", vendor: "Caliente", category: "drinks", price: 2.29, isVegetarian: true, imageName: "fountain-drink" },
    { id: "caliente-jarritos", name: "Jarritos Bottled Soda", vendor: "Caliente", category: "drinks", price: 2.19, isVegetarian: true,
      description: "Flavors: Fruit Punch, Grape Fruit, Guava, Lime Limon, Mandarin, Pineapple, Mango, and Strawberry. Flavors depend on availability." },

    // ---------- Teton Grill ----------
    { id: "teton-hamburger", name: "Hamburger", vendor: "Teton Grill", category: "entrees", price: 4.99,
      description: "Grilled ground beef burger, no cheese.",
      sizes: [{ name: "1/4 lb", price: 4.99, calories: null }, { name: "1/2 lb Teton Burger", price: 7.29, calories: null }] },
    { id: "teton-cheeseburger", name: "Cheeseburger", vendor: "Teton Grill", category: "entrees", price: 5.99,
      description: "Grilled ground beef burger with cheese.",
      sizes: [{ name: "1/4 lb", price: 5.99, calories: null }, { name: "1/2 lb Teton Cheeseburger", price: 8.59, calories: null }] },
    { id: "teton-bacon-cheeseburger", name: "Bacon Cheeseburger", vendor: "Teton Grill", category: "entrees", price: 6.59,
      description: "Grilled ground beef burger with bacon and cheese.",
      sizes: [{ name: "1/4 lb", price: 6.59, calories: null }, { name: "1/2 lb Teton Bacon Cheeseburger", price: 9.19, calories: null }] },
    { id: "teton-hamburger-combo", name: "Hamburger Combo", vendor: "Teton Grill", category: "entrees", price: 9.49, imageName: "teton-combo",
      description: "Includes a fountain drink and your choice of side.",
      sizes: [{ name: "1/4 lb", price: 9.49, calories: null }, { name: "1/2 lb Teton Burger", price: 11.29, calories: null }] },
    { id: "teton-cheeseburger-combo", name: "Cheeseburger Combo", vendor: "Teton Grill", category: "entrees", price: 10.29, imageName: "teton-combo",
      description: "Includes a fountain drink and your choice of side.",
      sizes: [{ name: "1/4 lb", price: 10.29, calories: null }, { name: "1/2 lb Teton Cheeseburger", price: 13.19, calories: null }] },
    { id: "teton-bacon-cheeseburger-combo", name: "Bacon Cheeseburger Combo", vendor: "Teton Grill", category: "entrees", price: 10.99, imageName: "teton-combo",
      description: "Includes a fountain drink and your choice of side.",
      sizes: [{ name: "1/4 lb", price: 10.99, calories: null }, { name: "1/2 lb Teton Bacon Cheeseburger", price: 13.69, calories: null }] },
    { id: "teton-burger-patty", name: "Burger Patty", vendor: "Teton Grill", category: "entrees", price: 2.69, description: "Grilled ground beef 1/4 lb burger patty only." },
    { id: "teton-mega-crunch-fry", name: "Mega Crunch Fry", vendor: "Teton Grill", category: "sides", price: 2.69 },
    { id: "teton-onion-rings", name: "Onion Rings", vendor: "Teton Grill", category: "sides", price: 3.59 },
    { id: "teton-fountain-drink", name: "Fountain Drink", vendor: "Teton Grill", category: "drinks", price: 2.29, isVegetarian: true, imageName: "fountain-drink" },

    // ---------- Chick-fil-A: entrees ----------
    { id: "cfa-chicken-sandwich", name: "Chicken Sandwich", vendor: "Chick-fil-A", category: "entrees", price: 5.19,
      description: "A boneless breast of chicken seasoned to perfection, freshly breaded, and pressure cooked in 100% refined peanut oil." },
    { id: "cfa-deluxe-sandwich", name: "Deluxe Sandwich", vendor: "Chick-fil-A", category: "entrees", price: 5.99,
      description: "The Chicken Sandwich, deluxe style." },
    { id: "cfa-spicy-chicken-sandwich", name: "Spicy Chicken Sandwich", vendor: "Chick-fil-A", category: "entrees", price: 5.59, isSpicy: true,
      description: "A boneless breast of chicken seasoned with a spicy blend of peppers, freshly breaded, and cooked in 100% refined peanut oil." },
    { id: "cfa-spicy-deluxe-sandwich", name: "Spicy Deluxe Sandwich", vendor: "Chick-fil-A", category: "entrees", price: 6.39, isSpicy: true,
      description: "The Spicy Chicken Sandwich, deluxe style." },
    { id: "cfa-grilled-chicken-sandwich", name: "Grilled Chicken Sandwich", vendor: "Chick-fil-A", category: "entrees", price: 6.75,
      description: "A lemon-herb marinated boneless breast of chicken, grilled for a tender and juicy backyard-smoky taste." },
    { id: "cfa-grilled-club-sandwich", name: "Grilled Club Sandwich", vendor: "Chick-fil-A", category: "entrees", price: 8.59,
      description: "A lemon-herb marinated boneless breast of chicken, grilled for a tender and juicy backyard-smoky taste, built as a club sandwich." },
    { id: "cfa-chicken-nuggets", name: "Chicken Nuggets", vendor: "Chick-fil-A", category: "entrees", price: 3.35,
      description: "Bite-sized pieces of boneless chicken breast, seasoned to perfection, freshly breaded and pressure cooked.",
      sizes: [{ name: "5 ct", price: 3.35, calories: null }, { name: "8 ct", price: 5.29, calories: null }, { name: "12 ct", price: 7.19, calories: null }, { name: "30 ct", price: 17.95, calories: null }] },
    { id: "cfa-grilled-nuggets", name: "Grilled Nuggets", vendor: "Chick-fil-A", category: "entrees", price: 3.85,
      description: "Bite-sized pieces of freshly marinated boneless chicken breast, grilled for a tender and juicy backyard-smoky taste.",
      sizes: [{ name: "5 ct", price: 3.85, calories: null }, { name: "8 ct", price: 6.99, calories: null }, { name: "12 ct", price: 8.59, calories: null }, { name: "30 ct", price: 21.45, calories: null }] },
    { id: "cfa-chick-n-minis", name: "Chick-n-Minis", vendor: "Chick-fil-A", category: "entrees", price: 4.85,
      description: "Bite-sized Chick-fil-A Nuggets nestled in warm, mini yeast rolls lightly brushed with a honey butter spread.",
      sizes: [{ name: "4 ct", price: 4.85, calories: null }, { name: "10 ct", price: 12.09, calories: null }] },
    { id: "cfa-cool-wrap", name: "Chick-fil-A Cool Wrap", vendor: "Chick-fil-A", category: "entrees", price: 8.39,
      description: "Sliced grilled chicken breast nestled in a fresh mix of green leaf lettuce with a blend of shredded Monterey Jack and Cheddar cheeses." },
    { id: "cfa-chicken-waffles", name: "Chicken & Waffles", vendor: "Chick-fil-A", category: "entrees", price: 8.19, calories: 690,
      description: "A maple-flavored waffle sandwiching a boneless chicken breast seasoned to perfection." },
    { id: "cfa-cobb-salad", name: "Cobb Salad", vendor: "Chick-fil-A", category: "entrees", price: 9.69, calories: 830,
      description: "Sliced Chick-fil-A Nuggets, freshly breaded and pressure-cooked, served hot on a fresh bed of greens." },
    { id: "cfa-market-salad", name: "Market Salad", vendor: "Chick-fil-A", category: "entrees", price: 9.89, calories: 550,
      description: "Sliced grilled chicken breast served on a fresh bed of mixed greens, topped with crumbled blue cheese." },
    { id: "cfa-spicy-southwest-salad", name: "Spicy Southwest Salad", vendor: "Chick-fil-A", category: "entrees", price: 9.89, isSpicy: true,
      description: "Slices of grilled spicy chicken breast (cold) served on a fresh bed of mixed greens, topped with grape tomatoes." },

    // ---------- Chick-fil-A: sides ----------
    { id: "cfa-waffle-fries", name: "Waffle Potato Fries", vendor: "Chick-fil-A", category: "sides", price: 2.25, calories: 320, isVegetarian: true,
      description: "Waffle-cut potatoes cooked in canola oil until crispy outside and tender inside. Sprinkled with sea salt.",
      sizes: [{ name: "Small", price: 2.25, calories: 320 }, { name: "Medium", price: 2.59, calories: 420 }, { name: "Large", price: 2.99, calories: 600 }] },
    { id: "cfa-hash-browns", name: "Hash Browns", vendor: "Chick-fil-A", category: "sides", price: 1.69, calories: 270, isVegetarian: true,
      description: "Crispy potato medallions cooked in canola oil.",
      sizes: [{ name: "Regular", price: 1.69, calories: 270 }, { name: "Large", price: 2.19, calories: 420 }] },
    { id: "cfa-fruit-cup", name: "Fruit Cup", vendor: "Chick-fil-A", category: "sides", price: 4.25, isVegetarian: true,
      description: "A nutritious fruit mix made with chopped red and green apples and mandarin orange segments." },

    // ---------- Chick-fil-A: drinks ----------
    { id: "cfa-fountain-drink", name: "Fountain Drink", vendor: "Chick-fil-A", category: "drinks", price: 1.99, isVegetarian: true,
      sizes: [{ name: "Small", price: 1.99, calories: null }, { name: "Medium", price: 2.35, calories: null }, { name: "Large", price: 2.79, calories: null }] },
    { id: "cfa-lemonade", name: "Lemonade", vendor: "Chick-fil-A", category: "drinks", price: 2.35, isVegetarian: true,
      description: "Chick-fil-A Lemonade, also available as Diet Lemonade.",
      sizes: [{ name: "Small", price: 2.35, calories: null }, { name: "Medium", price: 2.75, calories: null }, { name: "Large", price: 3.19, calories: null }] },
    { id: "cfa-pineapple-dragonfruit-lemonade", name: "Pineapple Dragonfruit Lemonade", vendor: "Chick-fil-A", category: "drinks", price: 3.49, isVegetarian: true,
      description: "Chick-fil-A Lemonade mixed with pineapple and dragonfruit flavors. Also available as Diet Lemonade." },
    { id: "cfa-simply-orange", name: "Simply Orange", vendor: "Chick-fil-A", category: "drinks", price: 3.15, calories: 160, isVegetarian: true,
      description: "100% pure-squeezed, pasteurized orange juice." },

    // ---------- Chick-fil-A: sweets ----------
    { id: "cfa-frosted-lemonade", name: "Frosted Lemonade", vendor: "Chick-fil-A", category: "sweets", price: 4.69, calories: 330,
      description: "Chick-fil-A Lemonade (or Diet Lemonade) blended with Icedream dessert." },
    { id: "cfa-milkshake", name: "Milkshake", vendor: "Chick-fil-A", category: "sweets", price: 4.89,
      description: "Flavors: Vanilla, Chocolate, Strawberry, and Cookies & Cream." },
    { id: "cfa-smores-milkshake", name: "S'mores Milkshake", vendor: "Chick-fil-A", category: "sweets", price: 5.29, calories: 650,
      description: "A hand-spun, nostalgic treat inspired by the campfire favorite flavors of s'mores." },
    { id: "cfa-icedream-cone", name: "Icedream Cone", vendor: "Chick-fil-A", category: "sweets", price: 1.89, calories: 180 },
    { id: "cfa-icedream-float", name: "Icedream Float", vendor: "Chick-fil-A", category: "sweets", price: 4.35,
      description: "Icedream dessert with your choice of fountain drink." },
    { id: "cfa-chocolate-chunk-cookie", name: "Chocolate Chunk Cookie", vendor: "Chick-fil-A", category: "sweets", price: 1.79, calories: 370,
      description: "Baked each day, with both semi-sweet dark and milk chocolate chunks.",
      sizes: [{ name: "Single", price: 1.79, calories: 370 }, { name: "6 pack", price: 10.09, calories: null }] },
    { id: "cfa-fudge-brownie", name: "Chocolate Fudge Brownie", vendor: "Chick-fil-A", category: "sweets", price: 2.29,
      description: "A decadent dessert treat with rich semi-sweet chocolate melted into the batter and fudgy chunks." },
].map(makeFood);

function formatCardPrice(item) {
    const priceString = item.price.toFixed(2);

    // Items with sizes show the smallest price as a starting point
    if (item.sizes && item.sizes.length > 0) {
        return `From $${priceString}`;
    } else {
        return `$${priceString}`;
    }
}
