Macromill Fusen
===============

####Fusen is the sticky in Japan. This Plugin is possible to save the state using a callback.

このプラグインを使うとWebページに付箋を貼り付けることができます。ページ上の好きな位置に移動し、大きさを変え、タイトルとメモを編集できます。
また移動、サイズ変更、編集、削除に対応する callbac 関数を options で渡すことができます。引数でその時点の付箋の状態(Options)が渡されるので callback を通じて付箋の内容を永続化することができます。詳しくはサンプルを見て下さい。

##Usage
1. Include JQuery:
    <script src="/js/jquery.min.js" type="text/javascript"></script>
    <script src="/js/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
2. Include plugin's code:
    <script src="/js/jquery.macromill.fusen.js" type="text/javascript"></script>
    <link type="text/css" rel="stylesheet" href="/css/jquery.macromill.fusen.css" />
3. Call the plugin:
    $('<div>').macromillFusen({
      resizeStop: resizeStopCallback
      ,dragStop: dragStopCallback
      ,remove: removeCallback
      ,edit: editCallback
    });
 

##Options
