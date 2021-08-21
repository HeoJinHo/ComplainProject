package com.complain.igex.common;

import lombok.RequiredArgsConstructor;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcelCommonUtilSv
{
    public HSSFCell createTitle (HSSFWorkbook workBook, HSSFSheet sheet, int row, String title)
    {
        HSSFRow row2 = sheet.createRow (row);

        HSSFCell cell = row2.createCell (0);

        HSSFCellStyle style = workBook.createCellStyle ();
        HSSFFont font = workBook.createFont ();

        font.setBold (true);
        font.setFontHeightInPoints ((short) 14);

        style.setFont (font);

        cell.setCellStyle (style);
        cell.setCellValue (title);

        return cell;
    }

    public HSSFCell createSubTitle (HSSFWorkbook workBook, HSSFSheet sheet, int row, String title)
    {
        HSSFRow header = sheet.createRow (row);

        HSSFCell cell = header.createCell (0);

        HSSFCellStyle style = workBook.createCellStyle ();

        HSSFFont font = workBook.createFont ();

        font.setFontHeightInPoints ((short) 10);
        font.setColor (HSSFColor.RED.index);

        style.setFont (font);

        cell.setCellStyle (style);
        cell.setCellValue (title);

        return cell;
    }

    public void cellValue (HSSFRow row, int i, HSSFCellStyle dataStyle, Long val)
    {
        HSSFCell cell = makeNumberCell (row, i, dataStyle);

        if (val != null)
            cell.setCellValue (val);
        else
            cell.setCellValue ("");
    }

    public void cellValue (HSSFRow row, int i, HSSFCellStyle dataStyle, Double val)
    {
        HSSFCell cell = makeNumberCell (row, i, dataStyle);

        if (val != null)
            cell.setCellValue (val);
        else
            cell.setCellValue ("");
    }

    public void cellValue (HSSFRow row, int i, HSSFCellStyle dataStyle, Integer val)
    {
        HSSFCell cell = makeNumberCell (row, i, dataStyle);

        if (val != null)
            cell.setCellValue (val);
        else
            cell.setCellValue ("");
    }

    public void cellValue (HSSFRow row, int i, HSSFCellStyle dataStyle, Short val)
    {
        HSSFCell cell = makeNumberCell (row, i, dataStyle);

        if (val != null)
            cell.setCellValue (val);
        else
            cell.setCellValue ("");
    }

    private HSSFCell makeNumberCell (HSSFRow row, int i, HSSFCellStyle dataStyle)
    {
        HSSFCell cell = row.createCell (i);

        cell.setCellStyle (dataStyle);
        cell.setCellType (HSSFCell.CELL_TYPE_NUMERIC);
        return cell;
    }


    public HSSFCellStyle getDataStyle (HSSFWorkbook workBook)
    {
        HSSFCellStyle style = workBook.createCellStyle ();
        HSSFFont dataFont = workBook.createFont ();

        dataFont.setColor (HSSFColor.BLACK.index);

        style.setBorderBottom (HSSFCellStyle.BORDER_THIN);
        style.setBorderLeft (HSSFCellStyle.BORDER_THIN);
        style.setBorderTop (HSSFCellStyle.BORDER_THIN);
        style.setBorderRight (HSSFCellStyle.BORDER_THIN);

        style.setBottomBorderColor (HSSFColor.BLACK.index);
        style.setLeftBorderColor (HSSFColor.BLACK.index);
        style.setRightBorderColor (HSSFColor.BLACK.index);
        style.setTopBorderColor (HSSFColor.BLACK.index);

        style.setFillForegroundColor (HSSFColor.WHITE.index);
        style.setFillPattern (HSSFCellStyle.SOLID_FOREGROUND);

        style.setAlignment (HSSFCellStyle.ALIGN_CENTER);
        style.setFont (dataFont);

        return style;
    }

    public HSSFCellStyle getNumberDataStyle (HSSFWorkbook workBook)
    {
        HSSFCellStyle style = workBook.createCellStyle ();
        HSSFFont dataFont = workBook.createFont ();

        //headerFont.setBold (true);

        dataFont.setColor (HSSFColor.BLACK.index);

        style.setBorderBottom (HSSFCellStyle.BORDER_THIN);
        style.setBorderLeft (HSSFCellStyle.BORDER_THIN);
        style.setBorderTop (HSSFCellStyle.BORDER_THIN);
        style.setBorderRight (HSSFCellStyle.BORDER_THIN);

        style.setBottomBorderColor (HSSFColor.BLACK.index);
        style.setLeftBorderColor (HSSFColor.BLACK.index);
        style.setRightBorderColor (HSSFColor.BLACK.index);
        style.setTopBorderColor (HSSFColor.BLACK.index);

        style.setFillForegroundColor (HSSFColor.WHITE.index);
        style.setFillPattern (HSSFCellStyle.SOLID_FOREGROUND);

        style.setAlignment (HSSFCellStyle.ALIGN_RIGHT);
        style.setFont (dataFont);
        style.setDataFormat (HSSFDataFormat.getBuiltinFormat ("#,##0"));

        return style;
    }

    public void cellValue (HSSFRow row, int i, HSSFCellStyle dataStyle, String val)
    {
        HSSFCell cell = row.createCell (i);

        cell.setCellStyle (dataStyle);
        cell.setCellValue (val);
    }

    public HSSFCellStyle getHeaderStyle (HSSFWorkbook workBook)
    {
        HSSFCellStyle style = workBook.createCellStyle ();
        HSSFFont headerFont = workBook.createFont ();
        //headerFont.setBold (true);
        headerFont.setColor (HSSFColor.WHITE.index);

        style.setBorderBottom (HSSFCellStyle.BORDER_THIN);
        style.setBorderLeft (HSSFCellStyle.BORDER_THIN);
        style.setBorderTop (HSSFCellStyle.BORDER_THIN);
        style.setBorderRight (HSSFCellStyle.BORDER_THIN);

        style.setBottomBorderColor (HSSFColor.BLACK.index);
        style.setLeftBorderColor (HSSFColor.BLACK.index);
        style.setRightBorderColor (HSSFColor.BLACK.index);
        style.setTopBorderColor (HSSFColor.BLACK.index);

        style.setFillForegroundColor (HSSFColor.DARK_TEAL.index);
        style.setFillPattern (HSSFCellStyle.SOLID_FOREGROUND);

        style.setAlignment (HSSFCellStyle.ALIGN_CENTER);
        style.setFont (headerFont);

        return style;
    }

    public HSSFCell createCellHeader (HSSFRow header, HSSFCellStyle style, String title, int idx)
    {
        HSSFCell cell = header.createCell (idx);

        cell.setCellValue (title);
        cell.setCellStyle (style);

        return cell;
    }

    public void createCellHeader (HSSFRow header, HSSFCellStyle style, String title[])
    {
        for (int i = 0; i < title.length; i++) {
            HSSFCell cell = header.createCell (i);

            cell.setCellValue (title[i]);
            cell.setCellStyle (style);
        }

    }

    public List<String[]> readExcelOrCsv (String fileName, InputStream inputStream, int cols)
            throws IOException
    {
        List<String[]> rowDatas = new ArrayList<>();

        // csv
        if (fileName.contains (".csv"))
        {
            String line;
            BufferedReader br = new BufferedReader (new InputStreamReader(inputStream));

            while ((line = br.readLine ()) != null)
            {
                String[] datas = line.split ("\t");
                rowDatas.add (datas);
            }
        }
        else
        {
            SimpleExcelRead excelRead = new SimpleExcelRead ();

            try
            {
                rowDatas = excelRead.excelRead (fileName, inputStream, true, cols);
            }
            catch (Exception e)
            {
                throw new IOException ();
            }
        }

        if (rowDatas == null || rowDatas.size () == 0)
        {
            throw new IOException ("데이터가 없습니다.");
        }
        return rowDatas;
    }
}