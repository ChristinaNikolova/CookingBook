// Internationalization configuration using Intl API

const messages = {
  'bg-BG': {
    // Navigation
    home: 'Начало',
    admin: 'Администрация',
    recipes: 'Рецепти',
    favourites: 'Любими',
    notes: 'Бележки',
    logout: 'Изход',
    login: 'Вход',
    register: 'Регистрация',
    
    // Search
    search: 'Търси',
    close: 'Затвори',
    searchRecipe: 'Търси рецепта',
    
    // 404 Page
    notFoundTitle: '404',
    notFoundMessage: 'Страницата, която търсите, не съществува!',
    
    // Admin
    categories: 'Категории',
    createCategory: 'Създай Категория',
    helloAdmin: 'Здравей, Админ',
    edit: 'Редактирай',
    delete: 'Изтрий',
    recipesLower: 'рецепти',
    categoriesLower: 'категории',
    createNewCategory: 'Създай нова категория',
    editCategory: 'Редактирай категория',
    name: 'Име',
    
    // Auth
    email: 'Имейл',
    password: 'Парола',
    repeatPassword: 'Повтори парола',
    loggingOut: 'Отписване',
    
    // Home
    addRecipe: 'Добави рецепта',
    
    // Loader
    loading: 'Зареждане',
    
    // NoContent
    noContentYet: 'Все още няма добавени',
    create: 'Създай',
    
    // Notes
    addNote: 'Добави бележка',
    description: 'Описание',
    beOrganized: 'Бъди винаги организирана и не забравяй нищо!',
    
    // Recipe
    favouriteRecipes: 'Любими рецепти',
    lastAddedRecipes: 'Последно добавени рецепти',
    lastAdded: 'Последно добавени',
    searchResults: 'Резултати от търсенето',
    recipesContaining: 'рецепти, съдържащи',
    read: 'Прочети',
    
    // Recipe Details
    addToFavourites: 'Добави в любими',
    removeFromFavourites: 'Премахни от любими',
    portions: 'Брой порции',
    neededTime: 'Необходимо време',
    suitableForBaby: 'Подходящо за бебе',
    suitableForBabies: 'Подходящо за бебета',
    category: 'Категория',
    neededProducts: 'Необходими продукти',
    createShoppingNote: 'Създай бележка за пазаруване',
    preparationSteps: 'Стъпки за приготвяне',
    step: 'Стъпка',
    removeFromShoppingList: 'Махни от списъка за пазаруване',
    addToShoppingList: 'Добави в списъка за пазаруване',
    
    // Recipe Form
    createRecipe: 'Създай рецепта',
    editRecipe: 'Редактирай рецептата',
    title: 'Заглавие',
    summary: 'Резюме',
    instructions: 'Инструкции',
    products: 'Продукти',
    product: 'Продукт',
    addInstruction: '+ инструкция',
    addProduct: '+ продукт',
    currentImage: 'Текущо изображение',
    image: 'Изображение',
    saveChanges: 'Запази промените'
  },
  'en-US': {
    // Navigation
    home: 'Home',
    admin: 'Administration',
    recipes: 'Recipes',
    favourites: 'Favourites',
    notes: 'Notes',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    
    // Search
    search: 'Search',
    close: 'Close',
    searchRecipe: 'Search recipe',
    
    // 404 Page
    notFoundTitle: '404',
    notFoundMessage: 'The page you are looking for does not exist!',
    
    // Admin
    categories: 'Categories',
    createCategory: 'Create Category',
    helloAdmin: 'Hello, Admin',
    edit: 'Edit',
    delete: 'Delete',
    recipesLower: 'recipes',
    categoriesLower: 'categories',
    createNewCategory: 'Create new category',
    editCategory: 'Edit category',
    name: 'Name',
    
    // Auth
    email: 'Email',
    password: 'Password',
    repeatPassword: 'Repeat password',
    loggingOut: 'Logging out',
    
    // Home
    addRecipe: 'Add recipe',
    
    // Loader
    loading: 'Loading',
    
    // NoContent
    noContentYet: 'No',
    create: 'Create',
    
    // Notes
    addNote: 'Add note',
    description: 'Description',
    beOrganized: 'Stay organized and never forget anything!',
    
    // Recipe
    favouriteRecipes: 'Favourite recipes',
    lastAddedRecipes: 'Last added recipes',
    lastAdded: 'Last added',
    searchResults: 'Search results',
    recipesContaining: 'recipes containing',
    read: 'Read',
    
    // Recipe Details
    addToFavourites: 'Add to favourites',
    removeFromFavourites: 'Remove from favourites',
    portions: 'Portions',
    neededTime: 'Needed time',
    suitableForBaby: 'Suitable for baby',
    suitableForBabies: 'Suitable for babies',
    category: 'Category',
    neededProducts: 'Needed products',
    createShoppingNote: 'Create shopping note',
    preparationSteps: 'Preparation steps',
    step: 'Step',
    removeFromShoppingList: 'Remove from shopping list',
    addToShoppingList: 'Add to shopping list',
    
    // Recipe Form
    createRecipe: 'Create recipe',
    editRecipe: 'Edit recipe',
    title: 'Title',
    summary: 'Summary',
    instructions: 'Instructions',
    products: 'Products',
    product: 'Product',
    addInstruction: '+ instruction',
    addProduct: '+ product',
    currentImage: 'Current image',
    image: 'Image',
    saveChanges: 'Save changes'
  }
};

// Get user's locale or default to Bulgarian
export const getUserLocale = () => {
  const userLang = navigator.language || navigator.userLanguage || 'bg-BG';
  return messages[userLang] ? userLang : 'bg-BG';
};

// Get translations for current locale
export const getTranslations = () => {
  const locale = getUserLocale();
  return messages[locale];
};

// Format messages with parameters (using Intl.MessageFormat concept)
export const formatMessage = (key, params = {}) => {
  const t = getTranslations();
  let message = t[key] || key;
  
  // Simple parameter replacement
  Object.keys(params).forEach(param => {
    message = message.replace(`{${param}}`, params[param]);
  });
  
  return message;
};

export default {
  getUserLocale,
  getTranslations,
  formatMessage,
  messages
};
