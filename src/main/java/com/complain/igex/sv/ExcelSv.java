package com.complain.igex.sv;

import com.complain.igex.searchData.SeachData;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public interface ExcelSv
{

    HSSFWorkbook complainMakeExcel (SeachData seachData);

}
