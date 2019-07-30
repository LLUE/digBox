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
        changetxt:"change",
        btnSwitch:"true",
        onClick: function(){
            alert('你点我了！');
        }
    });
```

##### 参数
|参数|值|说明|
|:-|:-:|-:|
|dShow|false/true|设置弹框初始化关/开|
|blur|false/true|背景是否羽化|
|txtOld|txt|按钮文字|
|txtNew|txt|点击后设置新按钮文字|
|changetxt|false/true|点击后是否更改新按钮文字|
|btnSwitch|false/true|onClick事件关/开|
|onClick|function|重定义的按钮点击事件|


	