# Rotated Pie Labels For Chartist.js

#### This plugin allows you to create automatically rotated labels for slices of chartist.js pie charts 

## Example Usage:

```
new Chartist.Pie('#pie-chart', {
    series: mySeries,
    labels: myLabels
  }, 
  {
    donut: true,
    showLabel: true,
    plugins: [
      Chartist.plugins.ctRotatedPieLabels({
        labelTranslate: .95,
        outerAnchor: true
        })
    ]
  });
```

## Options:

1. labelTranslate
  * The amount that labels will be translated out from the center of the pie. Default: .95
2. outerAnchor
  * If set to false, the labels will be anchored inside-facing.  Default: true
