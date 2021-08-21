package com.complain.igex.controller;

import com.complain.igex.common.ExcelDownloadView;
import com.complain.igex.searchData.SeachData;
import com.complain.igex.sv.ExcelSv;
import lombok.RequiredArgsConstructor;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
@RequestMapping("/excel")
public class ExcelController
{
    private final ExcelSv excelSv;
    private final ExcelDownloadView excelDownloadView;

    @GetMapping("/complain")
    public ModelAndView complainExcel(SeachData seachData){
        ModelAndView mv = new ModelAndView(excelDownloadView);

        HSSFWorkbook sheets = excelSv.complainMakeExcel(seachData);
        System.out.println(sheets);
        mv.addObject("fileName", "민원목록.xls");
        mv.addObject("workBook", sheets);
        return mv;
    }


}
