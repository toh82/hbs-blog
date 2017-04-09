# hbs-blog
handlebars helper and stuff to create a blog

## Handlebarsjs helper

### Article list

The article list helper gives you the possibility to render a list from documents, within a given folder. Documents which should be listed needs a **FrontMatter** header.  
The helper reads and provides the following data:
- title
- author
- date
- tags
- lang
- intro (read from a html with id `intro-text`)
- link (this is the link to the document)

**Example**
```
    {{#articleList '[base folder like ./src/]' '[folder of blog posts like posts/]'}}
      <div>
        {{title}}
        {{author}}
        ...
      </div>
    {{/articleList}}
```

### Tag navigation 

[ToDo]

### Markdown

The Markdown helper uses **Remarkable** to format markdown code to html. Yet not settings are added and be aware that, if there is a newline at the beginning of you text, the output will be messed up. Therefore, start your first line directly after the helper placeholder.

**Example**
```
{{#markdown}}#your markdown text{{/markdown}}
```

### Format tags

[ToDo]

## Document Data Module (uses FrontMatter)

[ToDo]

### Reading FrontMatter data from a document

In order to read data from a document use `lib/read-document-data`. It takes the document content as string and, if wanted, the data property name, which should be returned. If you don't pass the property name it will return all **FrontMatter** attributes, which can be read from the document.

### Gulp usage of document data

To read **FrontMatter** data from the document in the pipe, use `gulp/load-document-data`. It will read the data and pass it into the object `file.data` which can be accessed with handlebar placeholders. After processing with handlebars you should trigger `remove-document-data` what will remove the **FrontMatter** data from the output.

**Example:**
```
gulp.task('hbs', function () {
  return gulp.src('./src/**/*.html')
    .pipe(loadDocumentData())
    .pipe(handlebars(pageConfig, options))
    .pipe(removeDocumentData())
    .pipe(gulp.dest('web'))
})    
```