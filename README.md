# Project Skeleton

## Project Workflow Status Badge

![workflow status](https://github.com/csci312a-s25/project-camelshump/actions/workflows/node.js.yml/badge.svg)

## Project Description

MiddDorms is an online housing rating systems that allows current Middlebury College students to share their reviews of their housing experiences. It provides students with valuable information of dorm buildings and their room types to make more informed choices during room selection. MiddDorms allows students to browse through the different dorms and see their key ratings (noise, cleanliness, amenities) which might help them choose a dorm room more suited to their needs.

## Project Link

https://camelshump.csci312.dev

## Creation

This project skeleton has been setup similar to our assignments and practicals. It is a Next.JS application, created with create-next-app `💻 npx create-next-app@latest`, which uses Jest and Testing Library for testing, ESLint for static analysis, Prettier for styling, and is configured to use GitHub actions for testing pull requests.

Development dependencies installed with:

```
💻 pnpm install -D jest jest-environment-jsdom husky lint-staged prettier eslint-config-prettier @testing-library/react @testing-library/jest-dom eslint-plugin-testing-library cross-env
```

### Additional tools you might need

#### Mocking fetch

Tools for mocking fetch can be installed with

```
💻 pnpm install -D @fetch-mock/jest
```
