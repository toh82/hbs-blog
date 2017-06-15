[![GitHub issues](https://img.shields.io/github/issues/toh82/hbs-blog.svg?style=flat-square)](https://github.com/toh82/hbs-blog/issues)
[![Code Climate](https://img.shields.io/codeclimate/github/kabisaict/flow.svg?style=flat-square)](https://codeclimate.com/github/toh82/hbs-blog)

# hbs-blog
Handlebarsjs helper to create a static blog

## Install

The best way to install this module is by npm:  
`npm install hbs-blog`  

[hbs-blog on npm](https://www.npmjs.com/package/hbs-blog)

## Handlebarsjs helper

### Article list

The article list helper gives you the possibility to render a list from documents, within a given folder. Documents which should be listed needs a **FrontMatter** header.  
The helper reads and provides the following data:
- headline
- subline
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
        {{headline}}
        {{author}}
        ...
      </div>
    {{/articleList}}
```

### Tag navigation

The tag navigation helper walks through all files given in defined folder and reads the `tags` property from **FrontMatter** to generate a list of all available tags.

- title (title of the tag)

**Example**
```
<h3>Filter blog posts by tags:</h3>
<ul class="tags">
    {{#tagNavigation blog.post.folder}}
    <li class="tags__item"><a href="#{{title}}">{{title}}</a></li>
    {{/tagNavigation}}
</ul>
```

### Markdown

The Markdown helper uses **Remarkable** to format markdown code to html. Yet not settings are added and be aware that, if there is a newline at the beginning of you text, the output will be messed up. Therefore, start your first line directly after the helper placeholder.

**Example**
```
{{#markdown}}#your markdown text{{/markdown}}
```

### Format tags

The **Format Tags** helper takes a comma separated list of tags and render them with the given html code.

- tag (tagname)

**Example**
```
<ul class="tags">
    {{#formatTags tags}}
    <li class="tags__item">{{tag}}</li>
    {{/formatTags}}
</ul>
```

### Format time (uses moment.js)

The **Format time** helper transform a date into a user-friendly format. It uses the [moment.js library](https://momentjs.com/docs/).

The `date` and `format` parameters are documented respectively [here](https://momentjs.com/docs/#/parsing/string/) and [here](https://momentjs.com/docs/#/parsing/string-format/).

**Example 1**
```
{{formatTime date format}}
```

**Example 2**
```
<time datetime="{{formatTime date "YYYY-MM-DD"}}">{{formatTime date "DD.MM.YYYY"}}</time>
```

## Document Data Module (uses FrontMatter)

The document data module extends the `data` object with useful information which you can directly use as **handlebarsjs variables**. The main purpose is to push the [**FrontMatter**](https://www.npmjs.com/package/front-matter) properties into the `data` object but it also has system properties.  

**System properties:**
- relativePath (provides the path to the file)

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
