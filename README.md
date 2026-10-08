# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, file each one under Personal, Work or Study, search through them, and delete the ones you no longer need. Your notes are saved in the browser, so they are still there when you refresh or come back later.

## Features

- Add notes of up to 200 characters
- Choose a category for each note (Personal, Work or Study), each with its own colour
- Validation with clear error messages for empty or too-long notes
- Delete individual notes
- Live search that ignores upper and lower case, with a "No notes match your search." message
- A note counter that reads correctly for zero, one and many notes
- Notes saved with `localStorage`, so they survive a page refresh
- "Clear all" button with a confirmation prompt
- Responsive layout that stacks the form on screens 600px wide or narrower

## How to run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Abdurohmanworku/quicknotes-app.git
   ```
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**, or simply double-click `index.html` to open it in your browser.

No installation or build step is needed.

## What I learned

- How to build a page from semantic HTML tags and link each `<label>` to its input with `for` and `id`.
- How to lay out a form with Flexbox and change the layout on small screens with a `@media (max-width: 600px)` rule.
- How to keep data in an array of objects and rebuild the page from it with a `render()` function.
- Why user text should be added with `textContent` instead of `innerHTML`.
- How to save and load data with `localStorage`, using `JSON.stringify` and `JSON.parse`.
- How to make small, clear Git commits as each feature is finished.
