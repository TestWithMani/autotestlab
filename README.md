# AutoTestLab 🧪

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)
[![Security](https://img.shields.io/badge/security-policy-brightgreen.svg)](SECURITY.md)

A comprehensive web-based platform for learning and practicing automation testing with Selenium WebDriver. AutoTestLab provides interactive test scenarios, real-world examples, and hands-on learning experiences for developers and QA engineers.

## 🌟 Features

- **Interactive Test Scenarios**: Practice with real-world automation testing scenarios
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean and professional design using Tailwind CSS
- **Code Examples**: Ready-to-use Python Selenium code for every scenario
- **Comprehensive Documentation**: Detailed guides and tutorials
- **Community Driven**: Open source with active community support
- **Accessibility**: ARIA labels and semantic HTML structure
- **Performance Optimized**: Fast loading with CDN resources

## 📁 Project Structure

```
autotestlab/
├── 📁 .github/                          # GitHub-specific files
│   ├── 📁 workflows/                     # GitHub Actions CI/CD
│   │   └── ci.yml                       # Main CI/CD pipeline
│   ├── 📁 ISSUE_TEMPLATE/               # Issue templates
│   │   ├── bug_report.md                # Bug report template
│   │   └── feature_request.md           # Feature request template
│   └── pull_request_template.md         # PR template
├── 📁 src/                              # Source code
│   ├── 📁 assets/                       # Static assets
│   │   ├── 📁 css/                      # Stylesheets
│   │   │   └── styles.css               # Main CSS file
│   │   ├── 📁 js/                       # JavaScript files
│   │   │   ├── script.js                # Main JavaScript
│   │   │   ├── contact.js               # Contact form handling
│   │   │   ├── datepicker.js            # Date picker functionality
│   │   │   ├── drag-drop.js             # Drag and drop functionality
│   │   │   ├── dynamic-tables.js        # Dynamic tables handling
│   │   │   ├── file-upload.js           # File upload functionality
│   │   │   ├── form-handling.js         # Form handling logic
│   │   │   ├── javascript-alerts.js     # JavaScript alerts handling
│   │   │   ├── login-scenarios.js       # Login scenarios logic
│   │   │   ├── docs.js                  # Documentation functionality
│   │   │   └── test-scenarios.js        # Test scenarios functionality
│   │   └── 📁 images/                   # Image assets
│   │       └── favicon.svg              # Site favicon
│   └── 📁 pages/                        # HTML pages
│       ├── index.html                   # Homepage
│       ├── about.html                   # About page
│       ├── contact.html                 # Contact page
│       ├── docs.html                    # Documentation page
│       ├── test-scenarios.html          # Test scenarios page
│       ├── login-scenarios.html         # Login scenarios page
│       ├── form-handling.html           # Form handling page
│       ├── javascript-alerts.html       # JavaScript alerts page
│       ├── dynamic-tables.html          # Dynamic tables page
│       ├── file-upload.html             # File upload page
│       ├── drag-drop.html               # Drag and drop page
│       ├── datepicker.html              # Date picker page
│       ├── api-testing.html             # API testing page
│       ├── mobile-testing.html          # Mobile testing page
│       └── web-testing.html             # Web testing page
├── 📄 README.md                         # Project documentation
├── 📄 LICENSE                           # MIT License
├── 📄 CONTRIBUTING.md                   # Contributing guidelines
├── 📄 CODE_OF_CONDUCT.md                # Code of conduct
├── 📄 SECURITY.md                       # Security policy
├── 📄 package.json                      # Project metadata and scripts
├── 📄 .gitignore                        # Git ignore rules
├── 📄 robots.txt                        # Search engine robots
├── 📄 sitemap.xml                       # Site map
└── 📄 netlify.toml                      # Netlify configuration
```

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - runs directly in the browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TestWithMani/autotestlab.git
   cd autotestlab
   ```

2. **Open the application**
   ```bash
   # Simply open src/pages/index.html in your browser
   # Or use a local server for better experience
   python -m http.server 8000
   # Then visit http://localhost:8000/src/pages/
   ```

3. **Start Learning**
   - Navigate to different test scenarios
   - Practice with interactive elements
   - Copy code examples for your projects

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Custom styling with Tailwind CSS framework
- **JavaScript (ES6+)**: Interactive functionality
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icon library

### Testing & Automation
- **Selenium WebDriver**: Browser automation
- **Python**: Primary automation language
- **Pytest**: Testing framework (examples)

### Deployment
- **Netlify**: Static site hosting
- **GitHub Pages**: Alternative hosting option

## 🎯 Test Scenarios

AutoTestLab includes comprehensive test scenarios for learning automation:

### Web Testing
- **Form Handling**: Input validation, form submission
- **Dynamic Content**: AJAX, dynamic tables, loading states
- **File Upload**: File selection, drag & drop uploads
- **JavaScript Alerts**: Alert, confirm, prompt dialogs
- **Date Picker**: Calendar interactions, date selection
- **Drag & Drop**: Element dragging, drop zones

### Login Scenarios
- **Valid Login**: Successful authentication flows
- **Invalid Credentials**: Error handling, validation
- **Password Reset**: Recovery flows
- **Remember Me**: Session management

### Advanced Features
- **API Testing**: REST API interactions
- **Mobile Testing**: Responsive design testing
- **Cross-browser Testing**: Multi-browser compatibility

## 📚 Documentation

### Getting Started
- [Quick Start Guide](#quick-start)
- [Test Scenarios](#test-scenarios)
- [Technologies Used](#technologies-used)

### API Reference
- [Selenium WebDriver Examples](src/pages/docs.html)
- [Test Framework Setup](src/pages/docs.html)
- [Best Practices](src/pages/docs.html)

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/TestWithMani/autotestlab.git

# Navigate to project directory
cd autotestlab

# Open in your preferred editor
code .

# Start local development server
python -m http.server 8000
```

## 🐛 Bug Reports

Found a bug? Please report it using our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md).

## 💡 Feature Requests

Have an idea for a new feature? We'd love to hear it! Use our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- **Selenium WebDriver** - For providing the foundation of web automation
- **Tailwind CSS** - For the beautiful utility-first CSS framework
- **Font Awesome** - For the comprehensive icon library
- **Netlify** - For reliable static site hosting
- **Our Contributors** - For making this project better every day

## 📞 Support

- **Documentation**: [src/pages/docs.html](src/pages/docs.html)
- **Issues**: [GitHub Issues](https://github.com/TestWithMani/autotestlab/issues)
- **Discussions**: [GitHub Discussions](https://github.com/TestWithMani/autotestlab/discussions)
- **Email**: [contact@autotestlab.com](mailto:contact@autotestlab.com)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=TestWithMani/autotestlab&type=Date)](https://star-history.com/#TestWithMani/autotestlab&Date)

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/TestWithMani/autotestlab)
![GitHub issues](https://img.shields.io/github/issues/TestWithMani/autotestlab)
![GitHub pull requests](https://img.shields.io/github/issues-pr/TestWithMani/autotestlab)
![GitHub contributors](https://img.shields.io/github/contributors/TestWithMani/autotestlab)

---

**AutoTestLab** - Empowering developers with modern automation testing solutions. 🚀

Made with ❤️ by the AutoTestLab community. 