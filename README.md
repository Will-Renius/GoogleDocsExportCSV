# GoogleDocsExportCSV
This repo is an add-on for Google Docs to export the text within a document as a csv for easy text analysis.

## The Data Format
In google docs, if you use a table of contents it is automatically gerated like this
### My Doc
1. Section 1
  * Part 1
  * Part 2
2. Section 2

Where you will have your text in each section.

To format that for text analysis I want it all in a table that denotes what section the text is under

| Title         | H1            | H2     |Text   |
| ------------- |:-------------:| ------:|------:|
| My Doc        | Section 1     | Part 1 |Entry 1|
| My Doc        | Section 1     | Part 2 |Entry 2|
| My Doc        | Section 2     |        |Entry 3|

## How To Use
Once you install the add-on go to the add-ons menu within your document. Click Export to CSV > Export to CSV. 
A modal will open and you can name your export file and it should download to your computer. 