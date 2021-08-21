package com.complain.igex.common;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import jxl.Cell;
import jxl.CellType;
import jxl.DateCell;
import jxl.Sheet;
import jxl.Workbook;




public class SimpleExcelRead
{
    public List<String[]> excelRead (File targetFile) throws Exception {
        return excelRead(targetFile, false, 0);
    }

    public List<String[]> excelRead (String fileName, InputStream fis, boolean isUseColCount, int cols) throws Exception
    {
        List<String[]> dataContainer = new ArrayList<> ();

        if (fileName.endsWith ("xlsx"))
        {

            Workbook workbook = null;
            Sheet sheet;

            try
            {

                XSSFWorkbook workbook1 = new XSSFWorkbook (fis);

                FormulaEvaluator evaluator = workbook1.getCreationHelper().createFormulaEvaluator();

                XSSFSheet sheet1 = workbook1.getSheetAt (0);

                int rowCount = sheet1.getPhysicalNumberOfRows ();
                int startRow = -1;

                for (int i = 0; i < rowCount; i++)
                {
                    XSSFRow row = sheet1.getRow (i);

                    if (row != null)
                    {
                        if (row.getPhysicalNumberOfCells () == 0)
                            continue;

                        XSSFCell cell = row.getCell (0);

                        if (cell == null)
                            continue;
                        else {
                            startRow = i;
                            break;
                        }
                    }
                }

                if (startRow == -1)
                    throw new Exception ("Read 할 데이터가 엑셀에 존재하지 않습니다.");

                if(isUseColCount)
                    readExcelXlsx (dataContainer, sheet1, evaluator, rowCount, cols, startRow);
                else
                    readExcelXlsx (dataContainer, sheet1, evaluator, rowCount, startRow);
            }
            catch (Exception e)
            {
                e.printStackTrace ();
                throw e;
            }
            finally
            {
                try
                {
                    if (workbook != null)
                        workbook.close ();

                    if (fis != null)
                        fis.close ();

                }
                catch (Exception ignored)
                {
                }
            }
        }
        else if (fileName.endsWith ("xls"))
        {
            Workbook workbook = null;

            try
            {
                workbook = Workbook.getWorkbook (fis);// 존재하는 엑셀파일 경로를 지정
                Sheet sheet = workbook.getSheet (0);// 첫번째 시트를 지정합니다.*/

                int rowCount = sheet.getRows (); // 총 로우수를 가져옵니다.
                int colCount = sheet.getColumns (); // 총 열의 수를 가져옵니다.

                if (rowCount <= 0 || colCount <= 0)
                {
                    throw new Exception ("Read 할 데이터가 엑셀에 존재하지 않습니다.");
                }

                int startRow = -1;

                for (int i = 0; i < rowCount; i++)
                {
                    Cell cell = sheet.getCell (0, i); // 해당위치의 셀을 가져오는 부분입니다.

                    if (cell == null)
                        continue;
                    else {
                        startRow = i;
                        break;
                    }
                }

                if (startRow == -1)
                    throw new Exception ("Read 할 데이터가 엑셀에 존재하지 않습니다.");

                readExcelXls (dataContainer, sheet, rowCount, colCount, startRow);
            }
            catch (Exception e)
            {
                e.printStackTrace ();
            }
            finally
            {
                try
                {
                    if (workbook != null)
                        workbook.close ();

                    if (fis != null)
                        fis.close ();
                }
                catch (Exception ignored)
                {
                }
            }
        }


        return dataContainer;
    }

    public List<String[]> excelRead (File targetFile, boolean isUseColCount, int cols) throws Exception
    {
        FileInputStream fis = new FileInputStream (targetFile);

        return excelRead (targetFile.getName (), fis, isUseColCount, cols);
    }

    private void readExcelXlsx (List<String[]> dataContainer, XSSFSheet sheet1, FormulaEvaluator evaluator , int rowCount, int startRow)
    {


        int i = startRow;

        while (true)
        {
            if (i > (rowCount + 50))
            {
                break;
            }

            XSSFRow row = sheet1.getRow (i++);

            if (row != null && row.getPhysicalNumberOfCells () >= 1)
            {
                // TEST CELL
                XSSFCell cell1 = row.getCell (0);

                if (((cell1 != null) ? getString (cell1) : "").equals (""))
                {
                    break;
                }

                String[] data = new String[row.getPhysicalNumberOfCells ()];

                for (int j = 0; j < row.getPhysicalNumberOfCells (); j++)
                {
                    XSSFCell cell = row.getCell (j);
                    data[j] = getCellData(cell, evaluator);
                }

                dataContainer.add (data);
            }
            else
                break;
        }
    }

    private void readExcelXlsx (List<String[]> dataContainer, XSSFSheet sheet1, FormulaEvaluator evaluator , int rowCount, int colCount, int startRow)
    {

        int i = startRow;

        while (true)
        {
            if (i > (rowCount + 50))
            {
                break;
            }

            XSSFRow row = sheet1.getRow (i++);

            if (row != null && row.getPhysicalNumberOfCells () >= 1)
            {
                String[] data = new String[colCount];

                for (int j = 0; j < colCount; j++)
                {
                    XSSFCell cell = row.getCell (j);
                    data[j] = getCellData(cell, evaluator);
                }

                dataContainer.add (data);
            }
            else
                break;
        }
    }

    private String getCellData(XSSFCell cell, FormulaEvaluator evaluator) {
        String data = "";

        if (cell == null)
            return data;
        else
        {
            if (cell.getCellType () == HSSFCell.CELL_TYPE_FORMULA)
            {
                if (!(cell.toString ().equals ("")))
                {
                    int cellType = evaluator.evaluateFormulaCell (cell);

                    if (cellType == 0)
                    {
                        double fddata = cell.getNumericCellValue ();

                        if (HSSFDateUtil.isCellDateFormatted (cell))
                        {
                            Calendar calendar = HSSFDateUtil.getJavaCalendar (fddata);

                            DateFormat df = new SimpleDateFormat ("yyyy-MM-dd");
                            data = df.format (calendar.getTime ());
                        }
                        else
                            data = String.valueOf (fddata);
                    }
                    else if (cellType == 1)
                    {
                        data = cell.getStringCellValue ();
                    } else if (cellType == 4)
                    {
                        boolean fbdata = cell.getBooleanCellValue ();
                        data = String.valueOf (fbdata);
                    }
                }
                else
                    data = "";

            }
            else
                data = getString (cell);
        }

        return data;
    }


    private void readExcelXls (List<String[]> dataContainer, Sheet sheet, int rowCount, int colCount, int startRow)
    {
        for (int i = startRow; i < rowCount; i++)
        {
			/*Cell cell1 = sheet.getCell (0, i); // 해당위치의 셀을 가져오는 부분입니다.

			if (((cell1 != null) ? cell1.getContents () : "").equals (""))
				break;*/

            String[] data = new String[colCount];

            for (int k = 0; k < colCount; k++)
            {
                Cell cell = sheet.getCell (k, i); // 해당위치의 셀을 가져오는 부분입니다.

                if (cell == null)
                    data[k] = "";

                if (cell.getType () == CellType.DATE)
                {
                    DateFormat df = new SimpleDateFormat ("yyyy-MM-dd");

                    data[k] = df.format (((DateCell) cell).getDate ());
                    // data[k] = cell.getContents (); // 가져온 셀의 실제 콘텐츠 즉 데이터(문자열)를 가져오는 부분입니다.
                }
                else
                    data[k] = cell.getContents (); // 가져온 셀의 실제 콘텐츠 즉 데이터(문자열)를 가져오는 부분입니다.
            }

            dataContainer.add (data);
        }
    }



    private String getString (XSSFCell cell)
    {
        DateFormat df = new SimpleDateFormat ("yyyy-MM-dd");

        switch (cell.getCellType ())
        {
            case XSSFCell.CELL_TYPE_FORMULA :
                return cell.getCellFormula ();

            case XSSFCell.CELL_TYPE_NUMERIC :
                if (DateUtil.isCellDateFormatted (cell))
                    return df.format (cell.getDateCellValue ());
                else
                    return ((long) cell.getNumericCellValue ()) + "";

            case XSSFCell.CELL_TYPE_STRING :
                return cell.getStringCellValue ();

            case XSSFCell.CELL_TYPE_BLANK :
                return "";

            case XSSFCell.CELL_TYPE_ERROR :
                return cell.getErrorCellValue () + "";
        }
        return "";
    }
}