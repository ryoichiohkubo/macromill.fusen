Macromill Fusen
===============

####Fusen is the sticky in Japan. This Plugin is possible to save the state using a callback.

About
-----------
You can paste a sticky note(Fusen) on the Web page.
Navigate to the desired location on the page, and change the size, and you can edit the title and notes.  
You can pass the callback function corresponding move, resize, edit, and remove in the options.
The callback is passed the state of Fusen of that time by the argument named 'current', the same format as the Options.
So you are able to persist the contents of the Fusen in the callback.  
Take a look at the sample for more information.

Usage
-----------

* Include JQuery:

```html
    <script src="/js/jquery.min.js" type="text/javascript"></script>
    <script src="/js/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
```  

* Include plugin's code:

```html
    <script src="/js/jquery.macromill.fusen.js" type="text/javascript"></script>
    <link type="text/css" rel="stylesheet" href="/css/jquery.macromill.fusen.css" />
```  

* Define each callback functions:

```javascript
    resizeStopCallback = function (event, current) {
      ...
    }
    dragStopCallback = function (event, current) {
      ...
    }
    removeCallback = function (event, current) {
      ...
    }
    editCallback = function (event, current) {
      ...
    }
```  

* Call the plugin:

```javascript
    $('<div>').macromillFusen({
      resizeStop: resizeStopCallback
      ,dragStop: dragStopCallback
      ,remove: removeCallback
      ,edit: editCallback
    });
```  

Options
-----------

These options are default:  

```javascript
{
    //The Unique Id of Fusen. Null means new Fusen, then it numbered in this program.
    "serialNo": null
    //The absolute display potition in the document. -> {top, left}
    ,"offset": null
    //The size of Fusen. See css for default.
    ,"size": null
    //The color of Fusen. See css for default.
    ,"backgroundColor": null
    //The transparency of Fusen. See css for default.
    ,"opacity": null
    //title text.
    ,"title": ''
    //memo text.
    ,"memo": ''
    //The id of Fusen's parent element. When this value is not null, the display position are set as  parent + parentOffset.
    ,"parentId": null
    //The relative display potision from the 'Parent element'. 'parentId' is necessary. This is prior than 'offset'. -> {top, left}
    ,"parentOffset": null
    //The id of container element. When null, the default container is body element.
    ,"containerId": null
    //Callback Function when resize.  -> Function(Event, current)
    ,"resizeStop": null
    //Callback Function when Drag. -> Function(Event, current)
    ,"dragStop": null
    //Callback Function when Edit. -> Function(Event, current) * Event is dummy.
    ,"edit": null
    //Callback Function when Remove. -> Function(Event, current) Event is dummy.
    ,"remove": null
};
```  
**The argument 'current' of each callback function represent the state of Fusen.**  
**The same format as the Options.**

