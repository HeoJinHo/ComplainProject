package com.complain.igex.imp;

import com.complain.igex.common.ExcelCommonUtilSv;
import com.complain.igex.data.FileList;
import com.complain.igex.model.Complain;
import com.complain.igex.searchData.SeachData;
import com.complain.igex.sv.ExcelSv;
import com.complain.igex.sv.MongoSupportSv;
import lombok.RequiredArgsConstructor;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcelSvImp implements ExcelSv
{
    private final ExcelCommonUtilSv excelCommonUtilSv;

    private final MongoSupportSv mongoSupportSv;

    @Override
    public HSSFWorkbook complainMakeExcel(SeachData seachData) {
        return makeCore(seachData);
    }

    private HSSFWorkbook makeCore(SeachData seachData){
        System.out.println(seachData.toString());
        HSSFWorkbook workBook = new HSSFWorkbook();
        HSSFSheet sheet = workBook.createSheet();

        workBook.setSheetName(0, "파일리스트");
        sheet.setDefaultRowHeightInPoints(16);
        HSSFRow header = sheet.createRow(0);
        int ci = 0;

        HSSFCellStyle headerStyle = excelCommonUtilSv.getHeaderStyle(workBook);
        HSSFCellStyle dataStyle = excelCommonUtilSv.getDataStyle(workBook);

        excelCommonUtilSv.createCellHeader(header, headerStyle, "민원인", ci++);
        excelCommonUtilSv.createCellHeader(header, headerStyle, "전화번호", ci++);
        excelCommonUtilSv.createCellHeader(header, headerStyle, "이메일", ci++);
        excelCommonUtilSv.createCellHeader(header, headerStyle, "우편번호", ci++);
        excelCommonUtilSv.createCellHeader(header, headerStyle, "주소", ci++);
        excelCommonUtilSv.createCellHeader(header, headerStyle, "상세주소", ci++);
        excelCommonUtilSv.createCellHeader(header, headerStyle, "민원제목", ci++);
        excelCommonUtilSv.createCellHeader(header, headerStyle, "민원내용", ci++);
        excelCommonUtilSv.createCellHeader(header, headerStyle, "상태", ci++);
        excelCommonUtilSv.createCellHeader(header, headerStyle, "담당자", ci++);
        excelCommonUtilSv.createCellHeader(header, headerStyle, "답변", ci++);

        int startRow = 1;
        List<Complain> all = mongoSupportSv.getAllList(Complain.class, seachData.makeQuery());


        for (Complain list : all){
            HSSFRow row = sheet.createRow(startRow++);
            int i = 0;

            excelCommonUtilSv.cellValue(row, i++, dataStyle, list.getCom_name());
            excelCommonUtilSv.cellValue(row, i++, dataStyle, list.getCom_phone());
            excelCommonUtilSv.cellValue(row, i++, dataStyle, list.getCom_email());
            excelCommonUtilSv.cellValue(row, i++, dataStyle, list.getCom_zip_code());
            excelCommonUtilSv.cellValue(row, i++, dataStyle, list.getCom_address());
            excelCommonUtilSv.cellValue(row, i++, dataStyle, list.getCom_address_detail());
            excelCommonUtilSv.cellValue(row, i++, dataStyle, list.getCom_title());
            excelCommonUtilSv.cellValue(row, i++, dataStyle, list.getCom_content());
            excelCommonUtilSv.cellValue(row, i++, dataStyle, list.getCom_state().getValue());
            excelCommonUtilSv.cellValue(row, i++, dataStyle, list.getManageName());
            excelCommonUtilSv.cellValue(row, i++, dataStyle, list.getComplainComment());
        }

        sheet.setDefaultColumnWidth(18);

        return workBook;
    }


}
