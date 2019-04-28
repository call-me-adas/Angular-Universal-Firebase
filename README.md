## Firebase hosting with Angular Universal 

#### How to use:
1. Change firebase id in `.firebaserc`
2. Check if `package.json` has the same dependencies like `functions/package.json`
3. `yarn install` in `functions` directory
4. `ng build --prod`
5. `ng run angular-universal-firebase:server`
6. Copy `functions/dist` to main root
7. Remove `index.html` in `dist` in root directory




Based on [Angular Universal Firebase](https://github.com/aaronte/angular-universal-firebase).

