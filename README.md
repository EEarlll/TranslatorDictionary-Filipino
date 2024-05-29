# Filipino Language Translator and Dictionary

Welcome to the Filipino Language Translator and Dictionary! This project is a comprehensive language translation and dictionary service specializing in Filipino languages such as Ilocano, Hiligaynon, Cebuano, and Tagalog. The application leverages Google Translate for translations and utilizes a dictionary populated with data scraped from multiple sources.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Language Translation**: Translate text between English and Filipino languages (Ilocano, Hiligaynon, Cebuano, Tagalog) using Google Translate.
- **Dictionary Lookup**: Access definitions, synonyms, and examples for words in the supported Filipino languages.
- **User-Friendly Interface**: Easy-to-use interface built with Angular and Angular Material.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Technologies Used

- **Backend**: Express.js
- **Database**: PostgreSQL
- **Frontend**: Angular, Angular Material
- **Hosting**: Vercel
- **External API**: Google Translate API

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/filipino-translator-dictionary.git
   cd filipino-translator-dictionary
2. **Backend Setup**:
   Install Backend Dependency
   ```sh
   cd backend
   npm install
3. Set up the PostgreSQL database and update the connection details in .env file.
4. Start Backend Server.
   ```sh
   node index.js
5. **Frontend Setup**:
   Navigate to the frontend directory and install dependencies and start Angular development server:
   ```sh
   cd frontend
   npm install
   ng serve
   
## Usage

1. Access the Application:
Open your browser and navigate to the deployed site on Vercel.

2. Translate Text:

- Enter the text you want to translate.
- Select the source and target languages.
- Click on the "Translate" button to get the translation.
- Dictionary Lookup:

3. Enter the word you want to look up in the dictionary.
The application will display the definition, synonyms, and example sentences.

## API Endpoints
The backend server provides several API endpoints:
Parameters: id, limit, offset, word

- GET /translate: Translates text using Google Translate.
- GET /dictionary/ : Retrieves All dictionary information.
- GET /dictionary/:word : Retrieves specific words in dictionary

## Contributing
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.

## License
This project is licensed under the MIT License.

## Acknowledgements
This project was created as a final project for the Computer Engineering (CPE) program at Lyceum of Cavite. Special thanks to all the sources that provided data for the dictionary and to Google for the translation API.



