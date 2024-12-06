# 307_MyDiary_Nibble

### Product Description

🌟 **Introducing Nibble & Scribble: The Ultimate Notes App!** 🌟

Are you a reflective individual looking to capture every moment of your day? Do you want a space to journal your deepest thoughts? Would you like to optionaly share those thoughts? If so, Nibble & Scribble is your perfect companion!

**Why choose Nibble & Scribble?** Unlike ordinary apps, ours puts YOU first! With Nibble & Scribble, you can:

✨ **JOURNAL YOUR WAY!** Keep track of your thoughts, feelings, and daily happenings in a beautifully designed, intuitive interface!

✨ **SHARE YOUR STORY!** Want to connect with others? With our social features, you can easily share blog posts and ideas on the public scribbles page!

✨ **ENJOY COMPLETE PRIVACY!** Not ready to share everything? No problem! Nibble & Scribble also lets you store your personal notes securely, ensuring only you can see them!

Don't miss out on this revolutionary notes app that combines social sharing with ultimate privacy. Join the Nibble & Scribble community today! Your thoughts deserve a home! 📖💬 

**Get started now and transform the way you scribble!**

### UI Prototype

[Fimga Link](https://www.figma.com/design/UesKxUZoaIrUagFqhl5g7Z/Scribbly-n-Nibble-Wireframes?node-id=0-1&node-type=canvas&t=yUF8AdIOgUXPPsBJ-0)

### UML Diagram

[UML Diagram](./docs/uml.md)

### Development Setup
- If you don't have npm installed on your machine, follow the instructions for your device [here](https://nodejs.org/en/download/package-manager) to download
- Clone the repo from GitHub
- Navigate to the project root directory that was created from the cloned repository and run `npm ci` to install all the necessary packages for the project
- The following commands can be used within the project directory:
  - `npm start` Runs a locally hosted backend deployment
  - `npm run dev` Runs a locall hosted frontend deployment
  - `npm format` Formats all files within the directory with Prettier
  - `npm lint` Lints all project files with ESLint
  - `npm run build` Builds the cloud deployment
  - `npm cy:open` Runs cypress tests
- Create a .env file in both the project root directory and the /packages/react-frontend directory, enter the SUPABASE_KEY, SALT_ROUNDS, VITE_BACKEND_URL, VITE_FRONTEND_URL, and TOKEN_SECRET values provided by a Nibble and Scribble Senior Developer into the .env file

### Contributing

This project utilizes [Prettier](https://prettier.io/) as a code formatter

This project follows the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
