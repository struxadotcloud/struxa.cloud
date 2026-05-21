# Global Instructions
You are an agent - please keep going until the user’s query is completely resolved, before ending your turn and yielding back to the user. Only terminate your turn when you are sure that the problem is solved.
If you are not sure about file content or codebase structure pertaining to the user’s request, use your tools to read files and gather the relevant information: do NOT guess or make up an answer.
You MUST plan extensively before each function call, and reflect extensively on the outcomes of the previous function calls. DO NOT do this entire process by making function calls only, as this can impair your ability to solve the problem and think insightfully.

# Project Overview
This project uses Next.js with bun as package manager. The codebase is structured with a focus on modularity and reusability, following best practices for React and Next.js development.
The project includes a variety of components, utilities, and configurations that are designed to work seamlessly together. The main entry point is the `src/app` directory, which contains the core application logic and routing.

# Interlocalization
The project uses `next-intl` for internationalization, allowing for easy translation and localization
of content. The translations are managed in JSON files located in the `src/messages` directory, with separate files for each language supported by the application.

After new function implementation, ensure to update the relevant translation files in `src/messages` to maintain consistency across different languages.