# tldraw-PDF-exporter
tldraw is a great whiteboard aplication, but it's missing a feature since it's creation: the ability to export as a PDF


This chrome extension adds a PDF export option to the main toolbar
click it once and![Button created](data:image/png;base64,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)

Click the button and it will export as a PDF the visible screen
Right click it in every place you want to include in the PDF (it will include them as individual pages), then press scape to generate the PDF

To install

 - Download and extract [tldraw-PDF-exporter.zip](https://github.com/Fdito/tldraw-PDF-exporter/raw/master/tldraw-PDF-exporter.zip)
 - Go to chrome://extensions
 - Enable developer mode
 - Click in 'Load unpacked'
 - Select the location where you extracted the zip file


You are all set, give it a go and report bugs in the issues tab