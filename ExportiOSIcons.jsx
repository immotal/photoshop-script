#target photoshop

function saveIcon(size, destinationFolder) {
    var doc = app.activeDocument;
    var fileName = doc.name.replace(/\.[^\.]+$/, '');
    var saveFile = new File(destinationFolder + "/" + fileName + "_" + size + "pt.png");

    // 复制当前文档以便修改
    var tempDoc = doc.duplicate();
    tempDoc.resizeImage(size, size, null, ResampleMethod.BICUBICSHARPER);

    // 保存为PNG
    var pngSaveOptions = new PNGSaveOptions();
    pngSaveOptions.compression = 9; // PNG压缩级别
    tempDoc.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);
    tempDoc.close(SaveOptions.DONOTSAVECHANGES);
}

function main() {
    // 用户选择保存目录
    var destinationFolder = Folder.selectDialog("请选择图标保存的文件夹");
    if (destinationFolder == null) {
        // 用户取消操作
        return;
    }

    // 定义需要的图标尺寸
    var sizes = [8, 16, 32, 64, 128, 256, 512, 1024];

    // 循环处理每个尺寸
    for (var i = 0; i < sizes.length; i++) {
        var size = sizes[i] * 2; // 生成@2x图标
        saveIcon(size, destinationFolder);
    }

    alert("图标导出完成！");
}

// 运行脚本
main();
