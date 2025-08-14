# Contributing to AutoTestLab

Thank you for your interest in contributing to AutoTestLab! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 1. Fork the Repository
- Fork the repository to your GitHub account
- Clone your fork locally: `git clone https://github.com/your-username/autotestlab.git`

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Follow the coding standards and conventions
- Add tests for new functionality
- Update documentation as needed

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add new test scenario for dynamic content"
```

### 5. Push and Create a Pull Request
```bash
git push origin feature/your-feature-name
```

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows the project's style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Responsive design works on all screen sizes

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Test scenario addition
- [ ] UI/UX improvement

## Testing
- [ ] Tested on desktop browsers
- [ ] Tested on mobile devices
- [ ] Cross-browser compatibility verified

## Screenshots (if applicable)
Add screenshots of UI changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have made corresponding changes to documentation
```

## 🎨 Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Maintain consistent indentation (2 spaces)

### CSS
- Use Tailwind CSS utility classes when possible
- Custom CSS should be in `src/assets/css/styles.css`
- Follow BEM methodology for custom classes

### JavaScript
- Use ES6+ features
- Follow camelCase naming convention
- Add JSDoc comments for functions

### File Naming
- Use kebab-case for file names
- Descriptive and meaningful names
- Group related files together

## 🧪 Testing Guidelines

### Test Scenarios
- Each test scenario should be self-contained
- Include clear instructions for users
- Provide sample automation code
- Test on multiple browsers

### Code Examples
- Use Python with Selenium WebDriver
- Include proper error handling
- Add comments explaining complex logic
- Provide both basic and advanced examples

## 📚 Documentation

### Documentation Standards
- Clear and concise writing
- Include code examples
- Use proper markdown formatting
- Keep documentation up-to-date

### Required Documentation
- README.md updates
- API documentation (if applicable)
- Setup instructions
- Troubleshooting guides

## 🐛 Bug Reports

### Bug Report Template
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Device: [e.g., Desktop]

## Screenshots
Add screenshots if applicable
```

## 💡 Feature Requests

### Feature Request Template
```markdown
## Feature Description
Clear description of the requested feature

## Use Case
Why this feature would be useful

## Proposed Implementation
How you think it should be implemented

## Alternatives Considered
Other approaches you've considered
```

## 🏷️ Issue Labels

We use the following labels to categorize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

## 📞 Getting Help

If you need help with contributing:

1. Check existing issues and pull requests
2. Join our community discussions
3. Create an issue with the `question` label
4. Reach out to maintainers directly

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to AutoTestLab! 🚀
