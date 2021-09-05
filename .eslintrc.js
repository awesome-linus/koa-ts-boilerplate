module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "import/extensions": 0,
        "import/no-unresolved": 0,
        "import/prefer-default-export": 0,
        "max-classes-per-file": 0,
        "lines-between-class-members": 0
    }
};
