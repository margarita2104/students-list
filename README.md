# Student Management System

## Overview

The Student Management System is a web application that allows users to manage and display a list of students. Users can add new students, filter and sort the list based on various criteria, and persist the data using the browser's local storage. The application showcases the use of JavaScript for dynamic content manipulation, HTML for structure, and CSS for styling.

## Features

- **Add New Students**: Users can input new student details through a form, including first name, last name, date of birth, starting year of study, and faculty.
- **Display Students**: The application displays a table of all students, showing their names, faculties, ages, and study years.
- **Filtering**: Users can filter students based on names, faculties, starting years, and finishing years.
- **Sorting**: Users can sort the students by last name, faculty, date of birth, or start year.
- **Local Storage**: The application saves student data in the browser's local storage, ensuring data persistence even after refreshing the page.

## Technologies Used

- **HTML**: For structuring the web page.
- **CSS**: For styling the web application.
- **JavaScript**: For adding interactivity, handling events, and managing data.

## Usage

1. Fill in the student details in the provided form and click "Submit" to add the student to the list.
2. Use the filters at the top of the table to narrow down the list based on specific criteria.
3. Click on the column headers to sort the list of students.
4. Refresh the page to see that the added students persist due to local storage.

## Example of Data Structure

The application uses an array of student objects, each containing the following fields:

```javascript
{
  firstName: "Anna",
  lastName: "Morris",
  dateOfBirth: new Date(2005, 7, 17),
  startYear: 2023,
  faculty: "Economics",
}
```

## Future Improvements

- Implement user authentication to allow different users to manage their own student lists.
- Enhance the UI/UX for better user interaction.
- Add more validation on the input fields.
- Implement a backend server to manage data persistently.
