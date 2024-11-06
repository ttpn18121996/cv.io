# cv.io

## Optional Configuration

```javascript
MyCv.setup({
    data,
    render: {
        summary: {
            effect: 'auto_type',
            options: { timeout: 10, cursor: '_' },
        },
        technicalSkillItem: {
            handle({ skillGroup, skill }) {
                //
            }
        },
        ...
    },
}).start();
```

## Fluent Configuration

```javascript
MyCv.setData(data)
.render('fullName', 'auto_type')
.render('summary', {
    effect: 'auto_type',
    options: { timeout: 10, cursor: '_' },
})
render('technicalSkillItem', function ({ skillGroup, skill }) {
    //
}).start();
```
