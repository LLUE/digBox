## digBox
一个弹框示例
- [Demo](https://llue.github.io/digBox/)


### 描述
底部弹框  

##### 使用
```
    $(".btn1").digMax({
        txtOld: '这是按钮1',
        txtNew: '点我点我',
        title: '自定义的标题',
        content: '自定义的内容',
        changetxt:"change",
        btnSwitch:"true",
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
|txtOld|string|按钮文字|
|txtNew|string|点击后设置新按钮文字|
|changetxt|normal/change|点击后是否更改新按钮文字|
|btnSwitch|false/true|onClick事件关/开|
|onClick|function|重定义的按钮点击事件|
|onClosed|function|关闭窗口事件|


	