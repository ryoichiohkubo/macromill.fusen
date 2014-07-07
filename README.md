Macromill Fusen
===============

####Fusen is the sticky in Japan. This Plugin is possible to save the state using a callback.

このプラグインを使うとWebページに付箋を貼り付けることができます。ページ上の好きな位置に移動し、大きさを変え、タイトルとメモを編集できます。  
また移動、サイズ変更、編集、削除に対応する callbac 関数を options で渡すことができます。引数でその時点の付箋の状態(Options)が渡されるので callback を通じて付箋の内容を永続化することができます。詳しくはサンプルを見て下さい。

##Usage
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

##Options
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

