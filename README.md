# Markdown to HTML Converter

This project converts Markdown input to HTML using the `marked` library and renders it inside a designated container. It supports loading Markdown from data URLs and properly handles encoding.

## Setup

1. Save all files in the same directory
2. Open `index.html` in a web browser

## Usage

- The application automatically loads and converts the Markdown from the provided attachment
- The converted HTML is rendered inside the `#markdown-output` element
- Syntax highlighting is applied using highlight.js

## Code Explanation

- `index.html`: Main HTML structure with semantic elements
- `style.css`: Responsive styling with syntax highlighting theme
- `script.js`: Handles data URL parsing, Markdown conversion, and DOM rendering

## License
MIT