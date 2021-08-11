'use strict';

const kbSize = 1024;
const mbSize = 1024 * kbSize;
const gbSize = 1024 * mbSize;

/**
 * 파일 lib
 */
const fileLib = {

    fileType : {
        image : 1,
        excelOrCsv : 2
    },

    /**
     * 이미지 미리보기
     * @param imgFile 파일객체
     * @param img 이미지 DOM
     */
    imgPreview(imgFile, img) {
        const reader = new FileReader();

        reader.onload = () => {
            img.src = reader.result;
        };

        reader.readAsDataURL(imgFile);
    },

    /**
     * 이미지인지 체크
     * @param filename 파일이름
     */
    isImgFile(filename) {
        return /\.(gif|jpg|jpeg|png|bmp)$/i.test(filename);
    },

    /**
     * EXCEL OR CSV 파일인지 체크
     * @param filename 파일이름
     */
    isExcelOrCsvFile(filename) {
        return /\.(xlsx|xls|csv)$/i.test(filename);
    },

    /**
     * 파일 제한 크기 넘는지 체크
     * @param fileSizeByte 파일 사이즈
     * @param limitMB 파일 제한 사이즈 (메가바이트 단위)
     */
    checkFileSizeOver(fileSizeByte, limitMB) {
        return fileSizeByte < (limitMB * 1024 * 1024);
    },

    /**
     * 바이트 사이즈를 상위 단위(KB, MB, GB)로 계산해서 반환
     * @param byteSize 바이트 사이즈
     * @returns {string}
     */
    calByteUnit(byteSize) {
        if(byteSize >= gbSize)
            return Math.floor(byteSize / gbSize) + ' GByte';
        else if(byteSize >= mbSize)
            return Math.floor(byteSize / mbSize) + ' MByte';
        else if(byteSize >= kbSize)
            return Math.floor(byteSize / kbSize) + ' KByte';
        else
            return byteSize + ' Byte';
    },

    convertBase64(file, successFunc, errorFunc) {
        const reader = new FileReader();

        reader.onload = function () {
            let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
            if ((encoded.length % 4) > 0)
                encoded += '='.repeat(4 - (encoded.length % 4));
            successFunc(encoded);
        };

        reader.onerror = function(error) {
            errorFunc(error)
        };

        reader.readAsDataURL(file);
    },

}