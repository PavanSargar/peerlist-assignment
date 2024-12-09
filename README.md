# Dynamic Form Builder

# Live URL
https://peerlist-assignment-taupe.vercel.app/

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

This project is a dynamic form builder with the following features:

1. **Form Creation**: Start with an empty form where users can select input types and add questions.
   - **Supported Question Types**:
     1. Short Answer
     2. Long Answer
     3. Single Select
     4. Number
     5. URL
2. **Form Preview**: Display a live preview of the created form after saving.
3. **Form Filling**: Allow users to fill out the form and track completeness by showing the percentage of fields filled.
4. **Submission Feedback**: Display a success message upon form submission.

## Technologies Used

- **Next.js 15**: Built on the latest version of Next.js.
- **Framer Motion**: Used for interactive animations and drag-and-drop (DnD) components.
- **Zustand**: Implemented for global state management and manual form validations.
- **Tailwind CSS**: Used for responsive and elegant UI design.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
