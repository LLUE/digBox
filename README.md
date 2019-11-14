## digBox
一个弹框示例
- [Demo](https://llue.github.io/digBox/)


### 描述
底部弹框  

##### 使用
```
    $(".btn1").digMax({
        btnTxt: '这是按钮1',
        btnNew: '点我点我',
        title: '自定义的标题',
        content: '自定义的内容',
        onClick: function(){
            alert('你点我了！');
        },
        onClosed: function(el,ops,closed){
            closed(el,ops)// 强行写死了的关闭窗口函数 = =！
        }
    });
```

##### 参数
|参数|值|说明|
|:-|:-:|-:|
|title|string|设置弹框title|
|content|string/code|添加弹框内容|
|dShow|false/true|设置弹框初始化关/开（或者在按钮上设置属性d-show）|
|blur|false/true|背景是否羽化|
|btnTxt|string|按钮文字|
|btnNew|string|点击后设置【新按钮】文字|
|onClick|function|重新设置后【新按钮】点击事件|
|onClosed|function|关闭窗口事件|


	